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
    
    // 绑定Markdown链接点击事件
    bindMdLinks();
    
    // 处理手风琴折叠效果
    bindCollapsibles();
    
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
    console.log('开始加载Markdown文件:', path, '到容器:', container);
    
    // 确保路径正确，如果path不以/开头且不是完整URL，就添加./
    if (!path.startsWith('/') && !path.startsWith('http') && !path.startsWith('./')) {
        path = './' + path;
    }
    
    fetch(path)
        .then(response => {
            console.log('文件请求状态:', response.status, response.statusText, '路径:', path);
            if (!response.ok) {
                throw new Error('网络请求失败: ' + response.status);
            }
            return response.text();
        })
        .then(text => {
            console.log('成功加载文件内容, 长度:', text.length, '字节');
            
            // 如果已经有返回按钮，先移除
            const existingBackButton = container.querySelector('.back-button');
            if (existingBackButton) {
                existingBackButton.remove();
            }
            
            // 解析并显示Markdown内容
            container.innerHTML = marked.parse(text);
            container.classList.add('markdown-body');
            
            // 显示Markdown容器
            const parent = container.closest('section');
            console.log('容器所属区域:', parent.id);
            
            // 处理"更多"页面的显示逻辑已在bindMdLinks中处理，这里不再重复
            
            // 添加返回按钮
            const backButton = document.createElement('button');
            backButton.textContent = '返回列表';
            backButton.className = 'back-button';
            backButton.addEventListener('click', function() {
                container.style.display = 'none';
                container.innerHTML = '';
                
                // 恢复"更多"页面的项目卡片
                const parent = container.closest('section');
                if (parent.id === 'more') {
                    const projectGrids = parent.querySelectorAll('.project-grid');
                    projectGrids.forEach(grid => {
                        grid.style.display = '';
                    });
                    
                    // 恢复所有标题元素显示
                    const categoryTitles = parent.querySelectorAll('.project-category h3');
                    categoryTitles.forEach(title => title.style.display = '');
                    
                    if (parent.querySelector('.more-footer')) {
                        parent.querySelector('.more-footer').style.display = '';
                    }
                    if (parent.querySelector('.section-intro')) {
                        parent.querySelector('.section-intro').style.display = '';
                    }
                } else {
                    // 恢复其他页面的列表
                    const list = parent.querySelector('ul, .knowledge-grid, .timeline');
                    if (list) {
                        list.style.display = '';
                    }
                }
            });
            container.prepend(backButton);
            
            // 为Markdown中的链接绑定事件
            const markdownLinks = container.querySelectorAll('a');
            markdownLinks.forEach(link => {
                // 为外部链接添加target="_blank"
                if (link.href && link.href.startsWith('http')) {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
            });
            
            // 查找新的Markdown链接并绑定事件
            bindMdLinks();
            
            // 绑定新的折叠项
            bindCollapsibles();
            
            // 滚动到顶部
            container.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('加载Markdown失败:', error, '路径:', path);
            container.innerHTML = '<p class="error">无法加载内容，请稍后再试。</p><p class="error-details">错误信息: ' + error.message + '</p><p>路径: ' + path + '</p>';
            container.style.display = 'block';
            
            // 添加返回按钮
            const backButton = document.createElement('button');
            backButton.textContent = '返回列表';
            backButton.className = 'back-button';
            backButton.addEventListener('click', function() {
                container.style.display = 'none';
                container.innerHTML = '';
                
                // 恢复"更多"页面的项目卡片
                const parent = container.closest('section');
                if (parent.id === 'more') {
                    const projectGrids = parent.querySelectorAll('.project-grid');
                    projectGrids.forEach(grid => {
                        grid.style.display = '';
                    });
                    
                    // 恢复所有标题元素显示
                    const categoryTitles = parent.querySelectorAll('.project-category h3');
                    categoryTitles.forEach(title => title.style.display = '');
                    
                    if (parent.querySelector('.more-footer')) {
                        parent.querySelector('.more-footer').style.display = '';
                    }
                    if (parent.querySelector('.section-intro')) {
                        parent.querySelector('.section-intro').style.display = '';
                    }
                } else {
                    // 恢复其他页面的列表
                    const list = parent.querySelector('ul, .knowledge-grid, .timeline');
                    if (list) {
                        list.style.display = '';
                    }
                }
            });
            container.prepend(backButton);
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

// 绑定Markdown链接点击事件
function bindMdLinks() {
    const mdLinks = document.querySelectorAll('.md-link');
    console.log('找到', mdLinks.length, '个Markdown链接');
    mdLinks.forEach(link => {
        if (!link.hasAttribute('data-bound')) {
            const mdPath = link.getAttribute('data-md');
            const section = link.closest('section');
            console.log('绑定链接:', link.textContent, '-> 文件路径:', mdPath, ', 所在区域:', section.id);
            
            link.setAttribute('data-bound', 'true');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const mdPath = this.getAttribute('data-md');
                const section = this.closest('section');
                console.log('点击链接:', this.textContent, '正在加载文件:', mdPath, ', 所在区域:', section.id);
                
                // 如果链接在折叠内容中，确保所有父级折叠都展开
                expandParentAccordions(this);
                
                // 找到当前section的markdown容器
                const container = section.querySelector('.markdown-container');
                
                if (container) {
                    console.log('找到Markdown容器:', container);
                    
                    // 针对"更多"页面的特殊处理
                    if (section.id === 'more') {
                        // 先确保容器可见
                        container.style.display = 'block';
                        
                        // 隐藏项目卡片部分
                        const projectGrids = section.querySelectorAll('.project-grid');
                        projectGrids.forEach(grid => grid.style.display = 'none');
                        
                        // 隐藏所有标题元素
                        const categoryTitles = section.querySelectorAll('.project-category h3');
                        categoryTitles.forEach(title => title.style.display = 'none');
                        
                        // 隐藏页脚和介绍文字
                        if (section.querySelector('.more-footer')) {
                            section.querySelector('.more-footer').style.display = 'none';
                        }
                        if (section.querySelector('.section-intro')) {
                            section.querySelector('.section-intro').style.display = 'none';
                        }
                        
                        // 确保返回按钮功能正常
                        if (!container.querySelector('.back-button')) {
                            const backButton = document.createElement('button');
                            backButton.textContent = '返回列表';
                            backButton.className = 'back-button';
                            backButton.addEventListener('click', function() {
                                // 隐藏容器
                                container.style.display = 'none';
                                container.innerHTML = '';
                                
                                // 显示项目卡片部分
                                projectGrids.forEach(grid => grid.style.display = '');
                                
                                // 恢复所有标题元素显示
                                const categoryTitles = section.querySelectorAll('.project-category h3');
                                categoryTitles.forEach(title => title.style.display = '');
                                
                                // 显示页脚和介绍文字
                                if (section.querySelector('.more-footer')) {
                                    section.querySelector('.more-footer').style.display = '';
                                }
                                if (section.querySelector('.section-intro')) {
                                    section.querySelector('.section-intro').style.display = '';
                                }
                            });
                            container.prepend(backButton);
                        }
                    }
                    
                    // 加载Markdown内容
                    loadMarkdown(mdPath, container);
                } else {
                    console.error('未找到Markdown容器在section:', section.id);
                }
            });
        }
    });
}

// 绑定手风琴折叠效果
function bindCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(item => {
        if (!item.hasAttribute('data-bound')) {
            item.setAttribute('data-bound', 'true');
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
        }
    });
} 