// =========================================================================
// STATE & GLOBAL VARIABLES
// =========================================================================
const API_URL = 'https://dummyjson.com/products/category/laptops';
let allProducts = [];
let activeBrandFilter = 'all';

const extraLaptops = [
  { id: 101, title: "Apple MacBook Pro 14 Inch M3 Pro", brand: "Apple", price: 1999.99, rating: 4.9, thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png", description: "Laptop kencang untuk kebutuhan video editing 4K, software engineering, dan desain profesional.", specs: "18GB RAM | 512GB SSD" },
  { id: 102, title: "Asus ROG Zephyrus G16 Gaming", brand: "Asus", price: 2199.00, rating: 4.8, thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png", description: "Laptop gaming ultra-thin dengan layar OLED 240Hz dan kartu grafis RTX seri terbaru.", specs: "32GB RAM | 1TB SSD" },
  { id: 103, title: "Lenovo ThinkPad X1 Carbon Gen 11", brand: "Lenovo", price: 1649.50, rating: 4.7, thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/thumbnail.png", description: "Standar industri laptop bisnis dengan ketahanan militer dan keyboard terbaik di kelasnya.", specs: "16GB RAM | 512GB SSD" },
  { id: 104, title: "Dell XPS 15 9530 Creator Edition", brand: "Dell", price: 1899.99, rating: 4.6, thumbnail: "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png", description: "Layar InfinityEdge 3.5K Touchscreen dengan kekuatan prosesor Intel Core i9.", specs: "32GB RAM | 1TB SSD" }
];


// =========================================================================
// GLOBAL FUNCTIONS (Digunakan langsung oleh Event Inline HTML, ex: onclick)
// =========================================================================

// Fungsi Notifikasi UI 
function showToast(message, type = 'success') {
    const existingToast = document.getElementById('spective-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'spective-toast';
    toast.className = `fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-500 transform translate-y-10 opacity-0 flex items-center gap-3 font-sans text-sm`;
    
    if (type === 'success') {
        toast.classList.add('bg-[#161e2e]/95', 'border-sky-400', 'text-sky-300');
        toast.innerHTML = `<span class="text-xl">⚡</span> <div><p class="font-bold text-white">Berhasil!</p><p>${message}</p></div>`;
    } else {
        toast.classList.add('bg-[#161e2e]/95', 'border-red-500', 'text-red-400');
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

// Menarik data laptop dari API
async function fetchLaptops() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    allProducts = [...data.products, ...extraLaptops];
    renderLaptops(allProducts);
  } catch (error) {
    console.warn('Gagal memuat API, menggunakan data cadangan:', error);
    allProducts = extraLaptops;
    renderLaptops(allProducts);
  }
}

// Me-render Data Laptop ke DOM
function renderLaptops(products) {
  const gridContainer = document.getElementById('laptop-grid');
  const productCountEl = document.getElementById('product-count');

  if (!products || products.length === 0) {
    productCountEl.textContent = '0 Laptop Found';
    gridContainer.innerHTML = `<div class="col-span-full py-16 text-center text-slate-400 bg-[#161e2e]/50 border border-slate-800 rounded-2xl p-6"><p>Tidak ada produk laptop yang cocok.</p></div>`;
    return;
  }
  
  productCountEl.textContent = `Menampilkan ${products.length} Laptop`;
  gridContainer.innerHTML = products.map(product => {
    const specTag = product.specs || "16GB RAM | 512GB SSD";
    return `
      <article class="group bg-[#161e2e] border border-slate-800/90 hover:border-sky-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between">
        <div class="w-full h-48 bg-[#0f172a] p-4 flex items-center justify-center relative overflow-hidden">
          <img src="${product.thumbnail}" alt="${product.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
        <div class="p-5 flex flex-col flex-grow">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-900/60 px-2 py-0.5 rounded">${product.brand || 'Laptop'}</span>
            <span class="text-[10px] text-slate-400 font-mono">${specTag}</span>
          </div>
          <h3 class="text-sm font-semibold text-slate-100 mb-2 line-clamp-2">${product.title}</h3>
          <p class="text-xs text-slate-400 mb-4 line-clamp-2 flex-grow">${product.description}</p>
          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
            <div><span class="text-lg font-extrabold text-sky-400">$${product.price}</span></div>
            <div class="flex items-center gap-2">
              <label class="text-[10px] text-slate-400 flex items-center gap-1 cursor-pointer bg-slate-900 px-2.5 py-2 rounded-lg border border-slate-800 hover:border-sky-500">
                <input type="checkbox" value="${product.id}" onchange="toggleCompare(${product.id}, this)" class="accent-sky-500">
                <span>Bandingkan</span>
              </label>
            <button onclick="openModal(${product.id})" class="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">Detail</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Filter berdasarkan Brand
function filterBrand(brand, element = null) {
  activeBrandFilter = brand;
  const searchInput = document.getElementById('search-input');
  
  // Update styling button filter
  document.querySelectorAll('.brand-btn').forEach(btn => {
    btn.classList.remove('bg-sky-500', 'text-slate-950');
    btn.classList.add('bg-[#161e2e]', 'text-slate-300');
  });

  if (element) {
    element.classList.remove('bg-[#161e2e]', 'text-slate-300');
    element.classList.add('bg-sky-500', 'text-slate-950');
  }

  applyFilters(searchInput ? searchInput.value.toLowerCase() : '', brand);
}

// Eksekusi filter text dan brand
function applyFilters(keyword, brand) {
  let filtered = allProducts;
  if (brand !== 'all') {
    filtered = filtered.filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase());
  }
  if (keyword) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(keyword) || (p.brand && p.brand.toLowerCase().includes(keyword)));
  }
  renderLaptops(filtered);
}

// Buka dan Tutup Modal
function openModal(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  document.getElementById('modal-img').src = product.thumbnail;
  document.getElementById('modal-title').textContent = product.title;
  document.getElementById('modal-price').textContent = `$${product.price}`;
  document.getElementById('modal-desc').textContent = product.description;
  document.getElementById('modal-brand').textContent = product.brand || 'Laptop';
  document.getElementById('detail-modal').classList.remove('hidden');
}

function closeModal() { 
  document.getElementById('detail-modal').classList.add('hidden'); 
}


// =========================================================================
// DOM CONTENT LOADED EVENT (Inisialisasi UI dan Logika Saat Web Siap)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("SpecTive Interactive Engine Loaded 🚀");

    // 1. Inisialisasi API Laptop 
    fetchLaptops();

    // 2. Search Input Listener
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
      searchInput.addEventListener('input', (e) => applyFilters(e.target.value.toLowerCase(), activeBrandFilter));
    }

    // 3. UI: Mobile Menu Toggle Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            menuBtn.innerHTML = '<i class="fa-solid fa-xmark text-xl text-sky-400"></i>';
            document.body.classList.add('overflow-hidden'); 
        } else {
            mobileMenu.classList.add('translate-x-full');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            document.body.classList.remove('overflow-hidden');
        }
    }
    
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    });

    // 4. UI: Scroll Spy (Animasi Active State Navbar)
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-item');
    const mobNavItems = document.querySelectorAll('.mobile-nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update Desktop Navbar
                navItems.forEach(item => {
                    item.classList.remove('active', 'text-sky-400');
                    if (item.getAttribute('href') === `#${entry.target.id}`) {
                        item.classList.add('active', 'text-sky-400');
                    }
                });
                
                // Update Mobile Navbar
                mobNavItems.forEach(item => {
                    item.classList.remove('text-sky-400');
                    if (item.getAttribute('href') === `#${entry.target.id}`) {
                        item.classList.add('text-sky-400');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 5. API: Pencarian Toko Offline (Kode Original User via OpenStreetMap)
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

            city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            showToast(`Melacak toko komputer asli di area "${city}"...`, 'success');
            
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
                    resultsContainer.innerHTML = `<div class="p-5 bg-[#161e2e] border border-slate-700 rounded-xl text-center shadow-lg"><p class="text-sm text-slate-400">Kota <strong>${city}</strong> tidak ditemukan.</p></div>`;
                    return;
                }

                const lat = geoData[0].lat;
                const lon = geoData[0].lon;

                // TAHAP 2: Cari Toko Komputer di Radius 10 KM
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
                    resultsContainer.innerHTML = `<div class="p-5 bg-[#161e2e] border border-slate-700 rounded-xl text-center shadow-lg"><p class="text-sm text-slate-400">Belum ada kontributor peta terbuka yang mendaftarkan lokasi toko komputer secara publik di kota <strong>${city}</strong>.</p></div>`;
                    return;
                }

                // TAHAP 3: Render Data
                resultsContainer.innerHTML = storeData.elements.map((place, index) => {
                    const name = place.tags.name || "Toko Komputer / Elektronik (Tanpa Nama)";
                    const street = place.tags["addr:street"] || place.tags["addr:full"] || "Detail jalan belum ditambahkan";
                    const website = place.tags.website ? `<a href="${place.tags.website}" target="_blank" class="text-sky-400 hover:underline mt-1 inline-block">Kunjungi Website</a>` : "";
                    
                    return `
                        <div class="p-4 bg-[#161e2e] border border-slate-700 hover:border-sky-500/50 rounded-xl transition-colors flex justify-between items-start gap-4 shadow-lg mb-3">
                            <div>
                                <h4 class="text-sm font-bold text-sky-400 mb-1 flex items-center gap-2"><i class="fa-solid fa-store"></i> ${name}</h4>
                                <p class="text-xs text-slate-300 leading-relaxed pr-2 mb-1"><i class="fa-solid fa-location-dot text-slate-500 mr-1"></i> ${street}</p>
                                ${website}
                            </div>
                            <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-1 rounded whitespace-nowrap mt-1">Real Store</span>
                        </div>
                    `;
                }).join('');

            } catch (error) {
                console.error("Fetch Error:", error);
                showToast('Gagal memproses koneksi satelit API.', 'error');
                resultsContainer.innerHTML = `<div class="p-5 bg-[#161e2e] border border-red-500/30 rounded-xl text-center shadow-lg"><p class="text-sm text-red-400">Terjadi kesalahan pada server saat menarik data real-time.</p></div>`;
            }
        });
        
        searchLocationInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') searchLocationBtn.click();
        });
    }

    // 6. API: Form Konsultasi (Kode Original User via POST JSONPlaceholder)
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const payload = {
                name: document.getElementById('consult-name').value,
                email: document.getElementById('consult-email').value,
                message: document.getElementById('consult-message').value
            };

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    showToast(`Terima kasih, ${payload.name}! Pesan konsultasi Anda telah berhasil dikirim.`, 'success');
                    this.reset();
                } else {
                    showToast('Terjadi kesalahan saat mengirim pesan.', 'error');
                }
            } catch (error) {
                showToast('Gagal terhubung ke server.', 'error');
            }
        });
    }
});

// =========================================================================
// LOGIKA FITUR TAMBAHAN (Advanced Filter, Comparison, Glossary)
// =========================================================================

let selectedCompareIds = [];

// 1. Advanced Filter Handler
function triggerCustomFilters() {
  const keyword = document.getElementById('search-input') ? document.getElementById('search-input').value.toLowerCase() : '';
  const category = document.getElementById('filter-category').value;
  const ram = document.getElementById('filter-ram').value;
  const priceRange = document.getElementById('filter-price').value;

  let filtered = allProducts;

  if (activeBrandFilter !== 'all') {
    filtered = filtered.filter(p => (p.brand || '').toLowerCase() === activeBrandFilter.toLowerCase());
  }

  if (keyword) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(keyword) || (p.description && p.description.toLowerCase().includes(keyword)));
  }

  if (category !== 'all') {
    filtered = filtered.filter(p => {
      const text = (p.title + ' ' + p.description).toLowerCase();
      if (category === 'gaming') return text.includes('gaming') || text.includes('rtx') || text.includes('zephyrus');
      if (category === 'creator') return text.includes('creator') || text.includes('pro') || text.includes('oled') || text.includes('touchscreen');
      if (category === 'coding') return text.includes('thinkpad') || text.includes('engineering') || text.includes('developer');
      if (category === 'office') return text.includes('carbon') || text.includes('yoga') || text.includes('harian') || text.includes('kuliah');
      return true;
    });
  }

  if (ram !== 'all') {
    filtered = filtered.filter(p => {
      const specText = (p.specs || p.title || '').toLowerCase();
      return specText.includes(ram + 'gb');
    });
  }

  if (priceRange !== 'all') {
    filtered = filtered.filter(p => {
      if (priceRange === 'low') return p.price < 1000;
      if (priceRange === 'mid') return p.price >= 1000 && p.price <= 1800;
      if (priceRange === 'high') return p.price > 1800;
      return true;
    });
  }

  renderLaptops(filtered);
}

// 2. Side-by-Side Comparison Logic
function toggleCompare(productId, checkbox) {
  if (checkbox.checked) {
    if (selectedCompareIds.length >= 3) {
      showToast('Maksimal 3 laptop untuk dibandingkan secara bersamaan!', 'error');
      checkbox.checked = false;
      return;
    }
    if (!selectedCompareIds.includes(productId)) {
      selectedCompareIds.push(productId);
    }
  } else {
    selectedCompareIds = selectedCompareIds.filter(id => id !== productId);
  }

  updateComparisonBar();
}

function updateComparisonBar() {
  const bar = document.getElementById('comparison-bar');
  const countEl = document.getElementById('compare-count');
  
  if (selectedCompareIds.length > 0) {
    bar.classList.remove('hidden');
    countEl.textContent = `${selectedCompareIds.length} Laptop Dipilih`;
  } else {
    bar.classList.add('hidden');
  }
}

function clearComparison() {
  selectedCompareIds = [];
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateComparisonBar();
}

function openComparisonModal() {
  if (selectedCompareIds.length === 0) return;
  const container = document.getElementById('comparison-content');
  
  const comparedProducts = selectedCompareIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = comparedProducts.map(product => `
    <div class="bg-[#0b0f19] border border-slate-800 p-4 rounded-xl space-y-3 flex flex-col justify-between">
      <div class="space-y-2">
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-32 object-contain bg-slate-900 rounded-lg p-2">
        <span class="text-[10px] font-bold uppercase text-sky-400 bg-sky-950 px-2 py-0.5 rounded">${product.brand || 'Laptop'}</span>
        <h4 class="text-sm font-bold text-white">${product.title}</h4>
        <p class="text-base font-extrabold text-sky-400">$${product.price}</p>
      </div>
      <div class="border-t border-slate-800 pt-3 space-y-2 text-xs text-slate-300">
        <p><strong>Spesifikasi:</strong> ${product.specs || 'Standar 16GB RAM'}</p>
        <p class="text-slate-400"><strong>Deskripsi:</strong> ${product.description}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('comparison-modal').classList.remove('hidden');
}

function closeComparisonModal() {
  document.getElementById('comparison-modal').classList.add('hidden');
}

// 3. Glossary Search Handler
function filterGlossary() {
  const query = document.getElementById('glossary-search').value.toLowerCase();
  const items = document.querySelectorAll('.glossary-item');

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}