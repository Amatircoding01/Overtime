// =========================================================================menuHRD
// FILE: DataKaryawan.gs
// TUJUAN: Mengambil data dari Master Karyawan untuk ditampilkan di Dashboard
// =========================================================================

function ambilDataMasterKaryawan() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.ID_MASTER_KARYAWAN);
    const sheet = ss.getSheetByName(CONFIG.SHEET_INDUK);
    
    if (!sheet) throw new Error("Sheet '" + CONFIG.SHEET_INDUK + "' tidak ditemukan.");

    // Mengambil seluruh data, getDisplayValues agar format tanggal/angka rapi
    const data = sheet.getDataRange().getDisplayValues(); 
    
    if (data.length <= 1) {
      return { status: "EMPTY", data: [] };
    }

    // Memisahkan header (baris 1) dan isinya (baris 2 ke bawah)
    const isiData = data.slice(1); 
    
    return { status: "SUCCESS", data: isiData };

  } catch (e) {
    return { status: "ERROR", message: e.message };
  }
}

// Fungsi untuk Menambah Karyawan Baru
function simpanKaryawanBaru(obj) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.ID_MASTER_KARYAWAN);
    const sheet = ss.getSheetByName(CONFIG.SHEET_INDUK);
    
    // Cek apakah NRPP sudah ada
    const data = sheet.getDataRange().getValues();
    const nrppExist = data.some(row => row[0].toString() === obj.nrpp.toString());
    
    if (nrppExist) throw new Error("NRPP " + obj.nrpp + " sudah terdaftar!");

    // Simpan ke baris paling bawah
    // Urutan: NRPP, Nama, Jenis Kelamin (Kosong dulu), Dept, Gol
    sheet.appendRow([obj.nrpp, obj.nama, "", obj.dept, obj.gol]);
    
    return { status: "SUCCESS", message: "Karyawan berhasil ditambahkan!" };
  } catch (e) {
    return { status: "ERROR", message: e.message };
  }
}

// Fungsi untuk Update Data Karyawan
function updateDataKaryawan(obj) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.ID_MASTER_KARYAWAN);
    const sheet = ss.getSheetByName(CONFIG.SHEET_INDUK);
    const data = sheet.getDataRange().getValues();
    
    let barisDitemukan = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i][0].toString() === obj.nrppLama.toString()) {
        barisDitemukan = i + 1; // Baris di Excel mulai dari 1
        break;
      }
    }

    if (barisDitemukan === -1) throw new Error("Data asli tidak ditemukan.");

    // Update kolom: NRPP(1), Nama(2), Dept(4), Gol(5)
    sheet.getRange(barisDitemukan, 1).setValue(obj.nrppBaru);
    sheet.getRange(barisDitemukan, 2).setValue(obj.nama);
    sheet.getRange(barisDitemukan, 4).setValue(obj.dept);
    sheet.getRange(barisDitemukan, 5).setValue(obj.gol);

    return { status: "SUCCESS", message: "Data berhasil diperbarui!" };
  } catch (e) {
    return { status: "ERROR", message: e.message };
  }
}
