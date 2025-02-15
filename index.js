document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a, .nav-links button').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".cards-container");
    let isDragging = false, startX, scrollLeft;

    // Mouse Events
    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mouseleave", () => isDragging = false);
    carousel.addEventListener("mouseup", () => isDragging = false);

    carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Adjust speed
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch Events for Mobile
    carousel.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("touchend", () => isDragging = false);
    carousel.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
});





// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const serviceTab = document.querySelector('.tab-options .active');
    const taxTab = document.querySelector('.tab-options button');
    
    // Mobile carousel functionality
    const serviceCards = document.querySelectorAll('.service-card');
    const dots = document.querySelectorAll('.dot');
    let currentCardIndex = 0;

    // Initialize mobile view
    if (window.innerWidth <= 768) {
        updateCardVisibility();
    }

    // Handle tab switching
    taxTab.addEventListener('click', function() {
        window.location.href = 'tax.html';
    });

    // Mobile touch handling
    let touchStartX = 0;
    let touchEndX = 0;

    const servicesContainer = document.querySelector('.services-container');
    
    servicesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    servicesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeLength = touchEndX - touchStartX;

        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0 && currentCardIndex > 0) {
                // Swipe right
                currentCardIndex--;
            } else if (swipeLength < 0 && currentCardIndex < serviceCards.length - 1) {
                // Swipe left
                currentCardIndex++;
            }
            updateCardVisibility();
        }
    }

    function updateCardVisibility() {
        serviceCards.forEach((card, index) => {
            card.style.display = index === currentCardIndex ? 'block' : 'none';
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentCardIndex);
        });
    }

    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentCardIndex = index;
            updateCardVisibility();
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            updateCardVisibility();
        } else {
            // Reset for desktop view
            serviceCards.forEach(card => card.style.display = 'block');
        }
    });
});
