const pageToggle=document.querySelector('.menu-toggle');
const pageMenu=document.querySelector('.nav-links');
if(pageToggle&&pageMenu){
  pageToggle.addEventListener('click',()=>{const open=pageMenu.classList.toggle('is-open');pageToggle.setAttribute('aria-expanded',String(open))});
  pageMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{pageMenu.classList.remove('is-open');pageToggle.setAttribute('aria-expanded','false')}));
}

const pageReviewItems=[
  {name:'Google Customer 01',text:'My nail technician takes very good care of me. I have sensitive nail beds and always leave happy with the results.'},
  {name:'Google Customer 02',text:'I always come here to get my nails and pedicure done. The pedicure and massage are worth every penny, and my nails always look amazing.'},
  {name:'Google Customer 03',text:'Jessica is super talented and the absolute sweetest person ever. The staff is friendly and makes you feel welcome as soon as you walk in.'},
  {name:'Google Customer 04',text:'The salon is clean, relaxing, and everyone is welcoming. They always take their time and make sure I love the final result.'},
  {name:'Google Customer 05',text:'Beautiful work and excellent service. My manicure lasted wonderfully and I received so many compliments on my nails.'},
  {name:'Google Customer 06',text:'A wonderful place to relax and treat yourself. The pedicure was comfortable, detailed, and exactly what I needed.'}
];
const pageReviewCarousel=document.querySelector('.review-carousel');
if(pageReviewCarousel){
  const track=pageReviewCarousel.querySelector('.review-grid');
  const dots=document.querySelector('.review-dots');
  let index=0;
  let timer;
  const visible=()=>window.innerWidth<700?1:window.innerWidth<1050?2:3;
  const update=(rebuild=false)=>{
    const count=visible();
    const max=Math.max(0,pageReviewItems.length-count);
    index=Math.min(index,max);
    const gap=28;
    const width=(pageReviewCarousel.clientWidth-gap*(count-1))/count;
    track.querySelectorAll('blockquote').forEach(card=>card.style.flexBasis=`${width}px`);
    track.style.transform=`translateX(-${index*(width+gap)}px)`;
    if(rebuild||dots.children.length!==max+1){
      dots.innerHTML=Array.from({length:max+1},(_,i)=>`<button type="button" aria-label="Show review group ${i+1}"></button>`).join('');
      [...dots.children].forEach((dot,i)=>dot.addEventListener('click',()=>{index=i;update();restart()}));
    }
    [...dots.children].forEach((dot,i)=>dot.classList.toggle('is-active',i===index));
  };
  const next=()=>{const max=Math.max(0,pageReviewItems.length-visible());index=index>=max?0:index+1;update()};
  const restart=()=>{clearInterval(timer);timer=setInterval(next,5000)};
  track.innerHTML=pageReviewItems.map((item,i)=>`<blockquote class="${i%3===1?'featured':''}"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><p>“${item.text}”</p><footer><img class="google-review-icon" src="https://thesvg.org/icons/google/default.svg" alt="Google"><span><strong>${item.name}</strong><small>Google Review</small></span></footer></blockquote>`).join('');
  pageReviewCarousel.addEventListener('mouseenter',()=>clearInterval(timer));
  pageReviewCarousel.addEventListener('mouseleave',restart);
  window.addEventListener('resize',()=>update(true));
  update(true);restart();
}

const pageGalleryGrid=document.querySelector('#gallery-grid');
const pageLightbox=document.querySelector('#gallery-lightbox');
if(pageGalleryGrid&&pageLightbox){
  const items=Array.from({length:12},(_,i)=>({src:`assets/gallery/${i+48}.png`,alt:`My iNails gallery ${i+1}`}));
  const image=pageLightbox.querySelector('.lightbox-stage img');
  const caption=pageLightbox.querySelector('figcaption');
  const closeButton=pageLightbox.querySelector('.lightbox-close');
  let index=0;
  let trigger=null;
  pageGalleryGrid.innerHTML=items.map((item,i)=>`<button class="gallery-item" type="button" data-gallery-index="${i}" aria-label="Open gallery image ${i+1}"><img src="${item.src}" alt="${item.alt}" loading="lazy"></button>`).join('');
  const show=i=>{index=(i+items.length)%items.length;image.src=items[index].src;image.alt=items[index].alt;caption.textContent=`${index+1} / ${items.length}`};
  const open=(i,button)=>{trigger=button;show(i);pageLightbox.hidden=false;document.body.classList.add('lightbox-open');closeButton.focus()};
  const close=()=>{pageLightbox.hidden=true;document.body.classList.remove('lightbox-open');trigger?.focus()};
  pageGalleryGrid.addEventListener('click',event=>{const button=event.target.closest('.gallery-item');if(button)open(Number(button.dataset.galleryIndex),button)});
  pageLightbox.querySelector('.lightbox-prev').addEventListener('click',()=>show(index-1));
  pageLightbox.querySelector('.lightbox-next').addEventListener('click',()=>show(index+1));
  closeButton.addEventListener('click',close);
  pageLightbox.addEventListener('click',event=>{if(event.target===pageLightbox)close()});
  document.addEventListener('keydown',event=>{if(pageLightbox.hidden)return;if(event.key==='Escape')close();if(event.key==='ArrowLeft')show(index-1);if(event.key==='ArrowRight')show(index+1)});
}
