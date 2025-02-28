document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            alert('请输入搜索内容');
            return;
        }

        // 获取所有文章标题
        const articles = document.querySelectorAll('#latest-articles li a');
        let found = false;

        articles.forEach(article => {
            const title = article.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                article.scrollIntoView({ behavior: 'smooth' });
                article.style.backgroundColor = 'yellow';
                setTimeout(() => {
                    article.style.backgroundColor = '';
                }, 3000);
                found = true;
            }
        });

        if (!found) {
            alert('未找到匹配的文章');
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Page navigation functionality
    const navLinks = document.querySelectorAll('nav a[data-page]');
    const pages = document.querySelectorAll('.page');
    const logoLink = document.querySelector('.logo a');

    function showPage(pageId) {
        // 移除所有页面的active类
        pages.forEach(page => {
            page.classList.remove('active');
        });
        // 移除所有导航链接的active类
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        // 激活目标页面
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            // 激活对应的导航链接
            const activeNavLink = document.querySelector(`nav a[data-page="${pageId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
        }
    }

    function handleNavClick(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        showPage(pageId);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Add click event listener to logo
    if (logoLink) {
        logoLink.addEventListener('click', handleNavClick);
    }

    // Handle "了解更多" button
    const learnMoreBtn = document.querySelector('.btn[data-page="about"]');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('about');
        });
    }

    // Load Markdown file functionality
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[data-md]');
        if (link) {
            e.preventDefault();
            const mdFile = link.getAttribute('data-md');
            const parentSection = link.closest('section');
            let contentDiv = parentSection.querySelector('.markdown-content');
            
            if (!contentDiv) {
                contentDiv = document.createElement('div');
                contentDiv.className = 'markdown-content markdown-body';
                link.parentElement.after(contentDiv);
            }

            // 创建返回按钮（如果不存在）
            let backButton = parentSection.querySelector('.back-button');
            if (!backButton) {
                backButton = document.createElement('button');
                backButton.className = 'back-button';
                backButton.textContent = '返回';
                backButton.style.display = 'none';
                contentDiv.before(backButton);

                backButton.addEventListener('click', function() {
                    contentDiv.style.display = 'none';
                    backButton.style.display = 'none';
                    link.parentElement.style.display = 'block';
                });
            }

            fetch(mdFile)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(text => {
                    contentDiv.innerHTML = marked.parse(text);
                    contentDiv.style.display = 'block';
                    backButton.style.display = 'block';
                    link.parentElement.style.display = 'none';
                })
                .catch(error => {
                    console.error('Error loading the Markdown file:', error);
                    contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
                    contentDiv.style.display = 'block';
                });
        }
    });

    const articleList = document.getElementById('article-list');
    const articleContent = document.getElementById('article-content');

    articleList.addEventListener('click', function(e) {
        e.preventDefault();
        const link = e.target.closest('a');
        if (link && link.hasAttribute('data-md')) {
            const mdFile = link.getAttribute('data-md');
            loadMarkdownFile(mdFile);
        }
    });

    function loadMarkdownFile(file) {
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                articleContent.innerHTML = marked.parse(text);
                articleList.style.display = 'none';
                articleContent.style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading the Markdown file:', error);
                articleContent.innerHTML = '<p>Error loading article. Please try again later.</p>';
            });
    }

    // Add return button functionality
    const backButton = document.createElement('button');
    backButton.textContent = '返回文章列表';
    backButton.style.display = 'none';
    articleContent.parentNode.insertBefore(backButton, articleContent);

    backButton.addEventListener('click', function() {
        articleList.style.display = 'block';
        articleContent.style.display = 'none';
        backButton.style.display = 'none';
    });

    articleList.addEventListener('click', function() {
        backButton.style.display = 'block';
    });

    // 知识库密码保护
    const knowledgeBaseLogin = document.getElementById('knowledge-base-login');
    const knowledgeBaseContent = document.getElementById('knowledge-base-content');
    const knowledgeBasePassword = document.getElementById('knowledge-base-password');
    const knowledgeBaseSubmit = document.getElementById('knowledge-base-submit');

    if (!knowledgeBaseLogin || !knowledgeBaseContent || !knowledgeBasePassword || !knowledgeBaseSubmit) {
        console.error('无法找到知识库相关的DOM元素');
        return;
    }

    knowledgeBaseSubmit.addEventListener('click', function() {
        console.log('提交按钮被点击');
        if (knowledgeBasePassword.value === '20241008') {
            console.log('密码正确');
            knowledgeBaseLogin.style.display = 'none';
            knowledgeBaseContent.style.display = 'block';
        } else {
            console.log('密码错误');
            alert('密码错误，请重试。');
        }
    });

    // 当切换到知识库页面时，重置密码输入
    const knowledgeBaseLink = document.querySelector('a[data-page="knowledge-base"]');
    if (knowledgeBaseLink) {
        knowledgeBaseLink.addEventListener('click', function() {
            console.log('切换到知识库页面');
            knowledgeBaseLogin.style.display = 'block';
            knowledgeBaseContent.style.display = 'none';
            knowledgeBasePassword.value = '';
        });
    } else {
        console.error('无法找到知识库链接');
    }

    console.log('知识库相关的事件监听器已设置');
});

document.addEventListener('DOMContentLoaded', function() {
    const expandables = document.querySelectorAll('.expandable');
    
    expandables.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                this.classList.add('expanded');
            } else {
                content.style.display = 'none';
                this.classList.remove('expanded');
            }
        });
    });
});
