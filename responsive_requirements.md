# Kebutuhan Desain Responsif (Responsive Design)

Dokumen ini menguraikan kebutuhan dan strategi untuk menerapkan desain yang responsif di seluruh proyek Dashboard Kepulauan Riau. Tujuannya adalah untuk memastikan dashboard memberikan pengalaman UI/UX yang optimal untuk **setiap ukuran perangkat yang ada di pasaran**.

**Target Prioritas Utama:** Samsung Galaxy Tab S4 (1280 × 800 px)

### Sistem 3-Tier Breakpoints

| Tier | Rentang | Contoh Perangkat |
|------|---------|-----------------|
| **Desktop** | ≥ 1280px | Tab S4 landscape, monitor, laptop |
| **Tablet** | 800px – 1279px | Tab S4 portrait, iPad |
| **Mobile** | < 800px | Smartphone |
| **Mobile Small** | < 480px | iPhone SE, ponsel kecil |

### Daftar _Breakpoints_ CSS

- **Mobile Small (sm):** `max-width: 480px` — iPhone SE, ponsel Android kecil.
- **Mobile (md):** `max-width: 799px` — Smartphone standar.
- **Tablet (lg):** `max-width: 1279px` — Tab S4 portrait & tablet lain.
- **Desktop (xl):** ≥ 1280px — Tab S4 landscape & layar besar.

## 1. Penyesuaian Grid dan Tata Letak (Layout)

- **Grid Kartu Indikator (`.indikator-container`):**
  - **Desktop (≥ 1280px):** 4 kolom kartu per baris.
  - **Tablet (800px - 1279px):** 2 kolom kartu per baris.
  - **Mobile (< 800px):** 2 kolom (lebih kecil) atau 1 kolom.
  - **Mobile Small (< 480px):** 1 kolom penuh.

- **Grid Galeri/Video (`.video-testi-grid`, `.reels-grid`):**
  - **Desktop (≥ 1280px):** 3-4 kolom.
  - **Tablet (800px - 1279px):** 2 kolom.
  - **Mobile (< 800px):** 1 kolom vertikal.

## 2. Navigasi (`nav.style-2`)

- **Desktop (≥ 1280px):** Daftar wilayah tersusun horizontal.
- **Tablet & Mobile (< 1280px):** Menu hamburger dengan sidebar slide-in.

## 3. Modal / Kotak Popup

- **Desktop & Tablet:** Tampilan terbagi dua sisi (kiri: gambar/definisi, kanan: grafik/_insight_).
- **Mobile (< 800px):** Terbagi menjadi tersusun atas-bawah. Modal 95% lebar layar.

## 4. Strategi Implementasi

1.  **CSS Media Queries:** Breakpoint utama di `shared.css` dengan `@media (max-width: 1279px)` untuk tablet dan `@media (max-width: 799px)` untuk mobile.
2.  **Flexbox / CSS Grid:** Untuk pembungkusan baris dan perataan otomatis.
3.  **Pengujian:** Chrome DevTools pada viewport 1280×800, 800×1280, dan 412×915.
