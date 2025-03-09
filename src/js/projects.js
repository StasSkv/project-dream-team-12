document.addEventListener("DOMContentLoaded", function () {
    // Проверяем, есть ли контейнер карусели
    const swiperContainer = document.querySelector(".swiper-container");
    const navigationContainer = document.querySelector(".swiper-navigation");
    const prevButton = document.querySelector(".swiper-button-prev");
    const nextButton = document.querySelector(".swiper-button-next");

    if (!swiperContainer || !navigationContainer || !prevButton || !nextButton) {
        console.error("Ошибка: Один из элементов Swiper не найден.");
        return;
    }

    // Инициализируем Swiper
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
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
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            init: function () {
                updateNavigationButtons(this);
            },
            slideChange: function () {
                updateNavigationButtons(this);
            },
        },
    });

    function updateNavigationButtons(swiper) {
        prevButton.disabled = swiper.isBeginning;
        nextButton.disabled = swiper.isEnd;

        if (swiper.isBeginning) {
            prevButton.classList.add("disabled");
        } else {
            prevButton.classList.remove("disabled");
        }

        if (swiper.isEnd) {
            nextButton.classList.add("disabled");
        } else {
            nextButton.classList.remove("disabled");
        }
    }

    // Перемещаем кастомные кнопки под карусель
    swiperContainer.insertAdjacentElement("afterend", navigationContainer);

    // Принудительно загружаем спрайт и проверяем SVG
    setTimeout(() => {
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

  