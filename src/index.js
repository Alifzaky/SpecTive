document.addEventListener('DOMContentLoaded', () => {
    console.log("SpecTive Interactive Engine Loaded 🚀");

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

    const searchLocationBtn = document.getElementById('lokasi-btn');
    const searchLocationInput = document.getElementById('lokasi-input');
    const resultsContainer = document.getElementById('lokasi-results');

    if (searchLocationBtn && searchLocationInput && resultsContainer) {
        searchLocationBtn.addEventListener('click', async () => {
            let city = searchLocationInput.value.trim();
            if (city === '') {
                showToast('Masukkan nama kota terlebih dahulu.', 'error');
                searchLocationInput.focus();
                resultsContainer.innerHTML = '';
                return;
            }

            // Normalisasi penulisan nama kota
            city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            showToast(`Melacak toko komputer asli di area "${city}"...`, 'success');
            
            // UI Loading Animasi
            resultsContainer.innerHTML = `
                <div class="text-center text-slate-400 text-sm py-8 animate-pulse">
                    <i class="fa-solid fa-satellite-dish fa-beat text-3xl text-sky-400 mb-3 block"></i>
                    Memindai koordinat dan melacak titik toko nyata di satelit pemetaan...
                </div>
            `;

            try {
                // TAHAP 1: Cari Koordinat Kota (Geocoding)
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`);
                const geoData = await geoRes.json();

                if (geoData.length === 0) {
                    resultsContainer.innerHTML = `
                        <div class="p-5 bg-[#161e2e] border border-slate-700 rounded-xl text-center shadow-lg">
                            <p class="text-sm text-slate-400">Kota <strong>${city}</strong> tidak ditemukan. Pastikan ejaan nama kota benar.</p>
                        </div>
                    `;
                    return;
                }

                const lat = geoData[0].lat;
                const lon = geoData[0].lon;

                // TAHAP 2: Cari Toko Komputer Sungguhan di Radius 10 KM
                // Menggunakan Overpass QL (Query Language) untuk mengekstrak data node OSM
                const overpassQuery = `
                    [out:json][timeout:15];
                    (
                      node["shop"="computer"](around:10000, ${lat}, ${lon});
                      way["shop"="computer"](around:10000, ${lat}, ${lon});
                    );
                    out center tags 5;
                `;

                const storeRes = await fetch('https://overpass-api.de/api/interpreter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `data=${encodeURIComponent(overpassQuery)}`
                });
                
                const storeData = await storeRes.json();

                if (!storeData.elements || storeData.elements.length === 0) {
                    resultsContainer.innerHTML = `
                        <div class="p-5 bg-[#161e2e] border border-slate-700 rounded-xl text-center shadow-lg">
                            <p class="text-sm text-slate-400">Belum ada kontributor peta terbuka yang mendaftarkan lokasi toko komputer secara publik di radius kota <strong>${city}</strong>.</p>
                        </div>
                    `;
                    return;
                }

                // TAHAP 3: Render Data Asli ke HTML
                resultsContainer.innerHTML = storeData.elements.map((place, index) => {
                    const name = place.tags.name || "Toko Komputer / Elektronik (Tanpa Nama)";
                    const street = place.tags["addr:street"] || place.tags["addr:full"] || "Data detail jalan belum ditambahkan oleh pembuat peta";
                    const website = place.tags.website ? `<a href="${place.tags.website}" target="_blank" class="text-sky-400 hover:underline">Kunjungi Website</a>` : "";
                    
                    return `
                        <div class="p-4 bg-[#161e2e] border border-slate-700 hover:border-sky-500/50 rounded-xl transition-colors flex justify-between items-start gap-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500" style="animation-delay: ${index * 150}ms">
                            <div>
                                <h4 class="text-sm font-bold text-sky-400 mb-1 flex items-center gap-2">
                                    <i class="fa-solid fa-store"></i> ${name}
                                </h4>
                                <p class="text-xs text-slate-300 leading-relaxed pr-2 mb-1">
                                    <i class="fa-solid fa-location-dot text-slate-500 mr-1"></i> ${street}
                                </p>
                                <p class="text-[10px] text-slate-500 font-mono">${website}</p>
                            </div>
                            <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-1 rounded whitespace-nowrap mt-1">
                                <i class="fa-solid fa-check-circle mr-1"></i>Real Store
                            </span>
                        </div>
                    `;
                }).join('');

            } catch (error) {
                console.error("Fetch Error:", error);
                showToast('Gagal memproses koneksi satelit API.', 'error');
                resultsContainer.innerHTML = `
                    <div class="p-5 bg-[#161e2e] border border-red-500/30 rounded-xl text-center shadow-lg">
                        <p class="text-sm text-red-400">Terjadi kesalahan pada server saat menarik data real-time.</p>
                    </div>
                `;
            }
        });
        
        searchLocationInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchLocationBtn.click();
            }
        });
    }

    const ctaButtons = document.querySelectorAll('a[href="#katalog"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Pengguna bernavigasi ke bagian katalog.");
        });
    });

    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const payload = {
                name: document.getElementById('consult-name').value,
                email: document.getElementById('consult-email').value,
                message: document.getElementById('consult-message').value
            };

            console.log("Mengirim data konsultasi:", payload); 

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Respon API Server:", responseData); 
                    
                    showToast(`Terima kasih, ${payload.name}! Pesan konsultasi Anda telah berhasil disimpan.`, 'success');
                    this.reset();
                } else {
                    console.error("Gagal mengirim:", response.statusText);
                    showToast('Terjadi kesalahan saat mengirim pesan.', 'error');
                }
            } catch (error) {
                console.error("Network Error:", error); 
                showToast('Gagal terhubung ke server.', 'error');
            }
        });
    }
});