<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
 
  <style>
    body { display: flex; min-height: 100vh; background-color: #f4f6f9; margin: 0; font-family: sans-serif; overflow-x: hidden; }
    #sidebar { width: 260px; background-color: #2c3e50; color: white; display: flex; flex-direction: column; transition: left 0.3s ease; z-index: 1050; }
    .sidebar-header { padding: 20px; text-align: center; background-color: #1a252f; border-bottom: 1px solid #34495e; }
    .menu-item { padding: 15px 20px; color: #aeb6bf; text-decoration: none; display: block; border-bottom: 1px solid #34495e; cursor: pointer; transition: 0.3s; }
    .menu-item:hover, .menu-item.active { background-color: #1abc9c; color: white; }
    #main-wrapper { flex-grow: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; width: 100%; }
    #main-content { flex-grow: 1; padding: 20px; overflow-y: auto; }
    .halaman-ruangan { display: none; } 
    .halaman-ruangan.aktif { display: block; } 
    #topbar-mobile { background-color: #2c3e50; color: white; padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; }
    .btn-hamburger { background: none; border: none; color: white; font-size: 1.8rem; padding: 0; cursor: pointer; }
    #overlay { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 1040; }
    @media (max-width: 768px) { #sidebar { position: fixed; left: -260px; height: 100vh; } #sidebar.buka { left: 0; } #overlay.buka { display: block; } }

    /* CSS POP-UP NATIVE */
    #popupKaryawanNative, #popupAbsenManual, #popupEditAbsen { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.6); z-index: 9999; justify-content: center; align-items: center; }
    .popup-content { background: white; width: 90%; max-width: 500px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); overflow: hidden; animation: popIn 0.3s ease; }
    .popup-header { color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
    .popup-body { padding: 20px; }
    @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    /* Kustomisasi Tabel Hitung */
    .tabel-hitung th, .tabel-hitung td { border: 1px solid #000 !important; white-space: nowrap; padding: 4px 8px; }
    .bg-kuning { background-color: #FFFF00 !important; font-weight: bold; }
    .bg-cyan { background-color: #00FFFF !important; font-weight: bold; }
    
    /* =======================================================
       1. TAMPILAN WEB (NORMAL & NYAMAN)
       ======================================================= */
    #tabelUntukPDF table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    
    #tabelUntukPDF th, 
    #tabelUntukPDF td {
      padding: 8px 6px !important; 
      font-size: 13px !important;  
      border: 1px solid #dee2e6;
      vertical-align: middle;
    }

    /* Warna header tabel agar terlihat profesional */
    #tabelUntukPDF thead th {
      background-color: #f8f9fa !important;
      font-weight: bold;
    }

    /* =======================================================
       2. FUNGSI CETAK PDF (LANDSCAPE PRESISI)
       ======================================================= */
    @media print {
      body * { visibility: hidden; }
      #tabelUntukPDF, #tabelUntukPDF * { visibility: visible; }
      #tabelUntukPDF { position: absolute; left: 0; top: 0; width: 100% !important; margin: 0 !important; padding: 0 !important; }
      #tabelUntukPDF table { width: 100% !important; table-layout: auto !important; }
      #tabelUntukPDF th, #tabelUntukPDF td { font-size: 9pt !important; padding: 5px 4px !important; white-space: normal !important; word-wrap: break-word !important; }
      @page { size: A4 landscape; margin: 10mm; }
    }
  </style>
</head>
<body>

  <div id="overlay" onclick="tutupSidebar()"></div>
  <div id="sidebar" class="shadow">
    <div class="sidebar-header">
      <h5 class="mb-1"><i class="bi bi-clock-history"></i> OVERTIME KOBE</h5>
      <small id="teksRole" class="text-warning fw-bold">Memuat...</small> 
    </div>
    <div id="wadahMenu" style="flex-grow: 1; overflow-y: auto;"></div>
    <div class="p-3 bg-dark"><button class="btn btn-danger w-100" onclick="logoutAman()"><i class="bi bi-box-arrow-left"></i> Keluar</button></div>
  </div>

  <div id="main-wrapper">
    <div id="topbar-mobile" class="d-md-none shadow-sm">
      <h5 class="mb-0 fw-bold"><i class="bi bi-clock-history"></i> HRIS</h5>
      <button class="btn-hamburger" onclick="bukaSidebar()"><i class="bi bi-list"></i></button>
    </div>

    <div id="main-content">
      
     <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div class="d-flex align-items-center gap-3">
          <button id="btnKembali" class="btn btn-secondary btn-sm fw-bold shadow-sm" style="display: none;" onclick="kembaliKeHome()">
            <i class="bi bi-arrow-left"></i> Kembali
          </button>
          <h4 id="judulHalaman" class="text-primary fw-bold mb-0">Selamat Datang</h4>
        </div>
        <span class="text-muted fw-bold d-none d-sm-block" id="teksNamaUser">Halo, -</span> 
      </div>

      <div id="ruang-form-lembur" class="halaman-ruangan">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center bg-light p-2 border rounded mb-3 shadow-sm">
              <div><i class="bi bi-geo-alt-fill" id="gpsIcon" style="font-size: 1.5rem; color: gray;"></i> <span id="gpsText" class="fw-bold text-secondary ms-2">Mencari GPS...</span></div>
              <button class="btn btn-sm btn-outline-primary" onclick="cekStatusGPS()"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
            </div>
            
            <div id="statusProsesLembur" class="alert alert-info text-center fw-bold shadow-sm" style="display: none;"><i class="bi bi-clock-history"></i> Masih dalam proses lembur</div>
            
            <div id="formArea" class="bg-white p-3 rounded border mb-3 shadow-sm">
              <h6 class="mb-3 text-center text-primary">Isi Form Sebelum Absen Masuk</h6>
              <div class="mb-2">
                <label class="form-label fw-bold">Pekerjaan Lembur</label>
                <textarea class="form-control" id="inputPekerjaan" rows="2"></textarea>
              </div>
              <div class="mb-2" style="display: none;">
                <label class="form-label fw-bold">Tujuan Job / PT (Opsional)</label>
                <input type="text" class="form-control" id="inputTujuanPT" placeholder="Contoh: PT. SAT">
              </div>
              <div class="mb-2">
      <label class="form-label fw-bold">Dept. (Isi sesuai Cost Code)</label>
      <select id="inputDept" class="form-select">
        <option value="" selected disabled>-- Pilih Dept --</option>
        <option value="SVC ( SEXT)">SVC ( SEXT)</option>
        <option value="SVC3 ( HAKO/Environmental Solution) 0221">SVC3 ( HAKO/Environmental Solution) 0221</option>
        <option value="MKT ( CG ) 0112">MKT ( CG ) 0112</option>
        <option value="MKT (NCG ) 0111">MKT (NCG ) 0111</option>
        <option value="MKT3 (HAKO/Environmental Solution) 0140">MKT3 (HAKO/Environmental Solution) 0140</option>
        <option value="PART 0210">PART 0210</option>
        <option value="RENTAL KOBE ( CG )">RENTAL KOBE ( CG )</option>
        <option value="RENTAL ET ( Key Account ) MKT14-0114">RENTAL ET ( Key Account ) MKT14-0114</option>
        <option value="RENTAL KOBE ( NCG )">RENTAL KOBE ( NCG )</option>
        <option value="RENTAL ET (Retail) MKT13-0113">RENTAL ET (Retail) MKT13-0113</option>
        <option value="UNIT USE (RENTAL)">UNIT USE (RENTAL)</option>
        <option value="HRGA">HRGA</option>
        <option value="INVENTORY">INVENTORY</option>
        <option value="WAREHOUSE">WAREHOUSE</option>
        <option value="SERVICE ( EURO TRUCK )">SERVICE ( EURO TRUCK )</option>
        <option value="REFURBISH">REFURBISH</option>
      </select>
    </div>
              <div class="mb-2">
                <label class="form-label fw-bold">Pembebanan Lembur</label>
                <select class="form-select" id="inputPembebanan">
                  <option value="KOBE">KOBE</option><option value="ET">ET</option><option value="KRN">KRN</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Piket</label>
                <select class="form-select" id="inputPiket">
                  <option value="-">- Bukan Piket</option>
                  <option value="CB">CB (Cuti Bersama)</option>
                </select>
                <small class="text-danger fst-italic" style="font-size: 15px;">*Hanya diisi saat piket di cuti bersama</small>
              </div>
            </div>

            <div class="d-grid gap-3" id="actionArea">
              <button class="btn btn-success btn-lg fw-bold" id="btnMasuk"><i class="bi bi-box-arrow-in-right"></i> Absen Masuk</button>
              <button class="btn btn-danger btn-lg fw-bold" id="btnKeluar" style="display: none;"><i class="bi bi-box-arrow-left"></i> Absen Keluar</button>
            </div>
          </div>
        </div>
      </div>

      <div id="ruang-data-karyawan" class="halaman-ruangan">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
              <h5 class="text-primary fw-bold mb-3 mb-md-0"><i class="bi bi-people-fill"></i> Data Master Karyawan</h5>
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-sm btn-success text-nowrap" onclick="bukaModalTambah()"><i class="bi bi-plus-lg"></i> Tambah</button>
                <input type="text" id="inputCariKaryawan" class="form-control form-control-sm" placeholder="Cari..." onkeyup="cariTabelKaryawan()">
                <button class="btn btn-sm btn-outline-primary" onclick="muatTabelKaryawan()" id="btnRefreshKaryawan"><i class="bi bi-arrow-clockwise"></i></button>
              </div>
            </div>
            <div class="table-responsive" style="max-height: 60vh; overflow-y: auto;">
              <table class="table table-hover table-bordered align-middle text-nowrap">
                <thead class="table-dark" style="position: sticky; top: 0; z-index: 1;">
                  <tr><th>No</th><th>NRPP</th><th>Nama Karyawan</th><th>Dept</th><th>Gol</th><th>Aksi</th></tr>
                </thead>
                <tbody id="isiTabelKaryawan"><tr><td colspan="6" class="text-center text-muted">Klik tombol Refresh untuk memuat...</td></tr></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id="ruang-hitung-lembur" class="halaman-ruangan">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="text-primary fw-bold mb-3"><i class="bi bi-calculator"></i> Kalkulator Lembur</h5>
            <div class="row mb-3">
              <div class="col-md-4"><label class="form-label fw-bold small">Mulai Tanggal</label><input type="date" class="form-control" id="inputTglMulai"></div>
              <div class="col-md-4"><label class="form-label fw-bold small">Sampai Tanggal</label><input type="date" class="form-control" id="inputTglSelesai"></div>
              <div class="col-md-4"><label class="form-label fw-bold small">NRPP Karyawan</label><input type="number" class="form-control" id="inputNrppHitung" placeholder="Ketik NRPP..."></div>
            </div>
            <button class="btn btn-primary w-100 fw-bold mb-4" id="btnMulaiHitung" onclick="prosesHitungLembur()"><i class="bi bi-gear-fill"></i> PROSES PERHITUNGAN</button>
            
            <div id="areaHasilHitung" style="display: none;">
              <div class="text-end mb-2">
                <button class="btn btn-sm btn-danger fw-bold" onclick="unduhPDFLembur()"><i class="bi bi-file-pdf"></i> Download PDF</button>
              </div>
              <div class="table-responsive bg-white p-3 border" id="tabelUntukPDF" style="min-width: 900px; color: black; font-family: Arial, sans-serif;">
                <table class="table table-borderless tabel-hitung mb-2" style="font-size: 12px; margin-bottom: 5px;">
                  <tbody>
                    <tr>
                      <td width="10%" class="bg-kuning">NAMA</td><td width="30%" class="bg-kuning" id="lblNamaHitung">...</td>
                      <td width="10%" class="bg-kuning">GOL</td><td width="20%" class="bg-kuning" id="lblGolHitung">...</td>
                      <td rowspan="3" width="30%" class="bg-cyan text-center align-middle" style="font-size: 16px;">OVERTIME &/ PIKET SHEET</td>
                    </tr>
                    <tr><td class="bg-kuning">NRPP</td><td class="bg-kuning" id="lblNrppHitung">...</td><td class="bg-kuning">DEPT.</td><td class="bg-kuning" id="lblDeptHitung">...</td></tr>
                    <tr><td class="bg-kuning">PERIODE</td><td class="bg-kuning" id="lblPeriodeHitung" colspan="3">...</td></tr>
                  </tbody>
                </table>
                <table class="table text-center align-middle tabel-hitung" style="font-size: 11px;">
                  <thead class="bg-cyan">
                    <tr>
                      <th rowspan="2">TANGGAL</th><th rowspan="2">HARI</th>
                      <th>KETERANGAN</th><th colspan="2">LEMBUR 1</th><th colspan="2">LEMBUR 2</th>
                      <th>REAL</th><th>CALC</th><th colspan="4">OVERTIME HOURS</th><th colspan="2">LEMBUR</th>
                      <th>TOTAL</th><th>KOMPENSASI</th>
                    </tr>
                    <tr>
                      <th>LEMBUR</th><th>FROM</th><th>TO</th><th>FROM</th><th>TO</th>
                      <th>HOUR</th><th>HOURS</th><th>1.5</th><th>2</th><th>3</th><th>4</th>
                      <th>U. TRNSPRT.</th><th>U. MKN</th><th>OT</th><th>CUTI</th>
                    </tr>
                  </thead>
                  <tbody id="isiHasilHitung" style="background-color: white;"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="ruang-edit-absensi" class="halaman-ruangan">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h5 class="text-primary fw-bold mb-3"><i class="bi bi-pencil-square"></i> Koreksi Data Absensi</h5>
            
            <div class="row g-2 mb-3">
              <div class="col-md-3"><label class="small fw-bold">Dari Tanggal</label><input type="date" class="form-control form-control-sm" id="editTglAwal"></div>
              <div class="col-md-3"><label class="small fw-bold">Sampai Tanggal</label><input type="date" class="form-control form-control-sm" id="editTglAkhir"></div>
              <div class="col-md-3"><label class="small fw-bold">NRPP (Opsional)</label><input type="number" class="form-control form-control-sm" id="editNrppCari" placeholder="Semua NRPP"></div>
              <div class="col-md-3 d-flex align-items-end gap-2">
                <button class="btn btn-sm btn-primary w-100 fw-bold" onclick="cariDataAbsenKoreksi()"><i class="bi bi-search"></i> CARI</button>
                <button class="btn btn-sm btn-success w-100 fw-bold" onclick="bukaModalAbsenManual()"><i class="bi bi-plus-lg"></i> TAMBAH</button>
              </div>
            </div>

            <div class="table-responsive" style="max-height: 50vh;">
              <table class="table table-sm table-hover table-bordered align-middle" style="font-size: 12px;">
                <thead class="table-dark text-center">
                  <tr><th>Waktu (A-Z)</th><th>NRPP</th><th>Nama</th><th>Jenis</th><th>Pekerjaan</th><th>Aksi</th></tr>
                </thead>
                <tbody id="tabelKoreksiAbsen">
                  <tr><td colspan="6" class="text-center text-muted">Tentukan tanggal dan klik Cari Data</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id="ruang-rekap-lembur" class="halaman-ruangan">
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body">
            <h5 class="text-primary fw-bold mb-3"><i class="bi bi-journal-check"></i> Summary Rekap Lembur</h5>
            
            <div class="row g-2 mb-3 bg-light p-2 rounded border">
              <div class="col-md-4">
                <label class="small fw-bold">Dari Tanggal</label>
                <input type="date" class="form-control form-control-sm" id="rekapTglAwal">
              </div>
              <div class="col-md-4">
                <label class="small fw-bold">Sampai Tanggal</label>
                <input type="date" class="form-control form-control-sm" id="rekapTglAkhir">
              </div>
              <div class="col-md-4 d-flex align-items-end">
                <button class="btn btn-sm btn-primary w-100 fw-bold" onclick="prosesRekapLembur()">
                  <i class="bi bi-search"></i> TAMPILKAN REKAP
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-sm table-hover table-bordered align-middle text-center" style="font-size: 12px; white-space: nowrap;">
                <thead class="table-dark">
                  <tr>
                    <th>NO</th>
                    <th>NRPP</th>
                    <th>NAMA</th>
                    <th>DEPT</th>
                    <th>LOKASI</th>
                    <th>GOL</th>
                    <th>TOTAL OVERTIME</th>
                    <th>TOTAL TM/TT</th>
                    <th>TUNJ. PIKET</th>
                    <th>KOMPENSASI CUTI</th>
                  </tr>
                </thead>
                <tbody id="tabelRekapLembur">
                  <tr><td colspan="10" class="text-muted">Pilih rentang tanggal lalu klik TAMPILKAN REKAP</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
<div id="ruang-kelola-libur" class="halaman-ruangan">
  <div class="row">
    <div class="col-md-4">
      <div class="card shadow-sm border-0 mb-4">
        <div class="card-header bg-danger text-white fw-bold">
          <i class="bi bi-plus-lg"></i> Seting Hari Libur Baru
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label class="small fw-bold">Pilih Tanggal:</label>
            <input type="date" id="liburTgl" class="form-control">
          </div>
          <div class="mb-3">
            <label class="small fw-bold">Status (LN / CB):</label>
            <select id="liburStatus" class="form-select">
              <option value="LN">Libur Nasional (LN)</option>
              <option value="CB">Cuti Bersama (CB)</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="small fw-bold">Keterangan (Catatan):</label>
            <input type="text" id="liburKet" class="form-control" placeholder="Contoh: Tahun Baru / Idul Fitri">
          </div>
          <button class="btn btn-danger w-100 fw-bold" onclick="simpanLibur()">
            <i class="bi bi-floppy"></i> Simpan Ke Kalender
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="card shadow-sm border-0">
        <div class="card-header bg-dark text-white fw-bold">
          <i class="bi bi-calendar3"></i> Kalender Libur Nasional & Cuti Bersama
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover table-striped mb-0 align-middle text-center">
              <thead class="table-light">
                <tr>
                  <th>No</th><th>Tanggal</th><th>Status</th><th>Keterangan</th><th>Aksi</th>
                </tr>
              </thead>
              <tbody id="isiTabelLibur">
                <tr><td colspan="5" class="p-4 text-muted">Memuat kalender...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div> </div> <div id="popupKaryawanNative">
    <div class="popup-content">
      <div class="popup-header bg-primary">
        <h5 class="m-0" id="judulModalKaryawan">Tambah Karyawan</h5>
        <button type="button" class="btn-close btn-close-white" onclick="tutupModal()"></button>
      </div>
      <div class="popup-body">
        <form id="formKaryawan">
          <input type="hidden" id="nrppLama">
          <div class="mb-3"><label class="form-label fw-bold">NRPP</label><input type="number" class="form-control" id="mNrpp" required></div>
          <div class="mb-3"><label class="form-label fw-bold">Nama Lengkap</label><input type="text" class="form-control" id="mNama" required></div>
          <div class="mb-3"><label class="form-label fw-bold">Departemen</label><input type="text" class="form-control" id="mDept"></div>
          <div class="mb-3"><label class="form-label fw-bold">Golongan</label><input type="text" class="form-control" id="mGol"></div>
          <button type="button" class="btn btn-primary w-100 fw-bold" id="btnSimpanKaryawan" onclick="simpanDataKaryawan()">Simpan Data</button>
        </form>
      </div>
    </div>
  </div>

  <div id="popupAbsenManual">
    <div class="popup-content">
      <div class="popup-header bg-success">
        <h5 class="m-0"><i class="bi bi-plus-circle"></i> Tambah Absen Manual</h5>
        <button type="button" class="btn-close btn-close-white" onclick="document.getElementById('popupAbsenManual').style.display='none'"></button>
      </div>
      <div class="popup-body">
        <form id="formAbsenManual">
          <div class="row mb-2">
            <div class="col-6"><label class="fw-bold small">NRPP</label><input type="number" class="form-control form-control-sm" id="manNrpp" required></div>
            <div class="col-6"><label class="fw-bold small">Nama</label><input type="text" class="form-control form-control-sm" id="manNama" required></div>
          </div>
          <div class="row mb-2">
            <div class="col-6"><label class="fw-bold small">Tanggal</label><input type="date" class="form-control form-control-sm" id="manTgl" required></div>
            <div class="col-6"><label class="fw-bold small">Jam</label><input type="time" class="form-control form-control-sm" id="manJam" required></div>
          </div>
          <div class="mb-2">
            <label class="fw-bold small">Jenis Absen</label>
            <select class="form-select form-select-sm" id="manJenis"><option value="Masuk">Masuk</option><option value="Keluar">Keluar</option></select>
          </div>
          <div class="mb-3"><label class="fw-bold small">Pekerjaan</label><input type="text" class="form-control form-control-sm" id="manPek" value="Input Manual HRD"></div>
          <button type="button" class="btn btn-success w-100 fw-bold" id="btnSimpanManual" onclick="simpanAbsenManual()">SIMPAN ABSEN</button>
        </form>
      </div>
    </div>
  </div>

  <div id="popupEditAbsen">
    <div class="popup-content">
      <div class="popup-header bg-warning">
        <h5 class="m-0 fw-bold text-dark"><i class="bi bi-pencil-square"></i> Edit Data Absensi</h5>
        <button type="button" class="btn-close" onclick="document.getElementById('popupEditAbsen').style.display='none'"></button>
      </div>
      <div class="popup-body">
        <form id="formEditAbsen">
          <input type="hidden" id="editRowIdTarget">
          <div class="row mb-2">
            <div class="col-6"><label class="fw-bold small">NRPP</label><input type="number" class="form-control form-control-sm" id="editFormNrpp" required></div>
            <div class="col-6"><label class="fw-bold small">Nama</label><input type="text" class="form-control form-control-sm" id="editFormNama" required></div>
          </div>
          <div class="row mb-2">
            <div class="col-6"><label class="fw-bold small">Tanggal Baru</label><input type="date" class="form-control form-control-sm" id="editFormTgl" required></div>
            <div class="col-6"><label class="fw-bold small">Jam Baru</label><input type="time" class="form-control form-control-sm" id="editFormJam" required></div>
          </div>
          <div class="mb-2">
            <label class="fw-bold small">Jenis Absen</label>
            <select class="form-select form-select-sm" id="editFormJenis"><option value="Masuk">Masuk</option><option value="Keluar">Keluar</option></select>
          </div>
          <div class="mb-3"><label class="fw-bold small">Pekerjaan</label><input type="text" class="form-control form-control-sm" id="editFormPek"></div>
          <button type="button" class="btn btn-warning w-100 fw-bold" id="btnSimpanEditAbsen" onclick="simpanKoreksiAbsen()">SIMPAN PERUBAHAN</button>
        </form>
      </div>
    </div>
  </div>

  <script>
    window.bukaSidebar = function() { document.getElementById('sidebar').style.left = '0px'; document.getElementById('overlay').style.display = 'block'; };
    window.tutupSidebar = function() { document.getElementById('sidebar').style.left = '-260px'; document.getElementById('overlay').style.display = 'none'; };
    window.logoutAman = function() { if (confirm("Keluar dari aplikasi?")) { sessionStorage.clear(); document.body.innerHTML = "<h3 style='text-align:center; margin-top:20%;'>Keluar...</h3>"; google.script.run.withSuccessHandler(function(h) { document.body.innerHTML = h; const s = document.body.getElementsByTagName("script"); for (let i=0; i<s.length; i++) eval(s[i].innerText); }).getHtmlPage('Login'); } };

    const nrppUser = sessionStorage.getItem("user_nrpp") || "-"; 
    const namaUser = sessionStorage.getItem("user_nama") || "Karyawan"; 
    const roleUser = sessionStorage.getItem("user_role") || "KARYAWAN"; 
    
    document.getElementById("teksNamaUser").innerText = "Halo, " + namaUser; 
    document.getElementById("teksRole").innerText = "Akses: " + roleUser;
// ========================================================
    // KUNCIAN KEAMANAN NRPP KALKULATOR LEMBUR
    // ========================================================
    let inputNrppKalkulator = document.getElementById("inputNrppHitung");
    if (inputNrppKalkulator) {
      if (roleUser !== "HRD") {
        // Jika bukan HRD: Isi otomatis dan Kunci (Read-only)
        inputNrppKalkulator.value = nrppUser;
        inputNrppKalkulator.setAttribute("readonly", true);
        inputNrppKalkulator.classList.add("bg-light"); // Beri warna abu-abu tanda terkunci
      } else {
        // Jika HRD: Bebas diketik
        inputNrppKalkulator.removeAttribute("readonly");
        inputNrppKalkulator.classList.remove("bg-light");
      }
    }
    // ========================================================
    // --- SETUP MENU ---
    const menuHRD = [
      { id: "m-form", nama: "Form Lembur", icon: "bi-ui-checks", targetRuangan: "ruang-form-lembur" },
      { id: "m-kar", nama: "Menu Karyawan", icon: "bi-people", targetRuangan: "ruang-data-karyawan" },
      { id: "m-hit", nama: "Perhitungan Lembur", icon: "bi-calculator", targetRuangan: "ruang-hitung-lembur" },
      { id: "m-libur", nama: "Kelola Hari Libur", icon: "bi-calendar-event", targetRuangan: "ruang-kelola-libur" },
      { id: "m-edit", nama: "Edit/Tambah/Hapus", icon: "bi-pencil-square", targetRuangan: "ruang-edit-absensi" },
      { id: "m-rekap", nama: "Rekap Lembur", icon: "bi-journal-check", targetRuangan: "ruang-rekap-lembur" }
    ];
    const menuKaryawan = [
      { id: "m-form", nama: "Form Lembur", icon: "bi-ui-checks", targetRuangan: "ruang-form-lembur" },
      { id: "m-hit", nama: "Perhitungan Lembur", icon: "bi-calculator", targetRuangan: "ruang-hitung-lembur" }
    ];
    
    const daftarMenuAktif = (roleUser === "HRD") ? menuHRD : menuKaryawan; 
    const wadahMenu = document.getElementById("wadahMenu");
    
    daftarMenuAktif.forEach((m, i) => { 
      const d = document.createElement("div"); 
      d.className = "menu-item" + (i === 0 ? " active" : ""); 
      d.innerHTML = `<i class="${m.icon} me-2"></i> ${m.nama}`; 
      d.onclick = function() { window.bukaRuangan(m.targetRuangan, m.nama, this); }; 
      wadahMenu.appendChild(d); 
    });
    
    window.bukaRuangan = function(t, j, e) { 
      document.getElementById("judulHalaman").innerText = j; 
      document.querySelectorAll(".halaman-ruangan").forEach(r => r.classList.remove("aktif")); 
      document.getElementById(t).classList.add("aktif"); 
      document.querySelectorAll(".menu-item").forEach(b => b.classList.remove("active")); 
      if (e) e.classList.add("active"); 
      if (window.innerWidth <= 768) tutupSidebar(); 

      // --- LOGIKA TOMBOL KEMBALI OTOMATIS ---
      let btnKembali = document.getElementById("btnKembali");
      if (btnKembali) {
        if (t === daftarMenuAktif[0].targetRuangan) {
          btnKembali.style.display = "none";
        } else {
          btnKembali.style.display = "block";
        }
      }
    };

    window.kembaliKeHome = function() {
      let menuUtama = daftarMenuAktif[0];
      let itemMenuPertama = document.querySelector('.menu-item');
      bukaRuangan(menuUtama.targetRuangan, menuUtama.nama, itemMenuPertama);
    };
    bukaRuangan(daftarMenuAktif[0].targetRuangan, daftarMenuAktif[0].nama, wadahMenu.firstChild);

    // --- POPUP NATIVE & MASTER KARYAWAN ---
    let modeModal = "TAMBAH"; 
    const popNative = document.getElementById("popupKaryawanNative");
    window.tutupModal = function() { popNative.style.display = "none"; };
    window.bukaModalTambah = function() { modeModal = "TAMBAH"; document.getElementById("judulModalKaryawan").innerText = "Tambah Karyawan Baru"; document.getElementById("formKaryawan").reset(); popNative.style.display = "flex"; };
    window.bukaModalEdit = function(nrpp, nama, dept, gol) { modeModal = "EDIT"; document.getElementById("judulModalKaryawan").innerText = "Edit Data Karyawan"; document.getElementById("nrppLama").value = nrpp; document.getElementById("mNrpp").value = nrpp; document.getElementById("mNama").value = nama; document.getElementById("mDept").value = dept; document.getElementById("mGol").value = gol; popNative.style.display = "flex"; };
    window.simpanDataKaryawan = function() { const d = { nrppLama: document.getElementById("nrppLama").value, nrppBaru: document.getElementById("mNrpp").value, nrpp: document.getElementById("mNrpp").value, nama: document.getElementById("mNama").value, dept: document.getElementById("mDept").value, gol: document.getElementById("mGol").value }; if (!d.nrpp || !d.nama) { alert("NRPP dan Nama wajib diisi!"); return; } let b = document.getElementById("btnSimpanKaryawan"); b.disabled = true; b.innerText = "Memproses..."; let fn = (modeModal === "TAMBAH") ? "simpanKaryawanBaru" : "updateDataKaryawan"; google.script.run.withSuccessHandler(function(r) { b.disabled = false; b.innerText = "Simpan Data"; if (r.status === "SUCCESS") { alert(r.message); tutupModal(); muatTabelKaryawan(); } else { alert(r.message); } }).withFailureHandler(function(err){ b.disabled = false; b.innerText = "Simpan Data"; alert("Error: " + err); })[fn](d); };
    window.muatTabelKaryawan = function() { 
      let t = document.getElementById("isiTabelKaryawan"); 
      let b = document.getElementById("btnRefreshKaryawan"); 
      t.innerHTML = `<tr><td colspan="6" class="text-center">Memuat...</td></tr>`; 
      b.disabled = true; 
      
      google.script.run.withSuccessHandler(function(r) { 
        b.disabled = false; 
        if (r.status === "SUCCESS") { 
          let h = ""; 
          r.data.forEach((row, i) => { 
            let deptKaryawan = row[7] || "-"; 
            let golKaryawan  = row[5] || "-"; 

            h += `<tr>
              <td>${i+1}</td>
              <td class="fw-bold">${row[0]}</td>
              <td>${row[1]}</td>
              <td>${deptKaryawan}</td>
              <td>${golKaryawan}</td>
              <td class="text-nowrap">
                <button class="btn btn-sm btn-warning" onclick="bukaModalEdit('${row[0]}','${row[1]}','${deptKaryawan}','${golKaryawan}')" title="Edit">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-danger ms-1" onclick="hapusDataKaryawan('${row[0]}', '${row[1]}')" title="Hapus">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>`; 
          }); 
          t.innerHTML = h; 
        } else { 
          t.innerHTML = `<tr><td colspan="6" class="text-center text-danger">${r.message}</td></tr>`; 
        } 
      }).ambilDataMasterKaryawan(); 
    };

    window.hapusDataKaryawan = function(nrpp, nama) {
      if(confirm(`Yakin ingin menghapus data karyawan ${nama} (${nrpp}) secara permanen?`)) {
        let b = document.getElementById("btnRefreshKaryawan");
        b.disabled = true;
        google.script.run.withSuccessHandler(function(r) {
          b.disabled = false;
          alert(r.message);
          if(r.status === "SUCCESS") muatTabelKaryawan(); 
        }).withFailureHandler(function(e) {
          b.disabled = false;
          alert("Error: " + e.message);
        }).hapusKaryawanServer(nrpp);
      }
    };
    window.cariTabelKaryawan = function() { let inp = document.getElementById("inputCariKaryawan").value.toLowerCase(); let tr = document.getElementById("isiTabelKaryawan").getElementsByTagName("tr"); for (let i = 0; i < tr.length; i++) { let td = tr[i].getElementsByTagName("td"); let m = false; for (let j = 0; j < td.length; j++) { if (td[j] && td[j].innerText.toLowerCase().indexOf(inp) > -1) { m = true; break; } } tr[i].style.display = m ? "" : "none"; } };

    // --- FORM LEMBUR GPS ---
    let currentLat = null; let currentLon = null;
    window.cekStatusGPS = function() { if(navigator.geolocation){ navigator.geolocation.getCurrentPosition(p=>{currentLat=p.coords.latitude;currentLon=p.coords.longitude; document.getElementById("gpsIcon").style.color="#198754"; document.getElementById("gpsText").innerText="GPS Terkunci";},e=>{document.getElementById("gpsText").innerText="GPS Mati/Lemah";},{enableHighAccuracy:true,timeout:10000});} }; window.aturTampilanLayar = function() { const t = new Date().toDateString(); let s = localStorage.getItem("status_absen"); if (s === "Sudah_Masuk" && localStorage.getItem("tanggal_absen_masuk") !== t) { localStorage.removeItem("status_absen"); s = null; } if (localStorage.getItem("absen_selesai_tanggal") === t) { document.getElementById("statusProsesLembur").style.display = "none"; document.getElementById("formArea").style.display = "none"; document.getElementById("actionArea").innerHTML = `<div class="alert alert-success text-center fw-bold"><i class="bi bi-check-circle"></i> Selesai Hari Ini</div>`; return; } if (s === "Sudah_Masuk") { document.getElementById("statusProsesLembur").style.display = "block"; document.getElementById("formArea").style.display = "none"; document.getElementById("btnMasuk").style.display = "none"; document.getElementById("btnKeluar").style.display = "block"; } else { document.getElementById("statusProsesLembur").style.display = "none"; document.getElementById("formArea").style.display = "block"; document.getElementById("btnMasuk").style.display = "block"; document.getElementById("btnKeluar").style.display = "none"; } }; cekStatusGPS(); aturTampilanLayar();
    const bMasuk = document.getElementById("btnMasuk"); if(bMasuk) bMasuk.onclick = () => prosesAbsen("Masuk"); const bKeluar = document.getElementById("btnKeluar"); if(bKeluar) bKeluar.onclick = () => prosesAbsen("Keluar");
    function prosesAbsen(j) { 
      if (!currentLat) { alert("GPS belum terkunci! Tunggu sebentar."); return; } 
      let pek = "-", pem = "-", pik = "-", dep = "-", tuj = "-"; 
      if (j === 'Masuk') { 
        pek = document.getElementById("inputPekerjaan").value.trim(); pem = document.getElementById("inputPembebanan").value; pik = document.getElementById("inputPiket").value; dep = document.getElementById("inputDept").value; tuj = document.getElementById("inputTujuanPT").value.trim() || "-"; 
        if (!pek || !pem || !dep) { alert("Harap isi Pekerjaan dan Departemen!"); return; } 
      } else { 
        pek = localStorage.getItem("pekerjaan_lembur"); pem = localStorage.getItem("pembebanan_lembur"); pik = localStorage.getItem("piket_lembur") || "-"; dep = localStorage.getItem("dept_lembur") || "-"; tuj = localStorage.getItem("tujuan_lembur") || "-"; 
      } 
      btnAksi(true, "Memproses..."); 
      google.script.run.withSuccessHandler(function(r) { 
        btnAksi(false, ""); 
        if (r.status === "SUCCESS") { 
          if (j === "Masuk") { localStorage.setItem("status_absen", "Sudah_Masuk"); localStorage.setItem("tanggal_absen_masuk", new Date().toDateString()); localStorage.setItem("pekerjaan_lembur", pek); localStorage.setItem("pembebanan_lembur", pem); localStorage.setItem("piket_lembur", pik); localStorage.setItem("dept_lembur", dep); localStorage.setItem("tujuan_lembur", tuj); } else { localStorage.removeItem("status_absen"); localStorage.setItem("absen_selesai_tanggal", new Date().toDateString()); } 
          aturTampilanLayar(); alert(r.message); 
        } else { alert("GAGAL DARI SERVER: " + r.message); } 
      }).withFailureHandler(function(err) { btnAksi(false, ""); alert("ERROR SISTEM: " + err.message); }).prosesAbsensi(nrppUser, namaUser, currentLat, currentLon, j, pek, pem, pik, dep, tuj); 
    }
    function btnAksi(k, t) { if(bMasuk) { bMasuk.disabled = k; bMasuk.innerHTML = k ? t : `<i class="bi bi-box-arrow-in-right"></i> Absen Masuk`; } if(bKeluar) { bKeluar.disabled = k; bKeluar.innerHTML = k ? t : `<i class="bi bi-box-arrow-left"></i> Absen Keluar`; } }

    // --- FUNGSI HITUNG LEMBUR ---
   window.prosesHitungLembur = function() {
      let m = document.getElementById("inputTglMulai").value;
      let s = document.getElementById("inputTglSelesai").value;
      let n = document.getElementById("inputNrppHitung").value;
      if (!m || !s || !n) { alert("Harap isi Tanggal Mulai, Sampai Tanggal, dan NRPP!"); return; }
      
      // ========================================================
      // KEAMANAN LAPIS 2: CEK STATUS HRD / KARYAWAN
      // ========================================================
      if (roleUser !== "HRD" && String(n).trim() !== String(nrppUser).trim()) {
        alert("AKSES DITOLAK: Anda hanya diizinkan menghitung data lembur milik Anda sendiri!");
        return; // Hentikan proses hitung
      }
      // ========================================================

      let btn = document.getElementById("btnMulaiHitung");
      btn.disabled = true; 
      btn.innerHTML = "Memproses Data..."; 
      document.getElementById("areaHasilHitung").style.display = "none";
      
      google.script.run.withSuccessHandler(function(r) {
        btn.disabled = false; 
        btn.innerHTML = "<i class='bi bi-gear-fill'></i> PROSES PERHITUNGAN";
        
        if (r.status === "SUCCESS") {
          document.getElementById("areaHasilHitung").style.display = "block";
          document.getElementById("lblNamaHitung").innerText = r.info.nama; 
          document.getElementById("lblGolHitung").innerText = r.info.gol; 
          document.getElementById("lblNrppHitung").innerText = n; 
          document.getElementById("lblDeptHitung").innerText = r.info.dept; 
          document.getElementById("lblPeriodeHitung").innerText = m + " s/d " + s;
          
          let h = "";
          let sumCalc = 0, sumOt15 = 0, sumOt2 = 0, sumOt3 = 0, sumOt4 = 0;
          let sumUTrns = 0, sumUMkn = 0, sumTotOt = 0, sumCuti = 0;

          const parseNum = (val) => {
            if (!val) return 0;
            let num = parseFloat(String(val).replace(/,/g, '').replace(/[^0-9.-]+/g, ""));
            return isNaN(num) ? 0 : num;
          };

          r.data.forEach(row => {
            sumCalc += parseNum(row.calcHour);
            sumOt15 += parseNum(row.ot15);
            sumOt2  += parseNum(row.ot2);
            sumOt3  += parseNum(row.ot3);
            sumOt4  += parseNum(row.ot4);
            sumUTrns += parseNum(row.uTrns);
            sumUMkn  += parseNum(row.uMkn);
            sumTotOt += parseNum(row.totOt);
            sumCuti  += parseNum(row.cuti); // Menjumlahkan total kompensasi cuti

            // Tampilkan in2 dan out2 ke dalam kolom LEMBUR 2
            h += `<tr>
              <td class="text-start ps-2">${row.tgl}</td>
              <td class="text-start ps-2">${row.hari}</td>
              <td class="text-start ps-2">${row.ket}</td>
              <td>${row.in1 || ""}</td>
              <td>${row.out1 || ""}</td>
              <td>${row.in2 || ""}</td>
              <td>${row.out2 || ""}</td>
              <td class="text-primary fw-bold">${row.realHour}</td>
              <td class="text-primary fw-bold">${row.calcHour}</td>
              <td>${row.ot15}</td>
              <td class="text-primary">${row.ot2}</td>
              <td>${row.ot3}</td>
              <td>${row.ot4}</td>
              <td class="text-danger">${row.uTrns}</td>
              <td class="text-danger">${row.uMkn}</td>
              <td class="text-primary fw-bold">${row.totOt}</td>
              <td class="text-danger fw-bold">${row.cuti || ""}</td>
            </tr>`;
          });

          let fmtDesimal = (val) => val > 0 ? val.toFixed(2) : ""; 
          let fmtUang = (val) => val > 0 ? new Intl.NumberFormat('en-US').format(val) : ""; 

          h += `<tr style="background-color: #FFFF00 !important; font-weight: bold; border-top: 2px solid #000;">
            <td colspan="8" class="text-end pe-3" style="border: 1px solid #000;">GRAND TOTAL</td>
            <td class="text-primary" style="border: 1px solid #000;">${fmtDesimal(sumCalc)}</td>
            <td style="border: 1px solid #000;">${fmtDesimal(sumOt15 * 1.5)}</td>
            <td class="text-primary" style="border: 1px solid #000;">${fmtDesimal(sumOt2 * 2)}</td>
            <td style="border: 1px solid #000;">${fmtDesimal(sumOt3 * 3)}</td>
            <td style="border: 1px solid #000;">${fmtDesimal(sumOt4 * 4)}</td>
            <td class="text-danger" style="border: 1px solid #000;">${fmtUang(sumUTrns)}</td>
            <td class="text-danger" style="border: 1px solid #000;">${fmtUang(sumUMkn)}</td>
            <td class="text-primary fw-bold" style="border: 1px solid #000;">${fmtDesimal(sumTotOt)}</td>
            <td class="text-danger fw-bold" style="border: 1px solid #000;">${sumCuti > 0 ? sumCuti : ""}</td>
          </tr>`;

          document.getElementById("isiHasilHitung").innerHTML = h;
        } else { 
          alert("Perhatian: " + r.message); 
        }
      }).withFailureHandler(function(err) { 
        btn.disabled = false; 
        btn.innerHTML = "<i class='bi bi-gear-fill'></i> PROSES PERHITUNGAN"; 
        alert("Error Server: " + err.message); 
      }).jalankanKalkulasiLembur(n, m, s);
    };

    window.unduhPDFLembur = function() {
      const tabelElemen = document.getElementById('tabelUntukPDF');
      const nrppUser = document.getElementById("inputNrppHitung").value || "Karyawan";
      const tombolPDF = document.querySelector("button[onclick='unduhPDFLembur()']");
      tombolPDF.innerHTML = '<i class="bi bi-hourglass-split"></i> Memproses...';
      if (typeof html2pdf !== 'undefined') {
        const opsi = { margin: 0.2, filename: 'Lembur_' + nrppUser + '.pdf', image: { type: 'jpeg', quality: 1.0 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'in', format: 'legal', orientation: 'landscape' } };
        html2pdf().set(opsi).from(tabelElemen).save().then(function() { tombolPDF.innerHTML = '<i class="bi bi-file-pdf"></i> Download PDF'; });
      } else { alert("Library PDF dicekal browser. Mengalihkan ke mode Cetak."); tombolPDF.innerHTML = '<i class="bi bi-file-pdf"></i> Download PDF'; window.print(); }
    };

    // --- PENCARIAN & KOREKSI ABSENSI ---
    window.bukaModalAbsenManual = function() { document.getElementById("popupAbsenManual").style.display = "flex"; };
    
    window.cariDataAbsenKoreksi = function() {
      let t1 = document.getElementById("editTglAwal").value; let t2 = document.getElementById("editTglAkhir").value; let nrpp = document.getElementById("editNrppCari").value;
      if(!t1 || !t2) { alert("Pilih rentang tanggal terlebih dahulu!"); return; }
      let tbody = document.getElementById("tabelKoreksiAbsen"); tbody.innerHTML = `<tr><td colspan="6" class="text-center">Mencari data...</td></tr>`;
      google.script.run.withSuccessHandler(function(r) {
        if(r.status === "SUCCESS") {
          let h = "";
          r.data.forEach(row => {
            let safeNama = (row.nama || "").replace(/'/g, "\\'").replace(/"/g, "&quot;"); let safePek = (row.pek || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");
            h += `<tr><td>${row.waktu}</td><td>${row.nrpp}</td><td>${row.nama}</td><td class="fw-bold ${row.jenis=='Masuk'?'text-success':'text-danger'}">${row.jenis}</td><td>${row.pek}</td><td class="text-center text-nowrap"><button class="btn btn-xs btn-warning" style="font-size:10px;" onclick="bukaModalEditAbsen('${row.rowId}', '${row.nrpp}', '${safeNama}', '${row.tglEdit}', '${row.jamEdit}', '${row.jenis}', '${safePek}')"><i class="bi bi-pencil"></i></button> <button class="btn btn-xs btn-danger" style="font-size:10px;" onclick="hapusBarisAbsen('${row.rowId}')"><i class="bi bi-trash"></i></button></td></tr>`;
          });
          tbody.innerHTML = h;
        } else { tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">${r.message}</td></tr>`; }
      }).ambilDataAbsenUntukKoreksi(t1, t2, nrpp);
    };

    window.hapusBarisAbsen = function(rowId) { if(confirm("Yakin ingin menghapus data absen ini permanen?")) { google.script.run.withSuccessHandler(function(r) { alert(r.message); cariDataAbsenKoreksi(); }).hapusDataAbsenServer(rowId); } };

    window.bukaModalEditAbsen = function(rId, nrpp, nama, tgl, jam, jenis, pek) {
      document.getElementById("editRowIdTarget").value = rId; document.getElementById("editFormNrpp").value = nrpp; document.getElementById("editFormNama").value = nama; document.getElementById("editFormTgl").value = (tgl && tgl !== 'undefined') ? tgl : ""; document.getElementById("editFormJam").value = (jam && jam !== 'undefined') ? jam : ""; document.getElementById("editFormJenis").value = jenis; document.getElementById("editFormPek").value = pek; document.getElementById("popupEditAbsen").style.display = "flex";
    };

    window.simpanKoreksiAbsen = function() {
      const data = { rowId: document.getElementById("editRowIdTarget").value, nrpp: document.getElementById("editFormNrpp").value, nama: document.getElementById("editFormNama").value, tgl: document.getElementById("editFormTgl").value, jam: document.getElementById("editFormJam").value, jenis: document.getElementById("editFormJenis").value, pek: document.getElementById("editFormPek").value };
      if(!data.nrpp || !data.nama || !data.tgl || !data.jam) { alert("Data form tidak boleh kosong!"); return; }
      let btn = document.getElementById("btnSimpanEditAbsen"); btn.disabled = true; btn.innerText = "Menyimpan...";
      google.script.run.withSuccessHandler(function(r) { btn.disabled = false; btn.innerText = "SIMPAN PERUBAHAN"; if(r.status === "SUCCESS") { alert(r.message); document.getElementById("popupEditAbsen").style.display = "none"; cariDataAbsenKoreksi(); } else { alert("Gagal: " + r.message); } }).withFailureHandler(function(e) { btn.disabled = false; btn.innerText = "SIMPAN PERUBAHAN"; alert("Error: " + e.message); }).simpanEditAbsenServer(data);
    };

    window.simpanAbsenManual = function() {
      const data = { nrpp: document.getElementById("manNrpp").value, nama: document.getElementById("manNama").value, tgl: document.getElementById("manTgl").value, jam: document.getElementById("manJam").value, jenis: document.getElementById("manJenis").value, pek: document.getElementById("manPek").value };
      if(!data.nrpp || !data.nama || !data.tgl || !data.jam) { alert("Data form tidak boleh kosong!"); return; }
      let btn = document.getElementById("btnSimpanManual"); btn.disabled = true; btn.innerText = "Menyimpan...";
      google.script.run.withSuccessHandler(function(r) { btn.disabled = false; btn.innerText = "SIMPAN ABSEN"; if(r.status === "SUCCESS") { alert(r.message); document.getElementById("popupAbsenManual").style.display = "none"; document.getElementById("formAbsenManual").reset(); cariDataAbsenKoreksi(); } else { alert("Gagal: " + r.message); } }).withFailureHandler(function(e) { btn.disabled = false; btn.innerText = "SIMPAN ABSEN"; alert("Error: " + e.message); }).simpanAbsenManualServer(data);
    };

    // --- FUNGSI REKAP LEMBUR (BERSIH & FINAL) ---
    window.prosesRekapLembur = function() {
      let t1 = document.getElementById("rekapTglAwal").value;
      let t2 = document.getElementById("rekapTglAkhir").value;
      if (!t1 || !t2) { alert("Pilih Dari Tanggal dan Sampai Tanggal terlebih dahulu!"); return; }
      let tbody = document.getElementById("tabelRekapLembur");
      
      tbody.innerHTML = `<tr><td colspan="9" class="text-center fw-bold text-primary"><i class="bi bi-hourglass-split"></i> Sedang menghitung rekap lembur...</td></tr>`;

      google.script.run.withSuccessHandler(function(r) {
        if (r.status === "SUCCESS") {
          if (r.data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="9" class="text-center text-danger fw-bold">Tidak ada data lembur di periode ini.</td></tr>`;
          } else {
            let html = "";
            r.data.forEach(function(row) {
              // MENGHAPUS "Rp" dan "Jam"
              let formatUmut = new Intl.NumberFormat('id-ID').format(row.umut);
              let formatPiket = row.piket ? new Intl.NumberFormat('id-ID').format(row.piket) : "0";
              let formatCuti = row.cuti ? row.cuti : "";

              html += `<tr>
                <td>${row.no}</td>
                <td class="fw-bold">${row.nrpp}</td>
                <td class="text-start">${row.nama}</td>
                <td>${row.dept}</td>
                <td>${row.lokasi}</td>
                <td>${row.gol}</td>
                <td class="fw-bold text-primary">${row.ot}</td>
                <td class="fw-bold text-success">${formatUmut}</td>
                <td class="fw-bold text-warning">${formatPiket}</td>
                <td class="fw-bold text-danger">${formatCuti}</td>
              </tr>`;
            });
            tbody.innerHTML = html;
          }
        } else {
          tbody.innerHTML = `<tr><td colspan="9" class="text-center text-danger">Gagal: ${r.message}</td></tr>`;
        }
      }).ambilRekapLemburServer(t1, t2);
    };
    window.muatTabelLibur = function() {
  let tbody = document.getElementById("isiTabelLibur");
  google.script.run.withSuccessHandler(function(r) {
    if (r.status === "SUCCESS") {
      let html = "";
      r.data.forEach((row, i) => {
        html += `<tr>
          <td>${i+1}</td>
          <td class="fw-bold">${row.tglStr}</td>
          <td><span class="badge bg-danger">${row.status}</span></td>
          <td class="text-start">${row.ket}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger" onclick="hapusLibur('${row.rowId}')">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>`;
      });
      tbody.innerHTML = html || '<tr><td colspan="5">Belum ada hari libur diset.</td></tr>';
    }
  }).ambilDataLibur();
};

window.simpanLibur = function() {
  let data = {
    tgl: document.getElementById("liburTgl").value,
    status: document.getElementById("liburStatus").value,
    ket: document.getElementById("liburKet").value
  };
  if(!data.tgl || !data.ket) return alert("Lengkapi tanggal dan keterangan!");
  
  google.script.run.withSuccessHandler(function(r) {
    alert(r.message);
    if(r.status === "SUCCESS") {
      document.getElementById("liburKet").value = "";
      muatTabelLibur();
    }
  }).simpanLiburServer(data);
};

window.hapusLibur = function(id) {
  if(confirm("Hapus hari libur ini?")) {
    google.script.run.withSuccessHandler(function(r) {
      alert(r.message);
      muatTabelLibur();
    }).hapusLiburServer(id);
  }
};

// Pastikan fungsi muat dipanggil saat menu diklik
// Tambahkan di dalam fungsi window.bukaRuangan:
if (t === "ruang-kelola-libur") muatTabelLibur();
  </script>
</body>
</html>
