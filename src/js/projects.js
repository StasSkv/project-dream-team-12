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

    // Удаляем встроенные кнопки Swiper из DOM
    const defaultPrev = document.querySelector(".swiper-button-prev");
    const defaultNext = document.querySelector(".swiper-button-next");
    if (defaultPrev) defaultPrev.remove();
    if (defaultNext) defaultNext.remove();

    // Перемещаем кастомные кнопки под карусель
    const swiperContainer = document.querySelector(".swiper-container");
    const navigationContainer = document.querySelector(".swiper-navigation");

    if (swiperContainer && navigationContainer) {
        swiperContainer.insertAdjacentElement("afterend", navigationContainer);
    }

    // Принудительно загружаем спрайт и проверяем SVG
    setTimeout(() => {
        const prevButton = document.querySelector(".swiper-button-prev");
        const nextButton = document.querySelector(".swiper-button-next");

        if (prevButton && nextButton) {
            prevButton.style.display = "flex";
            nextButton.style.display = "flex";
        }

        // Проверяем, загружается ли спрайт
        const svgTest = document.createElement("img");
        svgTest.src = "sprite.svg";
        svgTest.onerror = () => console.error("Ошибка загрузки спрайта");
        svgTest.onload = () => console.log("Спрайт загружен успешно");
        document.body.appendChild(svgTest);
    }, 500);
});

  