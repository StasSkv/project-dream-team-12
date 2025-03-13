import{S as y,N as E,K as x,M as q,A as h,a as C,b as P}from"./assets/vendor-DCEpIgB1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const c={menu:document.querySelector(".header-menu"),nav:document.querySelector(".header-menu-nav"),burger:document.querySelector(".header-burger-wrap"),modal:document.querySelector(".header-modal"),modalNavList:document.querySelector(".header-modal-menu-list")};document.addEventListener("click",I);function I(e){c.menu.contains(e.target)&&!c.nav.classList.contains("is-visible")?c.nav.classList.add("is-visible"):c.nav.classList.remove("is-visible")}c.burger.addEventListener("click",M);function M(){c.modal.classList.add("modal-is-visible"),document.body.classList.add("no-scroll")}c.modal.addEventListener("click",A);function A(e){(e.target.closest(".header-modal-svg")||e.target.closest(".header-modal-menu-item")||e.target.closest(".header-modal-link"))&&(c.modal.classList.remove("modal-is-visible"),document.body.classList.remove("no-scroll"))}document.addEventListener("keydown",e=>{e.key==="Escape"&&c.modal.classList.contains("modal-is-visible")&&(c.modal.classList.remove("modal-is-visible"),document.body.classList.remove("no-scroll"))});new y(".about-me-swiper",{modules:[E,x,q],navigation:{nextEl:".about-me-swiper__next"},mousewheel:{invert:!0},keyboard:{enabled:!0,onlyInViewport:!0},touch:!0,centeredSlides:!1,loop:!0,speed:500,spaceBetween:0,slideToClickedSlide:!0,allowTouchMove:!0,slideActiveClass:"current-skill",slidesPerView:2,breakpoints:{768:{slidesPerView:3},1440:{slidesPerView:6}}});new h(".about-acc-container",{elementClass:"about-acc-list",triggerClass:"about-acc-btn",panelClass:"about-ac-panel",showMultiple:!0,duration:800,openOnInit:[0],beforeOpen:e=>e.querySelector("button.about-acc-btn").setAttribute("aria-expanded",!0),beforeClose:e=>e.querySelector("button.about-acc-btn").setAttribute("aria-expanded",!1)});document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".swiper-container"),r=document.querySelector(".swiper-wrapper"),s=document.querySelector(".swiper-button-prev"),o=document.querySelector(".swiper-button-next");if(!e||!r||!s||!o){console.error("Ошибка: Один из элементов Swiper не найден.");return}function n(){s.classList.remove("swiper-button-prev","swiper-button-disabled"),o.classList.remove("swiper-button-next","swiper-button-disabled"),s.removeAttribute("disabled"),o.removeAttribute("disabled")}function i(t){t.isBeginning?(s.classList.add("swiper-button-disabled"),s.setAttribute("disabled","true"),s.style.opacity="0.4"):(s.classList.remove("swiper-button-disabled"),s.removeAttribute("disabled"),s.style.opacity="1"),t.isEnd?(o.classList.add("swiper-button-disabled"),o.setAttribute("disabled","true"),o.style.opacity="0.4"):(o.classList.remove("swiper-button-disabled"),o.removeAttribute("disabled"),o.style.opacity="1")}function a(){e.style.overflow="hidden",document.querySelectorAll(".swiper-slide").forEach(l=>{l.style.display="flex",l.style.width="100%",l.style.height="auto",l.style.flexDirection="column",l.style.alignItems="center",l.style.justifyContent="center"})}function m(t){t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.position="relative",t.style.borderRadius="60px",t.style.backgroundColor="transparent",window.innerWidth>=768?(t.style.border="1px solid rgba(250, 250, 250, 0.2)",t.style.padding="18px",t.style.width="68px",t.style.height="68px"):(t.style.width="52px",t.style.height="52px");const l=t.querySelector("svg");l&&(l.style.position="absolute",l.style.top="50%",l.style.left="50%",l.style.transform="translate(-50%, -50%)",l.style.width="32px",l.style.height="32px")}m(s),m(o);const d=new y(".swiper-container",{slidesPerView:1,spaceBetween:0,loop:!1,centeredSlides:!0,keyboard:{enabled:!0},mousewheel:{enabled:!0},breakpoints:{0:{slidesPerView:"auto",spaceBetween:20},768:{slidesPerView:1,spaceBetween:32},1440:{slidesPerView:1,spaceBetween:32}},on:{init:function(t){L(),i(t),a(),v(),n()},slideChange:function(t){i(t),v()},resize:function(){a()}}});function L(){let t=document.querySelector(".swiper-navigation-wrapper");t||(t=document.createElement("div"),t.classList.add("swiper-navigation-wrapper"),r.parentNode.insertBefore(t,r.nextSibling)),t.contains(s)||t.appendChild(s),t.contains(o)||t.appendChild(o)}s.addEventListener("click",function(){d.slidePrev()}),o.addEventListener("click",function(){d.slideNext()});function v(t){document.querySelectorAll(".swiper-slide").forEach(S=>{S.style.display="flex"})}window.addEventListener("resize",a)});new h(".accordion-container",{showMultiple:!0});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".covers__list"),r=document.querySelector(".covers");function s(n){n.forEach(i=>{i.isIntersecting?e.forEach(a=>{a.style.animation="none",a.offsetWidth,a.style.animation="covers-left 10s linear infinite"}):e.forEach(a=>{a.style.animation="none"})})}const o=new IntersectionObserver(s,{threshold:.1});r&&o.observe(r)});const k="https://portfolio-js.b.goit.study/api/reviews",p=document.querySelector(".reviews-list"),g=document.querySelector(".reviews");let w=!1;async function B(){try{return(await C.get(k)).data}catch(e){return console.error("Error fetching reviews:",e),T(),[]}}function O(e){if(!Array.isArray(e)||e.length===0){p.innerHTML='<p class="not-found">Not found</p>';return}p.innerHTML=e.map(r=>`
      <li class="swiper-slide reviews-item">
        <img class="reviews-card-img" src="${r.avatar_url}" alt="${r.author}">
        <p class="reviews-card-title">${r.author}</p>
        <p class="reviews-card-descr">${r.review}</p>
      </li>`).join("")}function N(){new y(".swiper",{slidesPerView:1,navigation:{nextEl:".next",prevEl:".prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:4,spaceBetween:16}},keyboard:{enabled:!0},mousewheel:{enabled:!0}})}function T(){p.innerHTML='<p class="error-message">Failed to load reviews. Please try again later.</p>'}const V=new IntersectionObserver(async(e,r)=>{if(e[0].isIntersecting&&!w){w=!0,r.unobserve(g);const o=await B();O(o),N()}},{threshold:.05});V.observe(g);let u=!1,f=null;function b(e){if(u)return;P.create(`
      <button class="modal-close">&times;</button>
      <p id="modal-title">Thank you for your interest in cooperation!</p>
      <p id="modal-text">The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.</p>
    `,{onShow:s=>{u=!0,f=s,document.body.classList.add("no-scroll"),s.element().querySelector(".modal-close").addEventListener("click",()=>{s.close()})},onClose:()=>{u=!1,document.body.classList.remove("no-scroll")}}).show()}function j(e){e.key==="Escape"&&u&&f&&f.close()}document.addEventListener("keydown",j);document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector("#contact-form"),r=e.querySelector('input[name="email"]'),s=e.querySelector('input[name="comment"]');r.value=localStorage.getItem("email")||"",s.value=localStorage.getItem("comment")||"";function o(){localStorage.setItem("email",r.value.trim()),localStorage.setItem("comment",s.value.trim())}r.addEventListener("input",o),s.addEventListener("input",o),e.addEventListener("submit",function(n){n.preventDefault();const i=r.value.trim(),a=s.value.trim();if(!i||!a){b();return}fetch("https://portfolio-js.b.goit.study/api/requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,comment:a})}).then(d=>{if(!d.ok)throw new Error(`HTTP error! Status: ${d.status}`);return d.json()}).then(d=>{b(d.message),localStorage.removeItem("email"),localStorage.removeItem("comment"),e.reset()})})});
//# sourceMappingURL=index.js.map
