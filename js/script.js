document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('#main-header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            // Optional: Change burger icon to X
            const icon = menuToggle.querySelector('i');
            if (navUl.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('#main-header nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active') && !link.classList.contains('btn')) { // Don't close for button
                navUl.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's a nav link for closing menu or a different anchor
            if (this.closest('#main-header nav ul') && navUl.classList.contains('active')) {
                // Already handled by above listener
            } else {
                 // Only prevent default if it's a real anchor link, not for "Get a Quote" to external
                if (this.getAttribute('href').startsWith('#') && this.getAttribute('href').length > 1) {
                    e.preventDefault();
                }
            }

            const targetId = this.getAttribute('href');
            // Check if targetId is a valid selector (starts with # and has more characters)
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    let headerOffset = document.getElementById('main-header').offsetHeight || 70;
                    let elementPosition = targetElement.getBoundingClientRect().top;
                    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    // Update current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Contact Form (Client-side prep - Formspree handles backend)
    // You might want to add client-side validation feedback here
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // You can add a "sending..." state here if you like
        });
    }

    // Optional: Simple scroll animations for sections (add class when in view)
    const sections = document.querySelectorAll('.section-padding, .section-padding-dark, .hero-section');
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateOnScroll, {
        root: null, // relative to document viewport
        threshold: 0.1, // 10% of item is visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});