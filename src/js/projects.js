import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener("DOMContentLoaded", function () {
    const swiperContainer = document.querySelector(".swiper-container");
    const prevButton = document.querySelector(".swiper-button-prev");
    const nextButton = document.querySelector(".swiper-button-next");

    if (!swiperContainer || !prevButton || !nextButton) {
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
                moveNavigationButtons(); // Перемещаем кнопки вниз
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

        navigationContainer.appendChild(prevButton);
        navigationContainer.appendChild(nextButton);
    }

    // Добавляем стили прямо в <head>
    const style = document.createElement("style");
    style.innerHTML = `
        .swiper-navigation {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            margin-top: 32px;
        }

        .swiper-button-prev,
        .swiper-button-next {
            position: static !important;
            width: 68px;
            height: 68px;
            border-radius: 50%;
            border: 2px solid rgba(250, 250, 250, 0.5);
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .swiper-button-prev.disabled,
        .swiper-button-next.disabled {
            border: 2px solid rgba(250, 250, 250, 0.2);
            opacity: 0.5;
            cursor: not-allowed;
        }

        .swiper-button-prev svg,
        .swiper-button-next svg {
            width: 32px;
            height: 32px;
            fill: none;
            stroke: rgba(250, 250, 250, 0.8);
            stroke-width: 2;
        }

        .swiper-button-prev:hover:not(.disabled),
        .swiper-button-next:hover:not(.disabled) {
            opacity: 1;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
});


  