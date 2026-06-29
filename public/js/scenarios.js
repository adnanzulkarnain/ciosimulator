/**
 * CIO Simulator — Scenario Definitions
 * 6 skenario keputusan IT governance dalam Bahasa Indonesia
 * Mendukung consequence chaining melalui sistem flags
 */

export const SCENARIOS = [
  // ─────────────────────────────────────────────
  // 1. Budget Security — Anggaran Keamanan Siber
  // ─────────────────────────────────────────────
  {
    id: 'budget_security',
    title: 'Anggaran Keamanan Siber',
    icon: '🛡️',
    location: 'Ruang Rapat Utama',
    description:
      'Tim keamanan siber mengajukan proposal firewall generasi baru senilai Rp 2 miliar. ' +
      'Mereka menunjukkan data serangan yang meningkat 300% tahun ini. ' +
      'CFO menunggu keputusanmu dengan sabar.',
    choices: [
      {
        text: 'Setujui anggaran penuh',
        effects: { reputation: 5, finance: -12, compliance: 15 },
        consequence:
          'Firewall baru terpasang dalam 2 minggu. Tim keamanan melaporkan blokir 12.000 ancaman di bulan pertama — investasi yang sejalan dengan kontrol COBIT APO13.',
        flags: { securityBudgetFull: true }
      },
      {
        text: 'Setujui sebagian (50%)',
        effects: { reputation: 2, finance: -6, compliance: 8 },
        consequence:
          'Firewall dasar terpasang, tapi modul threat intelligence ditunda. Perlindungan meningkat, namun belum optimal sesuai standar ISO 27001 Annex A.',
        flags: { securityBudgetPartial: true }
      },
      {
        text: 'Tolak — gunakan solusi yang ada',
        effects: { reputation: -3, finance: 5, compliance: -5 },
        consequence:
          'CFO senang dengan penghematan, tapi CISO menyimpan email penolakanmu. Tanpa peningkatan kontrol, risiko residual meningkat signifikan.',
        flags: { securityBudgetDenied: true }
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 2. Data Breach — Kebocoran Data Pelanggan
  // ─────────────────────────────────────────────
  {
    id: 'data_breach',
    title: 'Insiden Kebocoran Data',
    icon: '🚨',
    location: 'Ruang Server',
    description:
      'Telepon berdering dari tim SOC: 50.000 data pelanggan terekspos di dark web. ' +
      'Media belum tahu, tapi waktu terus berjalan. ' +
      'UU PDP mewajibkan notifikasi dalam 3x24 jam.',
    choices: [
      {
        text: 'Umumkan secara transparan',
        effects: { reputation: -8, finance: -5, compliance: 10 },
        consequence:
          'Reputasi jangka pendek terguncang, tapi publik menghargai transparansimu. Regulator mencatat kepatuhanmu terhadap Pasal 46 UU PDP — reputasi pulih lebih cepat.',
        flags: {}
      },
      {
        text: 'Tutupi sambil perbaiki internal',
        effects: { reputation: 3, finance: 0, compliance: -15 },
        consequence:
          'Untuk sementara aman, tapi bukti digital sulit dihapus. Jika terungkap, sanksi UU PDP bisa mencapai 2% pendapatan tahunan. Kamu menyimpan bom waktu.',
        flags: { coverUp: true }
      },
      {
        text: 'Investigasi terbatas & patch',
        effects: { reputation: -3, finance: -5, compliance: 5 },
        consequence:
          'Tim forensik menemukan celah di API lama. Patch diterapkan, laporan dikirim ke BSSN secara terbatas. Pendekatan moderat yang memenuhi standar minimum.',
        flags: {}
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 3. New Tech — Adopsi AI Generatif
  // ─────────────────────────────────────────────
  {
    id: 'new_tech',
    title: 'Tekanan Adopsi AI Generatif',
    icon: '🤖',
    location: 'Ruang Direksi',
    description:
      'CEO baru saja kembali dari konferensi dan ingin AI generatif di semua divisi bulan depan. ' +
      'Kompetitor sudah mulai deploy. ' +
      'Tapi tim legal khawatir soal data privacy dan hallucination.',
    choices: [
      {
        text: 'Adopsi cepat — deploy minggu depan',
        effects: { reputation: 12, finance: -8, compliance: -10 },
        consequence:
          'Kamu jadi headline di media bisnis! Tapi dalam sebulan, AI menghasilkan kontrak dengan klausul fiktif. Tanpa AI governance framework, risiko operasional melonjak.',
        flags: {}
      },
      {
        text: 'Bentuk tim kajian governance dulu',
        effects: { reputation: 3, finance: -3, compliance: 10 },
        consequence:
          'CEO agak kecewa dengan kecepatan, tapi tim berhasil menyusun AI policy sesuai NIST AI RMF. Deploy dilakukan dengan guardrails — pendekatan CIO sejati.',
        flags: {}
      },
      {
        text: 'Tolak — teknologi belum matang',
        effects: { reputation: -10, finance: 0, compliance: 5 },
        consequence:
          'CEO frustrasi dan mulai bicara langsung dengan vendor tanpa sepengetahuanmu. Shadow IT mengancam — kontrol tata kelola TI melemah.',
        flags: {}
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 4. Phishing — Serangan Phishing ke HR
  // ─────────────────────────────────────────────
  {
    id: 'phishing',
    title: 'Serangan Phishing Berhasil',
    icon: '🎣',
    location: 'Lantai HRD',
    description:
      'Manajer HR mengklik link phishing dan akun email korporatnya dikuasai penyerang. ' +
      'Data slip gaji 200 karyawan mungkin sudah diunduh. ' +
      'Tim IT menunggu instruksi response-mu.',
    choices: [
      {
        text: 'Training keamanan massal & audit',
        effects: { reputation: 5, finance: -8, compliance: 12 },
        consequence:
          'Seluruh karyawan menjalani security awareness training. Simulasi phishing bulanan dimulai. Tingkat klik phishing turun dari 34% ke 8% — sesuai kontrol ISO 27001 A.7.2.2.',
        flags: {}
      },
      {
        text: 'Blokir & reset semua akses HR',
        effects: { reputation: -3, finance: -3, compliance: 8 },
        consequence:
          'Akses direset dalam 2 jam. Operasional HR terganggu sehari, tapi penyebaran dicegah. Incident response plan berjalan sesuai COBIT DSS02.',
        flags: {}
      },
      {
        text: 'Monitor saja — jangan panik',
        effects: { reputation: -5, finance: 2, compliance: -12 },
        consequence:
          'Kamu memilih "wait and see", tapi penyerang sudah exfiltrate data gaji. Tanpa tindakan tegas, kamu melanggar prinsip due diligence keamanan informasi.',
        flags: { phishingIgnored: true }
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 5. Outsourcing — Strategi Transformasi Digital
  // ─────────────────────────────────────────────
  {
    id: 'outsourcing',
    title: 'Strategi Transformasi Digital',
    icon: '🏗️',
    location: 'Ruang CIO',
    description:
      'Proyek transformasi digital senilai Rp 15 miliar harus dimulai kuartal ini. ' +
      'Tim internal punya skill tapi terbatas jumlahnya. ' +
      'Tiga vendor besar sudah kirim proposal.',
    choices: [
      {
        text: 'Bangun tim in-house penuh',
        effects: { reputation: 8, finance: -15, compliance: 5 },
        consequence:
          'Rekrutmen 20 orang memakan waktu, tapi kamu membangun kapabilitas jangka panjang. Knowledge tetap di organisasi — sesuai prinsip COBIT EDM04 tentang resource optimization.',
        flags: {}
      },
      {
        text: 'Hybrid — tim inti + vendor support',
        effects: { reputation: 5, finance: -8, compliance: 3 },
        consequence:
          'Tim inti 8 orang didukung 2 vendor spesialis. Transfer knowledge berjalan, biaya terkontrol. Pendekatan balanced yang direkomendasikan framework TOGAF.',
        flags: {}
      },
      {
        text: 'Full outsource ke vendor',
        effects: { reputation: -5, finance: 5, compliance: -8 },
        consequence:
          'Vendor deliver cepat, tapi organisasi jadi sangat bergantung. Saat vendor menaikkan harga 40% tahun depan, kamu tidak punya pilihan — vendor lock-in terjadi.',
        flags: {}
      }
    ]
  },

  // ─────────────────────────────────────────────
  // 6. Compliance Audit — Audit UU PDP
  // ─────────────────────────────────────────────
  {
    id: 'compliance_audit',
    title: 'Audit Kepatuhan UU PDP',
    icon: '📋',
    location: 'Lobby Kantor',
    description:
      'Surat resmi dari regulator: audit kepatuhan UU Pelindungan Data Pribadi dijadwalkan minggu depan. ' +
      'Tim legal panik, DPO baru bergabung 2 bulan lalu. ' +
      'Semua keputusanmu sebelumnya akan diperiksa.',
    choices: [
      {
        text: 'Persiapan penuh & transparan',
        effects: { reputation: 8, finance: -10, compliance: 15 },
        consequence:
          'Kamu rekrut konsultan, siapkan semua dokumentasi ROPA, dan lakukan gap analysis. Auditor terkesan dengan kematangan tata kelola data — sertifikasi ISO 27701 dalam jangkauan.',
        flags: {}
      },
      {
        text: 'Persiapan seadanya',
        effects: { reputation: -2, finance: -3, compliance: 3 },
        consequence:
          'Dokumentasi minimum disiapkan, beberapa celah ditambal cepat. Auditor memberi catatan perbaikan, tapi tidak ada sanksi. Kamu lolos tipis kali ini.',
        flags: {}
      },
      {
        text: 'Minta penundaan audit',
        effects: { reputation: -12, finance: 2, compliance: -10 },
        consequence:
          'Regulator mencurigai ada yang disembunyikan. Permintaan penundaan justru memicu investigasi lebih mendalam. Reputasi organisasi di mata regulator rusak.',
        flags: {}
      }
    ]
  }
];

export const HOSPITAL_SCENARIOS = [
  {
    id: 'budget_security',
    title: 'Upgrade Keamanan Rekam Medis',
    icon: '🏥',
    location: 'Command Center Rumah Sakit',
    description:
      'Sistem rekam medis elektronik mulai lambat dan tim keamanan menemukan server lama belum memakai segmentasi jaringan. ' +
      'Direktur medis khawatir layanan pasien terganggu jika upgrade dilakukan terburu-buru.',
    choices: [
      {
        text: 'Upgrade penuh dengan jadwal bertahap',
        effects: { reputation: 6, finance: -12, compliance: 16 },
        consequence:
          'Upgrade dilakukan per unit layanan. Risiko downtime terkendali dan data pasien lebih aman karena akses antar sistem mulai dipisahkan.',
        flags: { securityBudgetFull: true }
      },
      {
        text: 'Prioritaskan modul paling kritis',
        effects: { reputation: 3, finance: -6, compliance: 8 },
        consequence:
          'IGD dan rawat inap diamankan lebih dulu. Ini realistis secara anggaran, tetapi sistem pendukung masih perlu rencana lanjutan.',
        flags: { securityBudgetPartial: true }
      },
      {
        text: 'Tunda sampai audit berikutnya',
        effects: { reputation: -4, finance: 5, compliance: -7 },
        consequence:
          'Anggaran aman sementara, tetapi risiko pada data pasien tetap terbuka. Penundaan di sistem kesehatan bisa berdampak langsung pada keselamatan layanan.',
        flags: { securityBudgetDenied: true }
      }
    ]
  },
  {
    id: 'data_breach',
    title: 'Data Pasien Bocor',
    icon: '🚨',
    location: 'Helpdesk Klinik',
    description:
      'Tim IT menemukan file hasil lab pasien tersebar melalui folder cloud yang salah konfigurasi. ' +
      'Beberapa pasien mulai bertanya di media sosial.',
    choices: [
      {
        text: 'Notifikasi pasien dan regulator',
        effects: { reputation: -7, finance: -6, compliance: 13 },
        consequence:
          'Kepercayaan sempat turun, tetapi pasien mendapat kepastian. Transparansi memperlihatkan bahwa rumah sakit serius melindungi data pribadi.',
        flags: {}
      },
      {
        text: 'Hapus file diam-diam',
        effects: { reputation: 2, finance: 0, compliance: -16 },
        consequence:
          'Masalah terlihat hilang, tapi jejak akses tetap ada. Jika diketahui, rumah sakit terlihat menutup-nutupi insiden data pasien.',
        flags: { coverUp: true }
      },
      {
        text: 'Kunci akses dan investigasi cepat',
        effects: { reputation: -2, finance: -5, compliance: 7 },
        consequence:
          'Akses cloud ditutup dan audit izin dilakukan. Respons ini menahan dampak, tetapi komunikasi ke pasien tetap perlu dipertimbangkan.',
        flags: {}
      }
    ]
  },
  {
    id: 'new_tech',
    title: 'AI Triage untuk Pasien',
    icon: '🤖',
    location: 'Ruang Direksi Medis',
    description:
      'Vendor menawarkan AI triage untuk memilah prioritas pasien. CEO ingin demo langsung dipakai di IGD minggu depan, tetapi dokter meminta validasi klinis.',
    choices: [
      {
        text: 'Pakai langsung di IGD',
        effects: { reputation: 10, finance: -7, compliance: -12 },
        consequence:
          'Rumah sakit terlihat inovatif, tetapi rekomendasi AI tanpa validasi klinis bisa membahayakan pasien dan menimbulkan risiko hukum.',
        flags: {}
      },
      {
        text: 'Pilot terbatas dengan dokter pengawas',
        effects: { reputation: 5, finance: -5, compliance: 10 },
        consequence:
          'AI diuji pada kasus non-kritis dan dokter tetap mengambil keputusan akhir. Inovasi berjalan, tetapi governance klinis tetap dijaga.',
        flags: {}
      },
      {
        text: 'Tolak semua AI klinis',
        effects: { reputation: -8, finance: 0, compliance: 5 },
        consequence:
          'Risiko turun, tetapi rumah sakit kehilangan kesempatan mempercepat alur pasien. Penolakan total bisa mendorong unit membuat solusi sendiri.',
        flags: {}
      }
    ]
  },
  {
    id: 'phishing',
    title: 'Phishing ke Staf Farmasi',
    icon: '🎣',
    location: 'Instalasi Farmasi',
    description:
      'Akun staf farmasi dipakai untuk mengirim permintaan pembelian obat palsu. Supplier hampir memproses pesanan karena email terlihat resmi.',
    choices: [
      {
        text: 'Latihan keamanan seluruh unit',
        effects: { reputation: 4, finance: -7, compliance: 12 },
        consequence:
          'Staf farmasi, perawat, dan administrasi dilatih mengenali rekayasa sosial. Risiko transaksi palsu dan kebocoran akun menurun.',
        flags: {}
      },
      {
        text: 'Reset akses farmasi dan vendor',
        effects: { reputation: -2, finance: -4, compliance: 8 },
        consequence:
          'Operasional melambat sebentar, tetapi rantai pasok obat lebih aman. Kontrol akses vendor menjadi lebih ketat.',
        flags: {}
      },
      {
        text: 'Anggap sebagai salah klik biasa',
        effects: { reputation: -6, finance: 2, compliance: -12 },
        consequence:
          'Masalah tampak kecil, namun akun yang sama bisa dipakai untuk manipulasi pesanan berikutnya. Insiden kecil sering menjadi pintu masuk besar.',
        flags: { phishingIgnored: true }
      }
    ]
  },
  {
    id: 'outsourcing',
    title: 'Sistem Antrean Digital',
    icon: '🏗️',
    location: 'Lobi Pasien',
    description:
      'Rumah sakit ingin antrean digital, pendaftaran online, dan integrasi BPJS lebih lancar. Tim internal paham proses, vendor punya platform siap pakai.',
    choices: [
      {
        text: 'Bangun sendiri seluruh sistem',
        effects: { reputation: 6, finance: -14, compliance: 6 },
        consequence:
          'Proses rumah sakit bisa disesuaikan penuh, tetapi biaya dan waktu implementasi besar. Kapabilitas internal meningkat.',
        flags: {}
      },
      {
        text: 'Hybrid: proses internal + platform vendor',
        effects: { reputation: 6, finance: -8, compliance: 5 },
        consequence:
          'Tim internal memegang desain proses, vendor mempercepat teknologi. Risiko vendor lock-in berkurang karena knowledge tetap dibangun.',
        flags: {}
      },
      {
        text: 'Serahkan penuh ke vendor',
        effects: { reputation: -4, finance: 5, compliance: -8 },
        consequence:
          'Sistem cepat jalan, tetapi perubahan alur klinik bergantung pada vendor. Ketika kebutuhan pasien berubah, rumah sakit kurang lincah.',
        flags: {}
      }
    ]
  },
  {
    id: 'compliance_audit',
    title: 'Audit Privasi Data Pasien',
    icon: '📋',
    location: 'Ruang Komite Mutu',
    description:
      'Komite mutu meminta bukti siapa saja yang mengakses rekam medis pasien VIP. Log akses belum pernah ditinjau rutin.',
    choices: [
      {
        text: 'Audit penuh dan perbaiki proses akses',
        effects: { reputation: 8, finance: -9, compliance: 16 },
        consequence:
          'Log akses ditinjau dan hak akses dibatasi sesuai peran. Rumah sakit punya bukti bahwa data pasien tidak boleh diakses sembarangan.',
        flags: {}
      },
      {
        text: 'Cek sampel akses saja',
        effects: { reputation: -1, finance: -3, compliance: 4 },
        consequence:
          'Beberapa masalah ditemukan, tetapi gambaran risiko belum lengkap. Ini cukup untuk mulai, namun belum menjadi governance yang matang.',
        flags: {}
      },
      {
        text: 'Minta komite menunda audit',
        effects: { reputation: -10, finance: 2, compliance: -10 },
        consequence:
          'Penundaan membuat komite curiga. Dalam layanan kesehatan, akses data tanpa kontrol bisa langsung merusak kepercayaan pasien.',
        flags: {}
      }
    ]
  }
];

export const CAMPUS_SCENARIOS = [
  {
    id: 'budget_security',
    title: 'Keamanan SSO Kampus',
    icon: '🎓',
    location: 'Pusat Data Kampus',
    description:
      'Sistem SSO dipakai mahasiswa untuk KRS, LMS, pembayaran, dan email. Tim IT meminta MFA dan monitoring login karena serangan credential stuffing naik.',
    choices: [
      {
        text: 'Aktifkan MFA dan monitoring penuh',
        effects: { reputation: 5, finance: -11, compliance: 15 },
        consequence:
          'Akun mahasiswa lebih aman dan percobaan login massal cepat terdeteksi. Sedikit friksi login sebanding dengan perlindungan identitas digital.',
        flags: { securityBudgetFull: true }
      },
      {
        text: 'MFA untuk dosen dan admin dulu',
        effects: { reputation: 2, finance: -5, compliance: 8 },
        consequence:
          'Akun paling sensitif terlindungi dulu. Mahasiswa masih perlu edukasi dan rencana rollout berikutnya.',
        flags: { securityBudgetPartial: true }
      },
      {
        text: 'Tunda karena takut komplain login',
        effects: { reputation: -3, finance: 5, compliance: -6 },
        consequence:
          'Login tetap mudah, tetapi akun lemah masih menjadi pintu masuk ke banyak layanan kampus.',
        flags: { securityBudgetDenied: true }
      }
    ]
  },
  {
    id: 'data_breach',
    title: 'Data Mahasiswa Tersebar',
    icon: '🚨',
    location: 'Biro Akademik',
    description:
      'File berisi NIM, nomor HP, dan tagihan mahasiswa tersebar di grup chat. Sumbernya diduga ekspor data dari sistem akademik.',
    choices: [
      {
        text: 'Umumkan insiden dan panduan proteksi',
        effects: { reputation: -7, finance: -5, compliance: 12 },
        consequence:
          'Kampus terlihat bertanggung jawab dan mahasiswa tahu langkah pencegahan penipuan. Transparansi membantu memulihkan kepercayaan.',
        flags: {}
      },
      {
        text: 'Hapus file dan diamkan',
        effects: { reputation: 3, finance: 0, compliance: -15 },
        consequence:
          'Isu mereda sementara, tetapi mahasiswa bisa menjadi korban scam tanpa peringatan. Menutup insiden memperbesar risiko reputasi.',
        flags: { coverUp: true }
      },
      {
        text: 'Investigasi sumber ekspor data',
        effects: { reputation: -2, finance: -4, compliance: 6 },
        consequence:
          'Akses ekspor data dibatasi dan log diperiksa. Ini menahan risiko, tetapi komunikasi ke mahasiswa tetap penting.',
        flags: {}
      }
    ]
  },
  {
    id: 'new_tech',
    title: 'AI Tutor untuk LMS',
    icon: '🤖',
    location: 'Ruang Inovasi Pembelajaran',
    description:
      'Pimpinan ingin AI tutor di LMS untuk membantu mahasiswa belajar 24 jam. Dosen khawatir jawaban AI salah dan data tugas masuk ke vendor.',
    choices: [
      {
        text: 'Rilis ke semua mata kuliah',
        effects: { reputation: 11, finance: -7, compliance: -10 },
        consequence:
          'Kampus terlihat modern, tetapi tanpa aturan penggunaan AI, risiko jawaban salah dan kebocoran data akademik meningkat.',
        flags: {}
      },
      {
        text: 'Pilot dengan kebijakan AI akademik',
        effects: { reputation: 5, finance: -4, compliance: 10 },
        consequence:
          'AI diuji di beberapa kelas dengan panduan sitasi, privasi, dan batasan penggunaan. Inovasi berjalan lebih bertanggung jawab.',
        flags: {}
      },
      {
        text: 'Larang AI di semua kelas',
        effects: { reputation: -9, finance: 0, compliance: 5 },
        consequence:
          'Risiko turun, tetapi mahasiswa tetap bisa memakai AI di luar kontrol kampus. Kebijakan larangan total sulit diawasi.',
        flags: {}
      }
    ]
  },
  {
    id: 'phishing',
    title: 'Phishing Beasiswa',
    icon: '🎣',
    location: 'Kemahasiswaan',
    description:
      'Mahasiswa menerima email beasiswa palsu yang meminta password SSO. Beberapa akun sudah dipakai mengubah data kontak dan mengirim spam.',
    choices: [
      {
        text: 'Kampanye keamanan mahasiswa',
        effects: { reputation: 5, finance: -6, compliance: 11 },
        consequence:
          'Mahasiswa mendapat simulasi phishing dan panduan cek tautan. Kesadaran keamanan menjadi bagian dari literasi digital kampus.',
        flags: {}
      },
      {
        text: 'Paksa reset akun terdampak',
        effects: { reputation: -2, finance: -3, compliance: 8 },
        consequence:
          'Beberapa mahasiswa terganggu saat login, tetapi penyebaran spam berhenti dan akun pulih.',
        flags: {}
      },
      {
        text: 'Biarkan sampai ada laporan resmi',
        effects: { reputation: -6, finance: 2, compliance: -12 },
        consequence:
          'Akun yang sudah dikuasai terus menyebar tautan palsu. Lambat merespons membuat mahasiswa merasa tidak dilindungi.',
        flags: { phishingIgnored: true }
      }
    ]
  },
  {
    id: 'outsourcing',
    title: 'Aplikasi Mobile Kampus',
    icon: '🏗️',
    location: 'Ruang Transformasi Digital',
    description:
      'Mahasiswa meminta satu aplikasi untuk jadwal, nilai, presensi, dan pembayaran. Tim internal terbatas, vendor menawarkan aplikasi jadi.',
    choices: [
      {
        text: 'Bangun sendiri oleh tim kampus',
        effects: { reputation: 7, finance: -13, compliance: 5 },
        consequence:
          'Aplikasi bisa mengikuti proses kampus, tetapi waktu rilis lama. Tim internal belajar banyak dan tidak tergantung penuh pada vendor.',
        flags: {}
      },
      {
        text: 'Hybrid dengan API kampus',
        effects: { reputation: 6, finance: -8, compliance: 4 },
        consequence:
          'Vendor membangun aplikasi, kampus mengontrol data lewat API. Ini menjaga kecepatan sekaligus kontrol tata kelola data.',
        flags: {}
      },
      {
        text: 'Beli aplikasi vendor apa adanya',
        effects: { reputation: -4, finance: 5, compliance: -8 },
        consequence:
          'Aplikasi cepat tersedia, tetapi integrasi data dan perubahan fitur bergantung pada roadmap vendor.',
        flags: {}
      }
    ]
  },
  {
    id: 'compliance_audit',
    title: 'Audit Data Alumni',
    icon: '📋',
    location: 'Career Center',
    description:
      'Career center ingin mengirim data alumni ke mitra industri. Belum semua alumni memberi persetujuan untuk berbagi data kontak.',
    choices: [
      {
        text: 'Minta consent dan rapikan data sharing',
        effects: { reputation: 7, finance: -8, compliance: 15 },
        consequence:
          'Alumni diberi pilihan yang jelas. Kampus tetap bisa membangun jejaring industri tanpa mengabaikan hak pemilik data.',
        flags: {}
      },
      {
        text: 'Bagikan hanya data alumni aktif',
        effects: { reputation: 1, finance: -3, compliance: 5 },
        consequence:
          'Risiko lebih kecil karena data dibatasi, tetapi aturan persetujuan tetap perlu dibuat lebih rapi.',
        flags: {}
      },
      {
        text: 'Kirim semua database alumni',
        effects: { reputation: -12, finance: 3, compliance: -12 },
        consequence:
          'Mitra senang mendapat data lengkap, tetapi alumni bisa merasa privasinya dilanggar. Kepercayaan jejaring kampus terancam.',
        flags: {}
      }
    ]
  }
];

export const LEVELS = [
  {
    id: 'corporate',
    number: 1,
    title: 'PT Nusantara Digital',
    shortName: 'Korporasi Digital',
    badge: 'Level 1',
    mission:
      'Pimpin transformasi digital perusahaan tanpa membuatnya bangkrut, diretas, atau melanggar hukum.',
    intro:
      'Anda baru saja ditunjuk sebagai Chief Information Officer di PT Nusantara Digital.',
    sceneTheme: 'corporate',
    scenarios: SCENARIOS
  },
  {
    id: 'hospital',
    number: 2,
    title: 'RS Cakra Medika',
    shortName: 'Smart Hospital',
    badge: 'Level 2',
    mission:
      'Jaga layanan pasien tetap berjalan sambil melindungi rekam medis, privasi, dan teknologi klinis.',
    intro:
      'Anda menjadi CIO di RS Cakra Medika, rumah sakit yang sedang mempercepat layanan digital.',
    sceneTheme: 'hospital',
    scenarios: HOSPITAL_SCENARIOS
  },
  {
    id: 'campus',
    number: 3,
    title: 'UBHINUS Smart Campus',
    shortName: 'Smart Campus',
    badge: 'Level 3',
    mission:
      'Kelola layanan akademik digital, keamanan akun mahasiswa, dan inovasi pembelajaran secara bertanggung jawab.',
    intro:
      'Anda memimpin transformasi sistem informasi di UBHINUS Smart Campus.',
    sceneTheme: 'campus',
    scenarios: CAMPUS_SCENARIOS
  }
];
