// === CONFIG: WhatsApp Business Number ===
const CONFIG = {
  whatsappNumber: '2349137421838'
};

// === MENU ITEMS: Each with Custom WhatsApp Message ===
const MENU_ITEMS = [
  {
    id: 'pepper-soup',
    name: 'Pepper Soup',
    description: 'Spicy Nigerian pepper soup with assorted meat, fish, or chicken',
    price: '₦2,500 - ₦4,000',
    image: 'food/peppersoup.jpg',
    category: 'Main Dishes',
    popular: true,
    orderMessage: 'Hello BelleFoods! I want to order your Pepper Soup with assorted meat.'
  },
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    description: 'Authentic Nigerian jollof rice with chicken and plantain',
    price: '₦3,000 - ₦5,000',
    image: 'food/jollofrice.jpg',
    category: 'Main Dishes',
    popular: true,
    orderMessage: 'Hi BelleFoods! I’m craving your Jollof Rice with chicken and plantain.'
  },
  {
    id: 'suya',
    name: 'Suya (Barbecue)',
    description: 'Grilled spiced meat skewers with onions and peppers',
    price: '₦1,500 - ₦3,000',
    image: 'food/suya.jpg',
    category: 'Grilled',
    popular: true,
    orderMessage: 'Hi BelleFoods! I’d like to place an order for Suya with plenty onions and pepper.'
  },
  {
    id: 'fried-plantain',
    name: 'Fried Plantain',
    description: 'Sweet fried plantain slices (Dodo)',
    price: '₦800 - ₦1,500',
    image: 'food/plantain.jpg',
    category: 'Sides',
    popular: false,
    orderMessage: 'Hello BelleFoods! I want a plate of Fried Plantain (Dodo) — sweet and hot'
  },
  {
    id: 'noodles',
    name: 'Special Noodles',
    description: 'Nigerian-style noodles with vegetables and spices',
    price: '₦2,000 - ₦3,500',
    image: 'food/indomie.jpg',
    category: 'Main Dishes',
    popular: false,
    orderMessage: 'Hi BelleFoods! I’m ordering your Special Noodles.'
  },
  {
    id: 'yam-porridge',
    name: 'Yam Porridge',
    description: 'yam porridge with fish and spices',
    price: '₦2,500 - ₦4,000',
    image: 'food/yampor.jpg',
    category: 'Main Dishes',
    popular: false,
    orderMessage: 'Hi BelleFoods! I’d like a serving of Yam Porridge — your tasty plantain porridge with fish.'
  }
];

// === Initialize and Display Menu Items ===
function initializeApp() {
  const menuGrid = document.getElementById('menu-grid');
  if (menuGrid) {
    menuGrid.innerHTML = MENU_ITEMS.map(createMenuCard).join('');
  }
}

// === Create Menu Card for Each Item ===
function createMenuCard(item) {
  const popularBadge = item.popular ? `<div class="menu-badge">Popular</div>` : '';
  return `
    <div class="menu-card">
      <div class="menu-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        ${popularBadge}
        <div class="menu-category">${item.category}</div>
      </div>
      <div class="menu-content">
        <h3 class="menu-title">${item.name}</h3>
        <p class="menu-description">${item.description}</p>
        <div class="menu-footer">
          <span class="menu-price">${item.price}</span>
          <button class="btn btn-primary" onclick="openWhatsApp('${item.orderMessage}')">
            Order
          </button>
        </div>
      </div>
    </div>
  `;
}

// === Open WhatsApp with Custom Message ===
function openWhatsApp(message) {
  try {
    const phone = CONFIG.whatsappNumber;
    const cleanMessage = sanitizeInput(message);

    if (!isValidInput(phone) || !isValidInput(cleanMessage)) {
      throw new Error('Invalid input');
    }

    const now = Date.now();
    const lastTime = parseInt(localStorage.getItem('lastOrderTime') || '0');

    // Only allow 1 order every 3 seconds (spam protection)
    if (now - lastTime < 3000) return;

    localStorage.setItem('lastOrderTime', now.toString());

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(cleanMessage)}`;
    window.open(url, '_blank');
  } catch (err) {
    console.error('WhatsApp Error:', err.message);
  }
}

// === Sanitize Text to Prevent Errors ===
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>\"'&]/g, '').trim();
}

// === Validate Input is Not Empty or Too Long ===
function isValidInput(input) {
  return typeof input === 'string' && input.length > 0 && input.length < 500;
}

// === Handle Navbar Toggle Button ===
function handleNavToggle(navToggle, navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
        e.preventDefault();
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
}

// === Scroll to Section Smoothly ===
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// === Handle Scroll Event to Add Shadow to Navbar ===
function handleScroll() {
  const navbar = document.getElementById('navbar');
  if (window.pageYOffset > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// === Get Scroll Position ===
function getScrollTop() {
  return Math.max(document.documentElement.scrollTop || 0, document.body.scrollTop || 0);
}

// === Run on Page Load ===
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    handleNavToggle(navToggle, navMenu);
  }

  // Scroll to section if URL has a #hash
  if (window.location.hash) {
    const sectionId = window.location.hash.slice(1);
    setTimeout(() => scrollToSection(sectionId), 100);
  }
});

// === Update Navbar on Scroll ===
document.addEventListener('scroll', handleScroll);
