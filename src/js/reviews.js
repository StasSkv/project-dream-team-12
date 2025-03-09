import axios from 'axios';
import { Swiper } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_URL = 'https://portfolio-js.b.goit.study/api/reviews';
const reviewsList = document.querySelector('.reviews-list');
const reviewsSection = document.querySelector('.reviews');
let hasFetchedReviews = false;

async function fetchReviews() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    showError();
    return [];
  }
}

function renderReviews(reviews) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    reviewsList.innerHTML = `<p class="not-found">Not found</p>`;
    return;
  }

  reviewsList.innerHTML = reviews
    .map(
      review => `
      <li class="swiper-slide reviews-item">
        <img class="reviews-card-img" src="${review.avatar_url}" alt="${review.author}">
        <p class="reviews-card-title">${review.author}</p>
        <p class="reviews-card-descr">${review.review}</p>
      </li>`
    )
    .join('');
}

function initSwiper() {
  new Swiper('.swiper', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 16 },
      1440: { slidesPerView: 4, spaceBetween: 16 },
    },
    keyboard: { enabled: true },
    mousewheel: { enabled: true },
  });
}

function showError() {
  reviewsList.innerHTML = `<p class="error-message">Failed to load reviews. Please try again later.</p>`;
}

const observer = new IntersectionObserver(
  async (entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting && !hasFetchedReviews) {
      hasFetchedReviews = true;
      observer.unobserve(reviewsSection);
      const reviews = await fetchReviews();
      renderReviews(reviews);
      initSwiper();
    }
  },
  { threshold: 0.05 }
);

observer.observe(reviewsSection);
