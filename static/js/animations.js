// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .animate-on-scroll').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Fade-in reveal animation for the name
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        // Add the CSS for the animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes revealLetter {
                0% { opacity: 0; transform: translateY(-20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            
            .name-letter {
                display: inline-block;
                opacity: 0;
            }
            
            .name-space {
                display: inline-block;
                width: 0.5em;
            }
        `;
        document.head.appendChild(style);
        
        // Create spans for each letter with staggered animation
        [...text].forEach((letter, index) => {
            const span = document.createElement('span');
            
            if (letter === ' ') { // Regular space
                span.className = 'name-space';
                span.innerHTML = ' ';
            } else {
                span.textContent = letter;
                span.className = 'name-letter';
                span.style.animation = `revealLetter 0.5s forwards ${index * 0.05}s`;
            }
            
            heroTitle.appendChild(span);
        });
        
        // Add hover effect after animation completes
        setTimeout(() => {
            heroTitle.addEventListener('mousemove', function(e) {
                const rect = heroTitle.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                
                heroTitle.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            heroTitle.addEventListener('mouseleave', function() {
                heroTitle.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        }, text.length * 50 + 500);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});