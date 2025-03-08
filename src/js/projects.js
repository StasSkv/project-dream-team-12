document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 10,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
        },
        navigation: false, // Отключаем встроенные кнопки Swiper

        on: {
            slideChange: function () {
                document.querySelector(".swiper-button-prev").disabled = this.isBeginning;
                document.querySelector(".swiper-button-next").disabled = this.isEnd;
            }
        }
    });

    // Убираем точки пагинации (если есть)
    const paginationContainer = document.querySelector(".swiper-pagination");
    if (paginationContainer) {
        paginationContainer.remove();
    }

    // Перемещаем кнопки под карусель
    const swiperContainer = document.querySelector(".swiper-container");
    const navigationContainer = document.querySelector(".swiper-navigation");

    if (swiperContainer && navigationContainer) {
        swiperContainer.insertAdjacentElement("afterend", navigationContainer);
    }

    // Показываем кастомные стрелки
    setTimeout(() => {
        const prevButton = document.querySelector(".swiper-button-prev");
        const nextButton = document.querySelector(".swiper-button-next");

        if (prevButton && nextButton) {
            prevButton.style.display = "flex";
            nextButton.style.display = "flex";
        }
    }, 500);
});

  