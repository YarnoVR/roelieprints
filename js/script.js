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

// PRODUCTEN
const products = [
    { name: "Capital Name", price: "€19.95", image: "img/CapitalJ.jpg" },
    { name: "Gepersonaliseerde Vaas", price: "€19.95", image: "img/vaas.jpg" },
    { name: "Naamplaatje", price: "€4.95", image: "img/tag.jpg" }
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

// VIEWER
const models = ["dragon.glb", "vase.glb", "tag.glb"];
const names = ["Articulated Dragon", "Gepersonaliseerde Vaas", "Naamplaatje"];
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
