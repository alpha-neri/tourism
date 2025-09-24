// --- Preloader Logic ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const heroVideoContainer = document.querySelector('.hero-video-container');

    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('preloader-hidden');
        }
    }, 1500);

    setTimeout(() => {
        if (heroVideoContainer) {
            heroVideoContainer.classList.add('visible');
        }
    }, 2000);

    setTimeout(() => {
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 2700);
});

document.addEventListener('DOMContentLoaded', function() {

    // --- Hamburger Menu Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        });
    }

    // --- Sticky Navigation Bar on Scroll ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Hero Video Sound Toggle Logic ---
    const video = document.getElementById('hero-video-element');
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (video && soundBtn) {
        soundBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            soundBtn.classList.toggle('unmuted');
        });
    }
    
    // --- Smooth Interactive Gallery Logic (Restored to Original) ---
    const galleryContainer = document.getElementById('gallery-container');
    const expandBtn = document.getElementById('expand-gallery-btn');
    const galleryStack = document.querySelector('.gallery-stack');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (expandBtn && galleryContainer && galleryStack && galleryItems.length > 0) {
        expandBtn.addEventListener('click', () => {
            galleryContainer.classList.add('expanded');
            expandBtn.style.opacity = '0';
            expandBtn.style.transform = 'translateX(-50%) scale(0.8)';
            setTimeout(() => { expandBtn.style.display = 'none'; }, 300);

            const containerWidth = galleryContainer.offsetWidth;
            let cols = 4;
            if (window.innerWidth <= 992) cols = 3;
            if (window.innerWidth <= 768) cols = 2;
            
            const gap = 20;
            const itemWidth = (containerWidth - (cols - 1) * gap) / cols;
            const itemHeight = itemWidth * (3 / 4);

            galleryItems.forEach((item, index) => {
                const row = Math.floor(index / cols);
                const col = index % cols;
                const newX = col * (itemWidth + gap);
                const newY = row * (itemHeight + gap);

                // This is the original logic that resets transforms and uses top/left
                item.style.transform = 'rotate(0) translateX(0) translateY(0)';
                item.style.top = `${newY}px`;
                item.style.left = `${newX}px`;
                item.style.width = `${itemWidth}px`;
                item.style.height = `${itemHeight}px`;
                item.style.opacity = '1';
            });

            const numRows = Math.ceil(galleryItems.length / cols);
            const newContainerHeight = numRows * itemHeight + (numRows - 1) * gap;
            galleryStack.style.height = `${newContainerHeight}px`;
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('image-modal');
    if (modal) {
        const modalImage = document.getElementById('modal-image');
        const modalDescription = document.getElementById('modal-description');
        const closeModalBtn = document.querySelector('.close-modal');

        const openModal = (imageSrc, description) => {
            modalImage.src = imageSrc;
            modalDescription.textContent = description;
            modal.classList.add('visible');
        };
        const closeModal = () => {
            modal.classList.remove('visible');
        };

        if (galleryStack) {
            galleryStack.addEventListener('click', (e) => {
                const item = e.target.closest('.gallery-item');
                if (galleryContainer.classList.contains('expanded') && item) {
                    const img = item.querySelector('img');
                    openModal(img.src, img.dataset.description || '');
                }
            });
        }
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => e.target === modal && closeModal());
        window.addEventListener('keydown', (e) => e.key === 'Escape' && modal.classList.contains('visible') && closeModal());
    }

    // --- Testimonial Slider ---
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        const nextBtn = document.querySelector('.slider-btn.next');
        const prevBtn = document.querySelector('.slider-btn.prev');
        let currentIndex = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        };
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        };

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        showSlide(currentIndex);
        setInterval(nextSlide, 7000);
    }

    // --- Section Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    }
});
