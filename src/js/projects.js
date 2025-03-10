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

    // ✅ Инициализируем Swiper
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1, // ✅ Только 1 карточка за раз
        spaceBetween: 0, // ✅ Без отступов на мобиле
        loop: false, // ✅ Отключаем зацикливание
        centeredSlides: true, // ✅ Центрируем слайды
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
                spaceBetween: 32, // ✅ Отступы на планшете
            },
            1440: {
                slidesPerView: 1,
                spaceBetween: 32, // ✅ Отступы на десктопе
            }
        },
        on: {
            init: function (swiper) {
                moveNavigationButtons(); // ✅ Перемещаем кнопки под карусель
                updateNavigationButtons(swiper);
                updateSlideLayout();
                updateSlideVisibility(swiper);
            },
            slideChange: function (swiper) {
                updateNavigationButtons(swiper);
                updateSlideVisibility(swiper);
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

        // ✅ Центрируем кнопки под каруселью
        navigationContainer.style.display = "flex";
        navigationContainer.style.justifyContent = "center";
        navigationContainer.style.alignItems = "center";
        navigationContainer.style.position = "relative";

        // ✅ Добавляем отступы в зависимости от экрана
        function updateButtonSpacing() {
            if (window.innerWidth >= 768) {
                navigationContainer.style.marginTop = "64px"; // ✅ Отступ на планшете и десктопе
            } else {
                navigationContainer.style.marginTop = "32px"; // ✅ Отступ на мобиле
            }
        }

        updateButtonSpacing(); // ✅ Устанавливаем изначальное значение
        window.addEventListener("resize", updateButtonSpacing); // ✅ Обновляем при изменении размера окна

        if (!navigationContainer.contains(prevButton)) {
            navigationContainer.appendChild(prevButton);
        }
        if (!navigationContainer.contains(nextButton)) {
            navigationContainer.appendChild(nextButton);
        }
    }

    // ✅ Центрируем карточку + добавляем отступы
    function updateSlideLayout() {
        swiperContainer.style.overflow = "hidden"; // ✅ Прячем след. карточку

        if (window.innerWidth >= 768) {
            swiperWrapper.style.padding = "0 32px"; // ✅ Отступы на планшете и десктопе
        } else {
            swiperWrapper.style.padding = "0"; // ✅ Без отступов на мобиле
        }

        const slides = document.querySelectorAll(".swiper-slide");
        if (window.innerWidth >= 1440) {
            slides.forEach(slide => {
                slide.style.display = "flex";
                slide.style.flexDirection = "row";
                slide.style.width = "1376px"; // ✅ Десктопная ширина
                slide.style.height = "813px"; // ✅ Десктопная высота
                slide.style.alignItems = "stretch";
                slide.style.justifyContent = "center"; // ✅ Центрируем карточку
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

    // ✅ Скрываем все карточки, кроме активной
    function updateSlideVisibility(swiper) {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
                slide.style.display = "flex"; // ✅ Показываем активный слайд
            } else {
                slide.style.display = "none"; // ✅ Остальные скрываем
            }
        });
    }

    // ✅ Вызываем обновление разметки при изменении размера экрана
    window.addEventListener("resize", updateSlideLayout);

    // ✅ Проверяем, что Swiper запущен
    console.log("✅ Swiper инициализирован:", swiper);
});










