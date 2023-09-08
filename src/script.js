const track = document.getElementById("image-track");

if (track) {
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

  window.onmousedown = e => handleOnDown(e);

  window.ontouchstart = e => handleOnDown(e.touches[0]);

  window.onmouseup = e => handleOnUp(e);

  window.ontouchend = e => handleOnUp(e.touches[0]);

  window.onmousemove = e => handleOnMove(e);

  window.ontouchmove = e => handleOnMove(e.touches[0]);
}

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

/**
 * order.html
 */

document.addEventListener("DOMContentLoaded", function () {
  // Pobierz wszystkie elementy .box
  const boxes = document.querySelectorAll(".box");

  // Dodaj obsługę kliknięcia dla każdego elementu .box
  boxes.forEach(function (box) {
    box.addEventListener("click", function () {
      // Usuń klasę "active" z wszystkich elementów .box
      boxes.forEach(function (box) {
        box.classList.remove("active");
      });

      // Dodaj klasę "active" tylko do klikniętego elementu .box
      this.classList.add("active");
    });
  });
});
