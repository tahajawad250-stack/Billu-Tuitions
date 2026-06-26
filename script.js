document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE RESPONSIVE NAVIGATION INTERACTION
    // ==========================================
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle visibility status attribute for screen readers
            navToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('active');
        });

        // Close menu immediately whenever a navigation target link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. DASHBOARD ANIMATED COUNTER & PROGRESS BARS
    // ==========================================
    const dashboardSection = document.querySelector('#dashboard-preview');
    const progressPercents = document.querySelectorAll('.progress-pct');
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    
    let animationTriggered = false;

    function animateDashboard() {
        if (animationTriggered) return;
        
        // Fill out target visual loading configurations
        progressFills.forEach(fill => {
            // Target specific classes to infer context variable updates
            if(fill.classList.contains('maths-fill')) fill.style.width = '88%';
            if(fill.classList.contains('english-fill')) fill.style.width = '76%';
            if(fill.classList.contains('vr-fill')) fill.style.width = '92%';
            if(fill.classList.contains('nvr-fill')) fill.style.width = '64%';
        });

        // Numerical numeric growth increment loops
        progressPercents.forEach(pct => {
            const targetValue = parseInt(pct.getAttribute('data-target'), 10);
            let currentValue = 0;
            const duration = 1500; // Animation frame runtime milliseconds
            const stepTime = Math.abs(Math.floor(duration / targetValue));
            
            const counterInterval = setInterval(() => {
                currentValue++;
                pct.textContent = currentValue + '%';
                if (currentValue >= targetValue) {
                    clearInterval(counterInterval);
                }
            }, stepTime);
        });

        animationTriggered = true;
    }

    // Intersection Observer to run dashboard animation only when user scrolls to it
    if ('IntersectionObserver' in window && dashboardSection) {
        const observerOptions = {
            root: null,
            threshold: 0.2 // Trigger when 20% of section is visible
        };

        const dashboardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateDashboard();
                    dashboardObserver.unobserve(entry.target); // Stop checking once done
                }
            });
        }, observerOptions);

        dashboardObserver.observe(dashboardSection);
    } else {
        // Fallback execution if older browser doesn't support IntersectionObserver
        setTimeout(animateDashboard, 1000);
    }
});
