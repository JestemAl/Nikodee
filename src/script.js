/**
 * Image track
 */
// const track = document.getElementById("image-track");

// const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

// const handleOnUp = () => {
//   track.dataset.mouseDownAt = "0";  
//   track.dataset.prevPercentage = track.dataset.percentage;
// }

// const handleOnMove = e => {
//   if(track.dataset.mouseDownAt === "0") return;
  
//   const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
//         maxDelta = window.innerWidth / 2;
  
//   const percentage = (mouseDelta / maxDelta) * -100,
//         nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
//         nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
//   track.dataset.percentage = nextPercentage;
  
//   track.animate({
//     transform: `translate(${nextPercentage}%, -50%)`
//   }, { duration: 1200, fill: "forwards" });
  
//   for(const image of track.getElementsByClassName("image")) {
//     image.animate({
//       objectPosition: `${100 + nextPercentage}% center`
//     }, { duration: 1200, fill: "forwards" });
//   }
// }

const images = document.querySelectorAll('.image-container');
const track = document.getElementById("track");

// Ustawienie wartości początkowej dla track.dataset.mouseDownAt
track.dataset.mouseDownAt = 0;
// Ustawienie wartości początkowej dla track.dataset.prevPercentage
track.dataset.prevPercentage = 0;

const scrollSection = document.getElementById('scrollx')




// const tick = () =>
// {
//     const scrollX = scrollSection.scrollLeft
//     // console.log(scrollX);
    

//     window.requestAnimationFrame(tick)
// }
// tick()

// const track = document.querySelector('.track');
const body = document.querySelector('body');

// Opcje obserwatora
const options = {
  threshold: 0.5, // Część widoczności elementu, dla której zostanie wywołana funkcja callback (50%)
};

// Funkcja callback dla Intersection Observer
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      body.classList.add('stop-scrolling'); // Dodaj klasę, aby zatrzymać scrollowanie pionowe
    } else {
      body.classList.remove('stop-scrolling'); // Usuń klasę, aby umożliwić scrollowanie pionowe
    }
  });
}

// Utwórz nowy obiekt Intersection Observer i przypisz funkcję callback
const observer = new IntersectionObserver(handleIntersection, options);

// Obserwuj track
observer.observe(track);