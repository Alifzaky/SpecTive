// ==========================================
// 1. DATA ARRAY (Mocking Database)
// ==========================================
const laptopData = [
    {
        id: 1,
        title: "Acer Swift Go 14 AI",
        brand: "Acer",
        price: "$1,199.00",
        specs: "32GB RAM | Ultra 7",
        desc: "Laptop tipis bertenaga AI dengan sistem pendingin kipas ganda dan layar OLED warna akurat.",
        image: "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png",
        status: "Ready"
    },
    {
        id: 2,
        title: "Apple MacBook Pro 14 Inch M3 Pro",
        brand: "Apple",
        price: "$1,999.99",
        specs: "18GB RAM | 512GB SSD",
        desc: "Laptop kencang untuk kebutuhan video editing 4K, software engineering, dan desain profesional.",
        image: "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png",
        status: "Ready"
    },
    {
        id: 3,
        title: "Asus ROG Zephyrus G16 Gaming",
        brand: "Asus",
        price: "$2,199.00",
        specs: "32GB RAM | 1TB SSD",
        desc: "Laptop gaming ultra-thin dengan layar OLED 240Hz dan kartu grafis RTX seri terbaru.",
        image: "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png",
        status: "PO"
    }
];

// ==========================================
// 2. DOM SELECTIONS
// ==========================================
const gridContainer = document.getElementById('laptop-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Modal Elements
const modal = document.getElementById('detail-modal');
const modalContentBox = document.getElementById('modal-content-box');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalImg = document.getElementById('modal-img');
const modalBrand = document.getElementById('modal-brand');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');

// Theme & Mobile Menu
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlEl = document.documentElement;
const menuBtn = document.getElementById('mobile-menu-btn');
const menuIcon = document.getElementById('mobile-menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

// Form Consultation Elements (Perbaikan Event Handling)
const consultForm = document.getElementById('consultation-form');
const userNameInput = document.getElementById('user-name');
const formFeedback = document.getElementById('form-feedback');

// ==========================================
// 3. CORE FUNCTIONS (DOM Manipulation)
// ==========================================
function renderLaptops(data) {
    if (!gridContainer) return;
    gridContainer.innerHTML = ''; 

    if (data.length === 0) {
        gridContainer.innerHTML = `<p class="col-span-full text-center text-slate-500 py-10 border border-slate-200 dark:border-slate-800 rounded-xl">Laptop tidak ditemukan.</p>`;
        return;
    }

    data.forEach(laptop => {
        const badgeColor = laptop.status === 'Ready' ? 'bg-emerald-500' : 'bg-sky-500';
        const cardHTML = `
            <article class="group bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800/90 hover:border-sky-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-sm cursor-pointer" onclick="openModal(${laptop.id})">
                <div class="w-full h-48 bg-slate-100 dark:bg-[#0f172a] p-4 flex items-center justify-center relative">
                    <img src="${laptop.image}" alt="${laptop.title}" class="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <span class="absolute top-2 right-2 text-[10px] font-bold ${badgeColor} text-white px-2 py-1 rounded">${laptop.status}</span>
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex justify-between mb-1.5">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded">${laptop.brand}</span>
                        <span class="text-[10px] text-slate-500 font-mono">${laptop.specs}</span>
                    </div>
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">${laptop.title}</h3>
                    <p class="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">${laptop.desc}</p>
                    <div class="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                        <span class="text-lg font-extrabold text-sky-600 dark:text-sky-400">${laptop.price}</span>
                        <button class="bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors">Detail</button>
                    </div>
                </div>
            </article>
        `;
        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function openModal(id) {
    const laptop = laptopData.find(item => item.id === id);
    if (!laptop) return;

    modalImg.src = laptop.image;
    modalTitle.textContent = laptop.title;
    modalBrand.textContent = laptop.brand;
    modalPrice.textContent = laptop.price;
    modalDesc.textContent = laptop.desc;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContentBox.classList.remove('scale-95');
        modalContentBox.classList.add('scale-100');
    }, 10);
}

function closeModal() {
    modal.classList.add('opacity-0');
    modalContentBox.classList.remove('scale-100');
    modalContentBox.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// ==========================================
// 4. EVENT HANDLING & INTERACTIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Render
    renderLaptops(laptopData);

    // 2. Set Initial Theme Icon
    if (htmlEl.classList.contains('dark')) {
        themeIcon.className = 'fa-solid fa-sun text-sm text-amber-500';
    } else {
        themeIcon.className = 'fa-solid fa-moon text-sm text-sky-400';
    }

    // 3. Theme Toggle Interaction
    themeToggleBtn.addEventListener('click', () => {
        const isDark = htmlEl.classList.toggle('dark');
        if (isDark) {
            themeIcon.className = 'fa-solid fa-sun text-sm text-amber-500';
        } else {
            themeIcon.className = 'fa-solid fa-moon text-sm text-sky-400';
        }
    });

    // 4. Mobile Menu Toggle Interaction
    let isMenuOpen = false;
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('translate-x-full', !isMenuOpen);
        document.body.classList.toggle('overflow-hidden', isMenuOpen);
        
        if (isMenuOpen) {
            menuIcon.className = 'fa-solid fa-xmark text-xl text-sky-500';
        } else {
            menuIcon.className = 'fa-solid fa-bars text-xl';
        }
    });

    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (isMenuOpen) menuBtn.click();
        });
    });

    // 5. Search Filtering
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const activeBrandBtn = document.querySelector('.filter-btn.active');
            const currentBrand = activeBrandBtn ? activeBrandBtn.dataset.brand : 'all';

            const filtered = laptopData.filter(laptop => {
                const matchName = laptop.title.toLowerCase().includes(keyword);
                const matchBrand = currentBrand === 'all' || laptop.brand === currentBrand;
                return matchName && matchBrand;
            });
            renderLaptops(filtered);
        });
    }

    // 6. Brand Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-sky-500', 'text-slate-950');
                b.classList.add('bg-white', 'dark:bg-[#161e2e]', 'text-slate-700', 'dark:text-slate-300');
            });
            
            const clickedBtn = e.target;
            clickedBtn.classList.remove('bg-white', 'dark:bg-[#161e2e]', 'text-slate-700', 'dark:text-slate-300');
            clickedBtn.classList.add('active', 'bg-sky-500', 'text-slate-950');

            const selectedBrand = clickedBtn.dataset.brand;
            const keyword = searchInput ? searchInput.value.toLowerCase() : '';

            const filtered = laptopData.filter(laptop => {
                const matchName = laptop.title.toLowerCase().includes(keyword);
                const matchBrand = selectedBrand === 'all' || laptop.brand === selectedBrand;
                return matchName && matchBrand;
            });
            renderLaptops(filtered);
        });
    });

    // 7. Modal Listeners
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 8. Event Handling Form (Mencegah Submit Bawaan & Menampilkan Feedback DOM)
    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah form melakukan refresh halaman
            
            const nameValue = userNameInput.value.trim();
            if (nameValue === '') return;

            // Manipulasi DOM untuk menampilkan pesan sukses di bawah form
            formFeedback.textContent = `Berhasil! Halo ${nameValue}, event submit berhasil dicegat dengan preventDefault() dan data diproses via JS DOM.`;
            formFeedback.classList.remove('hidden');
            
            // Reset input form
            consultForm.reset();

            // Sembunyikan pesan setelah 4 detik
            setTimeout(() => {
                formFeedback.classList.add('hidden');
            }, 4000);
        });
    }
});