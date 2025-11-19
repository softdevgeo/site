// Set screenshot sources based on current language
function setScreenshotSources() {
    const currentLang = getCurrentLanguage();
    const screenshots = document.querySelectorAll('.screenshot-img');
    
    screenshots.forEach(img => {
        const screenshotNum = img.getAttribute('data-screenshot');
        const screenshotPath = `/assets/images/screenshots/${currentLang}/screenshot_0${screenshotNum}.png`;
        img.src = screenshotPath;
    });
}

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        // document.querySelectorAll('.faq-item').forEach(item => {
        //     item.classList.remove('active');
        // });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        } else {
            faqItem.classList.remove('active');
        }
    });
});

// Add keyboard navigation for FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.setAttribute('tabindex', '0');
    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Handle screenshot slider keyboard navigation
const screenshotSlider = document.querySelector('.screenshots-slider');
if (screenshotSlider) {
    screenshotSlider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            screenshotSlider.scrollBy({ left: -320, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            screenshotSlider.scrollBy({ left: 320, behavior: 'smooth' });
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setScreenshotSources();
});