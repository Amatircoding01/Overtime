// ==========================================
// FILE: Auth.gs
// TUJUAN: Menangani Verifikasi Login & Cek Hak Akses
// ==========================================

function prosesLogin(nrpp, password) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.ID_MASTER_KARYAWAN);
    const sheet = ss.getSheetByName(CONFIG.SHEET_INDUK);
    const data = sheet.getDataRange().getValues(); 
    
    for (let i = 1; i < data.length; i++) { 
      let dbNrpp = data[i][0].toString().trim();
      let dbNama = data[i][1];
      let dbPass = data[i][2].toString().trim();
      
      // Ambil Kolom D (Indeks 3). Jika kosong, isi dengan teks kosong
      let dbDept = (data[i][3]) ? data[i][3].toString().toUpperCase().trim() : ""; 
      
      if (dbNrpp === nrpp && dbPass === password) {
        
        // Cek apakah di Kolom D ada kata "HRD"
        let roleAkses = (dbDept.includes("HRD")) ? "HRD" : "KARYAWAN";

        return {
          status: "SUCCESS",
          nama: dbNama,
          role: roleAkses, // Status ini harusnya berisi "HRD" untuk Nuryadi
          message: "Selamat datang, " + dbNama
        };
      }
    }
    
    return { status: "FAILED", message: "NRPP atau Password salah!" };
    
  } catch (error) {
    return { status: "ERROR", message: "Gagal terhubung ke database: " + error.toString() };
  }
}
