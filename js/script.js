/* ==================== SHOW MENU ==================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* ==================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== CHANGE BACKGROUND HEADER ==================== */
const scrollHeader = () => {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (window.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (sectionsClass) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SHOW SCROLL UP ==================== */ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    if (window.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* ==================== DARK LIGHT THEME ==================== */ 
const themeButton = document.getElementById('theme-button');
const htmlEl = document.documentElement;

// We check if the user previously chose a theme, otherwise default is 'dark'
const selectedTheme = localStorage.getItem('selected-theme') || 'dark';

// Function to validate theme
const getCurrentTheme = () => htmlEl.getAttribute('data-theme');
const getCurrentIcon = () => themeButton.classList.contains('fa-sun') ? 'fa-moon' : 'fa-sun';

// Apply the selected theme when page loads
htmlEl.setAttribute('data-theme', selectedTheme);
themeButton.classList.remove('fa-moon', 'fa-sun');
themeButton.classList.add(selectedTheme === 'dark' ? 'fa-sun' : 'fa-moon');

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Determine the new theme
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply the new theme to html
    htmlEl.setAttribute('data-theme', newTheme);
    
    // Toggle icon
    themeButton.classList.toggle('fa-sun');
    themeButton.classList.toggle('fa-moon');
    
    // Save to localStorage
    localStorage.setItem('selected-theme', newTheme);
});

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const revealElements = document.querySelectorAll('.reveal');

const scrollReveal = function() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 100; // Adjust for trigger point

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', scrollReveal);
// Trigger once on load
scrollReveal();


/* ==================== FORM VALIDATION ==================== */
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || subject === '' || message === '') {
            contactMessage.style.color = '#e74c3c';
            contactMessage.textContent = 'Please fill out all fields.';
            
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 3000);
            return;
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            contactMessage.style.color = '#e74c3c';
            contactMessage.textContent = 'Please enter a valid email address.';
            
            setTimeout(() => {
                contactMessage.textContent = '';
            }, 3000);
            return;
        }

        // Simulate sending
        contactMessage.style.color = '#2ecc71';
        contactMessage.textContent = 'Message sent successfully!';

        // Clear form
        contactForm.reset();

        setTimeout(() => {
            contactMessage.textContent = '';
        }, 5000);
    });
}
