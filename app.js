// ==========================================================================
// 🔒 نظام الترخيص والحماية الأوفلاين الاحترافي (Offline System License UI)
// ==========================================================================

const SYSTEM_LICENSE_KEY = "SUPERMARKET-2026-45301229"; // كود التفعيل الخاص بكِ

document.addEventListener('DOMContentLoaded', () => {
    initLicenseSecurityCheck();
});

function initLicenseSecurityCheck() {
    const isActivated = localStorage.getItem('app_is_activated');
    if (isActivated === 'true') return; // الجهاز مفعل مسبقاً، المتابعة طبيعياً

    // إنشـاء شاشـة التفعيـل الاحترافيـة ديناميكياً
    injectLicenseModalStyles();
    renderLicenseModal();
}

// 1. حقن استايلات الشاشة التفاعلية بأعلى جودة
function injectLicenseModalStyles() {
    if (document.getElementById('license-styles')) return;

    const style = document.createElement('style');
    style.id = 'license-styles';
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.92) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shakeError {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 25px rgba(255, 179, 0, 0.15); }
            50% { box-shadow: 0 0 40px rgba(255, 179, 0, 0.3); }
        }

        .license-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(10, 10, 12, 0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            direction: rtl;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            padding: 20px;
            box-sizing: border-box;
        }

        .license-card {
            background: linear-gradient(145deg, rgba(28, 28, 35, 0.95), rgba(18, 18, 22, 0.98));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px 32px;
            width: 100%;
            max-width: 420px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1), pulseGlow 4s infinite ease-in-out;
            position: relative;
            overflow: hidden;
        }

        .license-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ffb300, #ff8f00, #ff6f00);
        }

        .license-icon-wrapper {
            width: 72px;
            height: 72px;
            background: rgba(255, 179, 0, 0.1);
            border: 1px solid rgba(255, 179, 0, 0.25);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
            color: #ffb300;
        }

        .license-title {
            color: #ffffff;
            font-size: 22px;
            font-weight: 700;
            margin: 0 0 8px 0;
            letter-spacing: -0.3px;
        }

        .license-subtitle {
            color: #9e9ea7;
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 28px 0;
        }

        .license-input-group {
            position: relative;
            margin-bottom: 20px;
        }

        .license-input {
            width: 100%;
            padding: 16px 18px;
            background: rgba(0, 0, 0, 0.4);
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            color: #ffffff;
            font-size: 15px;
            text-align: center;
            letter-spacing: 1.5px;
            outline: none;
            transition: all 0.25s ease;
            box-sizing: border-box;
        }

        .license-input:focus {
            border-color: #ffb300;
            background: rgba(0, 0, 0, 0.6);
            box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.15);
        }

        .license-input::placeholder {
            color: #555562;
            letter-spacing: normal;
        }

        .license-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #ffb300, #ff8f00);
            border: none;
            border-radius: 14px;
            color: #0d0d11;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 8px 20px rgba(255, 179, 0, 0.25);
        }

        .license-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(255, 179, 0, 0.35);
        }

        .license-btn:active {
            transform: translateY(0);
        }

        .license-error-msg {
            color: #ff5252;
            font-size: 13px;
            margin-top: 14px;
            display: none;
            font-weight: 500;
        }

        .license-card.shake {
            animation: shakeError 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        .license-footer {
            margin-top: 24px;
            font-size: 12px;
            color: #555562;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 16px;
        }
    `;
    document.head.appendChild(style);
}

// 2. بناء الواجهة التفاعلية للشاشة
function renderLicenseModal() {
    const overlay = document.createElement('div');
    overlay.className = 'license-overlay';
    overlay.id = 'licenseOverlay';

    overlay.innerHTML = `
        <div class="license-card" id="licenseCard">
            <div class="license-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            </div>
            <h2 class="license-title">تفعيل ترخيص النظام</h2>
            <p class="license-subtitle">هذا النظام محمي ومخصص لاستخدام جهاز واحد فقط. يرجى إدخال كود التفعيل المعتمد للمتابعة.</p>
            
            <div class="license-input-group">
                <input type="text" id="licenseKeyInput" class="license-input" placeholder="أدخل كود التفعيل هنا..." autocomplete="off" spellcheck="false">
            </div>

            <button id="activateSystemBtn" class="license-btn">تفعيل النظام الآن</button>
            <div id="licenseErrorMsg" class="license-error-msg">⚠️ كود التفعيل غير صحيح، يرجى المراجعة والمحاولة مجدداً</div>

            <div class="license-footer">
                نظام إدارة الجرد والمخزون أوفلاين &bull; جميع الحقوق محفوظة
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // ربط الأحداث والأزرار
    const input = document.getElementById('licenseKeyInput');
    const btn = document.getElementById('activateSystemBtn');

    btn.addEventListener('click', () => handleLicenseSubmission());
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLicenseSubmission();
    });

    // تركيز الإدخال تلقائياً
    setTimeout(() => input.focus(), 300);
}

// 3. التحقق والتسجيل بنجاح أو الحظر
function handleLicenseSubmission() {
    const input = document.getElementById('licenseKeyInput');
    const card = document.getElementById('licenseCard');
    const errorMsg = document.getElementById('licenseErrorMsg');
    const userValue = input.value.trim();

    if (userValue === SYSTEM_LICENSE_KEY) {
        // حـالـة الـنـجـاح: حفظ التفعيل وإغلاق الشاشة بسلاسة
        localStorage.setItem('app_is_activated', 'true');
        
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            const overlay = document.getElementById('licenseOverlay');
            if (overlay) overlay.remove();
        }, 300);

    } else {
        // حـالـة الـخـطـأ: حركة اهتزاز وتنبيه شيك
        errorMsg.style.display = 'block';
        card.classList.remove('shake');
        void card.offsetWidth; // إعادة تشغيل الأنيميشن
        card.classList.add('shake');
        input.focus();
        input.select();
    }
}



// التهيئة العامة للتنقل والأحداث
document.addEventListener('DOMContentLoaded', () => {
    // إتاحة قائمة المنتجات بداخل النافذة العامة
    if (!window.products) {
        window.products = JSON.parse(localStorage.getItem('products') || '[]');
    }

    // إدارة التبويب والتنقل بين الكروت
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetPageId = card.getAttribute('data-page');

            // إزالة التنشيط عن بقية التبويبات والصفحات
            navCards.forEach(c => c.classList.remove('active-tab'));
            document.querySelectorAll('.page-view').forEach(page => page.classList.remove('active'));

            // تفعيل الصفحة المختارة
            card.classList.add('active-tab');
            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // تحديث الجدول فور الضغط على صفحة المخزن
            if (targetPageId === 'inventory-page') {
                if (typeof renderInventoryTable === 'function') {
                    renderInventoryTable();
                }
            }
        });
    });

    // تحديث إحصائيات الصفحة عند التحميل
    updateDashboardStats();
});

// تحديث الإحصائيات بالداشبورد
function updateDashboardStats() {
    const products = window.products || JSON.parse(localStorage.getItem('products') || '[]');
    
    const totalProductsEl = document.getElementById('stat-total-products');
    const totalCategoriesEl = document.getElementById('stat-total-categories');
    const totalValueEl = document.getElementById('stat-total-value');

    if (totalProductsEl) totalProductsEl.textContent = products.length;

    if (totalCategoriesEl) {
        const categories = new Set(products.map(p => p.category).filter(Boolean));
        totalCategoriesEl.textContent = categories.size;
    }

    if (totalValueEl) {
        const totalValue = products.reduce((sum, p) => sum + ((parseFloat(p.price) || 0) * (parseInt(p.qty) || 0)), 0);
        totalValueEl.textContent = totalValue.toFixed(2) + ' ج.م';
    }
}

// دالة إضافة وحدة جديدة
function promptAddNewUnit(inputId) {
    const newUnit = prompt("أدخل مسمى الوحدة الجديدة (مثال: علبة 20 قطعة):");
    if (newUnit) {
        const input = document.getElementById(inputId);
        if (input) input.value = newUnit;
    }
}

// ==========================================
// 🔍 نظام التحكم في حجم عرض السيستم (System Zoom)
// ==========================================
function changeSystemZoom(zoomLevel) {
    const zoomValEl = document.getElementById('zoomValue');
    if (zoomValEl) {
        zoomValEl.innerText = zoomLevel + '%';
    }
    document.body.style.zoom = zoomLevel + '%';
    localStorage.setItem('userSystemZoom', zoomLevel);
}

// إعادة تطبيق الحجم المحفوظ تلقائياً عند فتح السيستم
document.addEventListener('DOMContentLoaded', () => {
    const savedZoom = localStorage.getItem('userSystemZoom');
    if (savedZoom) {
        const zoomInput = document.getElementById('zoomRange');
        if (zoomInput) zoomInput.value = savedZoom;
        changeSystemZoom(savedZoom);
    }
});

// إتاحة الدالة للواجهة العامة
window.changeSystemZoom = changeSystemZoom;
window.updateDashboardStats = updateDashboardStats;
window.promptAddNewUnit = promptAddNewUnit;