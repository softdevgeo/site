// Lingflix Landing Page JavaScript

// Language configuration
const languages = {
    'af': 'Afrikaans',
    'am': 'Amharic',
    'ar': 'Arabic',
    'az': 'Azerbaijani',
    'be': 'Belarusian',
    'bg': 'Bulgarian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'ca': 'Catalan',
    'cs': 'Czech',
    'da': 'Danish',
    'de': 'German',
    'el': 'Greek',
    'en': 'English',
    'es': 'Spanish',
    'et': 'Estonian',
    'eu': 'Basque',
    'fa': 'Persian',
    'fi': 'Finnish',
    'fr': 'French',
    'gl': 'Galician',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'hr': 'Croatian',
    'hu': 'Hungarian',
    'hy': 'Armenian',
    'id': 'Indonesian',
    'is': 'Icelandic',
    'it': 'Italian',
    'ja': 'Japanese',
    'ka': 'Georgian',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'kn': 'Kannada',
    'ko': 'Korean',
    'lt': 'Lithuanian',
    'lv': 'Latvian',
    'mk': 'Macedonian',
    'ml': 'Malayalam',
    'mn': 'Mongolian',
    'mr': 'Marathi',
    'ms': 'Malay',
    'my': 'Burmese',
    'nb': 'Norwegian Bokmål',
    'ne': 'Nepali',
    'nl': 'Dutch',
    'no': 'Norwegian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ro': 'Romanian',
    'ru': 'Russian',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'sq': 'Albanian',
    'sr': 'Serbian',
    'sv': 'Swedish',
    'sw': 'Swahili',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tl': 'Tagalog',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'zh': 'Chinese'
};

// Load header and footer
async function loadHeaderFooter() {
    // Determine the correct path depth
    const pathDepth = window.location.pathname.split('/').filter(p => p).length - 1;
    // const basePath = '../'.repeat(pathDepth);
    
    try {
        // Load header
        // const headerResponse = await fetch(`${basePath}assets/includes/header.html`);
        const headerResponse = await fetch(`/assets/includes/header.html`);
        const headerHTML = await headerResponse.text();
        // console.log("---1---")
        // console.log(headerHTML)
        // console.log("---2---")
        document.getElementById('header-placeholder').innerHTML = headerHTML;
        
        // Load footer
        // const footerResponse = await fetch(`${basePath}assets/includes/footer.html`);
        const footerResponse = await fetch(`/assets/includes/footer.html`);
        const footerHTML = await footerResponse.text();
        // console.log("---1---")
        // console.log(footerHTML)
        // console.log("---2---")
        document.getElementById('footer-placeholder').innerHTML = footerHTML;
        
        // Reinitialize main.js functions after header is loaded
        if (typeof initLanguageSelector === 'function') {
            initLanguageSelector();
        }
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}

// Get current language from URL
function getCurrentLanguage() {
    const pathParts = window.location.pathname.split('/');
    const langIndex = pathParts.findIndex(part => languages.hasOwnProperty(part));
    return langIndex !== -1 ? pathParts[langIndex] : 'en';
}

// Initialize language selector
function initLanguageSelector() {
    const currentLang = getCurrentLanguage();
    const languageButton = document.getElementById('languageButton');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (!languageButton || !languageDropdown) return;
    
    // Set current language in button
    const currentLangName = languages[currentLang];
    languageButton.querySelector('span:first-of-type').textContent = currentLangName;
    languageButton.querySelector('.flag-icon').src = `/assets/images/flags/${currentLang}.png`;
    
    // Sort languages by name (not by code)
    const sortedLanguages = Object.entries(languages).sort((a, b) => {
        return a[1].localeCompare(b[1]); // Sort by language name
    });
    
    // Populate dropdown
    let dropdownHTML = '';
    for (const [code, name] of sortedLanguages) {
        dropdownHTML += `
            <a href="/${code}/" class="language-option ${code === currentLang ? 'active' : ''}" data-lang="${code}">
                <img src="/assets/images/flags/${code}.png" alt="${name}" class="flag-icon">
                <span>${name}</span>
            </a>
        `;
    }
    languageDropdown.innerHTML = dropdownHTML;
    
    // Toggle dropdown
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
    });
    
    // Prevent dropdown from closing when clicking inside
    languageDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Smooth scrolling for anchor links
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

// Animate feature cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Wait for images to load before showing them
document.querySelectorAll('img').forEach(img => {
    // Don't apply opacity animation to screenshots (they're set separately)
    // if (!img.classList.contains('screenshot-img')) {
    //     img.style.opacity = '0';
    //     img.style.transition = 'opacity 0.3s ease-in';
        
    //     img.addEventListener('load', function() {
    //         this.style.opacity = '1';
    //     });
    // }
    
    // Error handling for missing images
    img.addEventListener('error', function() {
        console.warn('Failed to load image:', this.src);
    });
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    initLanguageSelector();
});