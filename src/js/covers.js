document.addEventListener("DOMContentLoaded", () => {
    const lists = document.querySelectorAll('.covers__list');

    // Функція для перемішування елементів
    function shuffleItems(list) {
        const items = Array.from(list.querySelectorAll('.covers__item'));
    
        // Перемішування алгоритмом Фішера-Йейтса
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
    
        // Очищуємо список і додаємо перемішані елементи
        list.innerHTML = '';
        items.forEach(item => list.appendChild(item));
    
        // Додаємо анімацію після перемішування
        list.style.animation = "covers-left 10s linear infinite";
    }

    // Створюємо інтерсектор-спостерігач
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Якщо секція потрапляє в вьюпорт
                shuffleItems(entry.target); // Перемішуємо елементи і додаємо анімацію
                observer.unobserve(entry.target); // Прибираємо спостереження, якщо анімація вже почалася
            }
        });
    }, {
        threshold: 0.5 // Задаємо, коли спостерігач вважатиме, що елемент в межах вьюпорту (50%)
    });

    // Спостерігаємо за всіма секціями "Covers"
    lists.forEach(list => observer.observe(list));
});
