// --- 1. Envelope Open Animation ---
function openEnvelope() {
    const overlay = document.getElementById('envelope-overlay');
    const mainContent = document.getElementById('main-content');
    
    overlay.style.transform = 'translateY(-100vh)';
    
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.display = 'block'; // සයිට් එක පෙන්වීම
        
        // සයිට් එක පෙනුන ගමන් පොඩි වෙලාවකින් සුදුවට මැවෙන Effect එක දීම
        setTimeout(() => {
            mainContent.style.opacity = '1';
            handleScrollAnimation(); // ඇනිමේෂන් ක්‍රියාත්මක කිරීම
        }, 50);

        setInterval(createPetal, 300); // මල් පෙති වැටීම
        startGoldGalleryLoop(); // 3D Book Auto-Loop
    }, 1000);
}

// --- 2. 100% වැඩ කරන Scroll Animation Logic ---
function handleScrollAnimation() {
    const animateSections = document.querySelectorAll('.animate-section');
    
    const observerOptions = {
        root: null,
        threshold: 0.05 // සෙක්ෂන් එකෙන් 5% ක් පෙනෙද්දීම ඇනිමේෂන් එක වැඩ කරයි
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear'); // CSS එක හරහා ඇනිමේෂන් එක සිදුවේ
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animateSections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// --- 3. Countdown Timer (Target: Feb 17, 2028) ---
const targetDate = new Date("February 17, 2028 11:00:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("mins").innerText = m < 10 ? "0" + m : m;
    document.getElementById("secs").innerText = s < 10 ? "0" + s : s;

    if (difference < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-container").innerHTML = "<h3>The Big Day is Here!</h3>";
    }
}, 1000);

// --- 4. Automatic 3D Flip Book Loop ---
function startGoldGalleryLoop() {
    const bookContainer = document.querySelector('.book-container');
    if(bookContainer) {
        setInterval(() => {
            bookContainer.classList.toggle('flipped');
        }, 3000);
    }
}

// --- 5. Falling Flower Petals Effect ---
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.width = Math.random() * 10 + 10 + 'px';
    petal.style.height = petal.style.width;
    petal.style.animationDuration = Math.random() * 3 + 2 + 's'; 
    
    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 5000);
}