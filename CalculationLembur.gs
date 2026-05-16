// =========================================================================dMaster
// FILE: KalkulasiLembur.gs
// TUJUAN: Perhitungan Lembur dengan Waktu Mulai Baku (Sen-Kam 16:30, Jum 17:00)
// =========================================================================
// =========================================================
// OTAK PERHITUNGAN LEMBUR (SINKRON DENGAN EXCEL PP 35/2021)
// =========================================================
function jalankanKalkulasiLembur(nrppTarget, tglMulai, tglSelesai) {
  try {
    const idSpreadsheetAbsen = "1c3wBMQe6D1utNrUEaFIQwFIo8d_MUj8YNqTX4cIw9eE"; 
    const idSpreadsheetMaster = "1q6HP-HEjUmw4TLjhFGgY899gftgiPJcvU8Li_9Q37FA"; 

    const ssAbsen = SpreadsheetApp.openById(idSpreadsheetAbsen);
    const ssMaster = SpreadsheetApp.openById(idSpreadsheetMaster);

    let infoKaryawan = { nama: "-", dept: "-", gol: "-" };

    let sMaster = ssMaster.getSheetByName("Data_Induk");
    if (sMaster) {
      let dMaster = sMaster.getDataRange().getValues();
      for (let r = 1; r < dMaster.length; r++) {
        let rowData = dMaster[r];
        let target = String(nrppTarget).trim();
        let isFound = false;
        for (let c = 0; c <= 4; c++) {
          if (String(rowData[c]).trim() === target) {
            isFound = true;
            infoKaryawan.nama = String(rowData[c+1]).trim();
            break;
          }
        }
        if (isFound) {
          infoKaryawan.gol = rowData[5] || "-";
          infoKaryawan.dept = rowData[7] || "-";
          break;
        }
      }
    }

    let isGol3KeAtas = false;
    let golStr = String(infoKaryawan.gol).trim().toUpperCase();
    if (golStr.includes("3") || golStr.includes("4") || golStr.includes("5") ||
        golStr.includes("III") || golStr.includes("IV") || golStr.includes("V") ||
        String(nrppTarget).trim() === "10011066") {
      isGol3KeAtas = true;
    }

    const sheetAbsen = ssAbsen.getSheetByName("Absensi");
    if (!sheetAbsen) throw new Error("Sheet Absensi tidak ditemukan.");

    const dataAbsen = sheetAbsen.getDataRange().getValues();
    let startParts = tglMulai.split("-");
    let endParts = tglSelesai.split("-");
    let startD = new Date(startParts[0], startParts[1]-1, startParts[2], 0, 0, 0);
    let endD = new Date(endParts[0], endParts[1]-1, endParts[2], 23, 59, 59);

    let mapData = {};

    // --- AMBIL DAFTAR TANGGAL LIBUR DARI SETTING ---
    let daftarLiburNasional = ambilDaftarTanggalLibur();

    for (let i = 1; i < dataAbsen.length; i++) {
      let nrppRow = String(dataAbsen[i][1]).trim();
      if (nrppRow === String(nrppTarget).trim()) {
        let rawDate = new Date(dataAbsen[i][0]);
        if (isNaN(rawDate.getTime())) continue;

        if (rawDate >= startD && rawDate <= endD) {
          if (infoKaryawan.nama === "-" || infoKaryawan.nama === "") {
            infoKaryawan.nama = dataAbsen[i][2] || "-";
          }

          let tglKey = Utilities.formatDate(rawDate, "GMT+7", "yyyy-MM-dd");
          let tglID = Utilities.formatDate(rawDate, "GMT+7", "d-MMM-yy");
          let hariStr = Utilities.formatDate(rawDate, "GMT+7", "EEEE");
          let dayMap = {"Sunday":"Minggu", "Monday":"Senin", "Tuesday":"Selasa", "Wednesday":"Rabu", "Thursday":"Kamis", "Friday":"Jumat", "Saturday":"Sabtu"};
          let hariID = dayMap[hariStr] || hariStr;

          let jenis = String(dataAbsen[i][3]).trim().toLowerCase();
          let jam = Utilities.formatDate(rawDate, "GMT+7", "HH:mm");
          let ket = dataAbsen[i][4] || "Report";

          if (!mapData[tglKey]) {
            mapData[tglKey] = {
              tgl: tglID, hari: hariID, ket: ket,
              in1: "", out1: "", in2: "", out2: "", 
              realHour: "0.00", calcHour: "0.00",
              ot15: "", ot2: "", ot3: "", ot4: "", uTrns: "", uMkn: "", totOt: "0.00", cuti: "",
              events: [] 
            };
          }
          mapData[tglKey].events.push({jenis: jenis, jam: jam, ts: rawDate.getTime(), ket: ket});
        }
      }
    }

    let hasil = Object.values(mapData).sort((a, b) => a.ts - b.ts);

    for (let i = 0; i < hasil.length; i++) {
      let r = hasil[i];
      // GANTI MENJADI KODE PINTAR INI:
let tglCek = hasil[i].events[0].ts; // Ambil timestamp dari event pertama
let tglFormat = Utilities.formatDate(new Date(tglCek), "GMT+7", "yyyy-MM-dd");

// Jika hari Sabtu/Minggu ATAU tanggalnya ada di daftar Setting_Libur
let isWknd = (r.hari === "Sabtu" || r.hari === "Minggu" || daftarLiburNasional.includes(tglFormat));

      r.events.sort((a,b) => a.ts - b.ts);

      // Ekstrak waktu mentah ke dalam wadah khusus (agar mudah dibaca mesin)
      let mMasuk = [];
      let mKeluar = [];
      for (let ev of r.events) {
        if (ev.ket !== "Report" && r.ket === "Report") r.ket = ev.ket;
        let parts = ev.jam.split(":");
        let m = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        if (ev.jenis === "masuk") mMasuk.push(m);
        if (ev.jenis === "keluar") mKeluar.push(m);
      }

      mMasuk.sort((a,b)=>a-b);
      mKeluar.sort((a,b)=>a-b);

      const formatM = (min) => {
        let hh = Math.floor(min/60).toString().padStart(2, '0');
        let mm = (min%60).toString().padStart(2, '0');
        return hh + ":" + mm;
      };

      // ====================================================================
      // 🔥 DISTRIBUSI CERDAS: PEMBEKUAN DAN PEMBAGIAN SHIFT
      // ====================================================================
      if (!isWknd) {
        let shiftBaku = { masuk: "07:30", pulang: r.hari === "Jumat" ? "17:00" : "16:30" };
        try {
          let jdwl = dapatkanJadwalShift(r.ts); 
          if(jdwl && jdwl.START) shiftBaku.masuk = jdwl.START.substring(0, 5);
          if(jdwl && jdwl.END) shiftBaku.pulang = jdwl.END.substring(0, 5); 
        } catch(e) {}

        let mBakuIn = parseInt(shiftBaku.masuk.split(":")[0]) * 60 + parseInt(shiftBaku.masuk.split(":")[1]);
        let mBakuOut = parseInt(shiftBaku.pulang.split(":")[0]) * 60 + parseInt(shiftBaku.pulang.split(":")[1]);

        let hasMorn = false; let valMornIn = "";
        let hasEve = false;  let valEveOut = "";

        // 1. Deteksi Lembur Pagi Ekstrem (Misal masuk di bawah jam 07:00 / 420 menit)
        for (let m of mMasuk) {
            if (m < 420) { hasMorn = true; valMornIn = formatM(m); break; }
        }
        
        // 2. Deteksi Lembur Sore (Keluar di atas jam pulang baku)
        for (let k of mKeluar) {
            if (k > mBakuOut) { hasEve = true; valEveOut = formatM(k); } // Mengambil tap keluar yg paling akhir
        }

        // 3. PEMBAGIAN KOLOM (MENJAGA TAMPILAN ASLI)
        if (hasMorn && hasEve) {
            // DRIVER: Ada lembur subuh dan lembur malam
            r.in1 = valMornIn; r.out1 = shiftBaku.masuk; // Pagi (Auto-Out 07:30)
            r.in2 = shiftBaku.pulang; r.out2 = valEveOut; // Malam (Auto-In / Beku di 16:30)
        } else if (hasMorn && !hasEve) {
            // HANYA PAGI: Langka terjadi tapi diamankan
            r.in1 = valMornIn; r.out1 = shiftBaku.masuk;
        } else if (!hasMorn && hasEve) {
            // KARYAWAN NORMAL: Hanya lembur setelah jam kerja
            // KEMBALIKAN KE LEMBUR 1, JANGAN KE LEMBUR 2
            r.in1 = shiftBaku.pulang; // DIBEKUKAN MUTLAK DI 16:30 / 17:00 (Walau absen 16:47)
            r.out1 = valEveOut;
            r.in2 = ""; r.out2 = "";  // Kosongkan Lembur 2 agar rapi
        } else {
            // HARI KERJA NORMAL TANPA OT SIGNIFIKAN: Kembalikan apa adanya (nanti OT = 0)
            if (mMasuk.length > 0) r.in1 = formatM(mMasuk[0]);
            if (mKeluar.length > 0) r.out1 = formatM(mKeluar[mKeluar.length-1]);
        }

      } else {
        // ====================================================================
        // 🔥 LOGIKA KHUSUS HARI LIBUR (FIXED VARIABLE NAME)
        // ====================================================================
        
        if (mMasuk.length > 0) {
            // Kita paksa mulai hitung dari 07:30 (450 menit)
            let jamMasukLibur = 450; 
            r.in1 = formatM(jamMasukLibur);
        }
        
        // Menggunakan mKeluar sesuai dengan nama variabel di baris 140-an Bapak
        if (mKeluar.length > 0) {
            r.out1 = formatM(mKeluar[0]);
        }
        
        if (mMasuk.length > 1) {
            r.in2 = formatM(mMasuk[1]);
        }
        
        if (mKeluar.length > 1) {
             if (mKeluar[mKeluar.length-1] > mKeluar[0]) {
                 r.out2 = formatM(mKeluar[mKeluar.length-1]);
             }
        }
        // ====================================================================
      }
      // ====================================================================
// =========================================================
      // RULE GOLONGAN 3 KE ATAS: KUNCI JAM KELUAR DI LEMBUR 1
      // =========================================================
      if (isGol3KeAtas) {
        // Gabung semua jam masuk & keluar agar mesin tidak terkecoh 
        // oleh status 'Masuk' yang ditekan dua kali di mesin absen
        let semuaJam = [...mMasuk, ...mKeluar].sort((a,b) => a - b);
        
        if (semuaJam.length > 1) {
          // Paksa jam paling terakhir (sore/malam) masuk ke kolom TO Lembur 1
          r.out1 = formatM(semuaJam[semuaJam.length - 1]); 
        }
        
        // Bersihkan Lembur 2 agar tampilan rapi sesuai rule Golongan 3
        r.in2 = "";
        r.out2 = "";
      }
      // =========================================================
      // HITUNG MATEMATIKA DURASI MURNI
      const hitungShift = (inTime, outTime) => {
        if(!inTime || !outTime) return 0;
        let minIn = parseInt(inTime.split(":")[0]) * 60 + parseInt(inTime.split(":")[1]);
        let minOut = parseInt(outTime.split(":")[0]) * 60 + parseInt(outTime.split(":")[1]);
        let diffM = minOut - minIn;
        if(diffM < 0) diffM += 1440; 
        return diffM / 60; 
      };

      let dur1 = hitungShift(r.in1, r.out1);
      let dur2 = hitungShift(r.in2, r.out2);
      let diffH = dur1 + dur2;
      r.realHour = diffH > 0 ? diffH.toFixed(2) : "";

      if (diffH > 0) {
        let calc = diffH; let tot = 0; let baseUangMakan = 0;

        if (isWknd) {
          if (diffH >= 9) calc = diffH - 1;
          r.calcHour = calc.toFixed(2);
          let h2 = Math.min(calc, 8), h3 = calc > 8 ? Math.min(calc - 8, 1) : 0, h4 = calc > 9 ? calc - 9 : 0;
          if (h2 > 0) r.ot2 = h2.toFixed(2); if (h3 > 0) r.ot3 = h3.toFixed(2); if (h4 > 0) r.ot4 = h4.toFixed(2);
          tot = (h2 * 2) + (h3 * 3) + (h4 * 4);
          if (calc >= 8) { r.uTrns = "20,000"; baseUangMakan = 21000; if (isGol3KeAtas) r.cuti = "1"; }
        } else {
          calc = diffH >= 1 ? diffH - 1 : 0;
          r.calcHour = calc.toFixed(2);
          let h15 = Math.min(calc, 1), h2 = calc > 1 ? calc - 1 : 0;
          if (h15 > 0) r.ot15 = h15.toFixed(2); if (h2 > 0) r.ot2 = h2.toFixed(2);
          tot = (h15 * 1.5) + (h2 * 2);
          if (calc > 0) baseUangMakan = 21000;
        }

        // =========================================================
        // JURUS PAMUNGKAS GOL 3 KE ATAS (SELAIN PAK KOMAR)
        // =========================================================
        if (isGol3KeAtas) { 
          tot = 0; 
          r.totOt = ""; 
          
          if (String(nrppTarget).trim() !== "10011066") {
            // 1. KOSONGKAN KOLOM OVERTIME 1.5, 2, 3, 4
            r.ot15 = ""; r.ot2 = ""; r.ot3 = ""; r.ot4 = "";
            
            // 2. ATURAN KHUSUS HARI LIBUR / WEEKEND
            if (isWknd) {
              // Potong 1 jam istirahat untuk Calc Hours
              calc = diffH > 1 ? diffH - 1 : diffH;
              r.calcHour = calc.toFixed(2);
              
              // Uang Transport & Uang Makan jika kerja >= 4 Jam
              if (diffH >= 4) {
                r.uTrns = "20,000";
                baseUangMakan = 21000;
              } else {
                r.uTrns = "";
                baseUangMakan = 0;
              }
            }
          }
        } else { 
          r.totOt = tot > 0 ? tot.toFixed(2) : "0.00"; 
        }
        // =========================================================

        // =========================================================
          // REVISI MUTLAK: ATURAN KHUSUS GOL 3 PAK KOMAR (10011066)
          // =========================================================
          let tunjanganLapangan = 0;
          // Deteksi nama variabel agar aman (nrppTarget atau nrpp)
          let idKomar = typeof nrppTarget !== 'undefined' ? nrppTarget : nrpp;
          
          if (String(idKomar).trim() === "10011066") {
            
            // 1. KOSONGKAN KOLOM OVERTIME (1.5, 2, 3, 4) KHUSUS PAK KOMAR
            tot = 0; 
            r.totOt = "";
            r.ot15 = ""; r.ot2 = ""; r.ot3 = ""; r.ot4 = "";

            // 3. HAPUS KOMPENSASI CUTI KHUSUS PAK KOMAR
          r.cuti = ""; 
            
            // 2. ATURAN UANG MAKAN & TUNJANGAN
            if (isWknd) {
              // --- HARI LIBUR / WEEKEND ---
              r.uTrns = "20,000";
              if (typeof uTrns !== 'undefined') uTrns = 20000;
              
              // Syarat libur: >= 6 jam
              if (diffH >= 6) {
                tunjanganLapangan = 125000; 
                baseUangMakan = 21000;
              } else {
                tunjanganLapangan = 0; 
                baseUangMakan = 0;
              }
            } else {
              // --- HARI BIASA / WEEKDAY ---
              r.uTrns = "";
              if (typeof uTrns !== 'undefined') uTrns = 0;
              
              // KUNCI MATI: Durasi kerja WAJIB >= 6 jam untuk dapat tunjangan hari biasa
              if (diffH >= 6) {
                tunjanganLapangan = 75000; 
                baseUangMakan = 21000;
              } else {
                tunjanganLapangan = 0; 
                baseUangMakan = 0;
              }
            }
          }
          // =========================================================
        
        let totalUangMakan = baseUangMakan + tunjanganLapangan;
        if (totalUangMakan > 0) { r.uMkn = totalUangMakan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
      }
    }
    
    // --- BUAT FORMAT PERIODE UNTUK KOLOM B3 ---
    let periodeStr = tglMulai + " s/d " + tglSelesai;

    // --- TRANSFER DATA KE EXCEL ---
    transferDataKeOvertimeNew(hasil, nrppTarget, infoKaryawan.nama, infoKaryawan, periodeStr);

    return { status: "SUCCESS", data: hasil, info: infoKaryawan };
  } catch (e) {
    return { status: "ERROR", message: e.message };
  }
}

// === FUNGSI BANTUAN ===
function kalkulasiJam(m, s, h) {
  let r = (s - m) / 3600000;
  let jM = m.getHours() + (m.getMinutes() / 60);
  let jS = s.getHours() + (s.getMinutes() / 60);
  
  // Istirahat hanya memotong jika jam kerja lembur melewati waktu istirahat
  // Namun karena lembur dimulai SETELAH jam kerja reguler, biasanya tidak ada potong istirahat lagi
  // kecuali lembur shift malam/panjang. Untuk saat ini kita biarkan standar.
  let iM = (h === "Jumat") ? 11.5 : 12.0; 
  let iS = (h === "Jumat") ? 12.5 : 13.0; 
  let p = (jM < iM && jS > iS) ? 1 : 0;
  
  return { real: Number(r.toFixed(2)), calc: Number(Math.max(0, r - p).toFixed(2)) };
}

function formatW(d) {
  return d.getHours().toString().padStart(2,'0') + ":" + d.getMinutes().toString().padStart(2,'0') + ":" + d.getSeconds().toString().padStart(2,'0');
}
function ambilDaftarTanggalLibur() {
  const ss = SpreadsheetApp.openById("1q6HP-HEjUmw4TLjhFGgY899gftgiPJcvU8Li_9Q37FA");
  const sheet = ss.getSheetByName("Setting_Libur");
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  let listLibur = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] instanceof Date) {
      // Kita simpan format yyyy-MM-dd agar mudah dicocokkan
      listLibur.push(Utilities.formatDate(data[i][0], "GMT+7", "yyyy-MM-dd"));
    }
  }
  return listLibur;
}
// --- JURUS PAMUNGKAS: PENGIRIM DATA KE OVERTIMENEW ---
function transferDataKeOvertimeNew(hasil, nrpp, nama, info, periode) {
  try {
    const idOvertimeNew = "1c3wBMQe6D1utNrUEaFIQwFIo8d_MUj8YNqTX4cIw9eE"; 
    const ss = SpreadsheetApp.openById(idOvertimeNew);
    const sheet = ss.getSheetByName("calculation");
    
    if (!sheet) return;

    // --- 1. ISI HEADER (BARIS 1, 2, 3) ---
    sheet.getRange("B1").setValue(nama);        // B1: Nama
    sheet.getRange("B2").setValue(nrpp);        // B2: NRPP
    sheet.getRange("B3").setValue(periode);     // B3: Periode
    sheet.getRange("D1").setValue(info.gol);    // D1: Golongan
    sheet.getRange("D2").setValue(info.dept);   // D2: Dept    

    // --- 2. BERSIHKAN AREA DATA LAMA (Mulai Baris 6 ke bawah) ---
    const lastRow = sheet.getLastRow();
    if (lastRow >= 6) {
      sheet.getRange(6, 1, lastRow - 5, 17).clearContent(); 
    }

    // --- 3. SIAPKAN VARIABEL UNTUK GRAND TOTAL ---
    let tReal = 0, tCalc = 0, t15 = 0, t2 = 0, t3 = 0, t4 = 0;
    let tTrns = 0, tMkn = 0, tTot = 0;

    // Fungsi pembersih angka (menghapus koma pada uang agar bisa ditambah)
    const parseNum = (val) => parseFloat(String(val).replace(/,/g, '')) || 0;

    // --- 4. PEMETAAN KOLOM DATA LEMBUR ---
    let dataUntukTabel = hasil.map(row => {
      // Sambil memetakan data, mesin langsung menjumlahkan angkanya
      tReal += parseNum(row.realHour);
      tCalc += parseNum(row.calcHour);
      t15   += parseNum(row.ot15);
      t2    += parseNum(row.ot2);
      t3    += parseNum(row.ot3);
      t4    += parseNum(row.ot4);
      tTrns += parseNum(row.uTrns);
      tMkn  += parseNum(row.uMkn);
      tTot  += parseNum(row.totOt);

      return [
        row.tgl || "",       // A: TANGGAL
        row.hari || "",      // B: HARI
        row.ket || "",       // C: KETERANGAN
        row.in1 || "",       // D: FROM 1
        row.out1 || "",      // E: TO 1
        row.in2 || "",       // F: FROM 2
        row.out2 || "",      // G: TO 2
        row.realHour || "",  // H: REAL HOUR
        row.calcHour || "",  // I: CALC HOURS
        row.ot15 || "",      // J: 1.5
        row.ot2 || "",       // K: 2
        row.ot3 || "",       // L: 3
        row.ot4 || "",       // M: 4
        row.uTrns || "",     // N: U. TRNSPRT
        row.uMkn || "",      // O: U. MKN
        row.totOt || "",     // P: TOTAL OT
        row.cuti || ""       // Q: CUTI
      ];
    });

    // --- 5. BUAT BARIS GRAND TOTAL ---
    if (dataUntukTabel.length > 0) {
      // Format kembali angka (2 desimal untuk jam, dan koma untuk uang)
      const fmtJam = (val) => val > 0 ? val.toFixed(2) : "";
      const fmtUang = (val) => val > 0 ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";

      let barisGrandTotal = [
        "", "", "", "", "", "",       // Kolom A sampai F dikosongkan
        "GRAND TOTAL",                // Kolom G (Sesuai posisi gambar Bapak)
        fmtJam(tReal),                // Kolom H: Total Real Hour
        fmtJam(tCalc),                // Kolom I: Total Calc Hour
        fmtJam(t15),                  // Kolom J: Total 1.5
        fmtJam(t2),                   // Kolom K: Total 2
        fmtJam(t3),                   // Kolom L: Total 3
        fmtJam(t4),                   // Kolom M: Total 4
        fmtUang(tTrns),               // Kolom N: Total Transport
        fmtUang(tMkn),                // Kolom O: Total Makan
        fmtJam(tTot),                 // Kolom P: Grand Total OT
        ""                            // Kolom Q: Cuti Kosong
      ];

      // Masukkan baris Grand Total ini ke urutan paling bawah tabel
      dataUntukTabel.push(barisGrandTotal);
    }

    // --- 6. MASUKKAN SEMUA DATA (TERMASUK TOTAL) KE EXCEL ---
    if (dataUntukTabel.length > 0) {
      sheet.getRange(6, 1, dataUntukTabel.length, 17).setValues(dataUntukTabel);
    }

  } catch (e) {
    Logger.log("Error Transfer: " + e.message);
  }
}
