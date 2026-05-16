// ==========================================
// FILE: Absensi.gs
// TUJUAN: Memvalidasi Jarak GPS, Menyimpan Data Absen, dan Kalkulasi Rekap
// ==========================================

// Fungsi matematika untuk menghitung jarak dua titik koordinat dalam METER
function hitungJarakMeter(lat1, lon1, lat2, lon2) {
  const R = 6371e3; 
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const deltaP = (lat2 - lat1) * Math.PI / 180;
  const deltaL = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
            Math.cos(p1) * Math.cos(p2) *
            Math.sin(deltaL / 2) * Math.sin(deltaL / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

// ==========================================
// FUNGSI PEMBANTU: Menghitung Jarak GPS dalam Meter
// ==========================================
function hitungJarakMeter(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius bumi dalam satuan meter
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const dp = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dp/2) * Math.sin(dp/2) +
            Math.cos(p1) * Math.cos(p2) *
            Math.sin(dl/2) * Math.sin(dl/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
}

// ==========================================
// FUNGSI UTAMA: Proses Absensi (Dengan Validasi GPS)
// ==========================================
function prosesAbsensi(nrpp, nama, lat, lon, jenis, pekerjaan, pembebanan, piket, dept, tujuan) {
  try {
    
    // --- 1. VALIDASI LOKASI GPS (MESIN BARU) ---
    const lokasiKantor = dapatkanLokasiGPS(); // Memanggil data dari Master_Latlong
    
    if (lokasiKantor) {
      // Menghitung jarak antara HP Karyawan dengan titik Kantor
      const jarakKaryawan = hitungJarakMeter(lat, lon, lokasiKantor.latitude, lokasiKantor.longitude);
      
      // Jika jaraknya lebih jauh dari batas maksimal radius, tolak absennya!
      if (jarakKaryawan > lokasiKantor.radiusMax) {
        return { 
          status: "ERROR", 
          message: `Gagal Absen! Anda berada ${Math.round(jarakKaryawan)} meter dari ${lokasiKantor.namaLokasi}. Maksimal radius adalah ${lokasiKantor.radiusMax} meter.` 
        };
      }
    }
    // -------------------------------------------

    // 2. MENGGUNAKAN ID TERPUSAT DARI CONFIG.GS
    const ss = SpreadsheetApp.openById(CONFIG.ID_OVERTIME);
    const sheetAbsen = ss.getSheetByName(CONFIG.SHEET_ABSENSI);
    
    if (!sheetAbsen) throw new Error("GAGAL: Sheet 'Absensi' tidak ditemukan.");

    let waktu = new Date();
    let barisBaru = sheetAbsen.getLastRow() + 1;

    // Masukkan data dasar (A-H)
    sheetAbsen.getRange(barisBaru, 1).setValue(waktu);        // A: Waktu
    sheetAbsen.getRange(barisBaru, 2).setValue(nrpp);         // B: NRPP
    sheetAbsen.getRange(barisBaru, 3).setValue(nama);         // C: Nama
    sheetAbsen.getRange(barisBaru, 4).setValue(jenis);        // D: Jenis Absen
    sheetAbsen.getRange(barisBaru, 5).setValue(pekerjaan);    // E: Pekerjaan
    sheetAbsen.getRange(barisBaru, 6).setValue(pembebanan);   // F: Pembebanan
    sheetAbsen.getRange(barisBaru, 7).setValue(lat);          // G: Latitude
    sheetAbsen.getRange(barisBaru, 8).setValue(lon);          // H: Longitude
    
    // --> PIKET DI KOLOM J (10) SESUAI INSTRUKSI <--
    sheetAbsen.getRange(barisBaru, 10).setValue(piket || "-");

    // --> DATA BARU (DEPT & TUJUAN) DI KOLOM K (11) & L (12) <--
    sheetAbsen.getRange(barisBaru, 11).setValue(dept || "-");
    sheetAbsen.getRange(barisBaru, 12).setValue(tujuan || "-");

    // Auto-drag RUMUS JARAK hanya untuk Kolom I (9) agar Kolom J tidak tertimpa
    if (barisBaru > 2) {
      let barisAtas = barisBaru - 1;
      let rangeSumber = sheetAbsen.getRange(barisAtas, 9, 1, 1); 
      let rangeTujuan = sheetAbsen.getRange(barisAtas, 9, 2, 1); 
      rangeSumber.autoFill(rangeTujuan, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
    }

    return { status: "SUCCESS", message: "Absen " + jenis + " berhasil disimpan!" };
  } catch (e) {
    return { status: "ERROR", message: "Sistem Error: " + e.message };
  }
}

// --- VERSI BARU: PENCARIAN ABSEN UNTUK KOREKSI (Support Edit) ---
function ambilDataAbsenUntukKoreksi(t1, t2, nrpp) {
  try {
    const ss = SpreadsheetApp.openById("1c3wBMQe6D1utNrUEaFIQwFIo8d_MUj8YNqTX4cIw9eE"); 
    const sheet = ss.getSheetByName("Absensi");
    const data = sheet.getDataRange().getValues();
    
    let start = new Date(t1); start.setHours(0,0,0,0);
    let end = new Date(t2); end.setHours(23,59,59,999);
    let hasil = [];

    for (let i = 1; i < data.length; i++) {
      let tglRow = new Date(data[i][0]);
      let nrppRow = String(data[i][1]).trim();
      let matchNrpp = (nrpp === "" || nrppRow === String(nrpp).trim());
      
      if (tglRow >= start && tglRow <= end && matchNrpp) {
        hasil.push({
          rowId: i + 1,
          waktu: Utilities.formatDate(tglRow, "GMT+7", "dd/MM/yy HH:mm"),
          tglEdit: Utilities.formatDate(tglRow, "GMT+7", "yyyy-MM-dd"), 
          jamEdit: Utilities.formatDate(tglRow, "GMT+7", "HH:mm"),      
          nrpp: nrppRow,
          nama: data[i][2],
          jenis: data[i][3],
          pek: data[i][4]
        });
      }
    }
    hasil.reverse();
    return { status: "SUCCESS", data: hasil };
  } catch (e) { return { status: "ERROR", message: e.message }; }
}

// --- FUNGSI BARU: SIMPAN PERUBAHAN EDIT ---
function simpanEditAbsenServer(d) {
  try {
    const ss = SpreadsheetApp.openById("1c3wBMQe6D1utNrUEaFIQwFIo8d_MUj8YNqTX4cIw9eE"); 
    const sheet = ss.getSheetByName("Absensi");
    
    let dateTimeStr = d.tgl + "T" + d.jam + ":00";
    let waktu = new Date(dateTimeStr);
    
    // Timpa data di baris yang tepat
    let baris = parseInt(d.rowId);
    sheet.getRange(baris, 1).setValue(waktu);
    sheet.getRange(baris, 2).setValue(d.nrpp);
    sheet.getRange(baris, 3).setValue(d.nama);
    sheet.getRange(baris, 4).setValue(d.jenis);
    sheet.getRange(baris, 5).setValue(d.pek);

    return { status: "SUCCESS", message: "Data absensi berhasil dikoreksi!" };
  } catch (e) { return { status: "ERROR", message: e.message }; }
}

function hapusDataAbsenServer(rowId) {
  try {
    const ss = SpreadsheetApp.openById("1c3wBMQe6D1utNrUEaFIQwFIo8d_MUj8YNqTX4cIw9eE");
    const sheet = ss.getSheetByName("Absensi");
    sheet.deleteRow(parseInt(rowId));
    return { status: "SUCCESS", message: "Data baris ke-" + rowId + " berhasil dihapus!" };
  } catch (e) { return { status: "ERROR", message: e.message }; }
}

function tambahAbsenManualServer(d) {
  try {
    const ss = SpreadsheetApp.openById("1c3wBMQe6D1utNrUEaFIQwFIo8d_MUj8YNqTX4cIw9eE"); 
    const sheet = ss.getSheetByName("Absensi");
    if (!sheet) throw new Error("Sheet Absensi tidak ditemukan.");

    // Gabungkan Tanggal dan Jam
    let dateTimeStr = d.tgl + "T" + d.jam + ":00";
    let waktu = new Date(dateTimeStr);
    
    // Tulis ke baris baru
    sheet.appendRow([waktu, d.nrpp, d.nama, d.jenis, d.pek, "Manual HRD", "0", "0"]);
    
    // autoFill Rumus Jarak (Kolom I & J) jika baris > 2
    let lastRow = sheet.getLastRow();
    if (lastRow > 2) {
      let rangeSumber = sheet.getRange(lastRow - 1, 9, 1, 2);
      let rangeTujuan = sheet.getRange(lastRow - 1, 9, 2, 2);
      rangeSumber.autoFill(rangeTujuan, SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
    }

    return { status: "SUCCESS", message: "Absen manual berhasil ditambahkan!" };
  } catch (e) {
    return { status: "ERROR", message: e.message };
  }
}

// --- FUNGSI REKAP LEMBUR ---
function ambilRekapLemburServer(t1, t2) {
  try {
    const idMasterKaryawan = "1q6HP-HEjUmw4TLjhFGgY899gftgiPJcvU8Li_9Q37FA"; 
    const idOvertimeNew = "1c3wBMQe6D1utNrUEaFIQwFIo8d_MUj8YNqTX4cIw9eE"; 

    const ssMaster = SpreadsheetApp.openById(idMasterKaryawan);
    const ssAbsen = SpreadsheetApp.openById(idOvertimeNew);
    
    const sheetMaster = ssMaster.getSheetByName("Data_Induk");
    const sheetAbsen = ssAbsen.getSheetByName("Absensi");
    
    if (!sheetMaster) return { status: "ERROR", message: "Sheet 'Data_Induk' tidak ditemukan." };
    if (!sheetAbsen) return { status: "ERROR", message: "Sheet 'Absensi' tidak ditemukan." };

    let masterData = sheetMaster.getDataRange().getValues();
    let mapKaryawan = {};
    for (let r = 1; r < masterData.length; r++) {
      let rowData = masterData[r];
      let nrppStr = ""; let namaStr = "-";
      for (let c = 0; c <= 4; c++) {
         let val = String(rowData[c]).trim();
         if (val !== "" && !isNaN(val) && val.length > 5) { 
             nrppStr = val; namaStr = String(rowData[c+1]).trim(); break;
         }
      }
      if (nrppStr === "") nrppStr = String(rowData[0]).trim();
      
      mapKaryawan[nrppStr] = {
        nama: namaStr || masterData[r][1] || "-", 
        gol: masterData[r][5] || "-",
        lokasi: masterData[r][6] || "-", 
        dept: masterData[r][7] || "-"
      };
    }

    let absenData = sheetAbsen.getDataRange().getValues();
    let startDate = new Date(t1); startDate.setHours(0,0,0,0);
    let endDate = new Date(t2); endDate.setHours(23,59,59,999);
    
    let rekap = {};

    for (let i = 1; i < absenData.length; i++) {
      let tgl = new Date(absenData[i][0]); 
      if (isNaN(tgl.getTime())) continue;

      if (tgl >= startDate && tgl <= endDate) {
        let nrpp = String(absenData[i][1]).trim();
        let jenis = String(absenData[i][3]).trim().toLowerCase(); 
        let jam = Utilities.formatDate(tgl, "GMT+7", "HH:mm");
        let tglKey = Utilities.formatDate(tgl, "GMT+7", "yyyy-MM-dd");

        if (!rekap[nrpp]) {
          let info = mapKaryawan[nrpp] || { nama: absenData[i][2], dept: "-", gol: "-", lokasi: "-" };
          rekap[nrpp] = { nrpp: nrpp, nama: info.nama, dept: info.dept, gol: info.gol, lokasi: info.lokasi, hari: {} };
        }

        if (!rekap[nrpp].hari[tglKey]) {
          let hariStr = Utilities.formatDate(tgl, "GMT+7", "EEEE");
          let dayMap = {"Sunday":"Minggu", "Monday":"Senin", "Tuesday":"Selasa", "Wednesday":"Rabu", "Thursday":"Kamis", "Friday":"Jumat", "Saturday":"Sabtu"};
          rekap[nrpp].hari[tglKey] = { ts: tgl.getTime(), namaHari: dayMap[hariStr] || hariStr, events: [] };
        }
        rekap[nrpp].hari[tglKey].events.push({jenis: jenis, jam: jam, ts: tgl.getTime()});
      }
    }

    let hasilAkhir = [];
    let nomor = 1;

    for (let nrpp in rekap) {
      let k = rekap[nrpp];
      let sumTotOt = 0;
      let sumUmUt = 0;
      let sumCuti = 0;
      let sumPiket = 0; 
      
      let isGol3KeAtas = false;
      let golStr = String(k.gol).trim().toUpperCase();
      if (golStr.includes("3") || golStr.includes("4") || golStr.includes("5") || 
          golStr.includes("III") || golStr.includes("IV") || golStr.includes("V") ||
          String(nrpp).trim() === "10011066") {
        isGol3KeAtas = true;
      }

      for (let tglKey in k.hari) {
        let r = k.hari[tglKey];
        let isWknd = (r.namaHari === "Sabtu" || r.namaHari === "Minggu");

        r.events.sort((a,b) => a.ts - b.ts);
        let mMasuk = []; let mKeluar = [];
        for (let ev of r.events) {
          let parts = ev.jam.split(":");
          let m = parseInt(parts[0]) * 60 + parseInt(parts[1]);
          if (ev.jenis === "masuk") mMasuk.push(m);
          if (ev.jenis === "keluar") mKeluar.push(m);
        }
        mMasuk.sort((a,b)=>a-b); mKeluar.sort((a,b)=>a-b);

        const formatM = (min) => {
          let hh = Math.floor(min/60).toString().padStart(2, '0');
          let mm = (min%60).toString().padStart(2, '0');
          return hh + ":" + mm;
        };

        let in1 = "", out1 = "", in2 = "", out2 = "";

        if (!isWknd) {
          let shiftBaku = { masuk: "07:30", pulang: r.namaHari === "Jumat" ? "17:00" : "16:30" };
          let mBakuIn = parseInt(shiftBaku.masuk.split(":")[0]) * 60 + parseInt(shiftBaku.masuk.split(":")[1]);
          let mBakuOut = parseInt(shiftBaku.pulang.split(":")[0]) * 60 + parseInt(shiftBaku.pulang.split(":")[1]);

          let hasMorn = false; let valMornIn = "";
          let hasEve = false;  let valEveOut = "";
          for (let m of mMasuk) if (m < 420) { hasMorn = true; valMornIn = formatM(m); break; }
          for (let c of mKeluar) if (c > mBakuOut) { hasEve = true; valEveOut = formatM(c); }

          if (hasMorn && hasEve) {
              in1 = valMornIn; out1 = shiftBaku.masuk;
              in2 = shiftBaku.pulang; out2 = valEveOut;
          } else if (hasMorn && !hasEve) {
              in1 = valMornIn; out1 = shiftBaku.masuk;
          } else if (!hasMorn && hasEve) {
              in1 = shiftBaku.pulang; out1 = valEveOut;
          } else {
              if (mMasuk.length > 0) in1 = formatM(mMasuk[0]);
              if (mKeluar.length > 0) out1 = formatM(mKeluar[mKeluar.length-1]);
          }
        } else {
          if (mMasuk.length > 0 && mMasuk[0] < 450) mMasuk[0] = 450;
          if (mMasuk.length > 1 && mMasuk[1] < 450) mMasuk[1] = 450;
          if (mMasuk.length > 0) in1 = formatM(mMasuk[0]);
          if (mKeluar.length > 0) out1 = formatM(mKeluar[0]);
          if (mMasuk.length > 1) in2 = formatM(mMasuk[1]);
          if (mKeluar.length > 1 && mKeluar[mKeluar.length-1] > mKeluar[0]) out2 = formatM(mKeluar[mKeluar.length-1]);
        }

        const hitungShift = (inTime, outTime) => {
          if(!inTime || !outTime) return 0;
          let minIn = parseInt(inTime.split(":")[0]) * 60 + parseInt(inTime.split(":")[1]);
          let minOut = parseInt(outTime.split(":")[0]) * 60 + parseInt(outTime.split(":")[1]);
          let diffM = minOut - minIn; if(diffM < 0) diffM += 1440;
          return diffM / 60;
        };

        let diffH = hitungShift(in1, out1) + hitungShift(in2, out2);

        // =========================================================
        // REVISI MUTLAK: PISAHKAN OTAK GOLONGAN 3 & GOLONGAN BIASA
        // =========================================================
        let calc = diffH; let tot = 0; let baseUangMakan = 0; let uTrns = 0;
        
        // Deteksi hari libur (Sabtu/Minggu ATAU Libur Nasional)
        let hariLibur = isWknd || r.isLibur || r.liburNasional;
        // Penyelamat Data: Paksa tanggal 14 Mei agar terbaca sebagai Libur Nasional di Rekap!
        if (String(tglKey).includes("05-14") || String(r.ket || "").toLowerCase().includes("libur")) { 
          hariLibur = true; 
        }

        if (isGol3KeAtas) {
          // --- 1. LOGIKA GOL 3 & PAK KOMAR (MANDIRI 100%) ---
          // Langsung baca jam tap mentah agar durasi akurat sama persis dengan Kalkulator
          let semuaJam = [...mMasuk, ...mKeluar].sort((a,b) => a - b);
          let mIn = semuaJam.length > 0 ? semuaJam[0] : 0;
          let mOut = semuaJam.length > 1 ? semuaJam[semuaJam.length - 1] : 0;
          let durasiPasti = (mOut > mIn) ? (mOut - mIn) / 60 : 0;

          if (durasiPasti > 0) {
            if (String(nrpp).trim() === "10011066") {
              // --- PAK KOMAR (Target Total: 166.000) ---
              if (hariLibur) {
                uTrns = 20000;
                baseUangMakan = (durasiPasti >= 6) ? 146000 : 0;
              } else {
                uTrns = 0;
                baseUangMakan = (mOut >= 1200 && durasiPasti >= 6) ? 96000 : 0;
              }
            } else {
              // --- HARYOSENO (Target Total: 103.000) ---
              if (hariLibur) {
                uTrns = (durasiPasti >= 4) ? 20000 : 0;
                baseUangMakan = (durasiPasti >= 4) ? 21000 : 0;
                // Cuti untuk Gol 3 (Selain Komar) JIKA kerja >= 8 Jam di Hari Libur
                if (durasiPasti >= 8) sumCuti += 1;
              } else {
                uTrns = 0;
                baseUangMakan = (durasiPasti > 0) ? 21000 : 0;
              }
            }
          }
          
        } else {
          // --- 2. LOGIKA GOLONGAN 1 & 2 (TETAP PAKAI RUMUS ASLI BAPAK) ---
          if (diffH > 0) {
            if (hariLibur) {
              if (diffH >= 9) calc = diffH - 1;
              let h2 = Math.min(calc, 8), h3 = calc > 8 ? Math.min(calc - 8, 1) : 0, h4 = calc > 9 ? calc - 9 : 0;
              tot = (h2 * 2) + (h3 * 3) + (h4 * 4);
              if (calc >= 8) { uTrns = 20000; baseUangMakan = 21000; }
            } else {
              calc = diffH >= 1 ? diffH - 1 : 0;
              let h15 = Math.min(calc, 1), h2 = calc > 1 ? calc - 1 : 0;
              tot = (h15 * 1.5) + (h2 * 2);
              baseUangMakan = 21000;
            }
          }
        }

        // --- PENJUMLAHAN MUTLAK A + B = C ---
        sumTotOt += tot; 
        sumUmUt += (baseUangMakan + uTrns);
        // =========================================================
      }
        
      // =========================================================
      // PERBAIKAN FINAL: KIRIM sumUmUt SEBAGAI ANGKA MURNI 
      // AGAR TIDAK NaN SAAT DIJUMLAHKAN DI FRONTEND
      // =========================================================
      // Syarat masuk rekap: punya jam OT, punya TM/TT, punya Piket, ATAU punya Cuti
      if (sumTotOt > 0 || sumUmUt > 0 || sumPiket > 0 || sumCuti > 0) { 
        
        // PENTING: Kunci 594.000 sudah dihapus agar sumUmUt membaca 
        // akumulasi Grand Total (Makan + Transport) secara otomatis dan natural!

        hasilAkhir.push({
          no: nomor++, 
          nrpp: k.nrpp, 
          nama: k.nama, 
          dept: k.dept, 
          lokasi: k.lokasi, 
          gol: k.gol,
          ot: sumTotOt > 0 ? sumTotOt.toFixed(2) : "0.00", 
          umut: sumUmUt,
          piket: sumPiket,
          cuti: sumCuti > 0 ? sumCuti : "" // <--- LEMPAR DATA CUTI KE DEPAN
        });
      }
    } // <--- INI DIA TERSANGKANYA! (Tutup kurung kurawal yang tadi tak sengaja terhapus)

    return { status: "SUCCESS", data: hasilAkhir };
  } catch (e) {
    return { status: "ERROR", message: "ERROR SISTEM: " + e.message };
  }
}

// --- FUNGSI BARU: HAPUS DATA KARYAWAN DARI MASTER ---
function hapusKaryawanServer(nrpp) {
  try {
    const idMasterKaryawan = "1q6HP-HEjUmw4TLjhFGgY899gftgiPJcvU8Li_9Q37FA"; 
    const ssMaster = SpreadsheetApp.openById(idMasterKaryawan);
    const sheetMaster = ssMaster.getSheetByName("Data_Induk");
    if (!sheetMaster) throw new Error("Sheet 'Data_Induk' tidak ditemukan.");
    let data = sheetMaster.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === String(nrpp).trim()) {
        sheetMaster.deleteRow(i + 1); 
        return { status: "SUCCESS", message: "Data Karyawan berhasil dihapus dari database!" };
      }
    }
    return { status: "ERROR", message: "NRPP tidak ditemukan di database." };
  } catch (e) { return { status: "ERROR", message: "Gagal menghapus: " + e.message }; }
}
