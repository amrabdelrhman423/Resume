document.addEventListener('DOMContentLoaded', function () {
    // --- Color Switcher ---
    const root = document.documentElement;
    const savedColor = localStorage.getItem("color") || "rgb(255, 165, 0)"; // Default orange

    // Function to set theme color
    function setThemeColor(color) {
        root.style.setProperty('--main-color', color);
        localStorage.setItem("color", color);
    }

    // Apply saved color on load
    setThemeColor(savedColor);

    // Sidebar Color Click Event
    const colorCircles = document.querySelectorAll(".sidebar span");
    colorCircles.forEach(circle => {
        circle.addEventListener("click", function () {
            // Get background color of the clicked circle
            const computedStyle = window.getComputedStyle(this);
            const color = computedStyle.backgroundColor;
            setThemeColor(color);
        });
    });

    // --- Sidebar Toggle ---
    const sidebarContainer = document.querySelector(".sidebar-container");
    const settingBtn = document.querySelector(".setting");
    const sidebar = document.querySelector("#sidebar");

    // Initialize sidebar position
    let sidebarWidth = sidebar.offsetWidth;
    sidebarContainer.style.left = `-${sidebarWidth}px`;
    settingBtn.style.left = `-${sidebarWidth}px`; // Wait, settingBtn is inside sidebar-container?
    // In original code: $(".setting").css("left", `-${sidebarWidth}px`);
    // But looking at HTML, .setting is a sibling of .sidebar inside .sidebar-container.
    // Let's stick to the logic: animate .sidebar-container left property.

    // Actually, looking at CSS, .sidebar-container is fixed.
    // Let's adjust the logic to match original behavior but cleaner.
    // Original: $(".sidebar-container").css("left", `-${sidebarWidth}px`);

    function closeSidebar() {
        sidebarContainer.style.left = `-${sidebarWidth}px`;
    }

    function openSidebar() {
        sidebarContainer.style.left = "0px";
    }

    // Initial close
    closeSidebar();

    settingBtn.addEventListener("click", function () {
        const currentLeft = window.getComputedStyle(sidebarContainer).left;
        if (currentLeft === "0px") {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector("#nav");
    const floatingBtn = document.querySelector('#floating');

    // Initial state
    if (window.scrollY <= 80) {
        floatingBtn.style.display = 'none';
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 80) {
            // Show floating button
            floatingBtn.style.display = 'block';
            // Change navbar background
            navbar.classList.remove('bg-transparent');
            navbar.style.backgroundColor = "#202026";
        } else {
            // Hide floating button
            floatingBtn.style.display = 'none';
            // Reset navbar background
            navbar.classList.add('bg-transparent');
            navbar.style.backgroundColor = "transparent";
        }
    });

    // --- Lightbox (Image View) ---
    const viewSection = document.getElementById('view');
    const viewCard = document.getElementById('view-card');
    const previewImg = document.getElementById('preview');
    const closeBtn = document.getElementById('times');
    const certItems = document.querySelectorAll('.Certificate .cert-item .position-relative');
    const block = document.querySelector('.block');

    // Hide initially
    viewSection.style.display = 'none';
    viewCard.style.display = 'none';

    certItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const img = this.querySelector('img');
            const src = img.getAttribute('src');

            previewImg.setAttribute('src', src);
            viewSection.style.display = 'block';
            viewCard.style.display = 'block';

            // Animation simulation
            setTimeout(() => {
                block.style.transform = 'translateY(70px)';
                document.body.style.overflow = 'hidden';
            }, 10);
        });
    });

    closeBtn.addEventListener('click', function () {
        block.style.transform = 'translateY(-70px)';
        setTimeout(() => {
            viewSection.style.display = 'none';
            document.body.style.overflow = 'visible'; // Changed from 'auto' to match original 'visible' or 'auto'
        }, 300); // Wait for transition
    });

    // --- Pagination / Filtering (MixItUp) ---
    // Initialize MixItUp
    // We use 'load' option to start with '.one' filter as per original logic ($(".two").hide())
    if (document.querySelector('#mixit')) {
        var mixer = mixitup('#mixit', {
            selectors: {
                target: '.mix' // The items to filter
            },
            load: {
                filter: '.one' // Initial filter
            },
            animation: {
                duration: 300
            }
        });
    }

    // Handle Active Page Class
    const pageButtons = document.querySelectorAll(".list-page li p");
    pageButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // Remove active class from all
            pageButtons.forEach(b => b.classList.remove("active-page"));
            // Add active class to clicked
            this.classList.add("active-page");
        });
    });

    // --- Scroll Reveal ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '30px',
            duration: 1500,
        });

        sr.reveal('.tags ul li', { origin: 'bottom', interval: 100, duration: 800 });
        sr.reveal('.cert-item ,#certificate h2 ', { origin: 'bottom', interval: 200 });
        sr.reveal('.edu-details, .break-line, .about-me h2, .about-me p, .about-content .col-md-12, .edu-left h2, .exp-right h2, #contact h2, #projects h2', { origin: 'bottom', interval: 200 });
        sr.reveal('.contact-content , .contact .row .col-md-9 p , .about-img', { origin: 'left', interval: 200 });
        sr.reveal('.contact-map , .contact .row .col-md-9 ul ', { origin: 'right', interval: 200 });
    }

    // --- Loading Screen ---
    const loadingScreen = document.getElementById("loading");
    if (loadingScreen) {
        // Fade out
        loadingScreen.style.transition = "opacity 1s";
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
            document.body.style.overflow = "auto";
        }, 1000);
    }
});