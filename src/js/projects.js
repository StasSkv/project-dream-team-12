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

    // Удаляем стандартные стили Swiper для кнопок
    prevButton.classList.add("custom-swiper-button");
    nextButton.classList.add("custom-swiper-button");

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

        // Проверяем, если кнопки уже внутри контейнера, не добавляем их повторно
        if (!navigationContainer.contains(prevButton)) {
            navigationContainer.appendChild(prevButton);
        }
        if (!navigationContainer.contains(nextButton)) {
            navigationContainer.appendChild(nextButton);
        }

        function updateButtonSpacing() {
            if (window.innerWidth > 767) {
                prevButton.style.marginRight = "10px";
                nextButton.style.marginLeft = "10px";
            } else {
                prevButton.style.marginRight = "6px";
                nextButton.style.marginLeft = "6px";
            }
        }

        // Устанавливаем начальные значения
        updateButtonSpacing();
        
        // Добавляем обработчик изменения размера окна
        window.addEventListener("resize", updateButtonSpacing);
    }

    // Применяем transform: scaleX(1.2) к кнопкам
    prevButton.style.transform = "scaleX(1.2)";
    nextButton.style.transform = "scaleX(1.2)";
});


