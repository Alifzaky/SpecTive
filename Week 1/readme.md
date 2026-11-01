# SpecTive - Platform Rekomendasi Laptop #1

**SpecTive** adalah sebuah aplikasi web berupa platform pembanding spesifikasi dan rekomendasi laptop terpercaya[cite: 19]. Aplikasi ini dibangun menggunakan arsitektur MVC (Model-View-Controller) murni dengan PHP di sisi *backend* dan Tailwind CSS v4 di sisi *frontend*[cite: 14, 17, 19].

## Apa itu Aplikasi SpecTive?

SpecTive merupakan katalog laptop spesifikasi tinggi yang menyajikan harga transparan serta rekomendasi hardware cerdas (*Smart Hardware Matrix*)[cite: 19]. Platform ini dirancang untuk memudahkan pengguna dalam melihat spesifikasi, harga, dan ketersediaan stok, serta membandingkan antar perangkat sebelum melakukan pembelian[cite: 12, 19].

## Target Pengguna

Target pengguna dari SpecTive meliputi:
*   Mahasiswa[cite: 19].
*   Profesional / Pekerja Industri Kreatif (seperti Content Creator, Desainer Grafis, dan 3D Modeler)[cite: 19].
*   Programmer / Developer[cite: 19].
*   Gamer[cite: 19].

## Masalah yang Dipecahkan (Problem Solving)

SpecTive hadir untuk memecahkan permasalahan krusial dalam pemilihan laptop di era saat ini:
*   **Mengatasi Lonjakan Harga:** Membantu pengguna menghindari kesalahan pembelian spesifikasi akibat mahalnya harga komponen global yang bisa menguras dompet[cite: 19].
*   **Mencegah *Bottleneck*:** Memberikan panduan kesesuaian antara beban kerja (*software*) dengan kapasitas RAM, jenis prosesor, dan sistem pendingin, sehingga mencegah *bottleneck*, *lag*, atau ketidakseimbangan performa saat melakukan *multitasking* berat maupun *rendering* resolusi tinggi[cite: 19].
*   **Efisiensi Anggaran:** Menjadi panduan investasi jangka panjang agar perangkat yang dibeli dapat bertahan hingga 4-5 tahun tanpa memerlukan *upgrade* berlebihan[cite: 19].
*   **Kebingungan Spesifikasi:** Menyediakan layanan konsultasi bagi pengguna yang bingung menentukan kebutuhan harian mereka, didukung oleh tim analis[cite: 19].

## Kelebihan Aplikasi

Berikut adalah fitur dan kelebihan utama yang ditawarkan SpecTive:

*   **Smart Hardware Matrix:** Menyediakan algoritma rekomendasi spesifikasi minimum berdasarkan kategori penggunaan, seperti:
    *   *Coding/Developer:* Min. RAM 16GB + Ryzen 5[cite: 19].
    *   *Desain Grafis / 3D:* Min. GPU 4GB + 100% sRGB[cite: 19].
    *   *Ketik & Kuliah Harian:* Min. RAM 8GB + SSD 512GB[cite: 19].
*   **Fitur Komparasi Otomatis:** Memungkinkan pengguna memilih hingga 3 laptop untuk dibandingkan secara berdampingan (spesifikasi, harga, dan deskripsi) dalam sebuah modal *pop-up*[cite: 12, 19].
*   **Pencarian dan Filter Dinamis (Real-time):** Dilengkapi dengan kolom pencarian serta filter cerdas berdasarkan Merek, Kategori (Gaming, Creator, dll), Kapasitas RAM, dan Rentang Harga, yang dirender secara langsung menggunakan DOM Manipulation[cite: 12, 19].
*   **Pencari Toko Offline Berbasis Lokasi (Geolocation API):** Terintegrasi dengan OpenStreetMap (Nominatim & Overpass API) untuk melacak toko komputer fisik di sekitar kota yang diinput pengguna[cite: 12, 19].
*   **Kamus Hardware (Glosarium):** Menghadirkan ensiklopedia mini yang dapat dicari untuk menjelaskan istilah-istilah teknis (*NVMe SSD*, *100% sRGB*, *Bottleneck*, dll)[cite: 19].
*   **UI/UX Modern dan Responsif:** Antarmuka dibangun dengan Tailwind CSS yang rapi, mendukung mode terang dan gelap (*Dark Mode*), serta efek *glassmorphism* (*backdrop-blur*) yang berjalan mulus baik di desktop maupun perangkat *mobile*[cite: 11, 14, 19].