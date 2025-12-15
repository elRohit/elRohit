// --- START OF FILE script.js ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect for Hero Subtitle ---
    const typewriteElement = document.querySelector('.typewrite');
    if (typewriteElement) {
        const dataText = JSON.parse(typewriteElement.getAttribute('data-type'));
        const period = parseInt(typewriteElement.getAttribute('data-period'), 10) || 2000;
        let loopNum = 0;
        let isDeleting = false;
        let txt = '';
        let delta = 200 - Math.random() * 100;

        function tick() {
            const i = loopNum % dataText.length;
            const fullTxt = dataText[i];

            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }

            typewriteElement.querySelector('.wrap').textContent = txt;

            delta = 200 - Math.random() * 100;
            if (isDeleting) { delta /= 2; }

            if (!isDeleting && txt === fullTxt) {
                delta = period;
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                loopNum++;
                delta = 500;
            }

            setTimeout(() => tick(), delta);
        }
        tick();
    }

    // --- Matrix Digital Rain Effect for Hero Section ---
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext('2d');

        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        const chinese = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
        const font_size = 16;
        const columns = matrixCanvas.width / font_size;
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = "rgba(26, 33, 46, 0.05)"; // Dark background with transparency
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = "#00bcd4"; // Primary color for the text
            ctx.font = font_size + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chinese[Math.floor(Math.random() * chinese.length)];
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 33);

        // Adjust canvas size on window resize
        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            // Re-calculate columns and reset drops array
            const newColumns = matrixCanvas.width / font_size;
            for (let x = 0; x < newColumns; x++) {
                if (drops[x] === undefined) {
                    drops[x] = 1;
                }
            }
            drops.length = newColumns; // Trim if window gets smaller
        });
    }

    // --- Scroll Animation for Sections (is-visible class) ---
    const sectionsToAnimate = document.querySelectorAll('.section-title, .about-content, .skill-category, .project-card, .certificate-card, .contact-content');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Special handling for skill bars animation
                if (entry.target.classList.contains('skill-category')) {
                    const skillLevels = entry.target.querySelectorAll('.skill-level');
                    skillLevels.forEach(skillLevel => {
                        const width = skillLevel.parentElement.getAttribute('aria-valuenow');
                        skillLevel.style.width = width + '%';
                    });
                }

                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // --- Active Nav Link on Scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Add active class to first link on load if at top
    if (window.scrollY === 0) {
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }

});
// --- END OF FILE script.js ---

// SEND FORM TO ME (SPEEDRKK@GMAIL.COM)
// Simple contact form handler: attempts EmailJS if configured, otherwise falls back to mailto.
// Place this code at the end of your script file (where the form placeholder was).
(() => {
    const TO_EMAIL = 'speedrkk@gmail.com'; // fallback recipient
    const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; // set if using EmailJS
    const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
    const EMAILJS_USER_ID = 'YOUR_EMAILJS_USER_ID'; // public key (optional depending on integration)

    const form = document.getElementById('contactForm') || document.querySelector('form.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
    const setButtonState = (disabled, text) => {
        if (submitBtn) {
            submitBtn.disabled = disabled;
            if (text) submitBtn.textContent = text;
        }
    };

    const showMessage = (msg, isError = false) => {
        let status = form.querySelector('#formStatus');
        if (!status) {
            status = document.createElement('div');
            status.id = 'formStatus';
            status.style.marginTop = '0.5rem';
            form.appendChild(status);
        }
        status.textContent = msg;
        status.style.color = isError ? 'crimson' : 'limegreen';
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setButtonState(true, 'Sending...');

        // Collect fields (common names). Adjust selectors if your form uses different names.
        const name = (form.querySelector('[name="name"]') || {}).value || '';
        const email = (form.querySelector('[name="email"]') || {}).value || '';
        const subject = (form.querySelector('[name="subject"]') || {}).value || 'New message from website';
        const message = (form.querySelector('[name="message"]') || {}).value || '';

        if (!name || !email || !message) {
            showMessage('Please fill in name, email and message.', true);
            setButtonState(false, 'Send');
            return;
        }

        // Try EmailJS if configured and the library is available
        const canUseEmailJS = typeof emailjs !== 'undefined' &&
                              EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID' &&
                              EMAILJS_TEMPLATE_ID !== 'YOUR_EMAILJS_TEMPLATE_ID';

        if (canUseEmailJS) {
            try {
                if (EMAILJS_USER_ID && emailjs.init) {
                    emailjs.init(EMAILJS_USER_ID);
                }
                // Template params should match your EmailJS template variables
                const templateParams = { from_name: name, from_email: email, subject, message, to_email: TO_EMAIL };
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                showMessage('Message sent. Thank you!');
                form.reset();
            } catch (err) {
                console.error('EmailJS error:', err);
                showMessage('Failed to send via EmailJS. Trying fallback...', true);
                // fallback to mailto below
            } finally {
                setButtonState(false, 'Send');
            }
            return;
        }

        // Fallback: open user's mail client via mailto
        try {
            const mailSubject = encodeURIComponent(subject);
            const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            const mailto = `mailto:${TO_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
            // Use window.location.href so it opens the mail client
            window.location.href = mailto;
            showMessage('Opened mail client.

// END FORM 