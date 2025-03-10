 

import Swiper from 'swiper'; 

 

import 'swiper/css/navigation'; 

 

 

import { Keyboard, Mousewheel, Navigation } from 'swiper/modules'; 

 

const swiperAboutMe = new Swiper('.about-me-swiper', { 

  modules: [Navigation, Keyboard, Mousewheel], 

  navigation: { 

    nextEl: '.about-me-swiper__next', 

  }, 

  mousewheel: { 

    invert: true, 

  }, 

  keyboard: { 

    enabled: true, 

    onlyInViewport: true, 

  }, 

  touch: true, 

  centeredSlides: false, 

    loop: true, 

  speed: 500, 

  spaceBetween: 0, 

  slideToClickedSlide: true, 

  allowTouchMove: true, 

  slideActiveClass: 'current-skill', 

  slidesPerView: 2, 

  breakpoints: { 

    768: { 

      slidesPerView: 3, 

    }, 

    1440: { 

      slidesPerView: 6, 

    }, 

    }, 

 

}); 

 

 

 

import Accordion from 'accordion-js'; 

 

 

new Accordion('.accordion-container', { 

  elementClass: 'about-acc-list', 

  triggerClass: 'show-btn-icon', 

  panelClass: 'ac-panel', 

  showMultiple: true, 

  duration: 800, 

  openOnInit: [0], 

  beforeOpen: el => 

    el.querySelector('button.ac-trigger').setAttribute('aria-expanded', true), 

  beforeClose: el => 

    el.querySelector('button.ac-trigger').setAttribute('aria-expanded', false), 

}); 

 