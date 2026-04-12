// =====================================================
// ================== КОРЗИНА: cart.js ================
// =====================================================
// Все функции корзины (addToCart, renderCart, etc.)
// находятся в main.js. Этот файл — только для
// специфичных функций страницы корзины.

console.log('✅ cart.js загружен');

// ───────── МАСКА ДЛЯ ТЕЛЕФОНА ─────────
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('input[placeholder="Телефон *"]');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }

                let formattedValue = '+7';
                if (value.length > 0) formattedValue += ' (' + value.substring(0, 3);
                if (value.length >= 3) formattedValue += ') ' + value.substring(3, 6);
                if (value.length >= 6) formattedValue += '-' + value.substring(6, 8);
                if (value.length >= 8) formattedValue += '-' + value.substring(8, 10);

                e.target.value = formattedValue;
            }
        });
    }

    // Отображение имени файла
    const fileInput = document.getElementById('brandbookFile');
    const fileName = document.getElementById('fileName');

    if (fileInput && fileName) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const size = (file.size / 1024 / 1024).toFixed(1);
                fileName.textContent = `${file.name} (${size} MB)`;
                fileName.style.color = '#100C35';
                fileName.style.fontWeight = '600';
            } else {
                fileName.textContent = 'Файл не выбран';
                fileName.style.color = '#666';
                fileName.style.fontWeight = '400';
            }
        });
    }
});