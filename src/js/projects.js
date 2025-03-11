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

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".button-class").forEach(fixButtonPosition);
    });

    window.addEventListener("resize", () => {
        document.querySelectorAll(".button-class").forEach(fixButtonPosition);
    });

    function updateNavigationButtons(swiper) {
        prevButton.disabled = swiper.isBeginning;
        nextButton.disabled = swiper.isEnd;

        prevButton.classList.toggle("disabled", swiper.isBeginning);
        nextButton.classList.toggle("disabled", swiper.isEnd);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const extraNavWrapper = document.querySelector(".swiper-navigation-wrapper");
        if (extraNavWrapper) {
            extraNavWrapper.remove();
            console.log("🚀 Удалён .swiper-navigation-wrapper перед инициализацией Swiper.");
        }
    });
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

    if (window.innerWidth >= 768 && window.innerWidth < 1440) {
        const imageWrappers = document.querySelectorAll(".project-image-wrapper");
        imageWrappers.forEach(wrapper => {
            wrapper.style.paddingTop = "120px";
            wrapper.style.paddingBottom = "120px";
        });
    }
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
    
        const imageWrappers = document.querySelectorAll(".project-image-wrapper");
        imageWrappers.forEach(wrapper => {
            if (window.innerWidth >= 768 && window.innerWidth < 1440) {
                wrapper.style.paddingTop = "120px";
                wrapper.style.paddingBottom = "120px";
            }
    
            // Добавляем боковые отступы на мобильных устройствах
            if (window.innerWidth < 768) {
                wrapper.style.paddingLeft = "0px";
                wrapper.style.paddingRight = "0px";
            }
        });
    }
    
}
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
        0: { slidesPerView: "auto", spaceBetween: 20 }, // 🔥 Исправлено для мобилок
        768: { slidesPerView: 1, spaceBetween: 32 },
        1440: { slidesPerView: 1, spaceBetween: 32 },
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


    function moveNavigationButtons() {
        let navigationContainer = document.querySelector(".swiper-navigation");

        if (!navigationContainer) {
            navigationContainer = document.createElement("div");
            navigationContainer.classList.add("swiper-navigation");
            swiperWrapper.parentNode.insertBefore(navigationContainer, swiperWrapper.nextSibling);
        }

        navigationContainer.style.display = "flex";
        navigationContainer.style.justifyContent = "center";
        navigationContainer.style.alignItems = "center";
        navigationContainer.style.width = "100%";
        navigationContainer.style.position = "relative";
        navigationContainer.style.zIndex = "10";
        navigationContainer.style.marginTop = "0px";

        function updateButtonSpacing() {
            if (window.innerWidth >= 1440) {
                navigationContainer.style.marginTop = "80px";
            } else if (window.innerWidth >= 768 && window.innerWidth < 1440) {
                navigationContainer.style.marginTop = "64px";
            } else {
                navigationContainer.style.marginTop = "48px";
            }
        }

        updateButtonSpacing();
        window.addEventListener("resize", updateButtonSpacing);

        swiperContainer.style.overflow = "visible";
        swiperWrapper.style.overflow = "visible";

        if (!navigationContainer.contains(prevButton)) {
            navigationContainer.appendChild(prevButton);
        }
        if (!navigationContainer.contains(nextButton)) {
            navigationContainer.appendChild(nextButton);
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

