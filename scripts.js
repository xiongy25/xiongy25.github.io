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
        // 初始化时检查本地存储的主题设置
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 如果有保存的主题设置，应用它
        if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme)) {
            document.body.classList.add('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (icon.classList.contains('fa-moon')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-moon')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // 搜索按钮点击事件
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            if (searchInput && searchInput.value.trim()) {
                performSearch(searchInput.value.trim());
            }
        });
    }
    
    // 搜索输入框回车键事件
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                performSearch(this.value.trim());
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

// 执行搜索
function performSearch(query) {
    // 创建搜索结果页面（如果不存在）
    let searchResultsPage = document.getElementById('search-results');
    if (!searchResultsPage) {
        searchResultsPage = document.createElement('section');
        searchResultsPage.id = 'search-results';
        searchResultsPage.className = 'page';
        document.querySelector('main').appendChild(searchResultsPage);
    }
    
    // 清空之前的搜索结果
    searchResultsPage.innerHTML = '';
    
    // 创建搜索结果页面标题
    const title = document.createElement('h2');
    title.textContent = `搜索结果: "${query}"`;
    searchResultsPage.appendChild(title);
    
    // 存储搜索结果
    const results = [];
    
    // 搜索文章标题
    const articles = document.querySelectorAll('#article-list li a');
    articles.forEach(article => {
        if (article.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                title: article.textContent.trim(),
                link: article.getAttribute('data-md'),
                type: '文章',
                element: article.cloneNode(true)
            });
        }
    });
    
    // 搜索项目标题
    const projects = document.querySelectorAll('.project-card h4 a');
    projects.forEach(project => {
        if (project.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                title: project.textContent.trim(),
                link: project.getAttribute('href'),
                type: '项目',
                element: project.cloneNode(true)
            });
        }
    });
    
    // 搜索知识库标题
    const knowledgeItems = document.querySelectorAll('.knowledge-card h4 a');
    knowledgeItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                title: item.textContent.trim(),
                link: item.getAttribute('data-md'),
                type: '知识库',
                element: item.cloneNode(true)
            });
        }
    });
    
    // 搜索更多页面内容
    const moreItems = document.querySelectorAll('#more .project-card h4 a');
    moreItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                title: item.textContent.trim(),
                link: item.getAttribute('data-md'),
                type: '更多',
                element: item.cloneNode(true)
            });
        }
    });
    
    // 根据搜索结果创建内容
    if (results.length > 0) {
        const resultsList = document.createElement('div');
        resultsList.className = 'search-results-list';
        
        // 按类型分组
        const groupedResults = {};
        results.forEach(result => {
            if (!groupedResults[result.type]) {
                groupedResults[result.type] = [];
            }
            groupedResults[result.type].push(result);
        });
        
        // 创建分组结果
        for (const type in groupedResults) {
            const typeSection = document.createElement('div');
            typeSection.className = 'search-result-section';
            
            const typeTitle = document.createElement('h3');
            typeTitle.textContent = type;
            typeSection.appendChild(typeTitle);
            
            const typeList = document.createElement('ul');
            groupedResults[type].forEach(result => {
                const listItem = document.createElement('li');
                
                const link = result.element;
                // 如果是Markdown链接，确保事件处理正确
                if (link.classList.contains('md-link')) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const mdPath = this.getAttribute('data-md');
                        const container = document.querySelector('#search-results .markdown-container');
                        if (!container) {
                            const newContainer = document.createElement('div');
                            newContainer.className = 'markdown-container';
                            searchResultsPage.appendChild(newContainer);
                            loadMarkdown(mdPath, newContainer);
                        } else {
                            loadMarkdown(mdPath, container);
                        }
                    });
                }
                
                listItem.appendChild(link);
                typeList.appendChild(listItem);
            });
            
            typeSection.appendChild(typeList);
            resultsList.appendChild(typeSection);
        }
        
        searchResultsPage.appendChild(resultsList);
        
        // 添加Markdown容器来显示结果
        const markdownContainer = document.createElement('div');
        markdownContainer.className = 'markdown-container';
        markdownContainer.style.display = 'none';
        searchResultsPage.appendChild(markdownContainer);
    } else {
        // 没有找到结果
        const noResults = document.createElement('p');
        noResults.className = 'no-results';
        noResults.textContent = '没有找到匹配的内容。';
        searchResultsPage.appendChild(noResults);
    }
    
    // 显示搜索结果页面
    showPage('search-results');
} 