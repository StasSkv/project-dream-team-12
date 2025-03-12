// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';

// export function showModal(message) {
//   const modal = basicLightbox.create(
//     `
//     <div class="basicLightbox__placeholder">
//       <button class="modal-close">&times;</button>
//       <h2>${message}</h2>
//     </div>
//   `,
//     {
//       onShow: instance => {
//         const closeButton = instance.element().querySelector('.modal-close');
//         closeButton.addEventListener('click', () => instance.close());
//       },
//     }
//   );

//   modal.show();
// }

// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.querySelector('.footer-form');

//   if (!form) {
//     console.error('Форма с id="contact-form" не найдена!');
//     return;
//   }

//   form.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const email = form.querySelector('input[name="email"]').value.trim();
//     const comment = form.querySelector('textarea[name="text"]').value.trim();

//     if (!email || !comment) {
//       console.error('Email или комментарий не заполнены!');
//       showModal('Пожалуйста, заполните оба поля — Email и комментарий.');
//       return;
//     }

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           const data = JSON.parse(xhr.responseText);
//           console.
//       }
//     };

//     const requestData = JSON.stringify({ email, comment });
//     xhr.send(requestData);
//   });
// });
