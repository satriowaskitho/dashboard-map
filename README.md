# 📊 Dashboard Map — Sensus Ekonomi 2026

**Dashboard Pemantauan Indikator Strategis Provinsi Kepulauan Riau**

Dashboard ini merupakan website statis yang menyajikan data indikator strategis ekonomi dan pembangunan untuk Provinsi Kepulauan Riau beserta 7 kabupaten/kota-nya. Dibuat untuk keperluan **presentasi di Badan Pusat Statistik (BPS)** dalam rangka Sensus Ekonomi 2026.

---

## 🏗️ Struktur Proyek

```
dashboard-map/
├── landingpage.html             # Halaman utama (landing page)
├── page1.html                   # Halaman dashboard Kabupaten Karimun
├── README.md
│
├── assets/
│   ├── css/
│   │   ├── style.css            # Style dasar & responsive
│   │   ├── landingpage.css      # Style khusus landing page
│   │   └── page1.css            # Style khusus halaman Karimun
│   ├── data/                    # ⚠️ Data acuan dari projek lama (tidak dipakai langsung)
│   ├── img/                     # Gambar & aset visual
│   └── js/                      # Script JavaScript
│
├── Dashboard_KEPRI/             # Sumber file asli (referensi)
└── backup/                      # Backup versi HTML sebelumnya
```

> **Catatan**: Folder `assets/data/` berisi file JS dan JSON dari projek versi lama. Data tersebut digunakan sebagai **acuan/referensi** saja. Pada versi saat ini, semua data indikator langsung ditempelkan (hardcoded) di dalam file HTML masing-masing halaman.

---

## 📈 Indikator Strategis

Dashboard menampilkan **8 indikator strategis utama** yang mengacu pada indikator kinerja utama pemerintah:

### Section 1 — Pertumbuhan Ekonomi *(full-width)*
- **Pertumbuhan Ekonomi** — 5,02% (2024)
  Persentase perubahan nilai tambah barang dan jasa riil dari tahun ke tahun.

### Section 2 — IPM *(full-width)*
- **Indeks Pembangunan Manusia (IPM)** — 80,53 (2025)
  Capaian pembangunan manusia berbasis kualitas hidup, pendidikan, dan standar hidup.
  Dilengkapi 3 komponen: Umur Harapan Hidup, Pengetahuan (Sekolah), Standar Hidup Layak.

### Section 3 — IPG *(full-width)*
- **Indeks Pembangunan Gender (IPG)** — 94,2 (2024)
  Kesetaraan capaian pembangunan manusia antara laki-laki dan perempuan.

### Section 4 — TPT + APS *(dibagi 2 kolom)*
- **Tingkat Pengangguran Terbuka (TPT)** — 6,45% (Agustus 2025)
  Persentase pengangguran terhadap angkatan kerja.
- **Angka Partisipasi Sekolah (APS) SMA/SMK** — 88,24 (2025)
  Proporsi penduduk usia sekolah yang bersekolah.

### Section 5 — Kemiskinan + Gini Ratio *(dibagi 2 kolom)*
- **Angka Kemiskinan** — 4,44% (Maret 2025)
  Persentase penduduk di bawah garis kemiskinan.
- **Gini Ratio** — 0,385 (September 2025)
  Ukuran ketimpangan distribusi pendapatan.

> **Catatan Layout**: Section 1, 2, dan 3 ditampilkan **sendiri-sendiri** (full-width). Section 4 dan 5 ditampilkan dalam **2 kolom berdampingan** (paired). Setiap indikator memiliki card highlight, histogram tren, dan deskripsi insight masing-masing.

---

## 🗺️ Cakupan Wilayah

Dashboard mencakup **1 provinsi** dan **7 kabupaten/kota** di Kepulauan Riau:

- **Provinsi Kepulauan Riau** — Pusat pertumbuhan ekonomi nasional berbasis industri & maritim
- **Kota Batam** — Pusat industri manufaktur dan perdagangan internasional
- **Kota Tanjungpinang** — Pusat pemerintahan dan pariwisata budaya Melayu
- **Kab. Bintan** — Potensi pariwisata dan kawasan industri
- **Kab. Karimun** — Potensi pertambangan, pelabuhan, dan industri maritim
- **Kab. Natuna** — Potensi migas, perikanan, dan wilayah strategis nasional
- **Kab. Lingga** — Potensi perikanan, kelautan, dan ekonomi berbasis SDA
- **Kab. Kepulauan Anambas** — Potensi perikanan, migas, dan pariwisata bahari

---

## 🚀 Cara Penggunaan

1. Buka file `landingpage.html` langsung di browser (double-click)
2. Navigasi antar halaman melalui menu atau link di landing page
3. **Tidak memerlukan server lokal** — cukup buka langsung sebagai file HTML

### Teknologi

- **HTML5** — Struktur halaman
- **CSS3** — Styling dan responsive design
- **JavaScript (Vanilla)** — Interaktivitas dan carousel
- **Data Statis** — Semua data langsung di-hardcode di dalam file HTML

---

## 🎨 Fitur Visual

- **Hero Carousel** — Slideshow foto 7 kabupaten/kota dengan overlay informasi
- **Indikator Cards** — 8 kartu indikator strategis dengan ikon
- **Section Potensi Ekonomi** — Informasi potensi strategis:
  - 🐟 Ekonomi Maritim
  - 🏭 Industri dan Investasi Strategis
  - 🏖️ Pariwisata Internasional
  - 🌐 Konektivitas dan Perdagangan Internasional

---

## 📂 Catatan Data

- **Sumber**: Badan Pusat Statistik (BPS) Provinsi Kepulauan Riau
- **Pendekatan**: Data langsung ditempelkan di file HTML (tidak menggunakan fetch dari file JSON/JS)
- **Periode**: Data terkini hingga 2025
- **Penting**: Hindari penggunaan tabel untuk menampilkan data ekonomi maupun indikator lainnya. Gunakan card, grafik, atau format visual lain yang lebih sesuai untuk presentasi

### Data Acuan (Projek Lama)

Folder `assets/data/` berisi file referensi dari versi sebelumnya. Data ini **tidak di-load secara dinamis**, tetapi disimpan sebagai acuan saat mengisi data ke dalam HTML:

- **ekonomi.js** — Pertumbuhan Ekonomi (%, 2020–2024) per kab/kota, termasuk data triwulanan Kota Batam
- **ipm.js** — Indeks Pembangunan Manusia (2020–2025) per kab/kota, termasuk metadata komponen IPM Kota Batam
- **ipg.js** — Indeks Pembangunan Gender per kab/kota
- **kemiskinan.js** — Angka Kemiskinan per kab/kota
- **tpt.js** — Tingkat Pengangguran Terbuka per kab/kota
- **aps.js** — Angka Partisipasi Sekolah per kab/kota
- **gini.js** — Gini Ratio per kab/kota
- **inflasi.js** — Data inflasi per kab/kota
- **pdrb.json** — PDRB per Kapita
- **penduduk.json** — Data jumlah penduduk
- **indicators.json** — Konfigurasi indikator

---

## 🌿 Strategi Branching (Git)

Projek ini menggunakan strategi branching agar kolaborasi antar anggota tim tidak saling bentrok. Setiap anggota mengerjakan halaman kabupaten/kota di branch masing-masing.

### Branch Utama

- **`main`** — Branch bersih / production-ready. Hanya diisi ketika **semua halaman sudah selesai dan siap dipresentasikan**. Tidak boleh push langsung ke sini.
- **`develop`** *(default)* — Branch utama pengembangan. Semua perubahan dari branch kab/kota akan di-**merge** ke sini. Branch ini adalah tempat menggabungkan dan menguji semua halaman sebelum dipindahkan ke `main`.

### Branch Kabupaten/Kota

Setiap kabupaten/kota memiliki branch tersendiri. Anggota tim mengerjakan halamannya di branch yang sesuai, lalu merge ke `develop` ketika selesai.

- `feature/karimun` — Kab. Karimun (2101)
- `feature/bintan` — Kab. Bintan (2102)
- `feature/natuna` — Kab. Natuna (2103)
- `feature/lingga` — Kab. Lingga (2104)
- `feature/anambas` — Kab. Kepulauan Anambas (2105)
- `feature/batam` — Kota Batam (2171)
- `feature/tanjungpinang` — Kota Tanjung Pinang (2172)

### Alur Kerja

```
feature/karimun ──┐
feature/bintan ───┤
feature/natuna ───┤
feature/lingga ───┼──▶ develop ──▶ main
feature/anambas ──┤
feature/batam ────┤
feature/tanjungpinang ─┘
```

1. Pastikan berada di branch `develop`: `git checkout develop`
2. Buat branch kab/kota: `git checkout -b feature/karimun`
3. Kerjakan perubahan, lalu commit
4. Push ke remote: `git push origin feature/karimun`
5. Buat Pull Request ke `develop` untuk review
6. Setelah semua siap → merge `develop` ke `main`

---

## 📞 Kontak

**Badan Pusat Statistik Provinsi Kepulauan Riau**

- 📍 Jl. Ahmad Yani No. 21, Tanjungpinang 29124
- 📞 Telp. (0771) 4500155 / 4500150 (PST)
- 📠 Fax. (0771) 4500157
- 📧 Email: bps2100@bps.go.id
- 📱 WhatsApp: 0877-2000-2100

### Media Sosial

- [Instagram @bpskepri](https://instagram.com/bpskepri)
- [Facebook — BPS Provinsi Kepulauan Riau](https://www.facebook.com/bpskepri)
- [YouTube — BPS Provinsi Kepulauan Riau](https://www.youtube.com/channel/UCLJy0XZipF0snyJdx4az2EA)
