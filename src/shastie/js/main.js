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
            spaceBetween: 15,           // Отступ между слайдами 15px
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
        console.log('✅ Слайдер инициализирован!');
    } else {
        console.error('❌ Swiper не загрузился!');
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

/* ===================================================== */
/* 📋 МОДАЛЬНОЕ ОКНО БРИФА */
/* ===================================================== */
(function() {
    'use strict';  // Строгий режим: предотвращает случайные ошибки

    /**
     * 🟢 ОТКРЫТЬ модальное окно брифа
     * Вызывается по клику на кнопку "Заполнить бриф"
     */
    window.openBriefModal = function() {
        try {
            const modal = document.getElementById('briefModal');
            if (modal) {
                modal.style.display = 'block';           // Показываем модальное окно
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
            }
        } catch (error) {
            console.error('❌ Ошибка в openBriefModal:', error);
        }
    };

    /**
     * 🔴 ЗАКРЫТЬ модальное окно брифа
     * Вызывается по клику на крестик, оверлей или клавишу Escape
     */
    window.closeBriefModal = function() {
        try {
            const modal = document.getElementById('briefModal');
            if (modal) {
                modal.style.display = 'none';            // Скрываем окно
                document.body.style.overflow = '';       // Разблокируем прокрутку

                // Очищаем форму
                const form = modal.querySelector('.brief-form');
                if (form) form.reset();

                // Сбрасываем имя файла
                const fileName = document.getElementById('fileName');
                if (fileName) {
                    fileName.textContent = 'Файл не выбран';
                    fileName.style.color = '#666666';
                    fileName.style.fontWeight = '400';
                }
            }
        } catch (error) {
            console.error('❌ Ошибка в closeBriefModal:', error);
        }
    };

    /**
     * 📤 ОТПРАВИТЬ форму брифа
     * Формирует письмо и открывает почтовый клиент
     * @param {Event} event - Событие отправки формы
     */
    window.submitBrief = function(event) {
        try {
            event.preventDefault();  // Отменяем стандартную отправку формы

            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);  // Конвертируем в объект

            // Формируем тему и тело письма
            const subject = `Новый бриф от ${data['contact-person'] || 'Клиента'}`;
            const body = `
НОВЫЙ БРИФ НА РАЗРАБОТКУ МЕРЧА
================================
📋 КОНТАКТНАЯ ИНФОРМАЦИЯ:
• Контактное лицо: ${data['contact-person'] || 'Не указано'}
• Телефон: ${data['phone'] || 'Не указан'}
• Email: ${data['email'] || 'Не указан'}
• Организация: ${data['organization'] || 'Не указана'}
📊 О КОМПАНИИ:
• Чем занимается: ${data['company-info'] || 'Не указано'}
• Корпоративные цвета: ${data['colors'] || 'Не указаны'}
• Целевая аудитория: ${data['audience'] || 'Не указана'}
🎯 ДЕТАЛИ:
• Тираж: ${data['quantity'] || 'Не указан'}
• Сроки: ${data['deadline'] || 'Не указаны'}
            `.trim();

            // Очищаем форму и имя файла
            form.reset();
            const fileName = document.getElementById('fileName');
            if (fileName) {
                fileName.textContent = 'Файл не выбран';
                fileName.style.color = '#666666';
                fileName.style.fontWeight = '400';
            }

            // Закрываем модальное окно
            window.closeBriefModal();

            // Открываем почтовый клиент с подготовленным письмом
            window.location.href = `mailto:karankevitch.tat@yndex.by?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Показываем уведомление с небольшой задержкой
            setTimeout(function() {
                showCustomAlert('Ваш бриф принят. Открывается почтовый клиент для отправки.');
            }, 300);

        } catch (error) {
            console.error('❌ Ошибка в submitBrief:', error);
            showCustomAlert('❌ Произошла ошибка. Попробуйте позже.');
        }
    };

    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') window.closeBriefModal();
    });

    // Отображение имени выбранного файла
    document.addEventListener('DOMContentLoaded', function() {
        const fileInput = document.getElementById('brandbookFile');
        const fileName = document.getElementById('fileName');
        if (fileInput && fileName) {
            fileInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    const fileSize = (file.size / 1024 / 1024).toFixed(2);  // Размер в МБ
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
    });

    // Маска для полей телефона: формат +7 (___) ___-__-__
    document.addEventListener('DOMContentLoaded', function() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(function(input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');  // Удаляем всё кроме цифр

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
    });

    console.log('✅ Скрипт брифа загружен успешно');
})();

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

/* ===================================================== */
/* 🔔 КАСТОМНЫЙ ALERT (в стиле бренда) */
/* ===================================================== */

/**
 * 🟢 ПОКАЗАТЬ кастомное уведомление вместо стандартного alert()
 * @param {string} message - Текст сообщения
 *
 * Использует модальное окно #customAlert с дизайном бренда
 */
function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');

    if (customAlert && alertMessage) {
        alertMessage.textContent = message;
        customAlert.style.display = 'block';
        document.body.style.overflow = 'hidden';  // Блокируем скролл
    } else {
        // Фоллбэк на стандартный alert если что-то пошло не так
        window.alert(message);
    }
}

/**
 * 🔴 СКРЫТЬ кастомное уведомление
 */
function hideCustomAlert() {
    const alert = document.getElementById('customAlert');
    if (alert) {
        alert.style.display = 'none';
        document.body.style.overflow = '';  // Разблокируем скролл
    }
}

// Закрытие модальных окон по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCart();
        hideCustomAlert();
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();  // Обновляем счётчик в хедере

    // Если на странице есть контейнер корзины — отображаем товары
    if (document.getElementById('cartItems')) {
        renderCart();
    }
});


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
/* ЗАГЛУШКИ ДЛЯ КАТАЛОГА И КОРЗИНЫ (ПРОСТОЙ ВАРИАНТ) */
/* ═══════════════════════════════════════════════════ */

// Функция для кнопки "Каталог"
function showCatalogMessage() {
    alert('КАТАЛОГ ТОВАРОВ\n\nРаздел находится в разработке.\nМы готовим для вас огромный выбор товара.\nЗагляните позже!');
}

// Функция для кнопки "Корзина"
function showCartMessage() {
    alert('КОРЗИНА\n\nРаздел находится в разработке.\nМы готовим для вас огромный выбор товара.\nЗагляните позже!');
}

console.log('✅ Простые заглушки каталога и корзины активированы');

