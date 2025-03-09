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

    // Удаляем стандартные стили Swiper для кнопок
    prevButton.classList.add("custom-swiper-button");
    nextButton.classList.add("custom-swiper-button");

    // ✅ Инициализируем Swiper с фиксированным `slidesPerView: 1`
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1, // ✅ Показываем ТОЛЬКО ОДИН слайд, чтобы не было видимого второго
        spaceBetween: 0, // ✅ Убираем лишние отступы между слайдами
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
            1440: {
                slidesPerView: 1, // ✅ Исправлено с `auto` на `1`
                spaceBetween: 40,
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            init: function () {
                moveNavigationButtons();
                updateNavigationButtons(this);
                updateSlideLayout();
            },
            slideChange: function () {
                updateNavigationButtons(this);
            },
            resize: function () {
                updateSlideLayout();
            }
        },
    });

    function updateNavigationButtons(swiper) {
        prevButton.disabled = swiper.isBeginning;
        nextButton.disabled = swiper.isEnd;

        prevButton.classList.toggle("disabled", swiper.isBeginning);
        nextButton.classList.toggle("disabled", swiper.isEnd);
    }

    function moveNavigationButtons() {
        let navigationContainer = document.querySelector(".swiper-navigation");
        if (!navigationContainer) {
            navigationContainer = document.createElement("div");
            navigationContainer.classList.add("swiper-navigation");
            swiperContainer.insertAdjacentElement("afterend", navigationContainer);
        }

        if (!navigationContainer.contains(prevButton)) {
            navigationContainer.appendChild(prevButton);
        }
        if (!navigationContainer.contains(nextButton)) {
            navigationContainer.appendChild(nextButton);
        }
    }

    // ✅ Исправление разметки, чтобы следующий слайд НЕ был виден
    function updateSlideLayout() {
        const slides = document.querySelectorAll(".swiper-slide");
        if (window.innerWidth >= 1440) {
            slides.forEach(slide => {
                slide.style.display = "flex";
                slide.style.flexDirection = "row";
                slide.style.width = "1376px";
                slide.style.height = "813px"; // ✅ Переносим высоту сюда
                slide.style.alignItems = "stretch";
            });
        } else {
            slides.forEach(slide => {
                slide.style.display = "";
                slide.style.flexDirection = "";
                slide.style.width = "";
                slide.style.height = "";
                slide.style.alignItems = "";
            });
        }
    }

    // Вызываем обновление разметки при изменении размера экрана
    window.addEventListener("resize", updateSlideLayout);
});





