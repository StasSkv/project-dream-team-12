document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.covers__list');
  
    function shuffleItems(list) {
      const items = Array.from(list.querySelectorAll('.covers__item'));
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      list.innerHTML = '';
      items.forEach(item => list.appendChild(item));
      list.style.animation = 'covers-left 10s linear infinite';
    }
  
    const coversSection = document.querySelector('.covers');
  
    function handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lists.forEach(list => {
            list.style.animation = 'none';
            void list.offsetWidth;
            list.style.animation = 'covers-left 10s linear infinite';
          });
        } else {
          lists.forEach(list => {
            list.style.animation = 'none';
          });
        }
      });
    }
  
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });
  
    if (coversSection) {
      observer.observe(coversSection);
    }
  });