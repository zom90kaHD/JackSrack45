// Array of BUCIN quotes
const bucinQuotes = [
    "Cinta itu buta, dan aku dengan senang hati menjadi buta untuk dirimu",
    "Hati aku milik siapa? Itu pertanyaan yang tahu jawabannya hanya hati itu sendiri... dan itu dirimu",
    "Aku bukan orang yang baik dalam mengungkapkan perasaan, tapi mataku berbicara lebih dari kata-kataku",
    "Kamu bukan pilihan, kamu adalah takdir yang aku sambut dengan terbuka",
    "Di hari terburuku sekalipun, senyummu membuat segalanya menjadi terbaik",
    "Aku tidak perlu jutaan alasan untuk mencintaimu, cukup satu... yaitu kamu ada",
    "Setiap menit tanpamu terasa seperti seribu tahun lamanya",
    "Kamu adalah impian yang aku takutkan akan hilang saat aku terbangun",
    "Jatuh cinta itu mudah, tapi jatuh cinta padamu itu yang terindah",
    "Di tengah kegelapan hidupku, kamu adalah cahaya yang menerangi segalanya",
    "Aku tidak siap untuk mencintaimu, tapi hati aku tidak memberi pilihan",
    "Kamu membuat hidupku jadi cerita yang indah, meskipun penuh luka",
];

let currentQuoteIndex = 0;

// Carousel variables
let currentSlide = 0;
let autoSlideInterval;

// Carousel functions
function initCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    const dotsContainer = document.getElementById('carouselDots');
    
    // Create dots
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Start auto-slide
    startAutoSlide();
}

function showSlide(index) {
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');
    
    if (index >= images.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = images.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Update images
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === currentSlide) {
            img.classList.add('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlide) {
            dot.classList.add('active');
        }
    });
}

function changeSlide(n) {
    clearInterval(autoSlideInterval);
    showSlide(currentSlide + n);
    startAutoSlide();
}

function goToSlide(n) {
    clearInterval(autoSlideInterval);
    showSlide(n);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000); // Ganti gambar setiap 4 detik
}

// Show message on button click
function showMessage() {
    const message = "Yay! Kamu Sayang Aku! 💕\n💕I Love You 💕";
    alert(message);
    playHeartAnimation();
}

// Next quote function
function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % bucinQuotes.length;
    const quoteText = document.getElementById('quote-text');
    quoteText.style.animation = 'none';
    setTimeout(() => {
        quoteText.textContent = `"${bucinQuotes[currentQuoteIndex]}"`;
        quoteText.style.animation = 'fadeIn 0.5s ease-out';
    }, 100);
}

// Calculate BUCIN level
function calculateBucin() {
    const checkCount = parseInt(document.getElementById('checkCount').value) || 0;
    const waitTime = parseInt(document.getElementById('waitTime').value);
    const dramaLevel = parseInt(document.getElementById('dramaLevel').value);

    // Calculate percentage
    let percentage = 0;
    
    if (checkCount > 0) {
        // Check count contribution (0-30%)
        if (checkCount < 5) percentage += 5;
        else if (checkCount < 10) percentage += 15;
        else if (checkCount < 20) percentage += 25;
        else percentage += 30;
    }

    // Wait time contribution (0-35%)
    percentage += (waitTime * 9);

    // Drama level contribution (0-35%)
    percentage += (dramaLevel * 3.5);

    // Cap at 100
    percentage = Math.min(100, percentage);

    // Display result
    const resultDiv = document.getElementById('result');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultBar = document.getElementById('resultBar');

    resultDiv.classList.remove('result-hidden');

    // Determine BUCIN level
    let level = '';
    let message = '';
    
    if (percentage < 20) {
        level = '🤔 Belum BUCIN';
        message = 'Kamu masih bisa diselamatkan! Atau... belum menemukan orang yang tepat? 😏';
    } else if (percentage < 40) {
        level = '❤️ BUCIN Ringan';
        message = 'Ada gejala-gejala awal. Hati-hati, BUCIN bisa menular! 🙈';
    } else if (percentage < 60) {
        level = '💕 BUCIN Sedang';
        message = 'Kamu sudah termasuk BUCIN sejati! Selamat bergabung! 🎉';
    } else if (percentage < 80) {
        level = '😍 BUCIN Berat';
        message = 'Wah, tingkat BUCIN mu sangat tinggi! Tapi itu indah kok 💔';
    } else {
        level = '🥺 BUCIN EKSTRIM';
        message = 'Kamu adalah BUCIN sejatinya! Tingkat cinta mu mencapai puncaknya! 💞';
    }

    resultTitle.textContent = level;
    resultMessage.textContent = message;
    
    // Animate bar
    resultBar.style.width = '0%';
    setTimeout(() => {
        resultBar.style.width = percentage + '%';
        resultBar.textContent = Math.round(percentage) + '%';
    }, 100);
}

// Update drama level display
document.addEventListener('DOMContentLoaded', function() {
    const dramaSlider = document.getElementById('dramaLevel');
    const dramaValue = document.getElementById('dramaValue');
    
    if (dramaSlider) {
        dramaSlider.addEventListener('input', function() {
            dramaValue.textContent = this.value;
        });
    }

    // Set initial quote
    document.getElementById('quote-text').textContent = `"${bucinQuotes[0]}"`;

    // Create floating hearts
    createFloatingHearts();
    
    // Initialize carousel
    initCarousel();
});

// Play heart animation
function playHeartAnimation() {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.position = 'fixed';
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'float-up 3s ease-out forwards';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.zIndex = '1000';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Create floating hearts background
function createFloatingHearts() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                opacity: 1;
                transform: translateY(0) translateX(0);
            }
            100% {
                opacity: 0;
                transform: translateY(-100vh) translateX(100px);
            }
        }
        
        @keyframes float-left {
            0% {
                opacity: 0;
                right: -100px;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                right: 100vw;
            }
        }
    `;
    document.head.appendChild(style);
}

// Spread BUCIN Love function
function spreadBucinLove() {
    const message = "Aku sudah membaca website BUCIN! Yuk, kita sama-sama jadi BUCIN yang bahagia! 💕❤️💞";
    
    if (navigator.share) {
        navigator.share({
            title: 'BUCIN - Bersedia Cinta Nekad',
            text: message,
            url: window.location.href
        }).catch(err => console.log('Share error:', err));
    } else {
        // Fallback: copy to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = message;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Pesan BUCIN copied! Sebarkan ke teman-temanmu 💕');
    }
}

// Add some interactivity to signs
document.addEventListener('DOMContentLoaded', function() {
    const signs = document.querySelectorAll('.sign');
    signs.forEach(sign => {
        sign.addEventListener('click', function() {
            playHeartAnimation();
        });
    });
});

// Smooth scroll for buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add some random love messages in console
console.log('%c❤️ SELAMAT DATANG DI DUNIA BUCIN ❤️', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%cCinta tidak membutuhkan logika... Cinta hanya butuh hati yang tulus! 💕', 'color: #667eea; font-size: 14px; font-style: italic;');
console.log('%cMungkin kamu BUCIN? Mari kita lihat... 👀', 'color: #ff6b9d; font-size: 12px;');
