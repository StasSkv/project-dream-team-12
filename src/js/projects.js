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

    // ✅ Инициализируем Swiper (только 1 карточка за раз)
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1, // ✅ Только 1 карточка на экране
        spaceBetween: 0, // ✅ Без пробелов между карточками
        loop: false, // ✅ Без зацикливания
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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
                slidesPerView: 1, // ✅ Теперь следующая карточка НЕ видна
                spaceBetween: 0,
            }
        },
        on: {
            init: function (swiper) {
                moveNavigationButtons();
                updateNavigationButtons(swiper);
                updateSlideLayout();
            },
            slideChange: function (swiper) {
                updateNavigationButtons(swiper);
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

    // ✅ Обновление разметки слайдов (чтобы карточки центрировались)
    function updateSlideLayout() {
        const slides = document.querySelectorAll(".swiper-slide");
        if (window.innerWidth >= 1440) {
            slides.forEach(slide => {
                slide.style.display = "flex";
                slide.style.flexDirection = "row";
                slide.style.width = "1376px";
                slide.style.height = "813px"; // ✅ Высота карточек
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

    // ✅ Центрирование карточек и скрытие след. слайдов
    function updateSlideVisibility(swiper) {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
                slide.style.display = "flex"; // ✅ Показываем только активный слайд
            } else {
                slide.style.display = "none"; // ✅ Скрываем остальные
            }
        });
    }

    // ✅ Вызов скрытия карточек при запуске и смене слайда
    swiper.on('init', function () {
        updateSlideVisibility(swiper);
    });
    swiper.on('slideChange', function () {
        updateSlideVisibility(swiper);
    });

    // ✅ Вызов разметки при изменении размера экрана
    window.addEventListener("resize", updateSlideLayout);
});







