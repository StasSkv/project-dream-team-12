
    document.addEventListener("DOMContentLoaded", () => {
     const covers = document.querySelector(".covers");
     const observer = new IntersectionObserver(entries => {
     entries.forEach(entry => {
     if (entry.isIntersecting) {
     covers.style.animation = "covers-left 10s linear infinite";
     } else {
     covers.style.animationPlayState = "paused";
     }
     });
     }, { threshold: 0.1 });
     observer.observe(covers);
    });