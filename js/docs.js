// Documentation specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Highlight active sidebar link based on scroll position
    const sections = document.querySelectorAll('.docs-section');
    const sidebarLinks = document.querySelectorAll('.docs-sidebar a');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial highlight
    
    // Mobile sidebar toggle
    const createMobileToggle = () => {
        const toggle = document.createElement('button');
        toggle.className = 'sidebar-toggle';
        toggle.innerHTML = '☰';
        toggle.style.cssText = `
            display: none;
            position: fixed;
            top: 80px;
            left: 20px;
            z-index: 1001;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 20px;
        `;
        
        document.body.appendChild(toggle);
        
        toggle.addEventListener('click', () => {
            const sidebar = document.querySelector('.docs-sidebar');
            sidebar.classList.toggle('open');
        });
        
        // Show toggle on mobile
        const checkWidth = () => {
            if (window.innerWidth <= 1024) {
                toggle.style.display = 'block';
            } else {
                toggle.style.display = 'none';
            }
        };
        
        window.addEventListener('resize', checkWidth);
        checkWidth();
    };
    
    createMobileToggle();
    
    // Copy code functionality for documentation
    document.querySelectorAll('.docs-section pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        
        pre.appendChild(button);
        
        button.addEventListener('click', () => {
            const code = pre.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            });
        });
    });
    
    // Smooth scroll for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 100;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile sidebar after clicking
                if (window.innerWidth <= 1024) {
                    document.querySelector('.docs-sidebar').classList.remove('open');
                }
            }
        });
    });
    
    // Add anchor links to headers
    document.querySelectorAll('.docs-section h2, .docs-section h3').forEach(heading => {
        const anchor = document.createElement('a');
        anchor.className = 'header-anchor';
        anchor.href = '#' + heading.textContent.toLowerCase().replace(/\s+/g, '-');
        anchor.innerHTML = '#';
        anchor.style.cssText = `
            margin-left: 10px;
            color: var(--text-secondary);
            text-decoration: none;
            opacity: 0;
            transition: opacity 0.3s;
            font-weight: normal;
        `;
        
        heading.appendChild(anchor);
        
        heading.addEventListener('mouseenter', () => {
            anchor.style.opacity = '1';
        });
        
        heading.addEventListener('mouseleave', () => {
            anchor.style.opacity = '0';
        });
    });
});