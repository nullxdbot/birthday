// script.js - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. PARTICLE SYSTEM
    // ============================================
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const emojis = ['❤️', '💕', '💖', '💗', '🌸', '🌹', '✨', '⭐', '🎀', '🦋'];
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.fontSize = (Math.random() * 20 + 12) + 'px';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.appendChild(particle);
            setTimeout(() => particle.remove(), 20000);
        }
    }

    // ============================================
    // 2. SPARKLE SYSTEM
    // ============================================
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        
        const sparklesContainer = document.getElementById('sparkles');
        if (sparklesContainer) {
            sparklesContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }
    }

    // Generate particles and sparkles
    setInterval(createParticle, 1000);
    setInterval(createSparkle, 300);

    // Initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }

    // ============================================
    // 3. WELCOME SCREEN TRANSITION
    // ============================================
    
    const openBtn = document.getElementById('openBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContainer = document.getElementById('mainContainer');
    
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            welcomeScreen.classList.add('fade-out');
            
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                mainContainer.style.display = 'block';
                mainContainer.classList.add('fade-in');
            }, 800);
        });
    }

    // ============================================
    // 4. MENU TOGGLE NAVIGATION
    // ============================================
    
    const menuToggle = document.getElementById('menuToggle');
    const contentWrapper = document.getElementById('contentWrapper');
    
    if (menuToggle && contentWrapper) {
        menuToggle.addEventListener('click', function() {
            contentWrapper.classList.toggle('menu-open');
        });
    }

    // ============================================
    // 5. PAGE NAVIGATION
    // ============================================
    
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        page.addEventListener('click', function() {
            if (contentWrapper && contentWrapper.classList.contains('menu-open')) {
                navigateToPage(index);
            }
        });
    });

    function navigateToPage(pageIndex) {
        pages.forEach((page, i) => {
            page.classList.remove('after');
            if (i > pageIndex) {
                page.classList.add('after');
            }
        });
        
        if (contentWrapper) {
            contentWrapper.classList.remove('menu-open');
        }
    }

    // ============================================
    // 6. ANIME.JS TEXT ANIMATIONS (if loaded)
    // ============================================
    
    if (typeof anime !== 'undefined') {
        // Animation for date text
        const dateText = document.getElementById('dateText');
        if (dateText) {
            // Wrap each character in a span for animation
            const text = dateText.textContent;
            dateText.innerHTML = text.split('').map(char => {
                if (char === ' ') return '<span class="letter">&nbsp;</span>';
                return `<span class="letter">${char}</span>`;
            }).join('');

            // Animate when page 4 is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime.timeline({ loop: false })
                            .add({
                                targets: '#dateText .letter',
                                scale: [0.3, 1],
                                opacity: [0, 1],
                                translateZ: 0,
                                easing: "easeOutExpo",
                                duration: 600,
                                delay: (el, i) => 50 * (i + 1)
                            });
                        observer.disconnect();
                    }
                });
            });

            const birthdayPage = document.querySelector('.birthday-page');
            if (birthdayPage) {
                observer.observe(birthdayPage);
            }
        }
    }

    // ============================================
    // 7. CONSOLE EASTER EGG
    // ============================================
    
    console.log('%c💖 Happy Birthday Ayla Rahma Dianty! 💖', 
        'color: #ff6b9d; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%cMade with love and dedication ❤️', 
        'color: #666; font-size: 14px; font-style: italic;');

    // ============================================
    // 8. SMOOTH SCROLL FOR PAGES
    // ============================================
    
    pages.forEach(page => {
        page.style.scrollBehavior = 'smooth';
    });

    // ============================================
    // 9. PREVENT DOUBLE TAP ZOOM ON MOBILE
    // ============================================
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // ============================================
    // 10. LOADING COMPLETE MESSAGE
    // ============================================
    
    console.log('%c✨ Website loaded successfully!', 'color: #00d4aa; font-size: 12px;');
});

// ============================================
// 11. WINDOW LOAD EVENT
// ============================================

window.addEventListener('load', function() {
    // Add loaded class to body for additional animations
    document.body.classList.add('loaded');
    
    // Log performance
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`%cPage loaded in ${loadTime}ms`, 'color: #666; font-size: 11px;');
    }
});