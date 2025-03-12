import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let isModalOpen = false;

function showModal(message) {
  if (isModalOpen) return;

  const modal = basicLightbox.create(
    `
      <button class="modal-close">&times;</button>
      <p id="modal-title">Thank you for your interest in cooperation!</p>
      <p id="modal-text">The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.</p>
    `,
    {
      onShow: instance => {
        isModalOpen = true;
        const closeButton = instance.element().querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
          instance.close();
          isModalOpen = false;
        });
      },
      onClose: () => {
        isModalOpen = false;
      },
    }
  );

  modal.show();
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#contact-form');
  const emailInput = form.querySelector('input[name="email"]');
  const commentInput = form.querySelector('textarea[name="comment"]');

  // Функция сохранения в localStorage при вводе
  function saveToLocalStorage() {
    localStorage.setItem('email', emailInput.value.trim());
    localStorage.setItem('comment', commentInput.value.trim());
  }

  // Восстанавливаем данные из localStorage при загрузке страницы
  emailInput.value = localStorage.getItem('email') || '';
  commentInput.value = localStorage.getItem('comment') || '';

  // Добавляем обработчики ввода для сохранения данных в localStorage
  emailInput.addEventListener('input', saveToLocalStorage);
  commentInput.addEventListener('input', saveToLocalStorage);

  // Обработчик отправки формы
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();

    if (!email || !comment) {
      console.error('Email або коментар не заповнені!');
      showModal('Пожалуйста, заповніть обидва поля — Email та коментар.');
      return;
    }

    // Создаем объект для отправки
    const requestData = { email, comment };

    // Отправка запроса через fetch
    fetch('https://portfolio-js.b.goit.study/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Успех:', data);
        showModal(data.message);
        form.reset();
        localStorage.removeItem('email');
        localStorage.removeItem('comment');
      })
      .catch(error => {
        console.error('Ошибка:', error.message);
        showModal('Упс! Щось пішло не так. Перевірте введені дані.');
      });
  });
});
