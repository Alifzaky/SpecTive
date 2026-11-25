<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Laptop | SpecTive</title>
    <link rel="stylesheet" href="{{ asset('css/output.css') }}"><link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>try { document.documentElement.classList.toggle('dark', localStorage.getItem('theme') !== 'light'); } catch (e) { document.documentElement.classList.add('dark'); }</script>
</head>
<body class="min-h-screen bg-slate-100 text-slate-800 dark:bg-[#0b0f19] dark:text-slate-200 transition-colors duration-300">
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0b0f19]/95">
        <div class="max-w-4xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
            <a href="{{ route('home') }}" class="font-extrabold text-xl text-slate-900 dark:text-white">SpecTive</a>
            <button id="theme-toggle" class="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700" aria-label="Ubah tema"><i id="theme-icon" class="fa-solid fa-moon text-sky-500"></i></button>
        </div>
    </header>
    <main class="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        <a href="{{ route('laptops.manage') }}" class="text-sm text-sky-600 dark:text-sky-400 "><i class="fa-solid fa-arrow-left mr-2"></i>Kembali ke pengelolaan laptop</a>
        <div class="mt-4 mb-4"><p class="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">Katalog SpecTive</p><h1 class="text-3xl font-black text-slate-900 dark:text-white">Tambah Laptop</h1><p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Isi informasi laptop. Data akan langsung disimpan ke database.</p></div>
        @include('laptops.form', ['action' => route('laptops.store'), 'method' => 'POST', 'buttonText' => 'Simpan Laptop'])
    </main>
    <script src="{{ asset('js/theme.js') }}"></script>
</body>
</html>
