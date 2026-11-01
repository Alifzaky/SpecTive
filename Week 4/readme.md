# SpecTive - Platform Rekomendasi Laptop

**SpecTive** adalah aplikasi web interaktif yang dirancang untuk membantu pengguna menemukan, membandingkan, dan memilih laptop sesuai dengan kebutuhan kerja maupun anggaran mereka. Project ini menggabungkan pemrosesan server-side menggunakan **PHP** (dengan konsep Object-Oriented Programming) dan interaktivitas frontend secara dinamis berbasis **JavaScript (ES6+)** serta styling modern menggunakan **Tailwind CSS**.

---

## 📸 Fitur Utama

- **Hybrid Server & Client-Side Rendering:** Data laptop diinisialisasi secara fleksibel melalui *PHP Class Model* (`Laptop`) dan disinkronkan ke JavaScript (`allProducts`) untuk respon filter secara instan.
- **Katalog & Filter Interaktif:**
  - **Pencarian Real-time:** Filter berdasarkan nama laptop, brand, atau kata kunci deskripsi.
  - **Filter Brand & Kategori:** Pengelompokan cepat untuk brand ternama (Apple, Asus, Lenovo, Dell, Acer) serta kategori spesifik (Gaming, Content Creator).
  - **Filter Spesifikasi & Harga:** Filter berdasarkan kapasitas RAM dan rentang harga.
- **Fitur Komparasi Laptop (VS Mode):** Pemilih hingga 3 laptop secara bersamaan untuk melihat perbandingan spesifikasi secara bersisian (*side-by-side modal*).
- **Integrasi API Eksternal:**
  - **Overpass API & Nominatim OpenStreetMap:** Pencarian lokasi toko fisik/komputer terdekat secara otomatis berdasarkan nama kota yang diinputkan pengguna.
  - **JSONPlaceholder API:** Simulasi pengiriman form formulir konsultasi hardware.
- **Theme Switcher (Dark / Light Mode):** Pengaturan tema tampilan yang tersimpan pada `localStorage` browser.
- **Kamus Hardware / Glosarium Interaktif:** Fitur edukasi singkat mengenai istilah-istilah teknologi laptop dengan filter pencarian cepat.
- **Desain Responsif & Modern:** Tampilan optimal di perangkat mobile, tablet, hingga desktop menggunakan Tailwind CSS.

---

## 📁 Struktur Berkas

```text
.
├── index.php                # Berkas utama (Halaman utama, struktur HTML, OOP Model PHP, & script bridge)
├── index.js                 # Logika JavaScript frontend (Filter, Modals, API Integration, Toast, & ScrollSpy)
├── main.css                 # File sumber Tailwind CSS v4 (@theme & custom utilities)
├── output.css               # File hasil kompilasi Tailwind CSS
├── components/
│   ├── navbar.html          # Komponen navigasi atas & menu mobile
│   └── footer.html          # Komponen footer halaman
└── README.md                # Dokumentasi proyek
```

---

## 🛠️ Teknologi yang Digunakan

- **Backend / Engine:** PHP 8.x (OOP, `JsonSerializable`, Array Mapping)
- **Frontend Scripting:** JavaScript ES6+ (Fetch API, Async/Await, DOM Manipulation, LocalStorage)
- **Styling & UI:** Tailwind CSS v4, FontAwesome 6 (Icons)
- **API Eksternal:**
  - [OpenStreetMap Nominatim API](https://nominatim.openstreetmap.org/) (Geocoding Nama Kota)
  - [Overpass API](https://overpass-api.de/) (Pencarian Node Store Komputer)
  - [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (Mockup HTTP Request Form)

---

## 🚀 Cara Menjalankan Proyek

### Persyaratan System
1. **Web Server dengan dukungan PHP** (misal: XAMPP, Laragon, MAMP, atau Local PHP CLI).
2. Browser modern (Chrome, Edge, Firefox, Safari).

### Langkah-langkah Instalasi

1. **Clone / Unduh Repositori**
   Unduh atau letakkan berkas proyek ini ke dalam direktori root server lokal Anda (misalnya `htdocs` untuk XAMPP atau `www` untuk Laragon).

2. **Jalankan Web Server**
   - **Menggunakan XAMPP/Laragon:** Buka Control Panel dan jalankan service **Apache**.
   - **Menggunakan PHP Built-in Server:** Buka terminal pada direktori proyek dan jalankan perintah:
     ```bash
     php -S localhost:8000
     ```

3. **Akses Aplikasi**
   Buka browser dan akses halaman melalui URL:
   `http://localhost/path-to-project/index.php` atau `http://localhost:8000` (jika menggunakan CLI server).

---

## 💡 Penjelasan Arsitektur & Logika Kunci

### 1. Object-Oriented Programming (PHP)
Setiap data laptop direpresentasikan oleh objek `Laptop` yang dibungkus dalam class dengan encapsulasi atribut `private`. Data dikirim dari PHP ke JavaScript melalui serialisasi JSON:
```php
class Laptop implements JsonSerializable {
    private $id, $title, $brand, $price, $thumbnail, $description, $specs, $status;
    // ... getter methods ...
    public function jsonSerialize(): mixed {
        return get_object_vars($this);
    }
}
```

### 2. Bridge PHP ke JavaScript
Variabel `$laptops` pada PHP dikonversi ke format JSON native agar dapat langsung diolah secara dinamis oleh skrip `index.js`:
```html
<script>
    let allProducts = <?= json_encode($laptops) ?>;
</script>
<script src="./index.js"></script>
```

---

## 📝 Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan portofolio web development.