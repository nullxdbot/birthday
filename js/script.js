/*Author    : Farrel Aulia Irfealdo*/
/*Instagram : https://instagram.com/null.xd_*/
/*Website   : https://tako.id/nullxd*/

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIC APLIKASI UTAMA (Navigasi) ---
    window.pages = new Array('halaman1', 'halaman2', 'halaman3', 'halaman4');

    window.klikMenu = function() {
        document.querySelector('.dalemnya_kontener').classList.toggle('buka_menu');
    }

    window.PindahKeHalaman = function(page) {
        var dalemnya_kontener = document.querySelector('.dalemnya_kontener');
        var sections = document.querySelectorAll('.dalemnya_halaman');
        
        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.remove('before', 'after');
            if (i > page) {
                sections[i].classList.add('after');
            }
        }
        
        dalemnya_kontener.classList.remove('buka_menu', 'page-halaman1', 'page-halaman2', 'page-halaman3', 'page-halaman4');
        dalemnya_kontener.classList.add('page-' + pages[page]);
    }
    
    // --- 2. LOGIC TANGGAL STATIS ---
    const waktuElement = document.getElementById("waktu");
    if (waktuElement) {
        waktuElement.innerHTML = formatAMPM();
    }
    
    function formatAMPM() {
      // Tanggal ulang tahun statis (Rabu, 10 Desember 2025)
      // PASTIKAN NAMA SUDAH BENAR: Ayla Rahma Dianty
      return '<div class="ml1"><span class="text-wrapper"><span class="line line1"></span><span class="letters">Rabu, 10 Desember 2025</span><span class="line line2"></span></span></div><p class="ml2"> Hari Ulang Tahun Ayla Rahma Dianty! </p>';
    }

    // --- 3. LOGIC AUDIO & FADE (Fungsi JQuery) ---
    // Menggunakan JQuery 3.6.0 yang sudah kompatibel
    if (typeof jQuery !== 'undefined') {
        $(document).ready(function () {
            var audio = new Audio('audio/audio.mp3'); 
            $("#tombol").click(function () {
                $("#kontener2").fadeOut(500); // Fadeout halaman awal
                $("#kontener").fadeIn('slow'); // Fadein halaman utama
                audio.play();
            });
        });
    }

    // --- 4. LOGIC ANIMASI ANIME.JS ---

    window.onload = function() {
        // Anime.js untuk ml1 (Tanggal)
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
              }).add({
                targets: '.ml1 .line',
                scaleX: [0, 1],
                opacity: [0.5, 1],
                easing: "easeOutExpo",
                duration: 700,
                offset: '-=875',
                delay: (el, i, l) => 80 * (l - i)
              }).add({
                targets: '.ml1',
                opacity: 1,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
              });
        }

        // Anime.js untuk ml2 (Subteks Hari Ulang Tahunmu!)
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
                delay: 1400
              }).add({
                targets: '.ml2',
                opacity: 1,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
              });
        }
    }

    // --- 5. LOGIC EFEK INTERAKTIF HEART BURST ---
    document.addEventListener('click', function(e) {
        if (document.getElementById('kontener').style.display === 'block') {
            createHeartBurst(e.clientX, e.clientY);
        }
    });
    
    document.addEventListener('touchstart', function(e) {
        if (document.getElementById('kontener').style.display === 'block') {
            createHeartBurst(e.touches[0].clientX, e.touches[0].clientY);
        }
    });

    function createHeartBurst(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart-burst');
        heart.style.left = x + 'px'; 
        heart.style.top = y + 'px'; 
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 500);
    }
});
