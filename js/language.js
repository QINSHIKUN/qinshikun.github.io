// 定义中英文对应文本
const translations = {
    en: {
        // 导航
        'nav.home': 'Home',
        'nav.data': 'Data',
        'nav.methods': 'Methods',
        'nav.team': 'Team',
        
        // 首页
        'hero.title': 'Advancing Social Science Research',
        'hero.subtitle': 'A comprehensive platform for sharing research data and methodologies',
        'hero.explore': 'Explore Data',
        'hero.learn': 'Learn Methods',
        
        // 更新区域
        'updates.title': 'Latest Updates',
        'updates.dataset': 'New Dataset Release',
        'updates.dataset.desc': 'Social Media Impact Analysis Dataset (2023-2024)',
        'updates.method': 'Research Method Guide',
        'updates.method.desc': 'Advanced Network Analysis Techniques',
        'updates.collab': 'Collaboration Update',
        'updates.collab.desc': 'New Partnership with Global Research Institute',
        
        // 研究领域
        'research.title': 'Research Areas',
        'research.networks': 'Social Networks',
        'research.networks.desc': 'Analysis of social relationships and structures',
        'research.opinion': 'Public Opinion',
        'research.opinion.desc': 'Survey research and attitude analysis',
        'research.education': 'Education',
        'research.education.desc': 'Educational inequality and outcomes',
        
        // 页脚
        'footer.contact': 'Contact',
        'footer.contact.email': 'Email: research@qteamhub.org',
        'footer.contact.location': 'Location: SWUFE, Chengdu, China',
        'footer.links': 'Quick Links',
        'footer.links.about': 'About Us',
        'footer.links.publications': 'Publications',
        'footer.links.resources': 'Resources',
        'footer.follow': 'Follow Us'
    },
    zh: {
        // 导航
        'nav.home': '首页',
        'nav.data': '数据',
        'nav.methods': '方法',
        'nav.team': '团队',
        
        // 首页
        'hero.title': '推进社会科学研究',
        'hero.subtitle': '全面的研究数据与方法分享平台',
        'hero.explore': '浏览数据',
        'hero.learn': '学习方法',
        
        // 更新区域
        'updates.title': '最新动态',
        'updates.dataset': '新数据集发布',
        'updates.dataset.desc': '社交媒体影响分析数据集 (2023-2024)',
        'updates.method': '研究方法指南',
        'updates.method.desc': '高级网络分析技术',
        'updates.collab': '合作更新',
        'updates.collab.desc': '与全球研究机构建立新的合作伙伴关系',
        
        // 研究领域
        'research.title': '研究领域',
        'research.networks': '社会网络',
        'research.networks.desc': '社会关系与结构分析',
        'research.opinion': '公共舆论',
        'research.opinion.desc': '调查研究与态度分析',
        'research.education': '教育研究',
        'research.education.desc': '教育不平等与教育成果',
        
        // 页脚
        'footer.contact': '联系我们',
        'footer.contact.email': '邮箱：research@qteamhub.org',
        'footer.contact.location': '地址：西南财经大学，中国成都',
        'footer.links': '快速链接',
        'footer.links.about': '关于我们',
        'footer.links.publications': '研究成果',
        'footer.links.resources': '资源中心',
        'footer.follow': '关注我们'
    }
};

// 简化的语言切换函数
function changeLanguage(lang) {
    // 更新 HTML 语言属性
    document.documentElement.lang = lang;
    
    // 更新所有需要翻译的元素
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang]?.[key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // 保存语言偏好
    localStorage.setItem('preferred-language', lang);
}

// 页面加载完成后的处理
document.addEventListener('DOMContentLoaded', () => {
    // 获取保存的语言偏好
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    
    // 设置语言选择器的值
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = savedLang;
    }
    
    // 应用语言设置
    changeLanguage(savedLang);
    
    // 添加页面加载完成的类
    document.body.classList.add('loaded');
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化的语言选择器事件处理
if (document.getElementById('language-select')) {
    document.getElementById('language-select').addEventListener('change', 
        debounce((e) => changeLanguage(e.target.value), 250)
    );
} 