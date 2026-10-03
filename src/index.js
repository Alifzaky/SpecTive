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
        // Hapus toast sebelumnya jika ada
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

        // Animasi masuk
        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        }, 50);

        // Hilang otomatis setelah 4 detik
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
        // Ubah tombol jadi tipe submit atau tangkap event submit form
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

            // Simulasi pengiriman data berhasil
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
        // Buat container untuk hasil pencarian secara dinamis di bawah input
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

            // Simulasi data toko berdasarkan input kota
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
});