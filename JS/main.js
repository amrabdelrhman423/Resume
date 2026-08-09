document.addEventListener('DOMContentLoaded', function () {
    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.querySelector('.navbar-custom');
    const floatingBtn = document.querySelector('.floating-top-btn');

    window.addEventListener('scroll', function () {
        // Calculate scroll progress percentage
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressPercentage = (scrollTop / scrollHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = `${progressPercentage}%`;
        }

        // Navbar scrolled state & back-to-top visibility
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
            if (floatingBtn) floatingBtn.classList.add('visible');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            if (floatingBtn) floatingBtn.classList.remove('visible');
        }
    });

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    window.addEventListener('scroll', function () {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- MixItUp Project Filter Initialization ---
    const mixContainer = document.querySelector('#mixit-container');
    if (mixContainer && typeof mixitup !== 'undefined') {
        var mixer = mixitup(mixContainer, {
            selectors: {
                target: '.project-item'
            },
            animation: {
                duration: 400,
                effects: 'fade translateY(30px) scale(0.95)',
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }
        });
    }

    // Filter Buttons Toggle Active State
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Copy Contact Info to Clipboard ---
    const copyElements = document.querySelectorAll('[data-copy]');
    copyElements.forEach(el => {
        el.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = `<i class="fas fa-check"></i> Copied!`;
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    });

    // --- ScrollReveal Staggered Animations ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '40px',
            duration: 1000,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            reset: false
        });

        sr.reveal('.hero-content-col', { origin: 'left' });
        sr.reveal('.hero-avatar-col', { origin: 'right', delay: 200 });
        sr.reveal('.section-header', { origin: 'bottom' });
        sr.reveal('.skill-card', { origin: 'bottom', interval: 120 });
        sr.reveal('.timeline-item', { origin: 'left', interval: 180 });
        sr.reveal('.project-item', { origin: 'bottom', interval: 140 });
        sr.reveal('.contact-item-card', { origin: 'left', interval: 150 });
    }

    // --- Loading Screen Dismissal ---
    const loadingLayer = document.getElementById('loading');
    if (loadingLayer) {
        setTimeout(() => {
            loadingLayer.style.opacity = '0';
            loadingLayer.style.transition = 'opacity 0.6s ease-out';
            setTimeout(() => {
                loadingLayer.style.display = 'none';
            }, 600);
        }, 400);
    }
});