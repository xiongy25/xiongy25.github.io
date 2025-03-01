document.addEventListener('DOMContentLoaded', function() {
    // 处理导航点击事件
    const navLinks = document.querySelectorAll('a[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            
            // 更新URL，但不刷新页面
            history.pushState(null, null, '#' + targetPage);
        });
    });
    
    // 处理浏览器前进/后退按钮
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showPage(hash);
        } else {
            showPage('home');
        }
    });
    
    // 处理初始页面加载
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        showPage(hash);
    }
    
    // 处理Markdown链接点击
    const mdLinks = document.querySelectorAll('.md-link');
    mdLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const mdPath = this.getAttribute('data-md');
            
            // 如果链接在折叠内容中，确保所有父级折叠都展开
            expandParentAccordions(this);
            
            loadMarkdown(mdPath, this.closest('section').querySelector('.markdown-container'));
        });
    });
    
    // 处理手风琴折叠效果
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡
            
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            // 添加show类来显示内容
            content.classList.toggle('show');
            
            // 对于已展开的内容，需要重新计算所有父级的maxHeight
            if (content.classList.contains('show')) {
                // 设置当前内容的maxHeight
                content.style.maxHeight = content.scrollHeight + "px";
                
                // 更新所有父级的maxHeight
                let parent = content.parentElement;
                while (parent && parent.classList.contains('content')) {
                    // 更新父级的maxHeight，考虑所有子内容的高度
                    parent.style.maxHeight = parent.scrollHeight + content.scrollHeight + "px";
                    parent = parent.parentElement;
                }
            } else {
                content.style.maxHeight = null;
            }
        });
    });
    
    // 处理主题切换
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-moon')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
});

// 显示指定页面，隐藏其他页面
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
}

// 加载Markdown内容
function loadMarkdown(path, container) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.text();
        })
        .then(text => {
            container.innerHTML = marked.parse(text);
            container.classList.add('markdown-body');
            
            // 显示Markdown容器
            const parent = container.closest('section');
            const list = parent.querySelector('ul, .knowledge-grid, .timeline');
            if (list) {
                list.style.display = 'none';
            }
            container.style.display = 'block';
            
            // 添加返回按钮
            const backButton = document.createElement('button');
            backButton.textContent = '返回列表';
            backButton.className = 'back-button';
            backButton.addEventListener('click', function() {
                container.style.display = 'none';
                container.innerHTML = '';
                if (list) {
                    list.style.display = '';
                }
            });
            container.prepend(backButton);
        })
        .catch(error => {
            console.error('加载Markdown失败:', error);
            container.innerHTML = '<p class="error">无法加载内容，请稍后再试。</p>';
        });
}

// 递归展开父级手风琴
function expandParentAccordions(element) {
    const parent = element.parentElement;
    if (parent && parent.classList.contains('content')) {
        const parentToggle = parent.previousElementSibling;
        if (parentToggle && parentToggle.classList.contains('collapsible')) {
            parentToggle.classList.add('active');
            parent.classList.add('show');
            parent.style.maxHeight = parent.scrollHeight + 'px';
            
            // 递归展开上层
            expandParentAccordions(parent);
        }
    }
} 