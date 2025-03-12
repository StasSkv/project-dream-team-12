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
        document.body.classList.add('no-scroll');

        const closeButton = instance.element().querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
          instance.close();
        });
      },
      onClose: () => {
        isModalOpen = false;
        document.body.classList.remove('no-scroll');
      },
    }
  );

  modal.show();
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#contact-form');
  const emailInput = form.querySelector('input[name="email"]');
  const commentInput = form.querySelector('textarea[name="comment"]');
  emailInput.value = localStorage.getItem('email') || '';
  commentInput.value = localStorage.getItem('comment') || '';

  function saveToLocalStorage() {
    localStorage.setItem('email', emailInput.value.trim());
    localStorage.setItem('comment', commentInput.value.trim());
  }

  emailInput.addEventListener('input', saveToLocalStorage);
  commentInput.addEventListener('input', saveToLocalStorage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();

    if (!email || !comment) {
      console.error('Email або коментар не заповнені!');
      showModal('Пожалуйста, заповніть обидва поля — Email та коментар.');
      return;
    }

    const requestData = { email, comment };
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
      })
      .catch(error => {
        console.error('Ошибка:', error.message);
        showModal('Упс! Щось пішло не так. Перевірте введені дані.');
      });
  });
});
