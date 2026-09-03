// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ===== TYPING ANIMATION =====
const typedTextEl = document.querySelector('.typed-text');
const words = ['Web Developer', 'UI/UX Designer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 80 : 120;
    setTimeout(typeEffect, speed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillFills.forEach(fill => {
                fill.style.width = fill.getAttribute('data-width') + '%';
            });
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.3
});

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
    '.project-card, .skill-card, .contact-item, .about-content'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===== CONTACT FORM WITH EMAILJS =====
emailjs.init("Sb0kRF3_Kc4r2V9Ig"); // 

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal    = document.getElementById('name').value.trim();
    const emailVal   = document.getElementById('email').value.trim();
    const messageVal = document.getElementById('message').value.trim();

    // ===== VALIDATION =====
    if (!nameVal || !emailVal || !messageVal) {
        showNotification('Please fill all required fields!', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        showNotification('Please enter a valid email!', 'error');
        return;
    }

    // ===== BUTTON LOADING =====
    const btn = contactForm.querySelector('button');
    const originalBtnText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    // ===== EMAILJS PARAMS =====
    const params = {
        from_name:  nameVal,
        from_email: emailVal,
        message:    messageVal,
        reply_to:   emailVal,
    };

    // ===== EMAIL BHEJO =====
    emailjs.send("service_4ijmcy5", "template_cba6iu7", params) // 
        .then(() => {
            showNotification(
                `Thanks ${nameVal}! Message sent successfully! 🎉`,
                'success'
            );
            contactForm.reset();
            btn.innerHTML = originalBtnText;
            btn.disabled  = false;
        })
        .catch((error) => {
            console.log(error);
            showNotification(
                'Something went wrong! Please try again.',
                'error'
            );
            btn.innerHTML = originalBtnText;
            btn.disabled  = false;
        });
});

// ===== NOTIFICATION FUNCTION =====
function showNotification(msg, type) {
    const old = document.querySelector('.notification');
    if (old) old.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success'
            ? 'fa-check-circle'
            : 'fa-exclamation-circle'}">
        </i>
        <span>${msg}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(msg, type) {
    // Purani notification hato pehle
    const old = document.querySelector('.notification');
    if (old) old.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' 
            ? 'fa-check-circle' 
            : 'fa-exclamation-circle'}">
        </i>
        <span>${msg}</span>
    `;
    document.body.appendChild(notification);

    // 4 second baad automatically hatao
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}
