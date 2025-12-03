// ============================================
// フローティングパーティクル（光の粒子）
// ============================================
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // ランダムな開始位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        
        particlesContainer.appendChild(particle);
        
        // アニメーション終了後に削除
        setTimeout(() => {
            particle.remove();
        }, 12000);
    }

    // 定期的にパーティクルを生成
    setInterval(createParticle, 720);
    
    // 初期パーティクルを生成
    for (let i = 0; i < 11; i++) {
        setTimeout(createParticle, i * 300);
    }
    
    // 桜の花びらを生成
    function createSakuraPetal() {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 12 + 's';
        petal.style.animationDuration = (10 + Math.random() * 5) + 's';
        particlesContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 15000);
    }
    
    setInterval(createSakuraPetal, 2000);
    for (let i = 0; i < 5; i++) {
        setTimeout(createSakuraPetal, i * 1000);
    }
}

// ============================================
// スパークルエフェクト
// ============================================
function addSparkles() {
    const sparkleElements = document.querySelectorAll('.hero-image, .product-image');
    
    sparkleElements.forEach(element => {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }, 3000);
    });
}

// ============================================
// スクロールアニメーション
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', () => {
    // パーティクルとスパークルを初期化
    createFloatingParticles();
    addSparkles();
    
    const animateElements = document.querySelectorAll(
        '.benefit-item, .review-card, .trust-item, .pricing-card, .section-title, .science-content, .relaxation-content'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // シマーエフェクトを追加
    const shimmerElements = document.querySelectorAll('.product-image, .cta-button, .patent-info');
    shimmerElements.forEach(el => {
        el.classList.add('shimmer');
    });
    
    // 和風ホバーエフェクト
    const imageElements = document.querySelectorAll('.benefit-icon-img, .relaxation-img, .science-image');
    imageElements.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    });
});

// ============================================
// スムーススクロール
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================
// ヘッダースクロール効果
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール方向に応じた効果を追加
    if (currentScroll > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// CTAボタンクリックトラッキング
// ============================================
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // ここにアナリティクスやトラッキングコードを追加可能
        console.log('CTA clicked:', button.textContent);
    });
});

// ============================================
// 画像の遅延読み込み（パフォーマンス向上）
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// モバイルメニュー（必要に応じて）
// ============================================
// 将来的にメニューを追加する場合に備えて

// ============================================
// パフォーマンス最適化：デバウンス関数
// ============================================
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

// スクロールイベントの最適化
const optimizedScrollHandler = debounce(() => {
    // スクロール時の処理
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// 固定CTAボタン（常に表示）
// ============================================
function initFixedCTA() {
    const fixedCTA = document.querySelector('.fixed-cta-button');
    if (fixedCTA) {
        // CTAボタンは常に表示
        fixedCTA.style.display = 'flex';
    }
}

// ページ読み込み時にCTAを初期化
window.addEventListener('load', () => {
    initFixedCTA();
});

// ============================================
// ページ読み込み完了時の処理
// ============================================
window.addEventListener('load', () => {
    // ページ全体のアニメーション開始
    document.body.classList.add('loaded');
    
    // ローディングアニメーションがあれば削除
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // 初期状態で固定CTAボタンの表示を制御
    toggleFixedCTA();
});
