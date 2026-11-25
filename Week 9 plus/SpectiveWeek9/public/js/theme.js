(() => {
    const root = document.documentElement;
    const button = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        root.classList.toggle('dark', isDark);
        if (icon) {
            icon.className = isDark
                ? 'fa-solid fa-moon text-sky-500'
                : 'fa-solid fa-sun text-amber-500';
        }
    };

    let currentTheme = 'dark';
    try {
        currentTheme = localStorage.getItem('theme') || 'dark';
    } catch (error) {
        currentTheme = 'dark';
    }
    applyTheme(currentTheme);

    if (button) {
        button.addEventListener('click', () => {
            currentTheme = root.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(currentTheme);
            try { localStorage.setItem('theme', currentTheme); } catch (error) { /* Penyimpanan tema opsional. */ }
        });
    }
})();
