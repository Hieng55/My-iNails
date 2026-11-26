const slides=[...document.querySelectorAll('.hero-slide')];
const dots=[...document.querySelectorAll('.hero-dots button')];
const title=document.querySelector('.hero h1');
const copy=document.querySelector('.hero-copy');
let current=0;
let timer;

function showSlide(index){
  current=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));
  dots.forEach((dot,i)=>dot.classList.toggle('is-active',i===current));
  title.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:500});
  const words=slides[current].dataset.title.split(' ');
  const last=words.pop();
  title.innerHTML=`${words.join(' ')} <span>${last}</span>`;
  copy.textContent=slides[current].dataset.copy;
}
function autoplay(){clearInterval(timer);timer=setInterval(()=>showSlide(current+1),6000)}
document.querySelector('.hero-arrow.next').addEventListener('click',()=>{showSlide(current+1);autoplay()});
document.querySelector('.hero-arrow.prev').addEventListener('click',()=>{showSlide(current-1);autoplay()});
dots.forEach((dot,i)=>dot.addEventListener('click',()=>{showSlide(i);autoplay()}));
autoplay();

const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.nav-links');
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav-links a[href^="#"]')];
new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-40% 0px -50%',threshold:0}).observe(sections[0]);
sections.slice(1).forEach(section=>new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-40% 0px -50%',threshold:0}).observe(section));

const serviceItems=[
  {title:'Manicure Services',image:'assets/c00f358bc094509da5a114cdbbc92056.jpg',items:[['Refresh · 35 mins','$39'],['Recharge · 40 mins','$49'],['Relax · 60 mins','$69']]},
  {title:'Pedicure Services',image:'assets/nude-manicure-pedicure-summer-female-hands-feet-white-background-top-view-result-spa-salon-procedure-scaled.jpg',items:[['Refresh · 35 mins','$44'],['Recharge · 40 mins','$59'],['Relax · 60 mins','$99'],['Rejuvenate · 80 mins','$109']]},
  {title:'Nail Enhancement',image:'assets/white-nails-with-gold-earrings-ai-icon-scaled.jpg',items:[['Hybrid Gel','$50–$80'],['Ombre Pink & White','$55–$90'],['Gel X / Dip','$55–$70'],['Gel Builder','$60–$80']]},
  {title:'Permanent Makeup',image:'assets/graceful-thin-fingers-girl-with-trendy-pastel-nude-manicure-fluffy-soft-sweater-cute-silver-ring-bow.jpg',items:[['Nano Hairstroke Brows','$500'],['Combo Brows','$550'],['Ombre Brows','$400'],['Eyeliner','$200–$250']]},
  {title:"Kids' Services",image:'assets/medium-shot-girl-with-accesories-portrait-scaled.jpg',items:[['Kid Manicure · Under 12','$35'],['Kid Pedicure · Under 12','$40'],['Kid Polish · Under 12','$25']]},
  {title:'Massage',image:'assets/creative-design-nails-female-hands-art-manicure.jpg',items:[['Foot Massage · 15 mins','$30'],['Foot Massage · 30 mins','$50'],['Hand Massage · 15 mins','$25'],['Hand Massage · 30 mins','$45']]},
  {title:'Add-ons',image:'assets/manicurist-removal-nail-gel-polish-with-using-special-instrument-electric-manicure-drill-scaled.jpg',items:[['Heel Treatment','$20'],['Nail Designs / Longer Nails','$10+'],['Nail Take Off','$10–$20'],['French Tip / Chrome','$10+']]},
  {title:'Polish Change',image:'assets/composition-nail-care-products.jpg',items:[['Gel / Dazzle Dry Change','$25'],['Take Off Gel Polish','$5']]},
  {title:'Waxing',image:'assets/hands-beautician-apply-mask-womans-face-spa-salon-aesthetic-procedure-facial-skin-care-scaled.jpg',items:[['Brows / Lip / Chin','$10–$15'],['Underarms','$25+'],['Arms','$35–$50+'],['Legs','$60–$90+']]}
];
let serviceStart=0;
const serviceGrid=document.querySelector('.original-service-grid');
function renderServices(){
  const visible=window.innerWidth<700?1:window.innerWidth<1050?2:3;
  serviceGrid.innerHTML=Array.from({length:visible},(_,offset)=>serviceItems[(serviceStart+offset)%serviceItems.length]).map(item=>{const slug=item.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');return `<article class="original-service-card"><img class="service-photo" src="${item.image}" alt="${item.title}"><div class="service-card-body"><h3>${item.title}</h3><span class="luxury-mark" aria-hidden="true"><svg viewBox="0 0 140 34"><path class="ornament-line" d="M4 17h42M94 17h42"/><path class="sparkle-main" d="M70 2c1.6 9.4 5.6 13.4 15 15-9.4 1.6-13.4 5.6-15 15-1.6-9.4-5.6-13.4-15-15 9.4-1.6 13.4-5.6 15-15Z"/><path class="sparkle-small" d="M50 8c.7 4 2.3 5.6 6.3 6.3-4 .7-5.6 2.3-6.3 6.3-.7-4-2.3-5.6-6.3-6.3 4-.7 5.6-2.3 6.3-6.3ZM92 5c.5 3 1.8 4.3 4.8 4.8-3 .5-4.3 1.8-4.8 4.8-.5-3-1.8-4.3-4.8-4.8 3-.5 4.3-1.8 4.8-4.8Z"/></svg></span><a class="original-button category-book" href="services.html#${slug}">View More</a></div></article>`}).join('');
}
document.querySelector('.services-prev').addEventListener('click',()=>{serviceStart=(serviceStart-1+serviceItems.length)%serviceItems.length;renderServices()});
document.querySelector('.services-next').addEventListener('click',()=>{serviceStart=(serviceStart+1)%serviceItems.length;renderServices()});
window.addEventListener('resize',renderServices);
renderServices();

const reviewItems=[
  {name:'Google Customer 01',text:"My nail technician takes very good care of me. I have sensitive nail beds and always leave happy with the results."},
  {name:'Google Customer 02',text:'I always come here to get my nails and pedicure done. The pedicure and massage are worth every penny, and my nails always look amazing.'},
  {name:'Google Customer 03',text:'Jessica is super talented and the absolute sweetest person ever. The staff is friendly and makes you feel welcome as soon as you walk in.'},
  {name:'Google Customer 04',text:'The salon is clean, relaxing, and everyone is welcoming. They always take their time and make sure I love the final result.'},
  {name:'Google Customer 05',text:'Beautiful work and excellent service. My manicure lasted wonderfully and I received so many compliments on my nails.'},
  {name:'Google Customer 06',text:'A wonderful place to relax and treat yourself. The pedicure was comfortable, detailed, and exactly what I needed.'}
];
const reviewCarousel=document.querySelector('.review-carousel');
const reviewTrack=document.querySelector('.review-grid');
const reviewDots=document.querySelector('.review-dots');
let reviewIndex=0;
let reviewTimer;
function reviewVisible(){return window.innerWidth<700?1:window.innerWidth<1050?2:3}
function updateReviewCarousel(rebuildDots=false){
  const visible=reviewVisible();
  const max=Math.max(0,reviewItems.length-visible);
  reviewIndex=Math.min(reviewIndex,max);
  const gap=28;
  const cardWidth=(reviewCarousel.clientWidth-gap*(visible-1))/visible;
  reviewTrack.querySelectorAll('blockquote').forEach(card=>card.style.flexBasis=`${cardWidth}px`);
  reviewTrack.style.transform=`translateX(-${reviewIndex*(cardWidth+gap)}px)`;
  if(rebuildDots||reviewDots.children.length!==max+1){
    reviewDots.innerHTML=Array.from({length:max+1},(_,i)=>`<button type="button" aria-label="Show review group ${i+1}"></button>`).join('');
    [...reviewDots.children].forEach((dot,i)=>dot.addEventListener('click',()=>{reviewIndex=i;updateReviewCarousel();restartReviewTimer()}));
  }
  [...reviewDots.children].forEach((dot,i)=>dot.classList.toggle('is-active',i===reviewIndex));
}
function buildReviews(){
  reviewTrack.innerHTML=reviewItems.map((item,i)=>`<blockquote class="${i%3===1?'featured':''}"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><p>“${item.text}”</p><footer><img class="google-review-icon" src="https://thesvg.org/icons/google/default.svg" alt="Google"><span><strong>${item.name}</strong><small>Google Review</small></span></footer></blockquote>`).join('');
  updateReviewCarousel(true);
}
function nextReviews(){const max=Math.max(0,reviewItems.length-reviewVisible());reviewIndex=reviewIndex>=max?0:reviewIndex+1;updateReviewCarousel()}
function restartReviewTimer(){clearInterval(reviewTimer);reviewTimer=setInterval(nextReviews,5000)}
reviewCarousel.addEventListener('mouseenter',()=>clearInterval(reviewTimer));
reviewCarousel.addEventListener('mouseleave',restartReviewTimer);
window.addEventListener('resize',()=>updateReviewCarousel(true));
buildReviews();
restartReviewTimer();

const galleryItems=Array.from({length:12},(_,i)=>({
  src:`assets/gallery/${i+48}.png`,
  alt:`My iNails gallery ${i+1}`
}));
const galleryGrid=document.querySelector('#gallery-grid');
const lightbox=document.querySelector('#gallery-lightbox');
const lightboxImage=lightbox.querySelector('.lightbox-stage img');
const lightboxCaption=lightbox.querySelector('figcaption');
const lightboxClose=lightbox.querySelector('.lightbox-close');
let galleryIndex=0;
let galleryTrigger=null;

galleryGrid.innerHTML=galleryItems.map((item,i)=>`<button class="gallery-item" type="button" data-gallery-index="${i}" aria-label="Open gallery image ${i+1}"><img src="${item.src}" alt="${item.alt}" loading="lazy"></button>`).join('');

function showGalleryImage(index){
  galleryIndex=(index+galleryItems.length)%galleryItems.length;
  const item=galleryItems[galleryIndex];
  lightboxImage.src=item.src;
  lightboxImage.alt=item.alt;
  lightboxCaption.textContent=`${galleryIndex+1} / ${galleryItems.length}`;
}
function openGallery(index,trigger){
  galleryTrigger=trigger;
  showGalleryImage(index);
  lightbox.hidden=false;
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}
function closeGallery(){
  lightbox.hidden=true;
  document.body.classList.remove('lightbox-open');
  galleryTrigger?.focus();
}
galleryGrid.addEventListener('click',event=>{
  const trigger=event.target.closest('.gallery-item');
  if(trigger)openGallery(Number(trigger.dataset.galleryIndex),trigger);
});
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>showGalleryImage(galleryIndex-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>showGalleryImage(galleryIndex+1));
lightboxClose.addEventListener('click',closeGallery);
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeGallery()});
document.addEventListener('keydown',event=>{
  if(lightbox.hidden)return;
  if(event.key==='Escape')closeGallery();
  if(event.key==='ArrowLeft')showGalleryImage(galleryIndex-1);
  if(event.key==='ArrowRight')showGalleryImage(galleryIndex+1);
});
