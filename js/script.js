// LOADER
var tl = gsap.timeline()
tl.from(".loader h3",{
  x:40,
  opacity:0,
  duration:1,
  stagger:0.1
})
tl.to(".loader h3",{
  opacity:0,
  x:-40,
  duration:1.5,
  stagger:0.1
})
tl.to(".loader",{
  opacity: 0
})
tl.from("#navbar",{
  y:100,
  opacity:0,
  stagger:0.1,
  duration:0.7
})
tl.to(".loader",{
  display:"none"
})
// CUSTOM CURSOR
const coords = { x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle){
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;

});

function animateCircles() {
    
    const rect = document.body.getBoundingClientRect();
    let x = coords.x - rect.left;
    let y = coords.y - rect.top; 

    circles.forEach(function (circle, index) {

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.1;
        y += (nextCircle.y - y) * 0.1;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

// BEYOND OUR SUBS
window.addEventListener('load', function() {
  const tabs = document.querySelectorAll('.scoped-tab');
  const image = document.getElementById('scoped-dish-image');
  const defaultImage = 'img/subway wrap.png';

  tabs.forEach(tab => {
      tab.addEventListener('mouseover', function() {
          const newImage = tab.getAttribute('data-image');
          image.style.opacity = '0';
          setTimeout(() => {
              image.src = newImage;
              image.style.opacity = '1';
          }, 300);
      });

      tab.addEventListener('mouseleave', function() {
          image.style.opacity = '0';
          setTimeout(() => {
              image.src = defaultImage;
              image.style.opacity = '1';
          }, 300);
      });
  });
});

//Section11 sticky scroll reveal

const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")
const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)")


gsap.set(photos, {yPercent:101})

const allPhotos = gsap.utils.toArray(".desktopPhoto")



let mm = gsap.matchMedia();

mm.add("(min-width: 600px)", () => {
  console.log("desktop")
	
  ScrollTrigger.create({
	trigger:".gallery",
	start:"top top",
	end:"bottom bottom",
	pin:".right"
})

details.forEach((detail, index)=> {

	let headline = detail.querySelector("h1")
	let animation = gsap.timeline()
	   .to(photos[index], {yPercent:0})
	   .set(allPhotos[index], {autoAlpha:0})
	ScrollTrigger.create({
		trigger:headline,
		start:"top 80%",
		end:"top 50%",
		animation:animation,
		scrub:true,
		markers:false
	})
})
	
	
  
  return () => { // optional
    // custom cleanup code here (runs when it STOPS matching)
	  console.log("mobile")
  };
});

// CurvedDiv section11 ON SCROLL
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

window.addEventListener('scroll', debounce(() => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(scrollPosition / maxScroll, 1);
    const borderRadius = scrollPercentage * 50; // Max border-radius value
    document.getElementById('curvedDiv').style.borderBottomLeftRadius = `${borderRadius}px`;
    document.getElementById('curvedDiv').style.borderBottomRightRadius = `${borderRadius}px`;
}, 500)); // 200 milliseconds delay



////////////
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }