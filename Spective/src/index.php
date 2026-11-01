<?php
// ==========================================
// 1. PHP VARIABLE & ARRAY
// Menyimpan 10 data laptop ke dalam Array Multi-dimensi
// ==========================================
$laptops = [
  
];

// ==========================================
// 2. PHP FUNCTION[cite: 12]
// Membuat fungsi sederhana untuk format harga mata uang
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
  <title>SpecTive - PHP Server Side Katalog</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: { colors: { brand: { dark: '#0b0f19', card: '#161e2e' } } } }
    }
  </script>
</head>
<body class="bg-slate-100 text-slate-800 dark:bg-[#0b0f19] dark:text-slate-200 min-h-screen font-sans antialiased">

  <!-- NAVBAR CONTAINER -->
  <div id="navbar-container"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-16">
    
    <!-- HEADER -->
    <header class="text-center max-w-3xl mx-auto space-y-5 pt-8">
      <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 px-3.5 py-1.5 rounded-full">
        PHP Server-Side Render
      </span>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
        Katalog Rekomendasi Laptop
      </h1>
      <p class="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
        Semua data di bawah ini dirender secara dinamis oleh Web Server menggunakan PHP Procedural sebelum dikirim ke browser Anda.
      </p>
    </header>

    <!-- KATALOG GRID PHP -->
    <section id="katalog" class="space-y-6">
      
      <main id="laptop-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        <?php 
        // ==========================================
        // 3. PHP LOOPING[cite: 12]
        // Melakukan perulangan untuk memproses banyak data array
        // ==========================================
        foreach ($laptops as $laptop) : 
        ?>
          <article class="group bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800/90 hover:border-sky-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm flex flex-col justify-between">
            
            <div class="w-full h-48 bg-slate-100 dark:bg-[#0f172a] p-4 flex items-center justify-center relative">
              <img src="<?= $laptop['thumbnail'] ?>" alt="<?= $laptop['title'] ?>" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              
              <?php 
              // ==========================================
              // 4. PHP CONDITIONAL[cite: 12]
              // Menentukan warna badge berdasarkan status laptop
              // ==========================================
              if ($laptop['status'] === "Tersedia") : ?>
                  <span class="absolute top-3 right-3 text-[10px] font-bold bg-emerald-500 text-white px-2.5 py-1 rounded-md shadow-md">Ready</span>
              <?php elseif ($laptop['status'] === "Pre-Order") : ?>
                  <span class="absolute top-3 right-3 text-[10px] font-bold bg-sky-500 text-white px-2.5 py-1 rounded-md shadow-md">Pre-Order</span>
              <?php else : ?>
                  <span class="absolute top-3 right-3 text-[10px] font-bold bg-red-500 text-white px-2.5 py-1 rounded-md shadow-md">Habis</span>
              <?php endif; ?>
            </div>

            <div class="p-5 flex flex-col flex-grow">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded"><?= $laptop['brand'] ?></span>
                <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono"><?= $laptop['specs'] ?></span>
              </div>
              <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2"><?= $laptop['title'] ?></h3>
              <p class="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow"><?= $laptop['description'] ?></p>
              
              <div class="pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-auto flex items-center justify-between">
                <!-- Memanggil Function PHP formatPrice() -->
                <span class="text-lg font-extrabold text-sky-600 dark:text-sky-400"><?= formatPrice($laptop['price']) ?></span>
                <button class="bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">Beli</button>
              </div>
            </div>

          </article>
        <?php endforeach; ?>
        
      </main>
    </section>

  </div>

  <!-- FOOTER CONTAINER -->
  <div id="footer-container"></div>

  <!-- Script JS (Filter JS dimatikan karena sudah dirender PHP) -->
  <script src="./index.js"></script>
</body>
</html>