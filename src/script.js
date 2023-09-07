const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -75);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, 0%)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
  console.log(`percentage = ${percentage}`);
  console.log(`nextPercentage = ${nextPercentage}`);
}


// const track = document.getElementById("image-track");
// const imageTrack = document.getElementById("image-track"); // Dodaj referencję do #image-track

// const handleOnDown = e => {
//   // Ustal maksymalny przesunięcie w zależności od szerokości slidera
//   const maxDelta = imageTrack.offsetWidth / 2;
//   track.dataset.mouseDownAt = e.clientX;
//   track.dataset.maxDelta = maxDelta; // Przechowaj wartość w dataset
// };

// const handleOnUp = () => {
//   track.dataset.mouseDownAt = "0";  
//   track.dataset.prevPercentage = track.dataset.percentage;
// }

// const handleOnMove = e => {
//   if (track.dataset.mouseDownAt === "0") return;

//   const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
//   const maxDelta = parseFloat(track.dataset.maxDelta); // Pobierz maksymalne przesunięcie z dataset


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

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


/**
 * NavBar
 */

window.addEventListener('scroll', () => {
  var nav = document.querySelector('.nav');
  var navCopy = document.querySelector('#navCopy');
  var heroSection = document.querySelector('#hero');
  var heroPosition = heroSection.getBoundingClientRect().bottom;

  if (window.scrollY > heroPosition && heroPosition < 5) {
    toggleClass(nav, 'sticky', true);
    toggleClass(nav, 'pt-2', true);
    toggleClass(navCopy, 'pt-2', true);
    toggleClass(navCopy, 'hidden', false);
    toggleClass(nav, 'navbar-scroll-bg', true);
  } else if (heroPosition > -50) {
    toggleClass(nav, 'sticky', false);
    toggleClass(navCopy, 'hidden', true);
    toggleClass(navCopy, 'pt-2', false);
    toggleClass(nav, 'navbar-scroll-bg', false);
    toggleClass(nav, 'pt-2', false);
  }
}, { passive: true });

function toggleClass(element, className, add) {
  if (add) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let colorSpans = document.querySelectorAll(".product-colors span");
  let h2Element = document.querySelector(".container .details .content h2");

  colorSpans.forEach(function (span) {
    span.addEventListener("click", function () {
      // Usuń klasę "active" ze wszystkich elementów <span> z klasą "product-colors"
      colorSpans.forEach(function (el) {
        el.classList.remove("active");
      });

      // Dodaj klasę "active" do aktualnie klikniętego elementu <span>
      this.classList.add("active");
      var dataSet = this.getAttribute("data-set");

      // Ustaw tekst w elemencie h2 na podstawie wartości data-set
      h2Element.innerHTML = "Zestaw " + dataSet;

      // Pobierz wartości atrybutów data-color-sec, data-color-primary i data-pic z klikniętego elementu <span>
      var dataColorSec = this.getAttribute("data-color-sec");
      var dataColorPrimary = this.getAttribute("data-color-primary");
      var dataPic = this.getAttribute("data-pic");

      // Ustaw style i źródło obrazka na podstawie pobranych wartości
      document.body.style.background = dataColorPrimary;
      document.querySelector(".content h2").style.color = dataColorSec;
      document.querySelector(".content h3").style.color = dataColorSec;
      document.querySelector(".container .imgBx").style.background = dataColorSec;
      document.querySelector(".container .details button").style.background = dataColorSec;
      document.querySelector(".imgBx img").src = dataPic;

      // Zaktualizuj pozostałe elementy
      var spanElement = document.querySelector(".container .details .content .span");
      var pElement = document.querySelector(".container .details .content .description");
      spanElement.innerHTML = "Zestaw " + dataSet + " Zestaw " + dataSet;
      //pElement.textContent = "Zestaw"
    });
  });
});
