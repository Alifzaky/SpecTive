// ==========================================
// 1. DATA JAVASCRIPT
// ==========================================
const laptops = [
    { id: 101, title: "Apple MacBook Pro 14 Inch M3 Pro", brand: "Apple", price: 1999.99, specs: "18GB RAM | 512GB SSD", thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png" },
    { id: 102, title: "Asus ROG Zephyrus G16 Gaming", brand: "Asus", price: 2199.00, specs: "32GB RAM | 1TB SSD", thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png" },
    { id: 103, title: "Lenovo ThinkPad X1 Carbon Gen 11", brand: "Lenovo", price: 1649.50, specs: "16GB RAM | 512GB SSD", thumbnail: "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/thumbnail.png" },
    { id: 104, title: "Dell XPS 15 9530 Creator Edition", brand: "Dell", price: 1899.99, specs: "32GB RAM | 1TB SSD", thumbnail: "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png" }
];

// ==========================================
// 2. DOM MANIPULATION
// ==========================================
function renderLaptops() {
    const gridContainer = document.getElementById('laptop-grid');
    
    const htmlString = laptops.map(laptop => `
        <article class="group bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800/90 hover:border-sky-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm flex flex-col justify-between">
            <div class="w-full h-48 bg-slate-100 dark:bg-[#0f172a] p-4 flex items-center justify-center relative overflow-hidden">
                <img src="${laptop.thumbnail}" alt="${laptop.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900/60 px-2 py-0.5 rounded">${laptop.brand}</span>
                    <span class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">${laptop.specs}</span>
                </div>
                <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 line-clamp-2">${laptop.title}</h3>
                
                <div class="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                    <span class="text-lg font-extrabold text-sky-600 dark:text-sky-400">$${laptop.price}</span>
                    <button onclick="handleDetailClick('${laptop.title}')" class="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer">
                        Detail
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    gridContainer.innerHTML = htmlString;
}

// ==========================================
// 3. USER INTERACTION
// ==========================================
window.handleDetailClick = function(laptopTitle) {
    alert(`Membuka spesifikasi detail untuk:\n${laptopTitle}`);
};

// ==========================================
// 4. EVENT HANDLING (Theme & Form)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan render DOM
    renderLaptops();

    // Event Handling 1: Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', () => {
        const isDark = htmlElement.classList.toggle('dark');
        // Ubah ikon bulan/matahari sesuai mode
        if (isDark) {
            themeIcon.className = 'fa-solid fa-sun text-amber-400';
        } else {
            themeIcon.className = 'fa-solid fa-moon text-slate-700';
        }
    });

    // Event Handling 2: Form Submit
    const form = document.getElementById('consultation-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah halaman reload
        
        const nama = document.getElementById('consult-name').value;
        alert(`Terima kasih ${nama}, pesan konsultasi kamu sudah direkam oleh JavaScript!`);
        
        form.reset(); // Mengosongkan form setelah submit
    });
});