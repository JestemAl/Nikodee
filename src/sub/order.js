
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