// script.js - Enhanced Version with Improved Navigation

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 0;
    const totalPages = 4;
    
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

    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }

    // ============================================
    // 3. AUDIO ELEMENT
    // ============================================
    
    const birthdayAudio = document.getElementById('birthdayAudio');
    
    // ============================================
    // 4. WELCOME SCREEN TRANSITION
    // ============================================
    
    const openBtn = document.getElementById('openBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContainer = document.getElementById('mainContainer');
    
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            if (birthdayAudio) {
                birthdayAudio.currentTime = 0;
                birthdayAudio.play().catch(error => {
                    console.log('Audio playback failed:', error);
                });
            }
            
            welcomeScreen.classList.add('fade-out');
            
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                mainContainer.style.display = 'block';
                mainContainer.classList.add('fade-in');
                showPage(0);
            }, 800);
        });
    }

    // ============================================
    // 5. PAGE NAVIGATION FUNCTION
    // ============================================
    
    function showPage(pageIndex) {
        const pages = document.querySelectorAll('.page');
        const dots = document.querySelectorAll('.page-dots .dot');
        const menuItems = document.querySelectorAll('.menu-item');
        
        pages.forEach(page => {
            page.classList.remove('active', 'prev');
        });
        
        pages[pageIndex].classList.add('active');
        dots[pageIndex].classList.add('active');
        dots.forEach((dot, i) => {
            if (i !== pageIndex) dot.classList.remove('active');
        });
        
        menuItems.forEach((item, i) => {
            if (i === pageIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        currentPage = pageIndex;
    }

    // ============================================
    // 6. MENU TOGGLE
    // ============================================
    
    const menuToggle = document.getElementById('menuToggle');
    const contentWrapper = document.getElementById('contentWrapper');
    
    if (menuToggle && contentWrapper) {
        menuToggle.addEventListener('click', function() {
            contentWrapper.classList.toggle('menu-open');
        });
    }

    // ============================================
    // 7. MENU ITEMS CLICK
    // ============================================
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageIndex = parseInt(this.dataset.page);
            showPage(pageIndex);
            if (contentWrapper) {
                contentWrapper.classList.remove('menu-open');
            }
        });
    });

    // ============================================
    // 8. PAGE DOTS CLICK
    // ============================================
    
    const dots = document.querySelectorAll('.page-dots .dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const pageIndex = parseInt(this.dataset.page);
            showPage(pageIndex);
        });
    });

    // ============================================
    // 9. TOUCH/SWIPE NAVIGATION
    // ============================================
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const pagesContainer = document.querySelector('.pages-container');
    if (pagesContainer) {
        pagesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        pagesContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < totalPages - 1) {
                showPage(currentPage + 1);
            } else if (diff < 0 && currentPage > 0) {
                showPage(currentPage - 1);
            }
        }
    }

    // ============================================
    // 10. KEYBOARD NAVIGATION
    // ============================================
    
    document.addEventListener('keydown', (e) => {
        if (mainContainer.style.display !== 'none') {
            if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
                showPage(currentPage + 1);
            } else if (e.key === 'ArrowLeft' && currentPage > 0) {
                showPage(currentPage - 1);
            }
        }
    });

    // ============================================
    // 11. ANIME.JS TEXT ANIMATIONS
    // ============================================
    
    if (typeof anime !== 'undefined') {
        const dateText = document.getElementById('dateText');
        if (dateText) {
            const text = dateText.textContent;
            dateText.innerHTML = text.split('').map(char => {
                if (char === ' ') return '<span class="letter">&nbsp;</span>';
                return `<span class="letter">${char}</span>`;
            }).join('');

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
    // 12. CONSOLE EASTER EGG
    // ============================================
    
    console.log('%c💖 Happy Birthday Ayla Rahma Dianty! 💖', 
        'color: #ff6b9d; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
    console.log('%cMade with love and dedication ❤️', 
        'color: #666; font-size: 14px; font-style: italic;');

    // ============================================
    // 13. SMOOTH SCROLL
    // ============================================
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.scrollBehavior = 'smooth';
    });

    // ============================================
    // 14. PREVENT DOUBLE TAP ZOOM
    // ============================================
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    console.log('%c✨ Website loaded successfully!', 'color: #00d4aa; font-size: 12px;');
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`%cPage loaded in ${loadTime}ms`, 'color: #666; font-size: 11px;');
    }
});