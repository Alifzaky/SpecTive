// ==========================================
// 1. GLOBAL VARIABLES & STATE
// ==========================================
// let allProducts = [];
let activeBrandFilter = 'all';
let selectedCompareIds = [];


// ==========================================
// 2. INITIALIZATION & COMPONENT LOADER
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('navbar-container', './components/navbar.html');
    await loadComponent('footer-container', './components/footer.html');
    initEventListeners();
    initScrollSpy();
});

async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Gagal memuat ${file}`);
        document.getElementById(id).innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}


// ==========================================
// 3. EVENT LISTENERS & UI INTERACTIONS
// ==========================================
function initEventListeners() {
    // Search Filter
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => applyFilters(e.target.value.toLowerCase(), activeBrandFilter));
    }

    // Mobile Menu & Theme Toggle (Diload setelah komponen Navbar siap)
    setTimeout(() => {
        setupMobileMenu();
        setupThemeToggle();
    }, 100);

    // Location Search & Consultation Form
    setupLocationSearch();
    setupConsultationForm();
}

function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    let isMenuOpen = false;

    if (!menuBtn || !mobileMenu) return;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('translate-x-full', !isMenuOpen);
        menuBtn.innerHTML = isMenuOpen ? '<i class="fa-solid fa-xmark text-xl text-sky-500"></i>' : '<i class="fa-solid fa-bars text-xl"></i>';
        document.body.classList.toggle('overflow-hidden', isMenuOpen);
    };

    menuBtn.addEventListener('click', toggleMenu);
    mobileNavItems.forEach(item => item.addEventListener('click', () => { if (isMenuOpen) toggleMenu(); }));
}

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;

    const isLight = localStorage.getItem('theme') === 'light';
    htmlEl.classList.toggle('dark', !isLight);
    if (themeIcon) {
        themeIcon.className = isLight ? 'fa-solid fa-sun text-sm text-amber-500' : 'fa-solid fa-moon text-sm text-sky-400';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlEl.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (themeIcon) {
                themeIcon.className = isDark ? 'fa-solid fa-moon text-sm text-sky-400' : 'fa-solid fa-sun text-sm text-amber-500';
            }
            showToast(isDark ? 'Mode Gelap diaktifkan' : 'Mode Terang diaktifkan', 'success');
        });
    }
}


function renderLaptops(products) {
  const gridContainer = document.getElementById('laptop-grid');
  const productCountEl = document.getElementById('product-count');

  if (!products || products.length === 0) {
    productCountEl.textContent = '0 Laptop Found';
    gridContainer.innerHTML = `<div class="col-span-full py-16 text-center text-slate-500 bg-white dark:bg-[#161e2e]/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6"><p>Tidak ada produk laptop yang cocok.</p></div>`;
    return;
  }
  
  productCountEl.textContent = `Menampilkan ${products.length} Laptop`;
  gridContainer.innerHTML = products.map(product => `
    <article class="group bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800/90 hover:border-sky-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between shadow-sm">
      <div class="w-full h-48 bg-slate-100 dark:bg-[#0f172a] p-4 flex items-center justify-center relative overflow-hidden">
        <img src="${product.thumbnail}" alt="${product.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded">${product.brand || 'Laptop'}</span>
          <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">${product.specs || "16GB RAM | 512GB SSD"}</span>
        </div>
        <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">${product.title}</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">${product.description}</p>
        <div class="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between mt-auto">
          <span class="text-lg font-extrabold text-sky-600 dark:text-sky-400">$${product.price}</span>
          <div class="flex items-center gap-2">
            <label class="text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1 cursor-pointer bg-slate-50 dark:bg-slate-900 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <input type="checkbox" value="${product.id}" onchange="toggleCompare(${product.id}, this)" class="accent-sky-500">
              <span>Bandingkan</span>
            </label>
            <button onclick="openModal(${product.id})" class="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">Detail</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}


// ==========================================
// 5. FILTERING & SEARCH SYSTEM
// ==========================================
function filterBrand(brand, element = null) {
  activeBrandFilter = brand;
  const searchInput = document.getElementById('search-input');
  
  document.querySelectorAll('.brand-btn').forEach(btn => {
    btn.classList.remove('bg-sky-500', 'text-slate-950', 'font-bold');
    btn.classList.add('bg-white', 'dark:bg-[#161e2e]', 'text-slate-700', 'dark:text-slate-300');
  });

  if (element) {
    element.classList.remove('bg-white', 'dark:bg-[#161e2e]', 'text-slate-700', 'dark:text-slate-300');
    element.classList.add('bg-sky-500', 'text-slate-950', 'font-bold');
  }

  applyFilters(searchInput ? searchInput.value.toLowerCase() : '', brand);
}

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
      if (category === 'gaming') return text.includes('gaming') || text.includes('rtx');
      if (category === 'creator') return text.includes('creator') || text.includes('pro') || text.includes('oled');
      if (category === 'coding') return text.includes('thinkpad') || text.includes('engineering');
      if (category === 'office') return text.includes('carbon') || text.includes('yoga') || text.includes('kuliah');
      return true;
    });
  }
  if (ram !== 'all') {
    filtered = filtered.filter(p => (p.specs || p.title || '').toLowerCase().includes(ram + 'gb'));
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

function filterGlossary() {
  const query = document.getElementById('glossary-search').value.toLowerCase();
  document.querySelectorAll('.glossary-item').forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
  });
}


// ==========================================
// 6. MODAL & COMPARISON SYSTEM
// ==========================================
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

function toggleCompare(productId, checkbox) {
  if (checkbox.checked) {
    if (selectedCompareIds.length >= 3) {
      showToast('Maksimal 3 laptop untuk dibandingkan!', 'error');
      checkbox.checked = false;
      return;
    }
    if (!selectedCompareIds.includes(productId)) selectedCompareIds.push(productId);
  } else {
    selectedCompareIds = selectedCompareIds.filter(id => id !== productId);
  }
  updateComparisonBar();
}

function updateComparisonBar() {
  const bar = document.getElementById('comparison-bar');
  const countEl = document.getElementById('compare-count');
  bar.classList.toggle('hidden', selectedCompareIds.length === 0);
  countEl.textContent = `${selectedCompareIds.length} Laptop Dipilih`;
}

function clearComparison() {
  selectedCompareIds = [];
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateComparisonBar();
}

function openComparisonModal() {
  if (selectedCompareIds.length === 0) return;
  const container = document.getElementById('comparison-content');
  const items = selectedCompareIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = items.map(product => `
    <div class="bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-3 flex flex-col justify-between">
      <div class="space-y-2">
        <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-32 object-contain bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
        <span class="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded">${product.brand || 'Laptop'}</span>
        <h4 class="text-sm font-bold text-slate-900 dark:text-white">${product.title}</h4>
        <p class="text-base font-extrabold text-sky-600 dark:text-sky-400">$${product.price}</p>
      </div>
      <div class="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
        <p><strong>Spesifikasi:</strong> ${product.specs || '16GB RAM'}</p>
        <p class="text-slate-500 dark:text-slate-400"><strong>Deskripsi:</strong> ${product.description}</p>
      </div>
    </div>
  `).join('');

  document.getElementById('comparison-modal').classList.remove('hidden');
}

function closeComparisonModal() {
  document.getElementById('comparison-modal').classList.add('hidden');
}


// ==========================================
// 7. EXTERNAL APIS (Location & Consultation)
// ==========================================
function setupLocationSearch() {
    const btn = document.getElementById('lokasi-btn');
    const input = document.getElementById('lokasi-input');
    const results = document.getElementById('lokasi-results');

    if (!btn || !input || !results) return;

    const executeSearch = async () => {
        let city = input.value.trim();
        if (!city) {
            showToast('Masukkan nama kota terlebih dahulu.', 'error');
            input.focus();
            results.innerHTML = '';
            return;
        }

        city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        showToast(`Melacak toko komputer di area "${city}"...`, 'success');
        results.innerHTML = `<div class="text-center text-slate-500 dark:text-slate-400 text-sm py-8 animate-pulse"><i class="fa-solid fa-satellite-dish text-3xl text-sky-500 mb-3 block"></i>Memindai koordinat satelit...</div>`;

        try {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`);
            const geoData = await geoRes.json();

            if (geoData.length === 0) {
                results.innerHTML = `<div class="p-5 bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-700 rounded-xl text-center"><p class="text-sm text-slate-600 dark:text-slate-400">Kota <strong>${city}</strong> tidak ditemukan.</p></div>`;
                return;
            }

            const { lat, lon } = geoData[0];
            const query = `[out:json][timeout:15];(node["shop"="computer"](around:10000, ${lat}, ${lon});way["shop"="computer"](around:10000, ${lat}, ${lon}););out center tags 5;`;
            
            const storeRes = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `data=${encodeURIComponent(query)}`
            });
            const storeData = await storeRes.json();

            if (!storeData.elements || storeData.elements.length === 0) {
                results.innerHTML = `<div class="p-5 bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-700 rounded-xl text-center"><p class="text-sm text-slate-600 dark:text-slate-400">Tidak ada data toko komputer terdaftar di kota ini.</p></div>`;
                return;
            }

            results.innerHTML = storeData.elements.map(place => {
                const name = place.tags.name || "Toko Komputer";
                const street = place.tags["addr:street"] || "Alamat spesifik belum terdaftar";
                return `
                    <div class="p-4 bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-700 rounded-xl flex justify-between items-start gap-4 shadow-sm mb-3">
                        <div>
                            <h4 class="text-sm font-bold text-sky-600 dark:text-sky-400 mb-1"><i class="fa-solid fa-store"></i> ${name}</h4>
                            <p class="text-xs text-slate-600 dark:text-slate-300"><i class="fa-solid fa-location-dot text-slate-400 mr-1"></i> ${street}</p>
                        </div>
                        <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded">Real Store</span>
                    </div>
                `;
            }).join('');
        } catch (error) {
            results.innerHTML = `<div class="p-5 bg-white dark:bg-[#161e2e] border border-red-500/30 rounded-xl text-center"><p class="text-sm text-red-500">Gagal mengambil data lokasi.</p></div>`;
        }
    };

    btn.addEventListener('click', executeSearch);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') executeSearch(); });
}

function setupConsultationForm() {
    const form = document.getElementById('consultation-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
            name: document.getElementById('consult-name').value,
            email: document.getElementById('consult-email').value,
            message: document.getElementById('consult-message').value
        };

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                showToast(`Terima kasih, ${payload.name}! Pesan berhasil dikirim.`, 'success');
                form.reset();
            } else {
                showToast('Gagal mengirim pesan.', 'error');
            }
        } catch (err) {
            showToast('Terjadi kesalahan server.', 'error');
        }
    });
}


// ==========================================
// 8. UTILITIES (Toast & Scroll Spy)
// ==========================================
function showToast(message, type = 'success') {
    const existing = document.getElementById('spective-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'spective-toast';
    toast.className = "fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-500 transform translate-y-10 opacity-0 flex items-center gap-3 text-sm";
    
    const isSuccess = type === 'success';
    
    // Perbaikan: Tambahkan kelas satu persatu tanpa spasi di dalam parameter add()
    toast.classList.add('bg-white');
    toast.classList.add('dark:bg-[#161e2e]');
    toast.classList.add(isSuccess ? 'border-sky-500' : 'border-red-500');
    toast.classList.add(isSuccess ? 'text-sky-600' : 'text-red-500');
    toast.classList.add(isSuccess ? 'dark:text-sky-300' : 'dark:text-red-400');

    toast.innerHTML = `<span>${isSuccess ? '⚡' : '⚠️'}</span><div><p class="font-bold text-slate-900 dark:text-white">${isSuccess ? 'Berhasil!' : 'Perhatian!'}</p><p>${message}</p></div>`;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-y-10', 'opacity-0'), 50);
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-item');
    const mobNavItems = document.querySelectorAll('.mobile-nav-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => {
                    const isActive = item.getAttribute('href') === `#${entry.target.id}`;
                    item.classList.toggle('active', isActive);
                    item.classList.toggle('text-sky-500', isActive);
                    item.classList.toggle('dark:text-sky-400', isActive);
                });
                mobNavItems.forEach(item => {
                    const isActive = item.getAttribute('href') === `#${entry.target.id}`;
                    item.classList.toggle('text-sky-500', isActive);
                    item.classList.toggle('dark:text-sky-400', isActive);
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(sec => observer.observe(sec));
}