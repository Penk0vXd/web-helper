document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle functionality
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('.nav-menu');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-button')) {
            const menuButton = document.createElement('button');
            menuButton.classList.add('mobile-menu-button');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            
            header.insertBefore(menuButton, nav.parentElement);
            
            menuButton.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuButton.innerHTML = nav.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }

        // Handle mobile dropdowns
        document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = trigger.parentElement;
                    
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });
                    
                    dropdown.classList.toggle('active');
                }
            });
        });
    };

    // Only create mobile menu if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            createMobileMenu();
        } else {
            const menuButton = document.querySelector('.mobile-menu-button');
            if (menuButton) menuButton.remove();
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }
    });

    // Make all elements visible by default
    document.querySelectorAll('.tool-card, .testimonial, .faq-item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Optional: Add fade-in animation on scroll
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.tool-card, .testimonial, .faq-item').forEach(el => {
            observer.observe(el);
        });
    };

    // Initialize animations if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        observeElements();
    }
});
