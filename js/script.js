/**
 * Mohamed's Portfolio JavaScript Essentials
 * Features: Typing Effect, Scroll Detection, Form Validation, Smooth Navigation
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        mirror: false
    });

    // 2. Typing Effect for Hero Subtitle
    const typingElement = document.getElementById('typing-text');
    const textToType = "A system-oriented developer with a business-driven mindset, specializing in Software Dev, Network Engineering, and Cybersecurity.";
    let charIndex = 0;

    function typeEffect() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 40); // 40ms per character
        }
    }
    // Start typing after a short delay
    setTimeout(typeEffect, 1000);

    // 3. Navbar Scroll Behavior
    const navbar = document.getElementById('navbar-main');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Toggle Navbar Transparency
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Toggle Back to Top Button
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 4. Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight - 20);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // 5. Contact Form Validation Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
            } else {
                // Success State (Mockup)
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
                
                // Simulate network delay
                setTimeout(() => {
                    submitBtn.classList.remove('btn-accent');
                    submitBtn.classList.add('btn-success');
                    submitBtn.innerHTML = '<i class="bi bi-check2-circle me-2"></i>Message Sent!';
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        this.reset();
                        this.classList.remove('was-validated');
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.classList.add('btn-accent');
                        submitBtn.innerHTML = originalText;
                    }, 3000);
                }, 1500);
            }
            
            this.classList.add('was-validated');
        });
    }

    // 6. Project Filtering Logic
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });

            // Refresh AOS
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        });
    });

    // 7. Highlight active nav link on scroll (Bootstrap ScrollSpy handles most, but let's ensure it's smooth)
    // No extra code needed as we used data-bs-spy on body
});
