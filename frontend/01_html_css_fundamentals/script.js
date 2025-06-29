// HTML/CSS Fundamentals - Interactive JavaScript Demo
// This file demonstrates basic DOM manipulation and event handling

document.addEventListener('DOMContentLoaded', function() {
    console.log('HTML/CSS Fundamentals Demo Loaded! 🚀');
    
    // 1. Form handling demonstration
    const demoForm = document.querySelector('.demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                showNotification('Form submitted successfully! ✅', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all fields! ⚠️', 'warning');
            }
        });
    }
    
    // 2. Interactive button demonstrations
    const startLearningBtn = document.querySelector('.btn-primary');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            showNotification('Welcome to your Full Stack Learning Journey! 🎓', 'info');
            smoothScrollTo('#basics');
        });
    }
    
    const viewCodeBtn = document.querySelector('.btn-secondary');
    if (viewCodeBtn) {
        viewCodeBtn.addEventListener('click', function() {
            showCodeModal();
        });
    }
    
    // 3. Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // 4. Interactive transition button
    const transitionBtn = document.querySelector('.transition-btn');
    if (transitionBtn) {
        let clickCount = 0;
        const messages = [
            'Great! You clicked me! 🎉',
            'CSS Transitions are smooth! ✨',
            'Keep learning! 📚',
            'You\'re doing amazing! 🌟'
        ];
        
        transitionBtn.addEventListener('click', function() {
            const message = messages[clickCount % messages.length];
            this.textContent = message;
            clickCount++;
            
            setTimeout(() => {
                this.textContent = 'Click Me Again!';
            }, 2000);
        });
    }
    
    // 5. Cards hover effect enhancement
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#4f46e5';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#e5e7eb';
        });
    });
    
    // 6. Progress indicator for scrolling
    createScrollProgressIndicator();
    
    // 7. Dynamic content loading demonstration
    loadLearningTips();
});

// Utility Functions

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        minWidth: '250px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateX(300px)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function showCodeModal() {
    const modal = document.createElement('div');
    modal.className = 'code-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>💻 HTML/CSS Code Structure</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <h4>Key Learning Points:</h4>
                    <ul>
                        <li><strong>Semantic HTML:</strong> Using meaningful tags like &lt;header&gt;, &lt;main&gt;, &lt;section&gt;</li>
                        <li><strong>CSS Grid & Flexbox:</strong> Modern layout techniques</li>
                        <li><strong>CSS Variables:</strong> Maintainable styling</li>
                        <li><strong>Responsive Design:</strong> Mobile-first approach</li>
                        <li><strong>CSS Animations:</strong> Smooth transitions and keyframes</li>
                    </ul>
                    <p><strong>Files to explore:</strong></p>
                    <ul>
                        <li>📄 index.html - Semantic structure</li>
                        <li>🎨 styles.css - Modern CSS techniques</li>
                        <li>⚡ script.js - Interactive enhancements</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // Style the modal
    const style = document.createElement('style');
    style.textContent = `
        .code-modal .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        .code-modal .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .code-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
        }
        .code-modal .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
        }
        .code-modal .modal-body {
            padding: 20px;
        }
        .code-modal ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .code-modal li {
            margin: 5px 0;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.remove();
        style.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '3px',
        background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
        zIndex: '9999',
        transition: 'width 0.1s ease'
    });
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

function loadLearningTips() {
    const tips = [
        "💡 Use semantic HTML elements for better accessibility",
        "🎨 CSS Grid and Flexbox are your layout best friends",
        "📱 Always design mobile-first, then scale up",
        "⚡ CSS custom properties make maintenance easier",
        "🔍 Use browser developer tools to debug effectively"
    ];
    
    // Add tips to the footer
    const footer = document.querySelector('.footer .container');
    if (footer) {
        const tipsContainer = document.createElement('div');
        tipsContainer.className = 'learning-tips';
        tipsContainer.innerHTML = `
            <h4 style="margin-bottom: 10px; color: #4f46e5;">💡 Quick Learning Tips:</h4>
            <div class="tips-list"></div>
        `;
        
        const tipsList = tipsContainer.querySelector('.tips-list');
        tips.forEach((tip, index) => {
            setTimeout(() => {
                const tipElement = document.createElement('p');
                tipElement.textContent = tip;
                tipElement.style.opacity = '0';
                tipElement.style.transform = 'translateY(10px)';
                tipElement.style.transition = 'all 0.3s ease';
                tipElement.style.margin = '5px 0';
                
                tipsList.appendChild(tipElement);
                
                setTimeout(() => {
                    tipElement.style.opacity = '1';
                    tipElement.style.transform = 'translateY(0)';
                }, 100);
            }, index * 500);
        });
        
        footer.insertBefore(tipsContainer, footer.firstChild);
    }
} 