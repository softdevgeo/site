// Blog Page JavaScript


// Highlight active TOC item on scroll
function setupTOCScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    const sections = document.querySelectorAll('.the_content h2[id]');
    
    if (!sections.length || !tocLinks.length) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '-100px 0px -60% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.toc-list a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Smooth scroll for TOC links
function setupTOCLinks() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const yOffset = -100; // Offset for fixed header
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize blog page
document.addEventListener('DOMContentLoaded', () => {
    setupTOCScrollSpy();
    setupTOCLinks();
});