document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open after click
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            }
        });
    });

    // Text Animation (Example using a simple placeholder, consider Typed.js)
    const animatedTextElement = document.querySelector('.hero .animated-text');
    if (animatedTextElement && typeof Typed !== 'undefined') { // Check if Typed.js is loaded
        new Typed(animatedTextElement, {
            strings: ["We design.", "We develop.", "We deliver excellence."],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true
        });
    } else if (animatedTextElement) {
        // Fallback or simple animation if Typed.js is not used
        console.log("Typed.js not found. Consider adding it for text animations.");
    }

    // Testimonial Slider (Very basic, consider Swiper.js or Slick Carousel)
    // This is a conceptual placeholder for a slider. Real implementation is more complex.
    const testimonials = document.querySelectorAll('.testimonial-slider .testimonial-item');
    let currentTestimonial = 0;
    function showTestimonial(index) {
        testimonials.forEach((item, i) => {
            item.style.display = (i === index) ? 'block' : 'none';
        });
    }
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        // Add next/prev buttons and logic if building manually
        // Or initialize a library like Swiper.js here
    }


    // Contact Form Submission (Client-side validation and prep)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default page reload
            // Basic validation (more robust needed for production)
            const name = this.elements['name'].value;
            const email = this.elements['email'].value;
            const message = this.elements['message'].value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Here you would typically send the data to a backend server
            // or use a service like Formspree, Netlify Forms, etc.
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! (This is a demo, no email sent)');
            this.reset(); // Clear the form
        });
    }
});