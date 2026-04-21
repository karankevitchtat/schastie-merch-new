/* ===================================================== */
/* 🎠 СЛАЙДЕР КАТЕГОРИЙ (Swiper) */
/* ===================================================== */
/**
 * Инициализация слайдера категорий после загрузки страницы
 * Использует библиотеку Swiper для карусели товаров
 */
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем что библиотека Swiper загрузилась
    if (typeof Swiper !== 'undefined') {
        const categoriesSlider = new Swiper('.catalog-slider', {
            slidesPerView: 'auto',      // Показывать столько слайдов, сколько помещается
            spaceBetween: 25,           // Отступ между слайдами 15px
            loop: true,                 // Бесконечная прокрутка
            speed: 600,                 // Скорость анимации 600мс

            // Стрелки навигации
            navigation: {
                nextEl: '.swiper-button-next',   // Кнопка "вправо"
                prevEl: '.swiper-button-prev',   // Кнопка "влево"
            },

            // Точки-пагинация внизу
            pagination: {
                el: '.swiper-pagination',
                clickable: true,        // Можно кликать по точкам
            },

            // Адаптивность: настройки для разных ширины экрана
            breakpoints: {
                320: { slidesPerView: 1.5, spaceBetween: 15 },   // Мобильные
                640: { slidesPerView: 2.5, spaceBetween: 15 },   // Планшеты
                968: { slidesPerView: 3.5, spaceBetween: 15 },   // Маленькие десктопы
                1200: { slidesPerView: 4.5, spaceBetween: 15 },  // Десктопы
                1536: { slidesPerView: 5, spaceBetween: 15 },    // Большие экраны
            },
        });
        console.log('Слайдер инициализирован!');
    } else {
        console.error('Swiper не загрузился!');
    }
});

/* ===================================================== */
/* ❓ АККОРДЕОН FAQ (ВОПРОСЫ-ОТВЕТЫ) */
/* ===================================================== */
/**
 * Переключение вопроса в аккордеоне (открыть/закрыть)
 * @param {HTMLElement} button - Нажатая кнопка вопроса
 */
/* ═══════════════════════════════════════════════════ */
/* FAQ АККОРДЕОН (БЕЗ СКРОЛЛА) */
/* ═══════════════════════════════════════════════════ */

function toggleFaq(button) {
    const item = button.parentElement;
    const answer = button.nextElementSibling;

    // Toggle active class
    item.classList.toggle('active');

    // Close other items (optional)
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
        }
    });
}

console.log('✅ FAQ аккордеон (без скролла) активирован');
//
// /* ===================================================== */
// /* 📋 МОДАЛЬНОЕ ОКНО БРИФА И ФОРМЫ (РАБОЧАЯ ВЕРСИЯ) */
// /* ===================================================== */
//
// (function() {
//     'use strict';
//
//     // ==========================================
//     // 1. ОТКРЫТЬ / ЗАКРЫТЬ ОКНО БРИФА
//     // ==========================================
//
//     window.openBriefModal = function() {
//         const modal = document.getElementById('briefModal');
//         if (modal) {
//             modal.style.display = 'flex'; // Используем flex для центрирования
//             modal.classList.add('active');
//             document.body.style.overflow = 'hidden';
//         }
//     };
//
//     window.closeBriefModal = function() {
//         const modal = document.getElementById('briefModal');
//         if (modal) {
//             modal.style.display = 'none';
//             modal.classList.remove('active');
//             document.body.style.overflow = '';
//
//             // Очищаем форму
//             const form = modal.querySelector('.brief-form');
//             if (form) form.reset();
//
//             // Сбрасываем имя файла
//             const fileName = document.getElementById('fileName');
//             if (fileName) {
//                 fileName.textContent = 'Файл не выбран';
//                 fileName.style.color = '#666666';
//                 fileName.style.fontWeight = '400';
//             }
//         }
//     };
//
//     // ==========================================
//     // 2. ОТПРАВКА ФОРМЫ ЧЕРЕЗ FORMSPREE brif
//     // ==========================================
//
//     window.submitBrief = function(event) {
//         event.preventDefault(); // Отменяем стандартную отправку
//
//         const form = event.target;
//         const submitBtn = form.querySelector('button[type="submit"]');
//         const originalBtnText = submitBtn ? submitBtn.innerText : 'Отправить';
//
//         // Блокируем кнопку
//         if (submitBtn) {
//             submitBtn.disabled = true;
//             submitBtn.innerText = 'Отправка...';
//         }
//
//         const formData = new FormData(form);
//
//         // ОТПРАВКА НА ВАШУ ПОЧТУ ЧЕРЕЗ FORMSPREE
//         fetch('https://formspree.io/f/xlgajwzl', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Accept': 'application/json'
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     // УСПЕХ!
//                     form.reset();
//
//                     // Сброс имени файла
//                     const fileName = document.getElementById('fileName');
//                     if (fileName) {
//                         fileName.textContent = 'Файл не выбран';
//                         fileName.style.color = '#666666';
//                         fileName.style.fontWeight = '400';
//                     }
//
//                     // Закрываем бриф
//                     window.closeBriefModal();
//
//                     // Показываем красивое окно успеха
//                     window.showCustomAlert('Ваш бриф принят! Мы свяжемся с вами в ближайшее время.');
//                 } else {
//                     alert('Ошибка при отправке. Попробуйте позже.');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert('Произошла ошибка сети.');
//             })
//             .finally(() => {
//                 // Возвращаем кнопку
//                 if (submitBtn) {
//                     submitBtn.disabled = false;
//                     submitBtn.innerText = originalBtnText;
//                 }
//             });
//     };
//
//     // ==========================================
//     // 3. ОКНО УСПЕХА (CUSTOM ALERT)
//     // ==========================================
//
//     window.showCustomAlert = function(message) {
//         const alertBox = document.getElementById('customAlert');
//         const alertMessage = document.getElementById('alertMessage');
//
//         if (alertBox) {
//             if (message && alertMessage) {
//                 alertMessage.textContent = message;
//             }
//             alertBox.style.display = 'flex';
//         }
//     };
//
//     window.hideCustomAlert = function() {
//         const alertBox = document.getElementById('customAlert');
//         if (alertBox) {
//             alertBox.style.display = 'none';
//         }
//     };
//
//     // Закрытие по клику на фон окна успеха
//     document.addEventListener('DOMContentLoaded', function() {
//         const alertBox = document.getElementById('customAlert');
//         if (alertBox) {
//             alertBox.addEventListener('click', function(e) {
//                 if (e.target === alertBox || e.target.classList.contains('custom-alert-overlay')) {
//                     window.hideCustomAlert();
//                 }
//             });
//         }
//     });
//
//     // ==========================================
//     // 4. ЗАКРЫТИЕ ПО КЛАВИШЕ ESC brif
//     // ==========================================
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape') {
//             window.closeBriefModal();
//             window.hideCustomAlert();
//         }
//     });
//
//     // ==========================================
//     // 5. ОТОБРАЖЕНИЕ ИМЕНИ ФАЙЛА brif
//     // ==========================================
//     document.addEventListener('DOMContentLoaded', function() {
//         const fileInput = document.getElementById('brandbookFile');
//         const fileName = document.getElementById('fileName');
//
//         if (fileInput && fileName) {
//             fileInput.addEventListener('change', function() {
//                 if (this.files && this.files[0]) {
//                     const file = this.files[0];
//                     const fileSize = (file.size / 1024 / 1024).toFixed(2);
//                     fileName.textContent = `${file.name} (${fileSize} MB)`;
//                     fileName.style.color = '#100C35';
//                     fileName.style.fontWeight = '600';
//                 } else {
//                     fileName.textContent = 'Файл не выбран';
//                     fileName.style.color = '#666666';
//                     fileName.style.fontWeight = '400';
//                 }
//             });
//         }
//     });
//
//     // ==========================================
//     // 6. МАСКА ДЛЯ ТЕЛЕФОНА brif
//     // ==========================================
//     document.addEventListener('DOMContentLoaded', function() {
//         const phoneInputs = document.querySelectorAll('input[type="tel"]');
//         phoneInputs.forEach(function(input) {
//             input.addEventListener('input', function(e) {
//                 let value = e.target.value.replace(/\D/g, '');
//                 if (value.length > 0) {
//                     if (value[0] === '7' || value[0] === '8') value = value.substring(1);
//                     let formattedValue = '+7';
//                     if (value.length > 0) formattedValue += ' (' + value.substring(0, 3);
//                     if (value.length >= 3) formattedValue += ') ' + value.substring(3, 6);
//                     if (value.length >= 6) formattedValue += '-' + value.substring(6, 8);
//                     if (value.length >= 8) formattedValue += '-' + value.substring(8, 10);
//                     e.target.value = formattedValue;
//                 }
//             });
//         });
//     });
//
//     console.log('✅ Скрипт брифа (Formspree) загружен успешно');
// })();



// ==========================================
// 1. ГЛОБАЛЬНЫЕ ФУНКЦИИ (ДЛЯ КНОПОК В HTML)
// ==========================================

// Открыть модальное окно брифа
window.openBriefModal = function() {
    const modal = document.getElementById('briefModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Бриф открыт');
    } else {
        console.error('Ошибка: Элемент briefModal не найден!');
    }
};

// Закрыть модальное окно брифа
window.closeBriefModal = function() {
    const modal = document.getElementById('briefModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';

        const form = document.getElementById('brief-form');
        if (form) form.reset();

        const fileName = document.getElementById('fileName');
        if (fileName) {
            fileName.textContent = 'Файл не выбран';
            fileName.style.color = '#666666';
            fileName.style.fontWeight = '400';
        }
    }
};

// Закрыть окно успеха
window.hideCustomAlert = function() {
    const box = document.getElementById('customAlert');
    if (box) {
        box.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// Показать окно успеха
window.showAlert = function() {
    const box = document.getElementById('customAlert');
    if (box) {
        box.style.display = 'flex';
    }
};

// ==========================================
// 2. ОСНОВНОЙ КОД ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

    // Обработка формы БРИФА
    // const briefForm = document.getElementById('brief-form');
    // if (briefForm) {
    //     briefForm.addEventListener('submit', function (e) {
    //         e.preventDefault();
    //         sendForm(briefForm, 'Отправка брифа...');
    //     });
    // }

    // // Обработка формы в ФУТЕРЕ
    // const footerForm = document.querySelector('.footer-form');
    // if (footerForm) {
    //     footerForm.addEventListener('submit', function (e) {
    //         e.preventDefault();
    //         sendForm(footerForm, 'Отправка...');
    //     });
    // }

    // Универсальная функция отправки
    function sendForm(formElement, btnText) {
        const submitBtn = formElement.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerText : 'Отправить';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = btnText;
        }

        const formData = new FormData(formElement);

        fetch('https://formspree.io/f/xlgajwzl', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    formElement.reset();

                    const fileName = document.getElementById('fileName');
                    if (fileName) {
                        fileName.textContent = 'Файл не выбран';
                        fileName.style.color = '#666666';
                        fileName.style.fontWeight = '400';
                    }

                    window.closeBriefModal();
                    window.showAlert();
                } else {
                    alert('Ошибка при отправке.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Произошла ошибка сети.');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            });
    }

    // Закрытие по клику на фон окна успеха
    const alertBox = document.getElementById('customAlert');
    if (alertBox) {
        alertBox.addEventListener('click', function(e) {
            if (e.target === alertBox || e.target.classList.contains('custom-alert-overlay')) {
                window.hideCustomAlert();
            }
        });
    }

    // Маска телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') value = value.substring(1);
                let formattedValue = '+7';
                if (value.length > 0) formattedValue += ' (' + value.substring(0, 3);
                if (value.length >= 3) formattedValue += ') ' + value.substring(3, 6);
                if (value.length >= 6) formattedValue += '-' + value.substring(6, 8);
                if (value.length >= 8) formattedValue += '-' + value.substring(8, 10);
                e.target.value = formattedValue;
            }
        });
    });

    // Отображение имени файла
    const fileInput = document.getElementById('brandbookFile');
    const fileName = document.getElementById('fileName');
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                fileName.textContent = `${file.name} (${fileSize} MB)`;
                fileName.style.color = '#100C35';
                fileName.style.fontWeight = '600';
            } else {
                fileName.textContent = 'Файл не выбран';
                fileName.style.color = '#666666';
                fileName.style.fontWeight = '400';
            }
        });
    }

    console.log('✅ Скрипты загружены');
});

/* ===================================================== */
/* 🛒 ОБЩИЕ ФУНКЦИИ КОРЗИНЫ */
/* ===================================================== */

// Глобальная переменная: загружаем корзину из localStorage или создаём пустую
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * 🛒 ДОБАВИТЬ товар в корзину
 * @param {Object} product - Объект товара: {id, name, price, article, image}
 *
 * Логика:
 * - Если товар уже есть — увеличиваем количество
 * - Если товара нет — добавляем новый с quantity: 1
 * - Сохраняем в localStorage
 * - Обновляем счётчик и показываем уведомление
 */
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);  // Ищем товар по ID

    if (existingItem) {
        // Товар уже есть — увеличиваем количество
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        // Новый товар — добавляем в массив
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            article: product.article || '',
            image: product.image || '',
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));  // Сохраняем
    updateCartCount();                                    // Обновляем счётчик в хедере
    showCustomAlert(`✅ ${product.name} добавлен в корзину`);  // Уведомление
}

/* ===================================================== */
/* 🛒 ФУНКЦИИ УПРАВЛЕНИЯ КОРЗИНОЙ */
/* ===================================================== */

/**
 * ➕➖ ИЗМЕНИТЬ количество товара в корзине
 * @param {number} index - Индекс товара в массиве cart
 * @param {number} change - На сколько изменить: +1 или -1
 *
 * Логика:
 * - Вычисляем новое количество
 * - Если > 0 — обновляем и сохраняем
 * - Если ≤ 0 — не меняем (товар не удаляется здесь)
 * - Перерисовываем корзину и обновляем счётчик
 */
function changeQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];

    if (item) {
        const newQuantity = (item.quantity || 1) + change;

        if (newQuantity > 0) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();        // Перерисовать товары
            updateCartCount();   // Обновить счётчик
        }
    }
}

/**
 * ❌ УДАЛИТЬ товар из корзины по индексу
 * @param {number} index - Индекс товара в массиве cart
 *
 * Логика:
 * - Удаляем элемент из массива
 * - Сохраняем обновлённую корзину
 * - Перерисовываем интерфейс
 */
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);  // Удаляем 1 элемент начиная с index
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

/**
 * 🗑️ ОЧИСТИТЬ корзину полностью
 * Вызывается по клику на кнопку "Очистить корзину"
 *
 * Логика:
 * - Подтверждение через confirm()
 * - Удаляем cart из localStorage
 * - Перерисовываем пустую корзину
 */
function clearCart() {
    if (confirm('Очистить корзину?')) {
        localStorage.removeItem('cart');  // Полностью удаляем
        renderCart();
        updateCartCount();
    }
}

/**
 * 📤 ОТПРАВИТЬ заказ (форма на странице cart.html)
 * @param {Event} event - Событие отправки формы
 *
 * Логика:
 * - Проверяем что корзина не пуста
 * - Считаем общее количество товаров и сумму
 * - Формируем письмо с деталями заказа
 * - Открываем почтовый клиент
 * - Очищаем корзину после отправки
 */
function submitOrder(event) {
    event.preventDefault();  // Отменяем стандартную отправку

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }

    // Считаем итоги
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // Формируем письмо
    const subject = `Заказ на сумму ${totalPrice.toLocaleString('ru-RU')} ₽`;
    const body = `Товаров: ${totalItems}\nСумма: ${totalPrice.toLocaleString('ru-RU')} ₽`;

    // Открываем почтовый клиент
    window.location.href = `mailto:zakaz@schastie.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    alert('✅ Заявка отправлена!');
    localStorage.removeItem('cart');  // Очищаем корзину
    renderCart();
    updateCartCount();
}

/**
 * 🔢 ОБНОВИТЬ счётчик товаров в хедере
 * Вызывается после каждого изменения корзины
 *
 * Логика:
 * - Загружаем актуальную корзину
 * - Считаем общее количество единиц товара
 * - Обновляем текст и видимость элемента #cartCount
 */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');

    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
        // Показываем счётчик только если есть товары
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

/**
 * 🟢 ОТКРЫТЬ модальное окно корзины (в хедере)
 * Используется на страницах где корзина — модальное окно
 */
function openCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';  // Блокируем скролл
        renderCart();  // Обновляем содержимое
    }
}

/**
 * 🔴 ЗАКРЫТЬ модальное окно корзины
 */
function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';  // Разблокируем скролл
    }
}

/**
 * 🎨 ОТОБРАЗИТЬ товары в корзине (модальное окно или страница)
 * Главная функция рендеринга корзины
 *
 * Логика:
 * - Загружаем корзину из localStorage
 * - Если пуста — показываем блок "Пустая корзина"
 * - Если есть товары — генерируем HTML для каждого
 * - Считаем и отображаем итоги (количество + сумма)
 */
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const summaryCount = document.getElementById('summaryCount');
    const summaryTotal = document.getElementById('summaryTotal');

    if (!cartItems) return;  // Если нет контейнера — выходим

    // ───────── ПУСТАЯ КОРЗИНА ─────────
    if (cart.length === 0) {
        if (cartEmptyState) cartEmptyState.style.display = 'block';
        if (cartItemsContainer) cartItemsContainer.classList.add('hidden');
        if (summaryCount) summaryCount.textContent = '0';
        if (summaryTotal) summaryTotal.textContent = '0 ₽';
        return;
    }

    // ───────── ЕСТЬ ТОВАРЫ ─────────
    if (cartEmptyState) cartEmptyState.style.display = 'none';
    if (cartItemsContainer) cartItemsContainer.classList.remove('hidden');

    // Генерируем HTML для каждого товара
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image || '../images/no-image.jpg'}" 
                     alt="${item.name}" 
                     onerror="this.src='https://via.placeholder.com/100x100?text=Нет+фото'">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-article">Артикул: ${item.article || '---'}</p>
                <div class="cart-item-price">
                    ${(item.price * (item.quantity || 1)).toLocaleString('ru-RU')} ₽
                </div>
            </div>
            <!-- Кнопки изменения количества -->
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="changeQuantity(${index}, -1)">−</button>
                <span class="qty-value">${item.quantity || 1}</span>
                <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <!-- Кнопка удаления -->
            <button class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
        </div>
    `).join('');

    // Считаем и отображаем итоги
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    if (summaryCount) summaryCount.textContent = totalItems;
    if (summaryTotal) summaryTotal.textContent = `${totalPrice.toLocaleString('ru-RU')} ₽`;
}

/**
 * 🛒 ОФОРМИТЬ заказ через модальное окно (альтернатива submitOrder)
 * Используется если корзина — модальное окно, а не отдельная страница
 */
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        showCustomAlert('❌ Корзина пуста!');
        return;
    }

    const orderData = {
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toLocaleString('ru-RU')
    };

    const subject = `Новый заказ на сумму ${orderData.total} ₽`;
    const body = `
НОВЫЙ ЗАКАЗ
================================
Дата: ${orderData.date}
Товары:
${orderData.items.map(item => `• ${item.name} — ${item.price} ₽`).join('\n')}
Итого: ${orderData.total} ₽
    `.trim();

    window.location.href = `mailto:zakaz@schastie.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Очищаем корзину
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    closeCart();
    showCustomAlert('✅ Заказ оформлен! Менеджер свяжется с вами.');
}
//
// /* ===================================================== */
// /* 🔔 КАСТОМНЫЙ ALERT (в стиле бренда) */
// /* ===================================================== */
//
// /**
//  * 🟢 ПОКАЗАТЬ кастомное уведомление вместо стандартного alert()
//  * @param {string} message - Текст сообщения
//  *
//  * Использует модальное окно #customAlert с дизайном бренда
//  */
// function showCustomAlert(message) {
//     const customAlert = document.getElementById('customAlert');
//     const alertMessage = document.getElementById('alertMessage');
//
//     if (customAlert && alertMessage) {
//         alertMessage.textContent = message;
//         customAlert.style.display = 'block';
//         document.body.style.overflow = 'hidden';  // Блокируем скролл
//     } else {
//         // Фоллбэк на стандартный alert если что-то пошло не так
//         window.alert(message);
//     }
// }
//
// /**
//  * 🔴 СКРЫТЬ кастомное уведомление
//  */
// function hideCustomAlert() {
//     const alert = document.getElementById('customAlert');
//     if (alert) {
//         alert.style.display = 'none';
//         document.body.style.overflow = '';  // Разблокируем скролл
//     }
// }
//
// // Закрытие модальных окон по клавише Escape
// document.addEventListener('keydown', function(e) {
//     if (e.key === 'Escape') {
//         closeCart();
//         hideCustomAlert();
//     }
// });
//
// // Инициализация при загрузке страницы
// document.addEventListener('DOMContentLoaded', function() {
//     updateCartCount();  // Обновляем счётчик в хедере
//
//     // Если на странице есть контейнер корзины — отображаем товары
//     if (document.getElementById('cartItems')) {
//         renderCart();
//     }
// });
//

/* ═══════════════════════════════════════════════════ */
/* ОТЛАДКА ССЫЛОК В МЕНЮ */
/* ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a[href]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('🔗 Клик по ссылке:', href);

            // Если ссылка ведёт на .html файл
            if (href && href.endsWith('.html')) {
                // Проверяем существует ли файл (для file:// протокола)
                console.log('📁 Переход на:', href);
            }
        });
    });
});

console.log('✅ Отладка ссылок активирована');


/* ═══════════════════════════════════════════════════ */
/* FAQ АККОРДЕОН (ДЛЯ СТРАНИЦЫ ДОСТАВКА) */
/* ═══════════════════════════════════════════════════ */

function toggleFaq(button) {
    const item = button.parentElement;
    const answer = button.nextElementSibling;

    // Toggle active class
    item.classList.toggle('active');

    // Toggle answer visibility
    if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.style.maxHeight = '0';
    }

    // Close other items (чтобы только один вопрос был открыт)
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
    });
}

console.log('✅ FAQ аккордеон активирован');

/* ═══════════════════════════════════════════════════ */
/* 3D КАРУСЕЛЬ ПРОЕКТОВ — ИСПРАВЛЕННАЯ РЕАЛИЗОВАННЫЕ ПРОЕКТЫ*/
/* ═══════════════════════════════════════════════════ */

let currentSlide = 0;
let autoScrollInterval;
let isAnimating = false; // ✅ ФЛАГ для защиты от быстрого переключения

// Инициализация карусели
function initProjectsCarousel() {
    const slides = document.querySelectorAll('.slider-item');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Функция обновления позиций слайдов
    function updateSlides() {
        slides.forEach((slide, index) => {
            // Удаляем все классы
            slide.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

            // Вычисляем позицию относительно текущего слайда
            let position = index - currentSlide;

            // Нормализуем для бесконечной прокрутки
            if (position < -2) position += totalSlides;
            if (position > 2) position -= totalSlides;

            // Назначаем классы в зависимости от позиции
            if (position === 0) {
                slide.classList.add('active');
            } else if (position === -1 || position === totalSlides - 1) {
                slide.classList.add('prev');
            } else if (position === 1 || position === -totalSlides + 1) {
                slide.classList.add('next');
            } else if (position < 0) {
                slide.classList.add('far-prev');
            } else {
                slide.classList.add('far-next');
            }
        });
    }

    // Функция переключения слайдов
    function moveSlide(direction) {
        // ✅ ЗАЩИТА ОТ БЫСТРОГО ПЕРЕКЛЮЧЕНИЯ
        if (isAnimating) return;
        isAnimating = true;

        currentSlide += direction;

        // Зацикливание
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        updateSlides();

        // ✅ СБРОС ФЛАГА после завершения анимации
        setTimeout(() => {
            isAnimating = false;
        }, 600); // Время должно совпадать с transition в CSS (0.6s)
    }

    // Автопрокрутка
    function startAutoScroll() {
        // Очищаем старый интервал если есть
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }

        autoScrollInterval = setInterval(() => {
            moveSlide(1);
        }, 4000); // Меняем каждые 4 секунды
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }

    // Инициализация
    updateSlides();
    startAutoScroll();

    // Останавливаем автопрокрутку при наведении на карусель
    const sliderWrapper = document.querySelector('.projects-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopAutoScroll);
        sliderWrapper.addEventListener('mouseleave', startAutoScroll);
    }

    // Стрелки навигации
    const prevArrow = document.querySelector('.slider-arrow-prev');
    const nextArrow = document.querySelector('.slider-arrow-next');

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            stopAutoScroll();
            moveSlide(-1);
            setTimeout(startAutoScroll, 6000);
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            stopAutoScroll();
            moveSlide(1);
            setTimeout(startAutoScroll, 6000);
        });
    }

    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoScroll();
            moveSlide(-1);
            setTimeout(startAutoScroll, 6000);
        } else if (e.key === 'ArrowRight') {
            stopAutoScroll();
            moveSlide(1);
            setTimeout(startAutoScroll, 6000);
        }
    });

    // Свайпы на мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoScroll();
        }, {passive: true});

        sliderWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                moveSlide(1); // Свайп влево - следующий слайд
            } else {
                moveSlide(-1); // Свайп вправо - предыдущий слайд
            }
        }

        setTimeout(startAutoScroll, 6000);
    }

    // Делаем moveSlide глобальной для onclick в HTML
    window.moveSlide = moveSlide;

    console.log('✅ 3D карусель проектов активирована');
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', initProjectsCarousel);


//
// /* ═══════════════════════════════════════════════════ */
// /* КАТЕГОРИИ: КАРУСЕЛЬ "ЛУЧШИЕ ТОВАРЫ" — FADE + SCALE */
// /* ═══════════════════════════════════════════════════ */
//
// // Ждём полной загрузки страницы
// document.addEventListener('DOMContentLoaded', function () {              // событие: DOM готов
//
//     // Проверяем, есть ли слайдер на странице
//     if (document.querySelector('.catalog-slider')) {                    // если найден элемент .catalog-slider
//
//         // Инициализация Swiper
//         const catalogSlider = new Swiper('.catalog-slider', {           // создаём новый экземпляр Swiper
//
//             // === БАЗОВЫЕ НАСТРОЙКИ ===
//             slidesPerView: 'auto',                                      // авто-ширина слайдов (по контенту)
//             spaceBetween: 2,                                           // ✅ МИНИМАЛЬНЫЙ отступ 10px (было 20-40px)
//             centeredSlides: false,                                       // активный слайд по центру
//             loop: true,                                                 // бесконечная прокрутка
//             speed: 700,                                                 // скорость анимации: 700мс (плавнее)
//             initialSlide: 0,
//             // === АВТОПРОКРУТКА ===
//             autoplay: {                                                 // настройки автопрокрутки
//                 delay: 3500,                                            // задержка: 3.5 секунды между слайдами
//                 disableOnInteraction: false,                            // не отключать после свайпа пользователем
//                 pauseOnMouseEnter: true,                                // пауза при наведении мыши
//             },
//
//             // === ЭФФЕКТ — ✅ СМЕНИЛИ НА SLIDE (лучше контролирует отступы) ===
//             effect: 'slide',                 // ✅ обычный слайд (вместо fade)
//
//             // === НАВИГАЦИЯ — УДАЛЕНО ===
//             // navigation: { ... } — удалено
//
//             // === НАВИГАЦИЯ (СТРЕЛКИ) — ✅ УДАЛЕНО ===
//             // navigation: { ... } — удалено, так как стрелки не нужны
//
//             // === ПАГИНАЦИЯ (ТОЧКИ) — ✅ УДАЛЕНО, НЕ НУЖНА ===
//             // pagination: { ... } — удалено, так как точки не используются
//
//             // === АДАПТИВНЫЕ БРЕЙКПОИНТЫ ===
//             breakpoints: {                                              // настройки для разных экранов
//
//                 // Мобильный маленький (< 640px)
//                 320: {                                                  // брейкпоинт: 320px
//                     slidesPerView: 1.2,                                 // показывать 1.5 слайда (видно край следующего)
//                     spaceBetween: 0,                                    // ✅ МИНИМАЛЬНЫЙ отступ 5px
//                     centeredSlides: false,                              // не центрировать на очень маленьких
//                 },
//
//                 375: {
//                     slidesPerView: 1.3,
//                     spaceBetween: 0,
//                     centeredSlides: false,  // ✅ ИЗМЕНИТЕ: было true, стало false
//                 },
//
//                 640: {
//                     slidesPerView: 2.2,
//                     spaceBetween: 1,
//                     centeredSlides: false,  // ✅ ИЗМЕНИТЕ: было true, стало false
//                 },
//
//                 // Планшет маленький (< 968px)
//                 768: {                                                  // брейкпоинт: 768px
//                     slidesPerView: 2.5,                                 // показывать 2.5 слайда
//                     spaceBetween: 1.5,                                    // ✅ маленький отступ 8px
//                     centeredSlides: false,                               // центрировать активный слайд
//                 },
//
//                 // Десктоп (> 1200px)
//                 1200: {                                                 // брейкпоинт: 1200px
//                     slidesPerView: 'auto',                              // авто-ширина (как в базе)
//                     spaceBetween: 2,                                   // ✅ маленький отступ 10px
//                     centeredSlides: false,                             // ✅ ИЗМЕНИТЕ: было true, стало false
//                 },
//             },
//         });
//
//         // Логируем успешный запуск в консоль
//         console.log('✅ Карусель "Лучшие товары" (Fade + Scale) запущена'); // сообщение в консоль разработчика
//     }
// });


/* ═══════════════════════════════════════════════════ */
/* КАТЕГОРИИ: КАРУСЕЛЬ "ЛУЧШИЕ ТОВАРЫ" — НАСТРОЙКИ SWIPER */
/* ═══════════════════════════════════════════════════ */

// Ждём полной загрузки страницы
document.addEventListener('DOMContentLoaded', function () {

    // Проверяем, есть ли слайдер на странице
    if (document.querySelector('.catalog-slider')) {

        // Инициализация Swiper
        const catalogSlider = new Swiper('.catalog-slider', {

            // === БАЗОВЫЕ НАСТРОЙКИ ===
            slidesPerView: 'auto',   /* Авто-ширина слайдов */
            spaceBetween: 5,         /* ✅ Отступ между слайдами 5px */
            centeredSlides: false,   /* ✅ Слайды начинаются СЛЕВА (не по центру) */
            loop: true,              /* Бесконечная прокрутка */
            speed: 700,              /* Скорость анимации: 700мс */
            initialSlide: 0,         /* ✅ Начинать с первого слайда (индекс 0) */

            // === АВТОПРОКРУТКА ===
            autoplay: {
                delay: 3500,         /* Задержка: 3.5 секунды */
                disableOnInteraction: false, /* Не отключать после свайпа */
                pauseOnMouseEnter: true,     /* Пауза при наведении */
            },

            // === ЭФФЕКТ ===
            effect: 'slide',         /* Обычный слайд (не fade) */

            // === АДАПТИВНЫЕ БРЕЙКПОИНТЫ ===
            breakpoints: {

                // Мобильный очень маленький (< 375px)
                320: {
                    slidesPerView: 1.3,  /* Показывать 1.3 слайда */
                    spaceBetween: 2,     /* ✅ Отступ 2px */
                    centeredSlides: false, /* ✅ Слева */
                },

                // Мобильный (375px - iPhone 11 и подобные)
                375: {
                    slidesPerView: 1.5,  /* Показывать 1.5 слайда */
                    spaceBetween: 3,     /* ✅ Отступ 3px */
                    centeredSlides: false, /* ✅ Слева */
                },

                // Мобильный маленький (< 640px)
                640: {
                    slidesPerView: 2.3,  /* Показывать 2.3 слайда */
                    spaceBetween: 4,     /* ✅ Отступ 4px */
                    centeredSlides: false, /* ✅ Слева */
                },

                // Планшет маленький (< 968px)
                768: {
                    slidesPerView: 3,    /* Показывать 3 слайда */
                    spaceBetween: 5,     /* ✅ Отступ 5px */
                    centeredSlides: false, /* ✅ Слева */
                },

                // Десктоп (> 1200px)
                1200: {
                    slidesPerView: 'auto', /* Авто-ширина */
                    spaceBetween: 5,       /* ✅ Отступ 5px */
                    centeredSlides: false, /* ✅ Слева */
                },
            },
        });

        // Логируем успешный запуск
        console.log('✅ Карусель "Лучшие товары" запущена');
    }
});

/* ═══════════════════════════════════════════════════ */
/* ТАЧ-ОТКЛИК ДЛЯ КАРТОЧЕК */
/* ═══════════════════════════════════════════════════ */

// Находим все карточки категорий
document.querySelectorAll('.category-card').forEach(card => {

    // При начале касания (палец на экране)
    card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)'; /* Чуть уменьшаем (эффект нажатия) */
    }, { passive: true });

    // При окончании касания (палец убран)
    card.addEventListener('touchend', function() {
        this.style.transform = ''; /* Возвращаем исходный размер */
    }, { passive: true });

    // Клик по карточке
    card.addEventListener('click', function(e) {
        // Проверяем, существует ли функция модального окна
        if (typeof openStubModal === 'function') {
            e.preventDefault(); /* Предотвращаем стандартный переход */
            openStubModal('Каталог'); /* Открываем модальное окно */
        }
    });
});
/* ═══════════════════════════════════════════════════ */
/* ✅ УЛУЧШЕНИЕ: ТАЧ-ОТКЛИК ДЛЯ КАРТОЧЕК */
/* ═══════════════════════════════════════════════════ */

// Находим все карточки категорий
document.querySelectorAll('.category-card').forEach(card => {          // перебираем каждую карточку

    // === ТАЧ-ОТКЛИК (визуальная обратная связь на мобильных) ===

    // При начале касания (палец на экране)
    card.addEventListener('touchstart', function() {                   // событие: начало касания
        this.style.transform = 'scale(0.98)';                          // чуть уменьшаем карточку (эффект нажатия)
    }, { passive: true });                                             // опция: не блокировать скролл

    // При окончании касания (палец убран)
    card.addEventListener('touchend', function() {                     // событие: конец касания
        this.style.transform = '';                                     // возвращаем исходный размер
    }, { passive: true });                                             // опция: не блокировать скролл

    // === КЛИК ПО КАРТОЧКЕ (дублирующая защита) ===
    // Примечание: в HTML уже есть <a onclick="openStubModal()">,
    // этот обработчик — дополнительная гарантия, если ссылка не сработает

    card.addEventListener('click', function(e) {                       // событие: клик по карточке
        // Проверяем, существует ли функция модального окна
        if (typeof openStubModal === 'function') {                     // если функция openStubModal определена
            e.preventDefault();                                        // предотвращаем стандартный переход по ссылке
            openStubModal('Каталог');                                  // открываем модальное окно "Каталог"
        }
        // Если функции нет — сработает стандартный переход по <a href="catalog.html">
    });
});


// /* ===================================================== */
// /*  (МОДАЛЬНЫЕ ОКНА) -  */
// /* ===================================================== */
// Открытие модального окна заявки
function openRequestModal() {
    const modal = document.getElementById('requestModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие модального окна заявки
function closeRequestModal() {
    const modal = document.getElementById('requestModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRequestModal();
    }
});


