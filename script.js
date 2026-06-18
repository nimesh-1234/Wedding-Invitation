// --- 1. Envelope Open Animation ---
function openEnvelope() {
    const overlay = document.getElementById('envelope-overlay');
    const mainContent = document.getElementById('main-content');
    
    overlay.style.transform = 'translateY(-100vh)';
    
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.display = 'block'; 
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            handleScrollAnimation(); 
        }, 50);

        setInterval(createPetal, 300); 
        startGallerySlider(); // නව ගැලරිය සක්‍රීය කිරීම
    }, 1000);
}

// --- 2. Scroll Animation Logic ---
function handleScrollAnimation() {
    const animateSections = document.querySelectorAll('.animate-section');
    
    const observerOptions = {
        root: null,
        threshold: 0.05 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear'); 
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

// --- 4. Automatic Sequential Gallery Slider (පින්තූර 5ම එකින් එක මාරු වීමට) ---
let currentSlideIndex = 0;

function startGallerySlider() {
    const slides = document.querySelectorAll('.gallery-slide');
    if (slides.length === 0) return;

    setInterval(() => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    }, 3000); 
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