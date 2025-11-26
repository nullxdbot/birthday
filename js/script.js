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
    // 2. AUDIO & FADE EFFECTS
    // ============================================
    
    // Inisialisasi Audio (Pastikan file audio/audio.mp3 ada!)
    const audio = new Audio('audio/audio.mp3');
    audio.loop = true; 
    let isAudioPlaying = false;
    
    const $tombol = $("#tombol");
    const $kontener2 = $("#kontener2");
    const $kontener = $("#kontener");
    const $audioToggle = $("#audio-toggle");

    // Event Klik Tombol Buka Kejutan
    $tombol.on('click', function () {
        $kontener2.fadeOut(800, function() {
            $kontener.fadeIn(1500);
            PindahKeHalaman(0); // Pindah ke halaman 1 setelah fade in
        });
        
        // Coba putar audio
        audio.play().then(() => {
            isAudioPlaying = true;
            $audioToggle.text('🎵').removeClass('muted');
        }).catch(error => {
            // Jika browser memblokir
            console.log("Audio play blocked. User must interact to enable sound.", error);
            isAudioPlaying = false;
            $audioToggle.text('🔇').addClass('muted');
        });
    });

    // Event Klik Tombol Audio Toggle
    $audioToggle.on('click', function() {
        if (isAudioPlaying) {
            audio.pause();
            isAudioPlaying = false;
            $(this).text('🔇').addClass('muted');
        } else {
            audio.play().then(() => {
                isAudioPlaying = true;
                $(this).text('🎵').removeClass('muted');
            }).catch(error => {
                console.error("Gagal memutar audio:", error);
                alert("Gagal memutar audio. Pastikan file 'audio/audio.mp3' tersedia.");
            });
        }
    });

    // ============================================
    // 3. NAVIGATION SYSTEM (Unobtrusive & Clean)
    // ============================================
    
    const dalemnya_kontener = document.querySelector('.dalemnya_kontener');
    const sections = document.querySelectorAll('.dalemnya_halaman');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    let isTextAnimated = false; // Flag untuk Anime.js

    // Toggle menu
    menuToggleBtn.addEventListener('click', function() {
        dalemnya_kontener.classList.toggle('buka_menu');
    });

    // Fungsi navigasi utama
    function PindahKeHalaman(pageIndex) {
        
        dalemnya_kontener.classList.remove('buka_menu');

        // Atur kelas 'after' untuk efek tumpukan kartu
        sections.forEach((section, i) => {
            section.classList.remove('before', 'after');
            if (i > pageIndex) {
                section.classList.add('after');
            }
        });
        
        // Panggil animasi teks HANYA saat pindah ke halaman 4 (index 3)
        if (pageIndex === 3) {
            animateBirthdayText();
        }
    }
    
    // Pasang Event Listener ke setiap SECTION (mengganti onclick inline)
    sections.forEach((section) => {
        section.addEventListener('click', function() {
            const pageIndex = parseInt(section.dataset.pageIndex); 
            PindahKeHalaman(pageIndex);
        });
    });

    // ============================================
    // 4. ANIME.JS TEXT ANIMATIONS (Pemicuan Terkontrol)
    // ============================================
    
    function formatBirthdayText() {
        // HTML untuk tanggal dan subjudul (pastikan encoding file JS UTF-8 agar emoji terbaca!)
        return '<div class="ml1"><span class="text-wrapper"><span class="line line1"></span><span class="letters">Rabu, 10 Desember 2025</span><span class="line line2"></span></span></div><p class="ml2">🎉 Hari Ulang Tahun Ayla! 🎉</p>';
    }

    function animateBirthdayText() {
        if (isTextAnimated) return; // Keluar jika sudah pernah dianimasikan

        // Inject HTML Teks
        const waktuElement = document.getElementById("waktu");
        if (waktuElement) {
            waktuElement.innerHTML = formatBirthdayText();
        } else {
            return;
        }
        
        // Animasi ml1 (Tanggal)
        var textWrapper1 = document.querySelector('.ml1 .letters');
        if (textWrapper1) {
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
                    offset: '-=800',
                    delay: (el, i, l) => 80 * (l - i)
                })
                .add({
                    targets: '.ml1',
                    opacity: 1,
                    duration: 1000,
                    easing: "easeOutExpo"
                });
        }

        // Animasi ml2 (Subtitle)
        var textWrapper2 = document.querySelector('.ml2');
        if (textWrapper2) {
            textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

            anime.timeline({ loop: false })
                .add({
                    targets: '.ml2 .letter',
                    scale: [4, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 950,
                    delay: (el, i) => 100 * i + 1500 // Delay agar berjalan setelah ml1 selesai
                })
                .add({
                    targets: '.ml2',
                    opacity: 1,
                    duration: 1000,
                    easing: "easeOutExpo"
                });
        }
        
        isTextAnimated = true; 
    }

    // ============================================
    // 5. CONSOLE MESSAGE
    // ============================================
    console.log('%c💖 Happy Birthday Ayla Rahma Dianty! 💖', 'color: #e73c7e; font-size: 20px; font-weight: bold;');
});
