const refs = {
  menu: document.querySelector('.header-menu'),
  nav: document.querySelector('.header-menu-nav'),
  burger: document.querySelector('.header-burger-wrap'),
  modal: document.querySelector('.header-modal'),
  modalNavList: document.querySelector('.header-modal-menu-list'),
};

document.addEventListener('click', menuControl);

function menuControl(event) {
  if (
    refs.menu.contains(event.target) &&
    !refs.nav.classList.contains('is-visible')
  ) {
    refs.nav.classList.add('is-visible');
  } else {
    refs.nav.classList.remove('is-visible');
  }
}

// ========MOBILE MENU=========
refs.burger.addEventListener('click', openModalMenu);
function openModalMenu() {
  refs.modal.classList.add('modal-is-visible');
  document.body.classList.add('no-scroll');
}

refs.modal.addEventListener('click', closeModalMenu);
function closeModalMenu(event) {
  if (
    event.target.closest('.header-modal-svg') ||
    event.target.closest('.header-modal-menu-item') ||
    event.target.closest('.header-modal-link')
  ) {
    refs.modal.classList.remove('modal-is-visible');
    document.body.classList.remove('no-scroll');
  }
}

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    refs.modal.classList.contains('modal-is-visible')
  ) {
    refs.modal.classList.remove('modal-is-visible');
    document.body.classList.remove('no-scroll');
  }
});
