document.addEventListener('DOMContentLoaded', function() {
    // 语言切换功能
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = document.querySelector('.current-lang');
    const langIcon = document.querySelector('.language-btn .lang-icon');
    
    // 从本地存储获取语言设置，默认为中文
    let currentLanguage = localStorage.getItem('language') || 'zh';
    
    // 切换下拉菜单显示/隐藏
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });
    
    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        languageDropdown.classList.remove('show');
    });
    
    // 语言选择事件
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            languageDropdown.classList.remove('show');
        });
    });
    
    // 切换语言函数
    function switchLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        currentLang.textContent = lang === 'zh' ? '中文' : 'English';
        // 更新语言图标
        langIcon.src = lang === 'zh' ? './img/zh-cn.png' : './img/en-us.png';
        langIcon.alt = lang === 'zh' ? '中文' : 'English';
        // 这里可以添加更多的语言切换逻辑
    }
    
    // 初始化语言设置
    switchLanguage(currentLanguage);

    // 节流函数
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 导航栏滚动效果 - 移除隐藏行为，保持始终显示
    const header = document.querySelector('.header');
    header.style.transform = 'translateY(0)';

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        // 这里可以添加表单数据的发送逻辑
        alert('感谢您的咨询，我们会尽快与您联系！');
        this.reset();
    });

    // 添加滚动动画
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.5s ease-out';
        sectionObserver.observe(section);
    });
});
// 移动端菜单控制
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });

        // 点击导航链接后自动关闭菜单
        const navLinks = mainNav.getElementsByTagName('a');
        Array.from(navLinks).forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
            }
        });
    }
});