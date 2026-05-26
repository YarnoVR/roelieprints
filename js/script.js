// --- THEME MANAGEMENT ---
const setTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};

if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme('dark');
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) { themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });}

    // Portfolio Filters (voor creaties.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active-filter', 'bg-indigo-600', 'text-white'));
            btn.classList.add('active-filter', 'bg-indigo-600', 'text-white');
            const filter = btn.getAttribute('data-filter');
            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// --- MODEL VIEWER SWITCHER ---
const models = [
    { src: 'models/LetterName.glb', title: 'Personalized Nameplate' },
    { src: 'models/Technisch_Onderdeel.glb', title: 'Industrial Component' }
];
let currentIdx = 0;
function nextModel() {
    currentIdx = (currentIdx + 1) % models.length;
    document.getElementById('hero-viewer').src = models[currentIdx].src;
    document.getElementById('model-title').innerText = models[currentIdx].title;
}
function prevModel() {
    currentIdx = (currentIdx - 1 + models.length) % models.length;
    document.getElementById('hero-viewer').src = models[currentIdx].src;
    document.getElementById('model-title').innerText = models[currentIdx].title;
}

// --- MOBILE MENU LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const body = document.body;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');

            if (isHidden) {
                // MENU OPENEN
                mobileMenu.classList.remove('hidden');
                body.classList.add('no-scroll');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                // MENU SLUITEN
                mobileMenu.classList.add('hidden');
                body.classList.remove('no-scroll');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }
});

// --- FORM INTERACTION ---
// Optional: Show filename after selection
const fileInput = document.querySelector('input[type="file"]');
if (fileInput) {
    fileInput.addEventListener('change', function(e) {
        const fileName = e.target.files[0].name;
        const label = this.parentElement.querySelector('p.text-gray-300');
        label.innerText = "Geselecteerd: " + fileName;
        label.classList.add('text-indigo-600', 'font-bold');
    });
}
