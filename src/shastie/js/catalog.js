// =====================================================
// ================== КАТАЛОГ ==========================
// =====================================================

/**
 * Фильтр по категориям
 */
function filterCategory(category) {
    const products = document.querySelectorAll('.product-item');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Обновляем активную кнопку
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(category)) {
            btn.classList.add('active');
        }
    });

    // Показываем/скрываем товары
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Закрытие модального окна корзины по Escape (если есть на странице)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('cartModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
});

console.log('✅ catalog.js загружен');