const products = [
  { name: "Capital Letter", price: "€14.95", image: "img/CapitalJ.webp", category: "3d" },
  { name: "Gepersonaliseerd LED sign", price: "€24.95", image: "img/Victoria.webp", category: "3d" },
  { name: "Dubbele naam", price: "€7.95", image: "img/DubbeleNaam.webp", category: "3d" },
  { name: "Gepersonaliseerde Stanley Beker", price: "Surplus van €14.95", image: "img/StanleyVinyl.webp", category: "vinyl" },
    { name: "Gepersonaliseerde Kambukka Drinkfles", price: "Surplus van 14.95", image: "img/Kambukka.webp", category: "vinyl" },
  { name: "Instagram Tag", price: "€6.95", image: "img/Instatag.webp", category: "vinyl" }
];

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = "";
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  filtered.forEach(p => {
    grid.innerHTML += `
      <article class="product-card">
        <div class="product-img-container"><img src="${p.image}" alt="Productfoto van ${p.name}" class="product-img" loading="lazy"></div>
        <h3>${p.name}</h3>
        <span class="price">${p.price}</span>
        <button class="btn primary" style="padding: 10px 20px; font-size: 0.9rem; background: linear-gradient(45deg, #f09433, #dc2743, #bc1888); border: none;"
          onclick="window.open('https://ig.me/m/roelie.prints', '_blank')" aria-label="Bestel ${p.name} via Instagram DM"><i class="fab fa-instagram" aria-hidden="true"></i> Bestel via DM</button>
      </article>
    `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.filter);
      });
    });
  }

  const splash = document.getElementById('splash-screen');
  const splashParallax = document.getElementById('splash-parallax');
  const enterBtn = document.getElementById('enter-btn');

  if (splash && enterBtn) {
    if (sessionStorage.getItem('splashSeen') === 'true') {
      splash.style.display = 'none';
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      let ticking = false;
      document.addEventListener('mousemove', (e) => {
        if (!splash.classList.contains('fade-out') && !ticking) {
          window.requestAnimationFrame(() => {
            const x = (window.innerWidth / 2 - e.clientX) / 40;
            const y = (window.innerHeight / 2 - e.clientY) / 40;
            if (splashParallax) splashParallax.style.transform = `translate(${x}px, ${y}px)`;
            ticking = false;
          });
          ticking = true;
        }
      });
      enterBtn.onclick = () => {
        splash.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        sessionStorage.setItem('splashSeen', 'true');
        setTimeout(() => {
          splash.style.display = 'none';
        }, 800);
      };
    }
  }

  if (localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.onclick = () => {
      let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };
  }

  const models = ["Victoria.glb", "LetterName.glb", "SabiVinz.glb"];
  const names = ["Victoria's Angels LED sign", "Naam Plaatje", "Dubbele naam op voet"];
  let cur = 0;
  const v = document.getElementById('mainViewer');
  const t = document.getElementById('model-title');
  const nextModelBtn = document.getElementById('nextModel');
  const prevModelBtn = document.getElementById('prevModel');

  if (v && t && nextModelBtn && prevModelBtn) {
    nextModelBtn.onclick = () => { cur = (cur + 1) % 3; updateV(); };
    prevModelBtn.onclick = () => { cur = (cur - 1 + 3) % 3; updateV(); };
    function updateV() {
      v.src = `models/${models[cur]}`;
      t.innerText = names[cur];
    }
  }

  const menu = document.querySelector('#mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (menu && navLinks) {
    menu.addEventListener('click', () => {
      const isActive = menu.classList.toggle('is-active');
      navLinks.classList.toggle('active');
      menu.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : 'auto';
    });
  }
});
