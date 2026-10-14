<?php
// ==========================================
// 1. PHP VARIABLE & ARRAY (Data Server-Side)
// ==========================================
$laptops = [
    [
        "id" => 101,
        "title" => "Apple MacBook Pro 14 Inch M3 Pro",
        "brand" => "Apple",
        "price" => 1999.99,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png",
        "description" => "Laptop kencang untuk kebutuhan video editing 4K, software engineering, dan desain profesional.",
        "specs" => "18GB RAM | 512GB SSD",
        "status" => "Tersedia"
    ],
    [
        "id" => 102,
        "title" => "Asus ROG Zephyrus G16 Gaming",
        "brand" => "Asus",
        "price" => 2199.00,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png",
        "description" => "Laptop gaming ultra-thin dengan layar OLED 240Hz dan kartu grafis RTX seri terbaru.",
        "specs" => "32GB RAM | 1TB SSD",
        "status" => "Pre-Order"
    ],
    [
        "id" => 103,
        "title" => "Lenovo ThinkPad X1 Carbon Gen 11",
        "brand" => "Lenovo",
        "price" => 1649.50,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/thumbnail.png",
        "description" => "Standar industri laptop bisnis dengan ketahanan militer dan keyboard terbaik di kelasnya.",
        "specs" => "16GB RAM | 512GB SSD",
        "status" => "Tersedia"
    ],
    [
        "id" => 104,
        "title" => "Dell XPS 15 9530 Creator Edition",
        "brand" => "Dell",
        "price" => 1899.99,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png",
        "description" => "Layar InfinityEdge 3.5K Touchscreen dengan kekuatan prosesor Intel Core i9.",
        "specs" => "32GB RAM | 1TB SSD",
        "status" => "Habis"
    ],
    [
        "id" => 105,
        "title" => "Acer Swift Go 14 AI",
        "brand" => "Acer",
        "price" => 1199.00,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png", 
        "description" => "Laptop tipis bertenaga AI dengan sistem pendingin kipas ganda dan layar OLED warna akurat.",
        "specs" => "32GB RAM | Intel Core Ultra 7",
        "status" => "Tersedia"
    ],
    [
        "id" => 106,
        "title" => "HP Spectre x360 14",
        "brand" => "HP",
        "price" => 1499.50,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png",
        "description" => "Laptop 2-in-1 premium dengan desain elegan dan baterai tahan seharian penuh.",
        "specs" => "16GB RAM | 1TB SSD",
        "status" => "Pre-Order"
    ],
    [
        "id" => 107,
        "title" => "MSI Stealth 16 Studio",
        "brand" => "MSI",
        "price" => 1750.00,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png",
        "description" => "Kombinasi sempurna antara performa gaming dan tampilan profesional untuk studio kreatif.",
        "specs" => "32GB RAM | RTX 4070",
        "status" => "Tersedia"
    ],
    [
        "id" => 108,
        "title" => "Huawei MateBook X Pro 2024",
        "brand" => "Huawei",
        "price" => 1599.00,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/thumbnail.png",
        "description" => "Bodi magnesium super ringan dengan rasio layar-ke-bodi tertinggi di kelasnya.",
        "specs" => "16GB RAM | 1TB NVMe",
        "status" => "Habis"
    ],
    [
        "id" => 109,
        "title" => "Razer Blade 15 Advanced",
        "brand" => "Razer",
        "price" => 2499.99,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png",
        "description" => "Sasis aluminium CNC dengan performa gaming kelas berat tanpa kompromi.",
        "specs" => "32GB RAM | 240Hz QHD",
        "status" => "Tersedia"
    ],
    [
        "id" => 110,
        "title" => "Gigabyte AERO 14 OLED",
        "brand" => "Gigabyte",
        "price" => 1349.00,
        "thumbnail" => "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png",
        "description" => "Dikalibrasi khusus dari pabrik untuk akurasi warna mutlak bagi pekerja industri kreatif.",
        "specs" => "16GB RAM | RTX 4050",
        "status" => "Tersedia"
    ]
];

// ==========================================
// 2. PHP FUNCTION (Format Harga)
// ==========================================
function formatPrice($price) {
    return "$" . number_format($price, 2, '.', ',');
}
?>

<!DOCTYPE html>
<html lang="id" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SpecTive - Platform Rekomendasi Laptop (PHP Version)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .nav-item::after {
        content: ''; position: absolute; bottom: 0; left: 50%;
        width: 0; height: 2px; background-color: #38bdf8;
        transition: all 0.3s ease-in-out; transform: translateX(-50%);
    }
    .nav-item.active::after, .nav-item:hover::after { width: 80%; }
  </style>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: { colors: { brand: { dark: '#0b0f19', card: '#161e2e', border: '#1e293b', accent: '#38bdf8' } } } }
    }
  </script>
</head>
<body class="bg-slate-100 text-slate-800 dark:bg-[#0b0f19] dark:text-slate-200 min-h-screen font-sans antialiased selection:bg-sky-500 selection:text-slate-900 overflow-x-hidden transition-colors duration-300">

  <!-- NAVBAR CONTAINER -->
  <div id="navbar-container"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-16 sm:space-y-24">
    
    <!-- HEADER -->
    <header id="beranda" class="text-center max-w-3xl mx-auto space-y-5 pt-8 sm:pt-12 scroll-mt-24">
      <span class="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 px-3.5 py-1.5 rounded-full shadow-sm">
        <span class="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse"></span>
        Platform Rekomendasi Laptop #1
      </span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
        Temukan Laptop Terbaik Sesuai Kebutuhanmu
      </h1>
      <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed px-4 sm:px-0">
        Katalog laptop spesifikasi tinggi dengan harga transparan yang kini didukung oleh pemrosesan Server-Side PHP.
      </p>
    </header>

    <!-- EDUKASI & MATRIX -->
    <section id="edukasi" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 p-5 sm:p-8 rounded-2xl shadow-sm scroll-mt-24">
      <div class="lg:col-span-7 space-y-4">
        <div class="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
          <i class="fa-solid fa-lightbulb"></i> Tips & Panduan Pembeli
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
          Kenapa Harus Cermat Memilih Laptop di Era Komponen Mahal?
        </h2>
        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Lonjakan harga komponen global membuat salah beli spesifikasi menjadi kesalahan fatal yang menguras dompet. Mahasiswa dan profesional dituntut memahami kesesuaian antara beban kerja (software) dengan kapasitas RAM, jenis prosesor, serta sistem pendingin.
        </p>
        <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300 pt-2">
          <li class="flex items-start gap-3 bg-slate-50 dark:bg-[#161e2e]/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800/50">
            <i class="fa-solid fa-circle-check text-sky-600 dark:text-sky-400 mt-1"></i>
            <span><strong>Mencegah Bottleneck:</strong> Performa optimal saat multitasking berat dan rendering video resolusi tinggi tanpa lag.</span>
          </li>
          <li class="flex items-start gap-3 bg-slate-50 dark:bg-[#161e2e]/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800/50">
            <i class="fa-solid fa-circle-check text-sky-600 dark:text-sky-400 mt-1"></i>
            <span><strong>Efisiensi Anggaran:</strong> Investasi jangka panjang yang tahan hingga 4-5 tahun ke depan tanpa perlu upgrade berlebih.</span>
          </li>
        </ul>
      </div>

      <div id="matrix" class="lg:col-span-5 bg-slate-50 dark:bg-[#161e2e] border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 space-y-5 shadow-xl scroll-mt-24">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 text-lg">
              <i class="fa-solid fa-microchip"></i>
            </div>
            <div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Smart Hardware Matrix</h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Algoritma spesifikasi rekomendasi</p>
            </div>
          </div>
          <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 px-2 py-1 rounded">Active</span>
        </div>
        <div class="space-y-3">
          <div class="bg-white dark:bg-[#0b0f19] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
            <span class="text-slate-600 dark:text-slate-400 font-medium">Coding / Developer</span>
            <span class="font-semibold text-sky-600 dark:text-sky-300">Min. RAM 16GB + Ryzen 5</span>
          </div>
          <div class="bg-white dark:bg-[#0b0f19] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
            <span class="text-slate-600 dark:text-slate-400 font-medium">Desain Grafis / 3D</span>
            <span class="font-semibold text-purple-600 dark:text-purple-300">Min. GPU 4GB + 100% sRGB</span>
          </div>
          <div class="bg-white dark:bg-[#0b0f19] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
            <span class="text-slate-600 dark:text-slate-400 font-medium">Ketik & Kuliah Harian</span>
            <span class="font-semibold text-emerald-600 dark:text-emerald-300">Min. RAM 8GB + SSD 512GB</span>
          </div>
        </div>
      </div>
    </section>

    <!-- KATALOG & PHP RENDER -->
    <section id="katalog" class="space-y-6 scroll-mt-24">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span class="w-3 h-3 rounded-full bg-sky-500 dark:bg-sky-400"></span>
            Katalog Rekomendasi
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Gunakan pencarian atau filter merk untuk mempersempit pilihan.</p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div class="relative w-full sm:w-64">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input type="text" id="search-input" placeholder="Cari laptop, brand..." class="w-full bg-white dark:bg-[#161e2e] border border-slate-300 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-200 pl-9 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-sky-500 transition-all" />
          </div>
          <span id="product-count" class="text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 px-4 py-2.5 rounded-lg text-center whitespace-nowrap">
            Memuat <?= count($laptops) ?> Laptop
          </span>
        </div>
      </div>

      <!-- Filter Brand -->
      <div class="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide text-sm w-full snap-x">
        <span class="text-slate-600 dark:text-slate-400 font-medium mr-2 text-xs whitespace-nowrap sticky left-0 bg-slate-100 dark:bg-[#0b0f19] pr-2 z-10">Filter Merk:</span>
        <button onclick="filterBrand('all', this)" class="brand-btn snap-start bg-sky-500 text-slate-950 font-bold px-4 py-2 rounded-lg transition-all transform active:scale-95 whitespace-nowrap">Semua</button>
        <button onclick="filterBrand('Apple', this)" class="brand-btn snap-start bg-white dark:bg-[#161e2e] text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-800 transition-all">Apple</button>
        <button onclick="filterBrand('Asus', this)" class="brand-btn snap-start bg-white dark:bg-[#161e2e] text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-800 transition-all">Asus</button>
        <button onclick="filterBrand('Lenovo', this)" class="brand-btn snap-start bg-white dark:bg-[#161e2e] text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-800 transition-all">Lenovo</button>
        <button onclick="filterBrand('Dell', this)" class="brand-btn snap-start bg-white dark:bg-[#161e2e] text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-800 transition-all">Dell</button>
        <button onclick="filterBrand('Acer', this)" class="brand-btn snap-start bg-white dark:bg-[#161e2e] text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-800 transition-all">Acer</button>
      </div>

      <!-- Filter Lanjutan -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <select id="filter-category" onchange="triggerCustomFilters()" class="bg-white dark:bg-[#161e2e] border border-slate-300 dark:border-slate-700/85 text-xs text-slate-700 dark:text-slate-300 px-3 py-2.5 rounded-lg focus:outline-none focus:border-sky-500">
          <option value="all">Semua Kategori</option>
          <option value="gaming">Gaming & Berat</option>
          <option value="creator">Content Creator / Desain</option>
        </select>
        <select id="filter-ram" onchange="triggerCustomFilters()" class="bg-white dark:bg-[#161e2e] border border-slate-300 dark:border-slate-700/85 text-xs text-slate-700 dark:text-slate-300 px-3 py-2.5 rounded-lg focus:outline-none focus:border-sky-500">
          <option value="all">Semua Kapasitas RAM</option>
          <option value="16">RAM 16GB</option>
          <option value="32">RAM 32GB / Lebih</option>
        </select>
        <select id="filter-price" onchange="triggerCustomFilters()" class="bg-white dark:bg-[#161e2e] border border-slate-300 dark:border-slate-700/85 text-xs text-slate-700 dark:text-slate-300 px-3 py-2.5 rounded-lg focus:outline-none focus:border-sky-500">
          <option value="all">Semua Rentang Harga</option>
          <option value="low">Di bawah $1500</option>
          <option value="high">Di atas $1500</option>
        </select>
      </div>
      
      <!-- Comparison Bar -->
      <div id="comparison-bar" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-[#161e2e]/95 border border-sky-500/50 backdrop-blur-xl px-6 py-3.5 rounded-2xl shadow-2xl z-40 hidden flex items-center gap-6 text-sm">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
          <span id="compare-count" class="font-bold text-slate-900 dark:text-white">0 Laptop Dipilih</span>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="openComparisonModal()" class="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-md">Bandingkan</button>
          <button onclick="clearComparison()" class="text-xs text-slate-500 hover:text-red-500 transition-colors">Reset</button>
        </div>
      </div>
      
      <!-- GRID LAPTOP VIA PHP LOOP -->
      <main id="laptop-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        <?php foreach ($laptops as $laptop) : ?>
          <article class="group bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800/90 hover:border-sky-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-sm">
            
            <div class="w-full h-48 bg-slate-100 dark:bg-[#0f172a] p-4 flex items-center justify-center relative">
              <img src="<?= $laptop['thumbnail'] ?>" alt="<?= $laptop['title'] ?>" class="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
              
              <?php if ($laptop['status'] === "Tersedia") : ?>
                  <span class="absolute top-2 right-2 text-[10px] font-bold bg-emerald-500 text-white px-2 py-1 rounded">Ready</span>
              <?php elseif ($laptop['status'] === "Pre-Order") : ?>
                  <span class="absolute top-2 right-2 text-[10px] font-bold bg-sky-500 text-white px-2 py-1 rounded">PO</span>
              <?php else : ?>
                  <span class="absolute top-2 right-2 text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded">Habis</span>
              <?php endif; ?>
            </div>

            <div class="p-5 flex flex-col flex-grow">
              <div class="flex justify-between mb-1.5">
                <span class="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 rounded"><?= $laptop['brand'] ?></span>
                <span class="text-[10px] text-slate-500 font-mono"><?= $laptop['specs'] ?></span>
              </div>
              <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2"><?= $laptop['title'] ?></h3>
              <p class="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow"><?= $laptop['description'] ?></p>
              
              <div class="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                <span class="text-lg font-extrabold text-sky-600 dark:text-sky-400"><?= formatPrice($laptop['price']) ?></span>
                
                <!-- Tombol interaksi JS (Bandingkan & Detail) -->
                <div class="flex gap-2">
                    <label class="text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1 cursor-pointer bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 hover:border-sky-500">
                        <input type="checkbox" value="<?= $laptop['id'] ?>" onchange="toggleCompare(<?= $laptop['id'] ?>, this)" class="accent-sky-500"> VS
                    </label>
                    <button onclick="openModal(<?= $laptop['id'] ?>)" class="bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors">Detail</button>
                </div>
              </div>
            </div>
          </article>
        <?php endforeach; ?>
        
      </main>
    </section>

    <!-- CARI LOKASI -->
    <section id="lokasi" class="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 p-6 sm:p-10 rounded-2xl space-y-6 shadow-sm scroll-mt-24">
      <div class="text-center max-w-2xl mx-auto space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Cari Toko Offline Terdekat</h2>
        <p class="text-slate-600 dark:text-slate-400 text-sm">Masukkan nama kota untuk menemukan mitra resmi atau toko komputer terdekat di daerahmu.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <input type="text" id="lokasi-input" placeholder="Contoh: Malang, Surabaya..." class="w-full sm:w-80 bg-white dark:bg-[#161e2e] border border-slate-300 dark:border-slate-700/80 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-sky-500">
          <button id="lokasi-btn" class="w-full sm:w-auto bg-sky-500 text-slate-950 font-bold text-sm px-8 py-3 rounded-lg">Lacak Lokasi</button>
        </div>
      </div>
      <div id="lokasi-results" class="max-w-2xl mx-auto space-y-3"></div>
    </section>

    <!-- FAQ & KONSULTASI -->
    <section id="faq" class="bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-xl scroll-mt-24">
      <div class="lg:col-span-5 space-y-5">
        <span class="inline-flex items-center gap-2 text-xs font-bold text-sky-600 uppercase bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full">
          <i class="fa-solid fa-headset"></i> Layanan Konsultasi
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Bingung Memilih Spesifikasi?</h2>
        <p class="text-slate-600 dark:text-slate-400 text-sm">Kirimkan pesan mengenai kebutuhan harianmu. Tim analis kami siap membantu.</p>
      </div>

      <div class="lg:col-span-7 bg-slate-50 dark:bg-[#0b0f19] p-5 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800">
        <form id="consultation-form" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nama Lengkap</label>
              <input type="text" id="consult-name" required placeholder="Cth: Alif Zaky" class="w-full bg-white dark:bg-[#161e2e] border border-slate-300 px-4 py-3 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Aktif</label>
              <input type="email" id="consult-email" required placeholder="nama@email.com" class="w-full bg-white dark:bg-[#161e2e] border border-slate-300 px-4 py-3 rounded-lg" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Kebutuhan & Budget</label>
            <textarea id="consult-message" rows="4" required class="w-full bg-white dark:bg-[#161e2e] border border-slate-300 px-4 py-3 rounded-lg resize-none"></textarea>
          </div>
          <button type="submit" class="w-full bg-sky-500 text-slate-950 font-bold text-sm py-3.5 rounded-lg flex items-center justify-center gap-2">
            <i class="fa-solid fa-paper-plane"></i> Kirim Pesan Konsultasi
          </button>
        </form>
      </div>
    </section>
  </div>

  <!-- GLOSARIUM -->
  <section id="glosarium" class="max-w-7xl mx-auto px-4 sm:px-8 mt-16 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 p-6 sm:p-10 rounded-2xl space-y-6 shadow-sm scroll-mt-24">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Kamus Hardware & Glosarium Mini</h2>
      </div>
      <div class="relative w-full md:w-72">
        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input type="text" id="glossary-search" placeholder="Cari istilah..." oninput="filterGlossary()" class="w-full bg-white dark:bg-[#161e2e] border border-slate-300 pl-9 pr-3 py-2.5 rounded-lg" />
      </div>
    </div>
    <div id="glossary-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="glossary-item bg-slate-50 dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2">
        <div class="flex justify-between"><h3 class="font-bold text-sm">NVMe SSD</h3><span class="text-[10px] bg-sky-50 px-2 rounded">Storage</span></div>
        <p class="text-xs text-slate-600 dark:text-slate-400">Media penyimpanan super cepat berbasis jalur PCIe.</p>
      </div>
      <div class="glossary-item bg-slate-50 dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2">
        <div class="flex justify-between"><h3 class="font-bold text-sm">100% sRGB</h3><span class="text-[10px] bg-purple-50 px-2 rounded">Display</span></div>
        <p class="text-xs text-slate-600 dark:text-slate-400">Standar akurasi warna layar yang wajib dimiliki creator.</p>
      </div>
      <div class="glossary-item bg-slate-50 dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2">
        <div class="flex justify-between"><h3 class="font-bold text-sm">Bottleneck</h3><span class="text-[10px] bg-amber-50 px-2 rounded">Performance</span></div>
        <p class="text-xs text-slate-600 dark:text-slate-400">Kondisi ketidakseimbangan komponen kinerja sistem.</p>
      </div>
    </div>
  </section>

  <!-- FOOTER CONTAINER -->
  <div id="footer-container" class="mt-16"></div>

  <!-- MODAL DETAIL -->
  <div id="detail-modal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
    <div class="bg-white dark:bg-[#161e2e] border border-slate-300 dark:border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 relative">
        <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-500 text-lg w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button>
        <div class="flex items-center gap-4 border-b pb-4">
          <img id="modal-img" src="" alt="" class="w-20 h-20 object-contain p-2 border rounded-xl">
          <div>
            <span id="modal-brand" class="text-xs font-bold uppercase text-sky-600">BRAND</span>
            <h3 id="modal-title" class="text-lg font-bold text-slate-900 dark:text-white">Nama Laptop</h3>
            <p id="modal-price" class="text-xl font-extrabold text-sky-600 mt-1">$0</p>
          </div>
        </div>
        <div class="space-y-3 text-sm">
          <h4 class="font-semibold mb-1">Deskripsi Spesifikasi:</h4>
          <p id="modal-desc" class="text-slate-600 dark:text-slate-400 text-xs"></p>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button onclick="closeModal()" class="bg-slate-200 text-slate-800 text-xs px-4 py-2.5 rounded-lg">Tutup</button>
        </div>
    </div>
  </div>

  <!-- MODAL COMPARISON -->
  <div id="comparison-modal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
    <div class="bg-white dark:bg-[#161e2e] border border-slate-300 dark:border-slate-700 rounded-2xl max-w-4xl w-full p-6 space-y-5 relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeComparisonModal()" class="absolute top-4 right-4 text-slate-500 text-lg w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><i class="fa-solid fa-xmark"></i></button>
      <h3 class="text-xl font-bold border-b pb-3">Komparasi Spesifikasi</h3>
      <div id="comparison-content" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
  </div>

  <!-- TRANSFER DATA PHP KE JAVASCRIPT -->
  <script>
      // Agar fungsi filter JS, fitur comparison, dan modal detail tetap bekerja,
      // kita harus mengirim data array PHP $laptops ke variabel Javascript allProducts.
      // Hal ini menjembatani perpaduan antara backend (PHP) dan frontend (JS).
      let allProducts = <?= json_encode($laptops) ?>;
  </script>

  <!-- Panggil file index.js (pastikan fetchLaptops() didalamnya sudah dimatikan/dihapus) -->
  <script src="./index.js"></script>
</body>
</html>