'use strict';

const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((ele)=>
      ele.addEventListener('click',openModal)
)


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// Smooth scrolling


btnScrollTo.addEventListener('click',function(e){
  const s1Coord=section1.getBoundingClientRect();
  console.log(s1Coord);
  //  window.scrollTo({
  //   left:s1Coord.left+window.pageXOffset,
  //   top:s1Coord.top+window.pageYOffset,
  //   behavior:'smooth',
  //  })
// New Way
section1.scrollIntoView({behavior:'smooth'});
})

// SCROLLING IN NAVIGATION USING EVENT DELEGATION
const navLists=document.querySelector('.nav__links');
// 1 add event listener to common parent elements

navLists.addEventListener('click',function(e){
  e.preventDefault();
  // 2 DETERMINE WHAT ELEMENT ORIGINATED THE EVENT
  // console.log(e.target);
  
  // MATCHING STRATAGY

  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})
// TABBLED COMPONENT
const tabContainer=document.querySelector('.operations__tab-container');
const tabs=document.querySelectorAll('.operations__tab');
const tabsContent=document.querySelectorAll('.operations__content');
// console.log(tabs);
tabContainer.addEventListener('click',function(e){
  const current= e.target.closest('.operations__tab');
  //  console.log(current);
  if(!current) return;
  
  //  removing the regular active class
  tabs.forEach
  (t=> t.classList.remove('operations__tab--active'))
  
  // console.log(tabContent);
  current.classList.add('operations__tab--active')
  //  console.log(current.dataset.tab);
  
  
  tabsContent.forEach
  (c => c.classList.remove('operations__content--active'));
 
 document
   .querySelector
   (`.operations__content--${current.dataset.tab}`)
   .classList
   .add('operations__content--active'); 
})
// FADDING LINKS IN NAVIGATION
const nav=document.querySelector('.nav');

const handleHover=function(e,opacity){
  if(e.target.classList.contains('nav__link') ){
    //  console.log(e.target);
       const link=e.target;
       const sibilings=e.target.closest('.nav').querySelectorAll('.nav__link');
       const logo=link.closest('.nav').querySelector('img');
       sibilings.forEach(el=>
        {
          if(el!=link){
            el.style.opacity=this;
                      }
          
        })  
        logo.style.opacity=this;    
   }
}


nav.addEventListener('mouseover',handleHover.bind(0.5))

nav.addEventListener('mouseout',handleHover.bind(1))

// OBSERVING HEADER
const header=document.querySelector('header');
const navHeight=nav.getBoundingClientRect().height;
// console.log(headerHeight);

const obsHeader=function(entries){
  const [entry]=entries;
  // console.log(entry.isIntersecting);
  if(entry.isIntersecting) nav.classList.remove('sticky')
 else
  nav.classList.add('sticky')



  
}
const headerObserver=new IntersectionObserver(obsHeader,{
  root:null,
  threshold:0,
  // rootMargin:'-90px'
  rootMargin:`-${navHeight}px`,
})

headerObserver.observe(header);

// section--hidden

const secCall = function(entries,observer){
  const [entry] = entries;
  // console.log(entry.target);
  // console.log(entry);
  if(!entry.isIntersecting) return;

  // removing hidden class
  entry.target.classList.remove('section--hidden');


  observer.unobserve(entry.target);
}

const sectionObserver=new IntersectionObserver(secCall,{
  root:null,
  threshold:0.15,
})
const sections=document.querySelectorAll('section');
// console.log(sections);
sections.forEach(se=>{
  sectionObserver.observe(se);
  // se.classList.add('section--hidden');
})

// IMAGE FAKE BLUR TO NORMAL(lazy-img)

const imgs=document.querySelectorAll('img[data-src]');
// console.log(imgs);
const imgCall=function(entries,observer){
  const [entry]=entries;
  // console.log(entry);
  if(!entry.isIntersecting) return;
  
  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
   entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target)
}

const imgObserver=new IntersectionObserver(imgCall,{
  root:null,
  threshold:0,
  rootMargin:'200px'

})

imgs.forEach(i=>{
  imgObserver.observe(i);
})

// WORKING WITH SLIDERS
const sliders=function(){


const slider=document.querySelector('.slider');
const slides=document.querySelectorAll('.slide');
const dotContainer=document.querySelector('.dots');

// slider.style.transform='scale(0.3) translateX(-1000px)';
// slider.style.overflow='visible';

const creatDots=function(){
 slides.forEach((_,i)=>{
  dotContainer.insertAdjacentHTML('beforeend',
  `<button class="dots__dot" data-slide=${i}></button>`)
 })

}


const activateDot=function(slide){
  document.querySelectorAll('.dots__dot').forEach(d=>
  d.classList.remove('dots__dot--active'));
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')

}


const goToSlide=function(slide){
  slides.forEach((s,i)=>{
    s.style.transform=`translateX(${(i-slide)*100}%)`;
  }) 
}


const nextSlide=function(){
  if(currSlide === maxLength-1){
    currSlide=0;
  }
  else{
    currSlide++; 
  }
   goToSlide(currSlide);
   activateDot(currSlide);
}
const prevSlide=function(){
  if(currSlide===0){
    currSlide=maxLength-1;
  }
  else{
    currSlide--;
  }
  goToSlide(currSlide);
  activateDot(currSlide);
}
const init=function(){
  goToSlide(0);
  creatDots();
  activateDot(0);
}

init();
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
let currSlide=0;
const maxLength=slides.length;

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);
document.addEventListener('keydown',function(e){
  // console.log(e);
  if(e.key==='ArrowRight') nextSlide();
  e.key==='ArrowLeft' && prevSlide();
})  
dotContainer.addEventListener('click',function(e){
  //  console.log(e.target);
  if(e.target.classList.contains('dots__dot')){
    const slide=e.target.dataset.slide;
    // console.log(slide);
    goToSlide(slide);
    activateDot(slide);
  }
})

}
sliders();
/* ***************************************  */
/*
// LECTURES
// SELECT , INSERTING , DELETING
// SELECTING
// console.log(document.getElementsByTagName('button'))

// CREATING
const message=document.createElement('div');
message.classList.add('cookie-message');
// message.textContent='We improved using cookie';
message.innerHTML='We use cokkies for improved functionality and analaytics<button class="btn btn--close--cookie">Got it</button>'

const header=document.querySelector('.header');
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);
// DELETING

document.querySelector('.btn--close--cookie').addEventListener('click',function(){
  message.remove();
})

// SELECTING CSS PROPERTIES

message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+40+"px";
message.style.backgroundColor='#37383d';
message.style.width='120%';


// rgb(25,25,155)
const randomNum= (max,min)=> Math.trunc(Math.random() * (max-min+1))+min;
// random color
const randomColour=function(){
  return `rgb(${randomNum(0,255)},${randomNum(0,255)},${randomNum(0,255)})`;
}
console.log(randomColour());

document.querySelector('.nav__link').addEventListener('click',function(e){
  e.preventDefault();
  this.style.backgroundColor=randomColour();
  // console.log('link');
  // Stop propogation
  e.stopPropagation()
});
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  this.style.backgroundColor=randomColour();
  // console.log('link');
});
document.querySelector('.nav').addEventListener('click',function(e){
  e.preventDefault();
  this.style.backgroundColor=randomColour();
  // console.log('link');
});

const h1=document.querySelector('h1');
// h1.addEventListener('mouseenter',()=> alert('using mouse enter key'));
const alert1=()=>{ alert('using mouse enter key');
 h1.removeEventListener('mouseenter',alert1);
}
h1.addEventListener('mouseenter',alert1);
// INTERSECTION API

const callBack=function(entries,observer){
  entries.forEach(e=>{
    console.log(e)
    if(e.isIntersecting) console.log(true);
  });
  

}


const obsOps={
  root:null,
  threshold:0,
}

const observer=new IntersectionObserver(callBack,obsOps);
observer.observe(document.querySelector('.header'));
*/