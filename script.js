// 保存当前语言到 localStorage
let currentLang = localStorage.getItem('language') || 'en';

// 翻译数据
const translations = {
    en: {
        'Home': 'Home',
        'Research': 'Research',
        'Teaching': 'Teaching',
        'Shikun Qin': 'Shikun Qin',
        'Lecturer (Assistant Professor)': 'Lecturer (Assistant Professor)',
        'School of Public Finance and Taxation, Southwestern University of Finance and Economics (SWUFE)': 'School of Public Finance and Taxation, Southwestern University of Finance and Economics (SWUFE)',
        'Welcome to my academic homepage! ': 'Welcome to my academic homepage! ',
        'I am Shikun Qin, a Lecturer (Assistant Professor) at the School of Public Finance and Taxation, Southwestern University of Finance and Economics (SWUFE), China. My research focuses on Procurement and Contract Management. I am interested in public policy, public procurement, urban studies, and the relationship between government and enterprises. Some of my research has been published in journals such as Cities, Public Performance and Management Review, Review of Policy Research, Journal of Chinese Political Science, and Applied Economics Letters. I strive to bridge theoretical insights with practical applications in these areas. I also serve as an Editorial Board Member for Review of Policy Research from 2025.': 'I am Shikun Qin, a Lecturer (Assistant Professor) at the School of Public Finance and Taxation, Southwestern University of Finance and Economics (SWUFE), China. My research focuses on Procurement and Contract Management. I am interested in public policy, public procurement, urban studies, and the relationship between government and enterprises. Some of my research has been published in journals such as Cities, Public Performance and Management Review, Review of Policy Research, Journal of Chinese Political Science, and Applied Economics Letters. I strive to bridge theoretical insights with practical applications in these areas. I also serve as an Editorial Board Member for Review of Policy Research from 2025.',
        'CV': 'CV',
        'LinkedIn': 'LinkedIn',
        'ORCID': 'ORCID',
        'Google Scholar': 'Google Scholar',
        'Institutional Profile': 'Institutional Profile',
        'Published peer-reviewed papers (* corresponding author):': 'Published peer-reviewed papers (* corresponding author):',
        'Books:': 'Books:'
    },
    zh: {
        'Home': '首页',
        'Research': '研究',
        'Teaching': '教学',
        'Shikun Qin': '秦士坤',
        'Lecturer (Assistant Professor)': '讲师（助理教授）',
        'School of Public Finance and Taxation, Southwestern University of Finance and Economics (SWUFE)': '西南财经大学公共财政与税务学院',
        'Welcome to my academic homepage! ': '欢迎访问我的学术主页！',
        'I am Shikun Qin, a Lecturer (Assistant Professor) at the School of Public Finance and Taxation, Southwestern University of Finance and Economics (SWUFE), China. My research focuses on Procurement and Contract Management. I am interested in public policy, public procurement, urban studies, and the relationship between government and enterprises. Some of my research has been published in journals such as Cities, Public Performance and Management Review, Review of Policy Research, Journal of Chinese Political Science, and Applied Economics Letters. I strive to bridge theoretical insights with practical applications in these areas. I also serve as an Editorial Board Member for Review of Policy Research from 2025.': '我是秦士坤，西南财经大学公共财政与税务学院讲师（助理教授）。我的研究重点是采购与合同管理。我对公共政策、公共采购、城市研究以及政府与企业关系等领域感兴趣。我的研究成果发表在《Cities》、《Public Performance and Management Review》、《Review of Policy Research》、《Journal of Chinese Political Science》和《Applied Economics Letters》等期刊。我致力于将理论见解与实践应用相结合。从2025年起，我担任《Review of Policy Research》编委会成员。',
        'CV': '简历',
        'LinkedIn': '领英',
        'ORCID': 'ORCID',
        'Google Scholar': '谷歌学术',
        'Institutional Profile': '学院主页',
        'Published peer-reviewed papers (* corresponding author):': '已发表同行评议论文（*通讯作者）：',
        'Books:': '专著：'
    }
};

// 更新页面语言
function updateLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.textContent.trim();
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // 更新语言切换按钮文本
    const toggleBtn = document.getElementById('language-toggle');
    toggleBtn.textContent = lang === 'en' ? 'English/中文' : '中文/English';
    
    // 保存语言选择
    localStorage.setItem('language', lang);
    currentLang = lang;
}

// 初始化页面语言
document.addEventListener('DOMContentLoaded', () => {
    // 应用保存的语言设置
    updateLanguage(currentLang);
    
    // 移除语言切换按钮的事件监听
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.style.display = 'none';
    }
}); 