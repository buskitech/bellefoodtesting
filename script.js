// Initialize Icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Shadow on Scroll & Shrink
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow');
        } else {
            header.classList.remove('shadow');
        }
    });

    // 2. View Full Menu Button Toggle System
    const viewAllBtn = document.getElementById('viewAllBtn');
    const viewAllContainer = document.getElementById('viewAllContainer');
    const hiddenItems = document.querySelectorAll('.hidden-menu-item');

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            // Remove the hidden class from all items entirely to render them freely
            hiddenItems.forEach(item => {
                item.classList.remove('hidden-menu-item');
                // Ensure they are displayed as flex blocks
                item.style.display = 'flex';
            });
            // Hide the actual button parent container as it is no longer needed
            viewAllContainer.style.display = 'none';
        });
    }

    // 3. Simple Category Filtering (Fast Food App Style)
    const categoryPills = document.querySelectorAll('.category-pill');

    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            categoryPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            // Re-select menu cards dynamically in case hidden ones were revealed
            const allMenuCards = document.querySelectorAll('.menu-card');

            allMenuCards.forEach(card => {
                // If it's still a hidden template item, DO NOT show it unless "all" is clicked?
                // Actually, if they filter, it's best to show matching elements regardless, or keep hidden items hidden unless button clicked.
                if (card.classList.contains('hidden-menu-item')) {
                    card.style.display = 'none';
                    return;
                }

                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Mobile Menu Toggle System
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinksClose = document.querySelectorAll('.nav-link-close');

    function openMenu() {
        navMenu.classList.add('active');
        mobileOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        mobileOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // allow scrolling
    }

    if (mobileMenuBtn && closeMenuBtn && navMenu && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);
        mobileOverlay.addEventListener('click', closeMenu);

        // Close menu when a navigation link is clicked
        navLinksClose.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 5. Modals Logic
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeModals = document.querySelectorAll('.close-modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // 6. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const elementId = this.getAttribute('href');
            if (elementId === '#') return;

            e.preventDefault();
            const target = document.querySelector(elementId);

            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    console.log("BelleFood Commercial Script Active. Happy Eating!");
});

//end
