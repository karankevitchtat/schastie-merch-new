// /* ===================================================== */
// /* СТРАНИЦА КОНТАКТОВ — ФУНКЦИОНАЛ */
// /* ===================================================== */
//
// document.addEventListener('DOMContentLoaded', function() {
//
//     // Обработка отправки формы
//     const contactForm = document.querySelector('.contact-form');
//
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault(); // Предотвращаем стандартную отправку
//
//             const submitBtn = this.querySelector('.form-submit-btn');
//             const originalText = submitBtn.textContent;
//
//             // Показываем состояние загрузки
//             submitBtn.textContent = 'Отправка...';
//             submitBtn.disabled = true;
//
//             // Собираем данные формы
//             const formData = new FormData(this);
//
//             // Отправляем на Formspree
//             fetch(this.action, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             })
//                 .then(response => {
//                     if (response.ok) {
//                         // Показываем успешное сообщение
//                         showSuccessMessage();
//                         this.reset(); // Очищаем форму
//                     } else {
//                         throw new Error('Ошибка отправки');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Ошибка:', error);
//                     alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
//                 })
//                 .finally(() => {
//                     submitBtn.textContent = originalText;
//                     submitBtn.disabled = false;
//                 });
//         });
//     }
//
//     // Функция показа успешного сообщения
//     function showSuccessMessage() {
//         // Используем существующий custom-alert или создаем новый
//         let alert = document.getElementById('customAlert');
//
//         if (!alert) {
//             // Создаем новый alert если нет
//             alert = document.createElement('div');
//             alert.id = 'customAlert';
//             alert.className = 'custom-alert';
//             alert.innerHTML = `
//                 <div class="custom-alert-overlay" onclick="hideCustomAlert()"></div>
//                 <div class="custom-alert-content">
//                     <div class="alert-icon">
//                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                             <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                             <polyline points="22 4 12 14.01 9 11.01"/>
//                         </svg>
//                     </div>
//                     <h3 class="alert-title">Спасибо!</h3>
//                     <p class="alert-message">Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</p>
//                     <button class="alert-btn" onclick="hideCustomAlert()">Хорошо</button>
//                 </div>
//             `;
//             document.body.appendChild(alert);
//         } else {
//             // Обновляем текст существующего alert
//             document.querySelector('.alert-title').textContent = 'Спасибо!';
//             document.querySelector('.alert-message').textContent = 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
//         }
//
//         // Показываем alert
//         alert.style.display = 'block';
//         document.body.style.overflow = 'hidden';
//     }
//
//     // Закрытие алерта
//     window.hideCustomAlert = function() {
//         const alert = document.getElementById('customAlert');
//         if (alert) {
//             alert.style.display = 'none';
//             document.body.style.overflow = '';
//         }
//     };
//
//     // Закрытие алерта по клику на оверлей
//     const alertOverlay = document.querySelector('.custom-alert-overlay');
//     if (alertOverlay) {
//         alertOverlay.addEventListener('click', hideCustomAlert);
//     }
//
//     // Закрытие алерта по клавише Escape
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape') {
//             hideCustomAlert();
//         }
//     });
//
//     console.log('✅ Страница контактов загружена');
// });