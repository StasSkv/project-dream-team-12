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
        button.style.width = "52px";
        button.style.height = "52px";
        button.style.borderRadius = "60px";

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

        function updateButtonSpacing() {
            if (window.innerWidth >= 768) {
                navigationContainer.style.marginTop = "48px";
            } else {
                navigationContainer.style.marginTop = "32px";
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

        if (window.innerWidth >= 768) {
            swiperWrapper.style.padding = "0 32px";
        } else {
            swiperWrapper.style.padding = "0";
        }

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












