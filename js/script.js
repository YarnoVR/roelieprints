function openTab(event, tabName) {
  if (event) event.preventDefault();

  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');

  const targetText = {
    'home': 'Ontdek',
    'featured': 'Creaties',
    'about': 'Studio',
    'custom': 'Start Project'
  } [tabName];
  const activeLink = Array.from(document.querySelectorAll('.tab-link')).find(link => link.innerText === targetText);
  if (activeLink) activeLink.classList.add('active');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  history.pushState(null, null, `#${tabName}`);

  const menu = document.querySelector('#mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (menu.classList.contains('is-active')) {
    menu.classList.remove('is-active');
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

const products = [{
    name: "Capital Letter",
    price: "€14.95",
    image: "img/CapitalJ.jpg",
    category: "3d"
  },
  {
    name: "Gepersonaliseerd LED sign",
    price: "€24.95",
    image: "img/Victoria.jpg",
    category: "3d"
  },
  {
    name: "Dubbele naam",
    price: "€9.95",
    image: "img/DubbeleNaam.jpg",
    category: "3d"
  },
  {
    name: "Custom Naam Sticker",
    price: "€4.95",
    image: "img/Sticker1.jpg",
    category: "vinyl"
  },
  {
    name: "Logo Sticker Set",
    price: "€12.50",
    image: "img/Sticker2.jpg",
    category: "vinyl"
  }
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

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts(e.target.dataset.filter);
    });
  });

  const hash = window.location.hash.substring(1);
  if (hash && ['home', 'featured', 'about', 'custom'].includes(hash)) {
    openTab(null, hash);
  }

  const splash = document.getElementById('splash-screen');
  const splashParallax = document.getElementById('splash-parallax');
  const enterBtn = document.getElementById('enter-btn');

  if (splash) {
    document.body.style.overflow = 'hidden';
    let ticking = false;

    document.addEventListener('mousemove', (e) => {
      if (!splash.classList.contains('fade-out') && !ticking) {
        window.requestAnimationFrame(() => {
          const x = (window.innerWidth / 2 - e.clientX) / 40;
          const y = (window.innerHeight / 2 - e.clientY) / 40;
          splashParallax.style.transform = `translate(${x}px, ${y}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    enterBtn.onclick = () => {
      splash.classList.add('fade-out');
      document.body.style.overflow = 'auto';
    };
  }

  if (localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  document.getElementById('theme-toggle').onclick = () => {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const models = ["Victoria.glb", "LetterName.glb", "SabiVinz.glb"];
  const names = ["Victoria's Angels LED sign", "Naam Plaatje", "Dubbele naam op voet"];
  let cur = 0;
  const v = document.getElementById('mainViewer');
  const t = document.getElementById('model-title');

  if (v) {
    document.getElementById('nextModel').onclick = () => {
      cur = (cur + 1) % 3;
      updateV();
    };
    document.getElementById('prevModel').onclick = () => {
      cur = (cur - 1 + 3) % 3;
      updateV();
    };
  }

  function updateV() {
    v.src = `models/${models[cur]}`;
    t.innerText = names[cur];
  }

  const menu = document.querySelector('#mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  menu.addEventListener('click', () => {
    const isActive = menu.classList.toggle('is-active');
    navLinks.classList.toggle('active');
    menu.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  });
});
