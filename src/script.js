var navbar = document.getElementById("navbar");
var distanceFromTop = navbar.offsetTop;

function toggleStickyNavbar() {
    if (window.pageYOffset >= distanceFromTop) {
        navbar.classList.add("sticky");
        navbar.classList.add("bg-[#141414]");
        navbar.classList.remove("navbar-transparent-bg");
    } else {
        navbar.classList.remove("sticky");
        navbar.classList.remove("bg-[#141414]");
    }
}

window.addEventListener("scroll", function () {
    toggleStickyNavbar();
});

window.addEventListener("resize", function () {
    distanceFromTop = navbar.offsetTop;
    toggleStickyNavbar();
});

