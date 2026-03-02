document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Stop observing once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // --- Navbar Background Change on Scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });

    // --- Image Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = "block";
            lightboxImg.src = item.src;
            // Prevent body scrolling when lightbox is open
            document.body.style.overflow = "hidden";
        });
    });

    closeLightboxBtn.addEventListener('click', closeLightbox);

    // Close lightbox on outside click
    window.addEventListener('click', (e) => {
        if (e.target == lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // --- Gallery Filters ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItemsDivs = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItemsDivs.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    // Retrigger intersection observer for animation
                    item.classList.remove('visible');
                    setTimeout(() => {
                        observer.observe(item);
                    }, 50);
                } else {
                    item.classList.add('hide');
                    item.classList.remove('visible');
                    observer.unobserve(item);
                }
            });
        });
    });
});
