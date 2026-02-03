// === CONFIG ===
const CONFIG = {
  whatsappNumber: '2349137421838'
};

// === MENU DATA ===
const MENU_ITEMS = [
  {
    name: 'Goat Meat Pepper Soup',
    desc: 'Spicy broth with tender goat meat & scent leaves.',
    price: '₦2,500',
    img: 'food/peppersoup.jpg',
    msg: 'I want to order Goat Meat Pepper Soup'
  },
  {
    name: 'Smoky Jollof Rice',
    desc: 'Served with fried plantain and chicken.',
    price: '₦3,000',
    img: 'food/jollofrice.jpg',
    msg: 'I want to order Jollof Rice'
  },
  {
    name: 'Beef Suya',
    desc: 'Spicy grilled beef skewers with onions.',
    price: '₦1,500',
    img: 'food/suya.jpg',
    msg: 'I want to order Beef Suya'
  },
  {
    name: 'Fried Plantain',
    desc: 'Golden fried sweet dodo.',
    price: '₦800',
    img: 'food/plantain.jpg',
    msg: 'I want to order Plantain'
  },
  {
    name: 'Stir-fry Noodles',
    desc: 'Spicy noodles with veggies and egg.',
    price: '₦2,000',
    img: 'food/indomie.jpg',
    msg: 'I want to order Noodles'
  },
  {
    name: 'Yam Porridge (Asaro)',
    desc: 'Yam cooked in palm oil with dry fish.',
    price: '₦2,500',
    img: 'food/yampor.jpg',
    msg: 'I want to order Yam Porridge'
  }
];

// === APPLICATION STATE ===
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initNav();
  setupScrollAnimations();
});

// === THEME LOGIC ===
function initTheme() {
  const themeBtn = document.getElementById('theme-btn');
  const storedTheme = localStorage.getItem('theme');

  // Default to dark if not set
  if (storedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Optional: Animate icon or swap it (skipping swap for now for simplicity, users understand sun button toggles state)
    });
  }
}

// === NAVIGATION LOGIC ===
function initNav() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');

      // Prevent body scroll when menu is open
      if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('mobile-toggle');

  if (menu) {
    menu.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (toggle) {
    toggle.classList.remove('active');
  }
}


// === RENDER MENU ===
function initMenu() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  grid.innerHTML = MENU_ITEMS.map((item, index) => `
        <div class="menu-card scroll-reveal" style="transition-delay: ${index * 100}ms">
            <div class="img-container">
                <img src="${item.img}" alt="${item.name}" class="menu-img" loading="lazy">
                <div class="overlay-btn" onclick="openWhatsApp('${item.msg}')">
                    +
                </div>
            </div>
            <div class="item-info">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <h3>${item.name}</h3>
                    <span class="price">${item.price}</span>
                </div>
                <p>${item.desc}</p>
            </div>
        </div>
    `).join('');
}

// === INTERACTION UTILS ===
function openWhatsApp(msg) {
  const phone = CONFIG.whatsappNumber;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// === ANIMATIONS ===
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Add scroll-reveal class to elements we want to animate
  document.querySelectorAll('.bento-card, .menu-card, .hero-content').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
}
