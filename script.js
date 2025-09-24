// --- Preloader Logic ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const heroVideoContainer = document.querySelector('.hero-video-container'); // Get the video container

    // Start hiding the preloader panels after 1.5 seconds
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
    }, 1500);

    // --- FINAL FIX: Trigger the hero video fade-in as the preloader is finishing ---
    // The delay is timed to start when the preloader animation is nearly complete.
    setTimeout(() => {
        if (heroVideoContainer) {
            heroVideoContainer.classList.add('visible');
        }
    }, 2500); // 1.5s delay + 1s of the preloader animation

    // Completely remove the preloader from the page after all animations are done
    setTimeout(() => {
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 2700); // 1.5s delay + 1.2s preloader animation duration
});

document.addEventListener('DOMContentLoaded', function() {

    // --- Hamburger Menu Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu.querySelectorAll('a');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.classList.add('nav-open');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.classList.remove('nav-open');
            }
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.classList.remove('nav-open');
                }
            });
        });
    }

    // --- Stop Blinking Caret on Slogan After Animation ---
    const slogan = document.querySelector('.slogan-animated');
    if (slogan) {
        const totalDelay = 2500 + 3500;
        setTimeout(() => {
            slogan.classList.add('typing-finished');
        }, totalDelay);
    }

    // --- Sticky Navigation Bar on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Hero Video Sound Toggle Logic ---
    const video = document.getElementById('hero-video-element');
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (video && soundBtn) {
        soundBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            soundBtn.classList.toggle('unmuted');
            const muteIcon = soundBtn.querySelector('.fa-volume-mute');
            const unmuteIcon = soundBtn.querySelector('.fa-volume-high');
            if (video.muted) {
                muteIcon.style.display = 'block';
                unmuteIcon.style.display = 'none';
            } else {
                muteIcon.style.display = 'none';
                unmuteIcon.style.display = 'block';
            }
        });
    }

    // --- Smooth Interactive Gallery Logic ---
    const galleryContainer = document.getElementById('gallery-container');
    const expandBtn = document.getElementById('expand-gallery-btn');
    const galleryStack = document.querySelector('.gallery-stack');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (expandBtn && galleryItems.length > 0) {
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
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const closeModalBtn = document.querySelector('.close-modal');
    function openModal(imageSrc, description) {
        modalImage.src = imageSrc;
        modalDescription.textContent = description;
        modal.classList.add('visible');
    }
    function closeModal() {
        modal.classList.remove('visible');
    }
    if (galleryStack) {
        galleryStack.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (galleryContainer.classList.contains('expanded') && item) {
                const img = item.querySelector('img');
                openModal(img.src, img.dataset.description);
            }
        });
    }
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => e.target === modal && closeModal());
    window.addEventListener('keydown', (e) => e.key === 'Escape' && modal.classList.contains('visible') && closeModal());

    // --- Testimonial Slider ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentIndex = 0;
    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) slide.classList.add('active');
        });
    }
    function nextSlide() { if (slides.length > 0) { currentIndex = (currentIndex + 1) % slides.length; showSlide(currentIndex); } }
    function prevSlide() { if (slides.length > 0) { currentIndex = (currentIndex - 1 + slides.length) % slides.length; showSlide(currentIndex); } }
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    if (slides.length > 0) setInterval(nextSlide, 7000);

    // --- Section Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
