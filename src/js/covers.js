document.addEventListener("DOMContentLoaded", () => {
    const lists = document.querySelectorAll('.covers__list');

   
    function shuffleItems(list) {
        const items = Array.from(list.querySelectorAll('.covers__item'));
    
        // Перемішування алгоритмом Фішера-Йейтса
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
    
        list.innerHTML = '';
        items.forEach(item => list.appendChild(item));
    
       
        list.style.animation = "covers-left 10s linear infinite";
    }

    // інтерсектор-спостерігач
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Якщо секція потрапляє в вьюпорт
                shuffleItems(entry.target); // Перемішує елементи і додаэ анімацію
                observer.unobserve(entry.target); // Прибирає спостереження, якщо анімація вже почалася
            }
        });
    }, {
        threshold: 0.5 

    // Спостерігає за всіма секціями "Covers"
    lists.forEach(list => observer.observe(list));
});
