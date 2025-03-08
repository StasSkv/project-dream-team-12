document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1, // Карточки должны быть по одной
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 1, // Карточки остаются по одной
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

    // Убедимся, что стрелки появляются под слайдером
    const swiperContainer = document.querySelector(".swiper-container");
    const navigationContainer = document.querySelector(".swiper-navigation");
    const paginationContainer = document.querySelector(".swiper-pagination");

    if (swiperContainer && navigationContainer && paginationContainer) {
        swiperContainer.insertAdjacentElement("afterend", navigationContainer);
    }

    // Проверяем, добавлены ли классы Swiper и показываются ли стрелки
    setTimeout(() => {
        const prevButton = document.querySelector(".swiper-button-prev");
        const nextButton = document.querySelector(".swiper-button-next");

        if (prevButton && nextButton) {
            prevButton.style.display = "flex";
            nextButton.style.display = "flex";
        }
    }, 500);
});

  