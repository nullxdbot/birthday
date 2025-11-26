document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. FLOATING HEARTS ANIMATION
    // ============================================
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        const heartsContainer = document.getElementById('hearts');
        if (heartsContainer) {
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 10000);
        }
    }

    // Create hearts every 800ms
    setInterval(createHeart, 800);

    // ============================================
    // 2. NAVIGATION SYSTEM
    // ============================================
    
    // Global pages array
    window.pages = ['halaman1', 'halaman2', 'halaman3', 'halaman4'];

    // Toggle menu function
    window.klikMenu = function() {
        document.querySelector('.dalemnya_kontener').classList.toggle('buka_menu');
    }

    // Navigate to specific page
    window.PindahKeHalaman = function(page) {
        const dalemnya_kontener = document.querySelector('.dalemnya_kontener');
        const sections = document.querySelectorAll('.dalemnya_halaman');
        
        // Remove all before/after classes and add after for pages beyond current
        sections.forEach((section, i) => {
            section.classList.remove('before', 'after');
            if (i > page) {
                section.classList.add('after');
            }
        });
        
        // Update container classes
        dalemnya_kontener.classList.remove('buka_menu', 'page-halaman1', 'page-halaman2', 'page-halaman3', 'page-halaman4');
        dalemnya_kontener.classList.add('page-' + window.pages[page]);
    }
    
    // ============================================
    // 3. DATE DISPLAY (STATIC)
    // ============================================
    
    const waktuElement = document.getElementById("waktu");
    if (waktuElement) {
        waktuElement.innerHTML = formatAMPM();
    }
    
    function formatAMPM() {
        // Static birthday date
        return '<div class="ml1"><span class="text-wrapper"><span class="line line1"></span><span class="letters">Rabu, 10 Desember 2025</span><span class="line line2"></span></span></div><p class="ml2">Hari Ulang Tahun Ayla!</p>';
    }

    // ============================================
    // 4. AUDIO & FADE EFFECTS (jQuery)
    // ============================================
    
    if (typeof jQuery !== 'undefined') {
        $(document).ready(function () {
            // Initialize audio
            var audio = new Audio('audio/audio.mp3');
            
            // Button click event
            $("#tombol").click(function () {
                $("#kontener2").fadeOut(800);
                $("#kontener").fadeIn(1500);
                
                // Play audio
                audio.play().catch(function(error) {
                    console.log("Audio play failed:", error);
                });
            });
        });
    }

    // ============================================
    // 5. ANIME.JS TEXT ANIMATIONS
    // ============================================
    
    window.onload = function() {
        
        // Animation for ml1 (Date text)
        var textWrapper1 = document.querySelector('.ml1 .letters');
        if (textWrapper1) {
            // Wrap each character in a span
            textWrapper1.innerHTML = textWrapper1.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            anime.timeline({ loop: false })
                .add({
                    targets: '.ml1 .letter',
                    scale: [0.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 600,
                    delay: (el, i) => 70 * (i + 1)
                })
                .add({
                    targets: '.ml1 .line',
                    scaleX: [0, 1],
                    opacity: [0.5, 1],
                    easing: "easeOutExpo",
                    duration: 700,
                    offset: '-=875',
                    delay: (el, i, l) => 80 * (l - i)
                })
                .add({
                    targets: '.ml1',
                    opacity: 1,
                    duration: 1000,
                    easing: "easeOutExpo",
                    delay: 1000
                });
        }

        // Animation for ml2 (Subtitle text)
        var textWrapper2 = document.querySelector('.ml2');
        if (textWrapper2) {
            // Wrap each character in a span
            textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            anime.timeline({ loop: false })
                .add({
                    targets: '.ml2 .letter',
                    scale: [4, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 950,
                    delay: 1400
                })
                .add({
                    targets: '.ml2',
                    opacity: 1,
                    duration: 1000,
                    easing: "easeOutExpo",
                    delay: 1000
                });
        }
    }
});

// ============================================
// 6. CONSOLE MESSAGE (Optional Easter Egg)
// ============================================

console.log('%c💖 Happy Birthday Ayla Rahma Dianty! 💖', 'color: #e73c7e; font-size: 20px; font-weight: bold;');
console.log('%cMade with love ❤️', 'color: #666; font-size: 14px;');