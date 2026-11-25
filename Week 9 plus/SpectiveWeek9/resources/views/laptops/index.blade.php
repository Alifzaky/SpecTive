<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Laptop | SpecTive</title>
    <link rel="stylesheet" href="{{ asset('css/output.css') }}">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>try { document.documentElement.classList.toggle('dark', localStorage.getItem('theme') !== 'light'); } catch (e) { document.documentElement.classList.add('dark'); }</script>
</head>
<body class="min-h-screen bg-slate-100 text-slate-800 dark:bg-[#0b0f19] dark:text-slate-200 transition-colors duration-300">
    <header class="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0b0f19]/95 backdrop-blur">
        <div class="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
            <a href="{{ route('home') }}" class="flex items-center gap-3">
                <span class="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-extrabold text-slate-950">S</span>
                <span class="font-extrabold text-xl text-slate-900 dark:text-white">SpecTive</span>
                <span class="hidden sm:inline text-xs text-slate-500">/ Pengelolaan Laptop</span>
            </a>
            <div class="flex items-center gap-2">
                <button id="theme-toggle" type="button" class="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900" aria-label="Ubah tema"><i id="theme-icon" class="fa-solid fa-moon text-sky-500"></i></button>
                <a href="{{ route('home') }}" class="hidden sm:inline-block items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold hover:border-sky-500"><i class="fa-solid fa-arrow-left"></i> Halaman Utama</a>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-4">
            <div>
                <p class="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">Dashboard katalog</p>
                <h1 class="text-3xl sm:text-3xl font-black text-slate-900 dark:text-white">Kelola Data Laptop</h1>
                <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Tambah, ubah, dan hapus laptop yang tampil di halaman utama.</p>
            </div>
            <a href="{{ route('laptops.create') }}" class="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm px-4 py-3 rounded-xl shadow-lg shadow-sky-500/20"><i class="fa-solid fa-plus"></i> Tambah Laptop</a>
        </div>

        @if (session('success'))
            <div class="mb-4 rounded-xl border border-slate-200 bg-emerald-50 text-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-emerald-400 px-4 py-3 text-sm"><i class="fa-solid fa-circle-check mr-2"></i>{{ session('success') }}</div>
        @endif

        <section class="bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 border-b border-slate-200 dark:border-slate-800">
                <h2 class="font-bold text-slate-900 dark:text-white">Daftar Laptop</h2>
                <span class="text-xs text-slate-500">{{ $laptops->total() }} data tersimpan</span>
            </div>
            @if ($laptops->isEmpty())
                <div class="text-center py-16 px-6">
                    <i class="fa-solid fa-laptop text-3xl text-slate-400 dark:text-slate-500 mb-4"></i>
                    <h3 class="font-bold text-slate-800 dark:text-white">Belum ada data laptop</h3>
                    <p class="text-sm text-slate-500 mt-1 mb-4">Tambahkan laptop pertama untuk mengisi katalog.</p>
                    <a href="{{ route('laptops.create') }}" class="inline-flex bg-sky-500 text-slate-950 font-bold text-sm px-4 py-2.5 rounded-lg">Tambah Laptop</a>
                </div>
            @else
                <div class="overflow-x-auto">
                    <table class="w-full  text-sm ">
                        <thead class="bg-slate-50 dark:bg-slate-900 text-xs uppercase tracking-wider text-slate-500"><tr><th class="px-4 py-4">Laptop</th><th class="px-4 py-4">Merek</th><th class="px-4 py-4">Harga</th><th class="px-4 py-4">Status</th><th class="px-4 py-4 ">Aksi</th></tr></thead>
                        <tbody class="  dark:border-slate-800">
                            @foreach ($laptops as $laptop)
                                <tr class="border-b border-slate-200 dark:border-slate-800">
                                    <td class="px-4 py-4"><div class="flex items-center gap-3"><img src="{{ $laptop->thumbnail }}" alt="{{ $laptop->title }}" class="w-20 h-16 object-contain rounded-lg bg-slate-100 dark:bg-slate-900 p-2" onerror="this.src='https://placehold.co/120x90?text=Laptop'"><div><p class="font-semibold text-slate-900 dark:text-white">{{ $laptop->title }}</p><p class="text-xs text-slate-500 mt-1">{{ $laptop->specs }}</p></div></div></td>
                                    <td class="px-4 py-4 text-slate-600 dark:text-slate-400">{{ $laptop->brand }}</td>
                                    <td class="px-4 py-4 font-bold text-sky-600 dark:text-sky-400">{{ $laptop->formatted_price }}</td>
                                    <td class="px-4 py-4">
                                        @php($statusClass = $laptop->status === 'Tersedia' ? 'bg-emerald-500 text-white' : ($laptop->status === 'Pre-Order' ? 'bg-sky-500 text-white' : 'bg-red-500 text-white'))
                                        <span class="px-2.5 py-1 rounded-full text-xs font-semibold {{ $statusClass }}">{{ $laptop->status }}</span>
                                    </td>
                                    <td class="px-4 py-4"><div class="flex justify-end items-center gap-2">
                                        <a href="{{ route('laptops.edit', $laptop) }}" class="w-9 h-9 inline-flex items-center justify-center rounded-lg bg-sky-50 text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300" title="Edit laptop" aria-label="Edit laptop"><i class="fa-solid fa-pen"></i></a>
                                        <form action="{{ route('laptops.destroy', $laptop) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus data laptop ini?')">@csrf @method('DELETE')<button type="submit" class="w-9 h-9 inline-flex items-center justify-center rounded-lg bg-red-500 text-white bg-red-500 dark:bg-slate-900 dark:text-red-400" title="Hapus laptop" aria-label="Hapus laptop"><i class="fa-solid fa-trash"></i></button></form>
                                    </div></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="p-5 border-t border-slate-200 dark:border-slate-800">{{ $laptops->links() }}</div>
            @endif
        </section>
    </main>
    <script src="{{ asset('js/theme.js') }}"></script>
</body>
</html>
