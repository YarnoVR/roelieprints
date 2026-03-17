// SPLASH LOGICA
const splash = document.getElementById('splash-screen');
const splashParallax = document.getElementById('splash-parallax');
const enterBtn = document.getElementById('enter-btn');

if (splash) {
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousemove', (e) => {
        if(!splash.classList.contains('fade-out')) {
            const x = (window.innerWidth / 2 - e.clientX) / 40;
            const y = (window.innerHeight / 2 - e.clientY) / 40;
            splashParallax.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
    enterBtn.onclick = () => {
        splash.classList.add('fade-out');
        document.body.style.overflow = 'auto';
    };
}

// THEMA
if (localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
document.getElementById('theme-toggle').onclick = () => {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// PRODUCTEN DATABASE MET HOOFDLETTERS
const products = [
    { name: "Capital Letter", price: "€14.50", image: "img/CapitalJ.jpg" },
    { name: "Gepersonaliseerde Vaas", price: "€19.95", image: "img/Vaas.jpg" },
    { name: "Naamplaatje", price: "€4.95", image: "img/Tag.jpg" }
];

const grid = document.getElementById('productGrid');
if (grid) {
    products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="product-img-container"><img src="${p.image}" alt="${p.name}" class="product-img"></div>
                <h3>${p.name}</h3>
                <span class="price">${p.price}</span>
                <button class="btn primary" style="padding: 10px 20px; font-size: 0.9rem;"
                    onclick="location.href='mailto:info@roelieprints.be?subject=Bestelling: ${p.name}'">Bestel via Mail</button>
            </div>
        `;
    });
}

// VIEWER MODELLEN MET HOOFDLETTERS
const models = ["Victoria.glb", "LetterName.glb", "SabiVinz.glb"];
const names = ["Victoria's Angels LED sign", "Naam Plaatje", "Dubbele naam op voet"];
let cur = 0;
const v = document.getElementById('mainViewer');
const t = document.getElementById('model-title');

if (v) {
    document.getElementById('nextModel').onclick = () => { cur = (cur+1)%3; updateV(); };
    document.getElementById('prevModel').onclick = () => { cur = (cur-1+3)%3; updateV(); };
}

function updateV() {
    v.src = `models/${models[cur]}`;
    t.innerText = `Model: ${names[cur]}`;
}

const menu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Open/sluit menu
menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    navLinks.classList.toggle('active');

    // Voorkom scrollen als menu open is
    if(navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Sluit menu als je op een link klikt (handig bij anchor links)
navItems.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('is-active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});
