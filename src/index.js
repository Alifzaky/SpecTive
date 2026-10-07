/**
 * SpecTive - Main JavaScript Interactivity & Dynamic UI
 * Author: Alif (Informatika UMM)
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("SpecTive Interactive Engine Loaded 🚀");

    // ==========================================
    // 1. SISTEM NOTIFIKASI TOAST FUTURISTIK (Pengganti Alert)
    // ==========================================
    function showToast(message, type = 'success') {
        const existingToast = document.getElementById('spective-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'spective-toast';
        toast.className = `fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-500 transform translate-y-10 opacity-0 flex items-center gap-3 font-futuristic text-sm`;
        
        if (type === 'success') {
            toast.classList.add('bg-cardBg/95', 'border-cyan-400', 'text-cyan-300');
            toast.innerHTML = `<span class="text-xl">⚡</span> <div><p class="font-bold text-white">Berhasil!</p><p>${message}</p></div>`;
        } else {
            toast.classList.add('bg-cardBg/95', 'border-red-500', 'text-red-400');
            toast.innerHTML = `<span class="text-xl">⚠️</span> <div><p class="font-bold text-white">Perhatian!</p><p>${message}</p></div>`;
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        }, 50);

        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // ==========================================
    // 2. FUNGSI TOMBOL KONTAK (Form Submission)
    // ==========================================
    const contactForm = document.querySelector('#kontak form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = this.querySelector('input[type="text"]');
            const messageInput = this.querySelector('textarea');

            if (!nameInput || !messageInput) return;

            const name = nameInput.value.trim();
            const message = messageInput.value.trim();

            if (name === '' || message === '') {
                showToast('Mohon isi nama dan pesan Anda terlebih dahulu!', 'error');
                return;
            }

            showToast(`Terima kasih, ${name}! Pesan Anda telah dikirim ke sistem SpecTive.`);
            this.reset();
        });
    }

    // ==========================================
    // 3. INTERAKTIF PENCARI TOKO (Dynamic Search Result)
    // ==========================================
    const searchLocationBtn = document.querySelector('#lokasi button');
    const searchLocationInput = document.querySelector('#lokasi input');

    if (searchLocationBtn && searchLocationInput) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'mt-4 space-y-2 text-left max-w-xl mx-auto';
        searchLocationInput.parentNode.parentNode.appendChild(resultsContainer);

        searchLocationBtn.addEventListener('click', () => {
            const query = searchLocationInput.value.trim().toLowerCase();
            
            if (query === '') {
                showToast('Masukkan nama kota atau wilayah terlebih dahulu.', 'error');
                searchLocationInput.focus();
                resultsContainer.innerHTML = '';
                return;
            }

            showToast(`Mencari dealer resmi di area "${searchLocationInput.value}"...`);
            
            setTimeout(() => {
                resultsContainer.innerHTML = `
                    <div class="p-4 bg-darkBg border border-cyan-500/40 rounded-2xl animate-pulse">
                        <p class="text-xs text-cyan-400 font-mono">// Hasil Pencarian untuk: ${searchLocationInput.value}</p>
                        <div class="mt-2 space-y-2 text-xs text-gray-300">
                            <div class="p-2.5 bg-cardBg rounded-xl border border-gray-800 flex justify-between items-center">
                                <span>📍 <strong>SpecTive Store Official (${searchLocationInput.value})</strong> - Jl. Utama No. 45</span>
                                <span class="text-green-400 font-mono">Buka (Stok Ready)</span>
                            </div>
                            <div class="p-2.5 bg-cardBg rounded-xl border border-gray-800 flex justify-between items-center">
                                <span>📍 <strong>TechHub Partner Center</strong> - Mall Center Lt. 2</span>
                                <span class="text-green-400 font-mono">Buka (Stok Ready)</span>
                            </div>
                        </div>
                    </div>
                `;
            }, 600);
        });
    }

    // ==========================================
    // 4. EFEK INTERAKTIF KLIK TOMBOL NAVIGASI / HERO
    // ==========================================
    const ctaButtons = document.querySelectorAll('a[href="#rekomendasi"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Pengguna mengklik tombol eksplorasi rekomendasi.");
        });
    });

    // ==========================================
    // 5. FITUR BARU: FETCHING & DISPLAY DATA DARI API (Pertemuan 4)
    // ==========================================
    
    // Inisialisasi Endpoint & Target Container DOM
    const API_URL = "https://dummyjson.com/products/category/laptops";
    const recommendationSection = document.querySelector('#rekomendasi');

    if (recommendationSection) {
        // Buat container wadah grid baru secara dinamis di section rekomendasi
        const apiContainer = document.createElement('div');
        apiContainer.id = 'api-laptop-list';
        apiContainer.className = 'mt-12 grid grid-cols-1 md:grid-cols-3 gap-6';
        recommendationSection.appendChild(apiContainer);

        async function loadLaptopData() {
            // --- TASK 03: HANDLE STATE - LOADING STATE ---
            apiContainer.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-12 text-cyan-400">
                    <svg class="animate-spin h-8 w-8 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <p class="font-mono text-sm">Mengambil rekomendasi data dari API...</p>
                </div>
            `;

            try {
                // --- TASK 01: CONNECT TO API ---
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                // Parsing JSON ke JavaScript Object
                const data = await response.json();
                const laptops = data.products || [];

                // --- TASK 02: DISPLAY API DATA ---
                if (laptops.length === 0) {
                    apiContainer.innerHTML = `<p class="col-span-full text-center text-gray-400 font-mono">Tidak ada data laptop tersedia.</p>`;
                    return;
                }

                apiContainer.innerHTML = ''; // Bersihkan loading indicator

                // Render setiap item ke elemen HTML menggunakan Loop & Template Literals
                laptops.slice(0, 6).forEach(laptop => {
                    const laptopCard = `
                        <div class="bg-cardBg neon-border rounded-2xl p-5 hover:border-cyan-400/80 transition duration-300 flex flex-col justify-between">
                            <div>
                                <img src="${laptop.thumbnail}" alt="${laptop.title}" class="w-full h-40 object-cover rounded-xl mb-4 border border-gray-800">
                                <span class="text-xs uppercase tracking-widest text-cyan-400 font-mono">${laptop.brand || 'SpecTive'}</span>
                                <h3 class="text-lg font-bold text-white mb-2">${laptop.title}</h3>
                                <p class="text-gray-400 text-xs line-clamp-2 mb-4">${laptop.description}</p>
                            </div>
                            <div class="flex justify-between items-center border-t border-gray-800 pt-3 mt-2">
                                <span class="text-cyan-400 font-bold font-mono">$${laptop.price}</span>
                                <button class="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black font-semibold text-xs px-3 py-1.5 rounded-lg transition">
                                    Lihat Specs
                                </button>
                            </div>
                        </div>
                    `;
                    apiContainer.innerHTML += laptopCard;
                });

                showToast("Data rekomendasi laptop dari API berhasil dimuat!");

            } catch (error) {
                // --- TASK 03: HANDLE STATE - ERROR STATE ---
                console.error("Fetch API Error:", error);

                apiContainer.innerHTML = `
                    <div class="col-span-full text-center py-8 bg-cardBg neon-border rounded-2xl p-6">
                        <div class="text-red-400 text-4xl mb-2">⚠️</div>
                        <h4 class="text-white font-bold mb-1">Gagal Memuat Data API</h4>
                        <p class="text-gray-400 text-xs mb-4">${error.message}</p>
                        <button id="retry-api-btn" class="bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs px-4 py-2 rounded-xl hover:opacity-90 transition">
                            Coba Lagi
                        </button>
                    </div>
                `;

                // Re-bind listener untuk tombol Coba Lagi
                document.querySelector('#retry-api-btn')?.addEventListener('click', loadLaptopData);
                showToast("Gagal mengambil data dari server API.", "error");
            }
        }

        // Panggil fungsi fetching data saat aplikasi dimuat
        loadLaptopData();
    }
});