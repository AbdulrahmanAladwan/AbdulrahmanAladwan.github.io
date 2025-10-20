// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon with animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.innerHTML = newTheme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Active Nav Link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll to Top
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Animations - Modified for faster animations
const animateOnScroll = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, {
    threshold: 0.1, // Lower threshold to trigger animations sooner
    rootMargin: '0px 0px -50px 0px' // Start animation before element is fully in view
});

animateOnScroll.forEach(element => {
    observer.observe(element);
});

// Stats Counter
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    if (!isNaN(target)) {
        let count = 0;
        const increment = target / 50;
        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.round(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        const statsSection = document.getElementById('statsSection');
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }
});

// Achievements Carousel
const achievementsGrid = document.getElementById('achievementsGrid');
const prevBtn = document.getElementById('achievementPrev');
const nextBtn = document.getElementById('achievementNext');

if (achievementsGrid && prevBtn && nextBtn) {
    let scrollAmount = 0;
    const cardWidth = 350 + 24; // Card width + gap

    nextBtn.addEventListener('click', () => {
        scrollAmount += cardWidth;
        achievementsGrid.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        achievementsGrid.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Typing Animation
const typingText = document.getElementById('typingText');
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;

function type() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}
setTimeout(type, 1000);

// Particle Effects
const particlesContainer = document.getElementById('particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particlesContainer.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 500);
}
setInterval(createParticle, 1000);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success message
                formMessage.classList.add('success');
                formMessage.textContent = 'Your message has been sent successfully! I will get back to you soon.';
                formMessage.style.display = 'block';
                contactForm.reset();
            } else {
                // Error handling
                formMessage.classList.add('error');
                formMessage.textContent = 'Oops! There was a problem sending your message. Please try again later.';
                formMessage.style.display = 'block';
            }
        } catch (error) {
            // Network error
            formMessage.classList.add('error');
            formMessage.textContent = 'Network error. Please check your connection and try again.';
            formMessage.style.display = 'block';
        } finally {
            // Restore button
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});