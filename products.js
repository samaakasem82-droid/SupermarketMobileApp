// استخراج عدد القطع من النص المكتوب بداخل الوحدة
function extractPieceCount(unitStr) {
    if (!unitStr) return 1;
    const match = unitStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
}

// دالة لتحديث جميع قوائم المقترحات المنسدلة (Products, Categories, Units Datalists)
function updateAllDatalists() {
    const products = window.products || JSON.parse(localStorage.getItem('products') || '[]');

    // 1. قائمة أسماء المنتجات
    const defaultProductNames = ["كوكاكولا كانز", "شيبسي عائلي", "جبنة فيتا 250جم", "أرز مصري 1كجم"];
    const savedProductNames = JSON.parse(localStorage.getItem('saved_product_names') || '[]');
    const existingProductNames = products.map(p => p.name).filter(Boolean);
    const allProductNames = [...new Set([...defaultProductNames, ...savedProductNames, ...existingProductNames])];

    const productsListEl = document.getElementById('products-list');
    if (productsListEl) {
        productsListEl.innerHTML = allProductNames.map(name => `<option value="${name}">`).join('');
    }

    // 2. قائمة التصنيفات
    const defaultCategories = ["مياه غازية", "شيبسي وكراتيه", "أجبان وألبان", "بقالة ومواد غذائية", "منظفات", "حلويات والبسكويت"];
    const savedCategories = JSON.parse(localStorage.getItem('saved_categories') || '[]');
    const existingCategories = products.map(p => p.category).filter(Boolean);
    const allCategories = [...new Set([...defaultCategories, ...savedCategories, ...existingCategories])];

    const categoriesListEl = document.getElementById('categories-list');
    if (categoriesListEl) {
        categoriesListEl.innerHTML = allCategories.map(cat => `<option value="${cat}">`).join('');
    }

    // 3. قائمة الوحدات
    const defaultUnits = [
        "كرتونة 24 قطعة",
        "كرتونة 12 قطعة",
        "باكتة 12 قطعة",
        "باكتة 6 قطع",
        "علبة 10 قطع",
        "قطعة 1"
    ];
    const savedUnits = JSON.parse(localStorage.getItem('saved_units') || '[]');
    const existingUnits = products.map(p => p.unit).filter(Boolean);
    const allUnits = [...new Set([...defaultUnits, ...savedUnits, ...existingUnits])];

    const unitsListEl = document.getElementById('units-list');
    if (unitsListEl) {
        unitsListEl.innerHTML = allUnits.map(unit => `<option value="${unit}">`).join('');
    }
}

// إضافة القيم الجديدة ديناميكياً للتخزين المحتفظ به
function saveNewDatalistValues(name, category, unit) {
    if (name) {
        const savedNames = JSON.parse(localStorage.getItem('saved_product_names') || '[]');
        if (!savedNames.includes(name.trim())) {
            savedNames.push(name.trim());
            localStorage.setItem('saved_product_names', JSON.stringify(savedNames));
        }
    }
    if (category) {
        const savedCats = JSON.parse(localStorage.getItem('saved_categories') || '[]');
        if (!savedCats.includes(category.trim())) {
            savedCats.push(category.trim());
            localStorage.setItem('saved_categories', JSON.stringify(savedCats));
        }
    }
    if (unit) {
        const savedUnits = JSON.parse(localStorage.getItem('saved_units') || '[]');
        if (!savedUnits.includes(unit.trim())) {
            savedUnits.push(unit.trim());
            localStorage.setItem('saved_units', JSON.stringify(savedUnits));
        }
    }
    updateAllDatalists();
}

// دالة تحديث صندوق المعاينة الحسابية عند الإضافة
function updateAddProductPreview() {
    const priceInput = document.getElementById('p-price');
    const unitInput = document.getElementById('p-unit');
    const calcPreview = document.getElementById('calc-preview');
    const previewCount = document.getElementById('preview-count');
    const previewPiecePrice = document.getElementById('preview-piece-price');

    if (!priceInput || !unitInput) return;

    const price = parseFloat(priceInput.value) || 0;
    const unitStr = unitInput.value.trim();

    if (price > 0 && unitStr !== '') {
        const piecesCount = extractPieceCount(unitStr);
        const piecePrice = piecesCount > 0 ? (price / piecesCount) : price;

        if (previewCount) previewCount.textContent = piecesCount;
        if (previewPiecePrice) previewPiecePrice.textContent = piecePrice.toFixed(2) + ' ج.م';
        if (calcPreview) calcPreview.style.display = 'flex';
    } else {
        if (calcPreview) calcPreview.style.display = 'none';
    }
}

// ==========================================
// إدارة نافذة إضافة وحدة جديدة (Custom Modal)
// ==========================================
let targetUnitInputId = 'p-unit';

function openCustomUnitModal(inputId) {
    targetUnitInputId = inputId;
    const modal = document.getElementById('unit-modal');
    const input = document.getElementById('new-unit-name-input');
    if (input) input.value = '';
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
        setTimeout(() => input && input.focus(), 100);
    }
}

function closeCustomUnitModal() {
    const modal = document.getElementById('unit-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

function confirmSaveCustomUnit() {
    const input = document.getElementById('new-unit-name-input');
    const unitVal = input ? input.value.trim() : '';

    if (!unitVal) {
        showToast('⚠️ برجاء كتابة مسمى الوحدة أولاً!', 'warning');
        return;
    }

    const targetInput = document.getElementById(targetUnitInputId);
    if (targetInput) {
        targetInput.value = unitVal;
        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    saveNewDatalistValues(null, null, unitVal);
    closeCustomUnitModal();
    showToast(' تم إضافة الوحدة الجديدة واختيارها بنجاح! ✅');
}

// ==========================================
// إدارة الإشعارات المنبثقة الأنيقة (Toast Alerts)
// ==========================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast-notification show';
    if (type === 'warning') {
        toast.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    } else if (type === 'danger') {
        toast.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        toast.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    }

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3200);
}

// معالجة إضافة منتج جديد وتحديث الأحداث
document.addEventListener('DOMContentLoaded', () => {
    updateAllDatalists();

    const productForm = document.getElementById('product-form');
    const priceInput = document.getElementById('p-price');
    const unitInput = document.getElementById('p-unit');
    const customUnitInput = document.getElementById('new-unit-name-input');

    if (priceInput) priceInput.addEventListener('input', updateAddProductPreview);
    if (unitInput) {
        unitInput.addEventListener('input', updateAddProductPreview);
        unitInput.addEventListener('change', updateAddProductPreview);
    }
    
    if (customUnitInput) {
        customUnitInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                confirmSaveCustomUnit();
            }
        });
    }

    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('p-name').value.trim();
            const category = document.getElementById('p-category').value.trim();
            const price = parseFloat(document.getElementById('p-price').value) || 0;
            const unit = document.getElementById('p-unit').value.trim();
            const qty = parseInt(document.getElementById('p-qty').value) ||'';

            const piecesCount = extractPieceCount(unit);
            const piecePrice = piecesCount > 0 ? (price / piecesCount) : price;

            const newProduct = {
                id: Date.now(),
                name,
                category,
                price,
                unit,
                qty,
                piecesCount,
                piecePrice
            };

            // الحفظ بداخل المصفوفة العامة والـ LocalStorage
            if (!window.products) window.products = [];
            window.products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(window.products));

            // حفظ الخيارات للقوائم المقترحة أوتوماتيكياً
            saveNewDatalistValues(name, category, unit);

            // الحفظ بداخل IndexedDB إن وجد
            if (window.db) {
                const tx = window.db.transaction('products', 'readwrite');
                tx.objectStore('products').add(newProduct);
            }

            // إشعار التنبيه المخصص الاحترافي
            showToast(' تم حفظ المنتج بنجاح في المخزن ! ✅');
            productForm.reset();
            
            const calcPreview = document.getElementById('calc-preview');
            if (calcPreview) calcPreview.style.display = 'none';

            // تحديث البيانات
            if (typeof updateDashboardStats === 'function') updateDashboardStats();
            if (typeof renderInventoryTable === 'function') renderInventoryTable();
        });
    }
});

window.extractPieceCount = extractPieceCount;
window.updateAddProductPreview = updateAddProductPreview;
window.openCustomUnitModal = openCustomUnitModal;
window.closeCustomUnitModal = closeCustomUnitModal;
window.confirmSaveCustomUnit = confirmSaveCustomUnit;
window.showToast = showToast;
window.updateAllDatalists = updateAllDatalists;
window.saveNewDatalistValues = saveNewDatalistValues;