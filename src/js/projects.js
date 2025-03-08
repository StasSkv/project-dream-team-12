document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".container", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      on: {
        slideChange: function () {
          document.querySelector(".swiper-button-prev").disabled = this.isBeginning;
          document.querySelector(".swiper-button-next").disabled = this.isEnd;
        }
      }
    });
  });
  