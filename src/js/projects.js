import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener("DOMContentLoaded", function () {
    const swiperContainer = document.querySelector(".swiper-container");
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    const prevButton = document.querySelector(".swiper-button-prev");
    const nextButton = document.querySelector(".swiper-button-next");

    if (!swiperContainer || !swiperWrapper || !prevButton || !nextButton) {
        console.error("Ошибка: Один из элементов Swiper не найден.");
        return;
    }

    // Убираем управление кнопками Swiper
    function removeSwiperControlFromButtons() {
        prevButton.classList.remove("swiper-button-prev", "swiper-button-disabled");
        nextButton.classList.remove("swiper-button-next", "swiper-button-disabled");
        prevButton.removeAttribute("disabled");
        nextButton.removeAttribute("disabled");
    }

    // Функция для обновления состояния кнопок
    function updateNavigationButtons(swiper) {
        if (swiper.isBeginning) {
            prevButton.classList.add("swiper-button-disabled");
            prevButton.setAttribute("disabled", "true");
        } else {
            prevButton.classList.remove("swiper-button-disabled");
            prevButton.removeAttribute("disabled");
        }

        if (swiper.isEnd) {
            nextButton.classList.add("swiper-button-disabled");
            nextButton.setAttribute("disabled", "true");
        } else {
            nextButton.classList.remove("swiper-button-disabled");
            nextButton.removeAttribute("disabled");
        }
    }

    // Функция для обновления макета слайдов
    function updateSlideLayout() {
        swiperContainer.style.overflow = "hidden";
        const slides = document.querySelectorAll(".swiper-slide");

        slides.forEach(slide => {
            slide.style.display = "flex";
            slide.style.width = "100%";
            slide.style.height = "auto";
            slide.style.flexDirection = "column";
            slide.style.alignItems = "center";
            slide.style.justifyContent = "center";
        });
    }

    // Устанавливаем позиционирование кнопок
    function fixButtonPosition(button) {
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.position = "relative";
        button.style.borderRadius = "60px";
        button.style.backgroundColor = "transparent"; // Фон кнопки прозрачный

        if (window.innerWidth >= 768) {
            button.style.border = "1px solid rgba(250, 250, 250, 0.2)";
            button.style.padding = "18px";
            button.style.width = "68px";
            button.style.height = "68px";
        } else {
            button.style.width = "52px";
            button.style.height = "52px";
        }

        const svg = button.querySelector("svg");
        if (svg) {
            svg.style.position = "absolute";
            svg.style.top = "50%";
            svg.style.left = "50%";
            svg.style.transform = "translate(-50%, -50%)";
            svg.style.width = "32px";
            svg.style.height = "32px";
        }
    }

    fixButtonPosition(prevButton);
    fixButtonPosition(nextButton);

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".button-class").forEach(fixButtonPosition);
    });

    window.addEventListener("resize", () => {
        document.querySelectorAll(".button-class").forEach(fixButtonPosition);
    });

    // Инициализация Swiper
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        centeredSlides: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            0: { slidesPerView: "auto", spaceBetween: 20 },
            768: { slidesPerView: 1, spaceBetween: 32 },
            1440: { slidesPerView: 1, spaceBetween: 32 },
        },
        on: {
            init: function (swiper) {
                moveNavigationButtons();
                updateNavigationButtons(swiper); // Обновляем состояние кнопок при инициализации
                updateSlideLayout();
                updateSlideVisibility(swiper);
                removeSwiperControlFromButtons(); // Убираем управление кнопками Swiper
            },
            slideChange: function (swiper) {
                updateNavigationButtons(swiper); // Обновляем состояние кнопок при смене слайда
                updateSlideVisibility(swiper);
                updateArrowColors(swiper); // Обновляем цвет стрелок в зависимости от состояния слайда
            },
            resize: function () {
                updateSlideLayout();
            }
        },
    });

    // Перемещаем кнопки в контейнер
    function moveNavigationButtons() {
        let navigationContainer = document.querySelector(".swiper-navigation-wrapper");

        if (!navigationContainer) {
            navigationContainer = document.createElement("div");
            navigationContainer.classList.add("swiper-navigation-wrapper");
            swiperWrapper.parentNode.insertBefore(navigationContainer, swiperWrapper.nextSibling);
        }

        if (!navigationContainer.contains(prevButton)) {
            navigationContainer.appendChild(prevButton);
        }
        if (!navigationContainer.contains(nextButton)) {
            navigationContainer.appendChild(nextButton);
        }
    }

    // Ручное управление кнопками:
    prevButton.addEventListener("click", function () {
        swiper.slidePrev(); // Переход к предыдущему слайду
    });

    nextButton.addEventListener("click", function () {
        swiper.slideNext(); // Переход к следующему слайду
    });

    // Функция для обновления цвета стрелок в зависимости от слайда
    function updateArrowColors(swiper) {
        const prevSvg = prevButton.querySelector("svg use");
        const nextSvg = nextButton.querySelector("svg use");

        if (swiper.isBeginning) {
            prevSvg.setAttribute("href", "/img/icons.svg#icon-arrow-left"); // Стрелка неактивна, оставляем стандартную
        } else {
            prevSvg.setAttribute("href", "/img/icons.svg#icon-arrow-left"); // Включаем активный цвет для стрелки
        }

        if (swiper.isEnd) {
            nextSvg.setAttribute("href", "/img/icons.svg#icon-arrow-right"); // Стрелка неактивна
        } else {
            nextSvg.setAttribute("href", "/img/icons.svg#icon-arrow-right"); // Стрелка активна
        }
    }

    function updateSlideVisibility(swiper) {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach(slide => {
            slide.style.display = "flex";
        });
    }

    window.addEventListener("resize", updateSlideLayout);

    console.log("✅ Swiper инициализирован:", swiper);
});

