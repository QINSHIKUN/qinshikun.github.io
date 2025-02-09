const translations = {
    en: {
        'nav.home': 'Home',
        'nav.data': 'Data',
        'nav.methods': 'Methods',
        'nav.team': 'Team',
        // ... 其他英文翻译
    },
    zh: {
        'nav.home': '首页',
        'nav.data': '数据',
        'nav.methods': '方法',
        'nav.team': '团队',
        // ... 其他中文翻译
    }
};

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    localStorage.setItem('preferred-language', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    changeLanguage(savedLang);
}); 