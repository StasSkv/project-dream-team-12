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

    // ✅ Центрируем кнопки (круг) и стрелки (svg)
    function fixButtonPosition(button) {
        button.style.display = "flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.position = "relative";
        button.style.borderRadius = "60px";

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

    // ✅ Вызываем функцию при загрузке и изменении размера окна
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".button-class").forEach(fixButtonPosition);
    });

    window.addEventListener("resize", () => {
        document.querySelectorAll(".button-class").forEach(fixButtonPosition);
    });

    // ✅ Инициализируем Swiper
    const swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        centeredSlides: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: { slidesPerView: 1, spaceBetween: 32 },
            1440: { slidesPerView: 1, spaceBetween: 32 }
        },
        on: {
            init: function (swiper) {
                moveNavigationButtons();
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

    // ✅ Перемещаем кнопки навигации и устанавливаем отступ от карточки (32px или 64px)
    function moveNavigationButtons() {
        let navigationContainer = document.querySelector(".swiper-navigation");
        if (!navigationContainer) {
            navigationContainer = document.createElement("div");
            navigationContainer.classList.add("swiper-navigation");
            swiperContainer.insertAdjacentElement("afterend", navigationContainer);
        }

        navigationContainer.style.display = "flex";
        navigationContainer.style.justifyContent = "center";
        navigationContainer.style.alignItems = "center";
        navigationContainer.style.position = "relative";

        // ✅ Добавляем управление отступами кнопок (32px до 768px, 64px после 768px)
        function updateButtonSpacing() {
            if (window.innerWidth >= 768) {
                navigationContainer.style.marginTop = "64px"; // Отступ 64px при ширине 768+
            } else {
                navigationContainer.style.marginTop = "32px"; // Отступ 32px на мобильных
            }
        }

        updateButtonSpacing();
        window.addEventListener("resize", updateButtonSpacing);

        if (!navigationContainer.contains(prevButton)) {
            navigationContainer.appendChild(prevButton);
        }
        if (!navigationContainer.contains(nextButton)) {
            navigationContainer.appendChild(nextButton);
        }
    }

    function updateSlideLayout() {
        swiperContainer.style.overflow = "hidden"; 

        const slides = document.querySelectorAll(".swiper-slide");
        if (window.innerWidth >= 1440) {
            slides.forEach(slide => {
                slide.style.display = "flex";
                slide.style.flexDirection = "row";
                slide.style.width = "1376px";
                slide.style.height = "813px";
                slide.style.alignItems = "stretch";
                slide.style.justifyContent = "center";
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

    function updateSlideVisibility(swiper) {
        const slides = document.querySelectorAll(".swiper-slide");
        slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
                slide.style.display = "flex";
            } else {
                slide.style.display = "none";
            }
        });
    }

    window.addEventListener("resize", updateSlideLayout);

    console.log("✅ Swiper инициализирован:", swiper);
});
