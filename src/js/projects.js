import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
document.addEventListener('DOMContentLoaded', function () {
  const swiperContainer = document.querySelector('.swiper-container');
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const prevButton = document.querySelector('.swiper-button-prev');
  const nextButton = document.querySelector('.swiper-button-next');
  if (!swiperContainer || !swiperWrapper || !prevButton || !nextButton) {
    console.error('Ошибка: Один из элементов Swiper не найден.');
    return;
  }
  function removeSwiperControlFromButtons() {
    prevButton.classList.remove('swiper-button-prev', 'swiper-button-disabled');
    nextButton.classList.remove('swiper-button-next', 'swiper-button-disabled');
    prevButton.removeAttribute('disabled');
    nextButton.removeAttribute('disabled');
  }
  function updateNavigationButtons(swiper) {
    if (swiper.isBeginning) {
      prevButton.classList.add('swiper-button-disabled');
      prevButton.setAttribute('disabled', 'true');
      prevButton.style.opacity = '0.4';
    } else {
      prevButton.classList.remove('swiper-button-disabled');
      prevButton.removeAttribute('disabled');
      prevButton.style.opacity = '1';
    }
    if (swiper.isEnd) {
      nextButton.classList.add('swiper-button-disabled');
      nextButton.setAttribute('disabled', 'true');
      nextButton.style.opacity = '0.4';
    } else {
      nextButton.classList.remove('swiper-button-disabled');
      nextButton.removeAttribute('disabled');
      nextButton.style.opacity = '1';
    }
  }
  function updateSlideLayout() {
    swiperContainer.style.overflow = 'hidden';
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.style.display = 'flex';
      slide.style.width = '100%';
      slide.style.height = 'auto';
      slide.style.flexDirection = 'column';
      slide.style.alignItems = 'center';
      slide.style.justifyContent = 'center';
    });
  }
  function fixButtonPosition(button) {
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.position = 'relative';
    button.style.borderRadius = '60px';
    button.style.backgroundColor = 'transparent';
    if (window.innerWidth >= 768) {
      button.style.border = '1px solid rgba(250, 250, 250, 0.2)';
      button.style.padding = '18px';
      button.style.width = '68px';
      button.style.height = '68px';
    } else {
      button.style.width = '52px';
      button.style.height = '52px';
    }
    const svg = button.querySelector('svg');
    if (svg) {
      svg.style.position = 'absolute';
      svg.style.top = '50%';
      svg.style.left = '50%';
      svg.style.transform = 'translate(-50%, -50%)';
      svg.style.width = '32px';
      svg.style.height = '32px';
    }
  }
  fixButtonPosition(prevButton);
  fixButtonPosition(nextButton);
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    centeredSlides: true,
    keyboard: { enabled: true },
    mousewheel: { enabled: true },
    breakpoints: {
      0: { slidesPerView: 'auto', spaceBetween: 20 },
      768: { slidesPerView: 1, spaceBetween: 32 },
      1440: { slidesPerView: 1, spaceBetween: 32 },
    },
    on: {
      init: function (swiper) {
        moveNavigationButtons();
        updateNavigationButtons(swiper);
        updateSlideLayout();
        updateSlideVisibility(swiper);
        removeSwiperControlFromButtons();
      },
      slideChange: function (swiper) {
        updateNavigationButtons(swiper);
        updateSlideVisibility(swiper);
      },
      resize: function () {
        updateSlideLayout();
      },
    },
  });
  function moveNavigationButtons() {
    let navigationContainer = document.querySelector(
      '.swiper-navigation-wrapper'
    );
    if (!navigationContainer) {
      navigationContainer = document.createElement('div');
      navigationContainer.classList.add('swiper-navigation-wrapper');
      swiperWrapper.parentNode.insertBefore(
        navigationContainer,
        swiperWrapper.nextSibling
      );
    }
    if (!navigationContainer.contains(prevButton)) {
      navigationContainer.appendChild(prevButton);
    }
    if (!navigationContainer.contains(nextButton)) {
      navigationContainer.appendChild(nextButton);
    }
  }
  prevButton.addEventListener('click', function () {
    swiper.slidePrev();
  });
  nextButton.addEventListener('click', function () {
    swiper.slideNext();
  });
  function updateSlideVisibility(swiper) {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.style.display = 'flex';
    });
  }
  window.addEventListener('resize', updateSlideLayout);
});
