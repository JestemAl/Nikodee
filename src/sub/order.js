
document.addEventListener("DOMContentLoaded", function () {
    let colorSpans = document.querySelectorAll(".product-colors span");
    let h2Element = document.querySelector(".container .details .content h2");
    let pElement = document.querySelector(".container .details .content .description");
    let h3Element = document.querySelector(".container .details .content h3");

    colorSpans.forEach(function (span) {
        span.addEventListener("click", function () {
            colorSpans.forEach(function (el) {
                el.classList.remove("active");
            });

            this.classList.add("active");
            var dataSet = this.getAttribute("data-set");

            h2Element.innerHTML = "Zestaw " + dataSet;

            var dataColorSec = this.getAttribute("data-color-sec");
            var dataColorPrimary = this.getAttribute("data-color-primary");
            var dataPic = this.getAttribute("data-pic");
            var cena = dataSet * 100; // Zakładam, że cena zależy od numeru zestawu

            document.body.style.background = dataColorPrimary;
            document.querySelector(".content h2").style.color = dataColorSec;
            document.querySelector(".content h3").style.color = dataColorSec;
            document.querySelector(".container .imgBx").style.background = dataColorSec;
            document.querySelector(".container .details button").style.background = dataColorSec;
            document.querySelector(".imgBx img").src = dataPic;
            h3Element.innerHTML = "... zł";

            // Zaktualizuj pozostałe elementy na podstawie numeru zestawu
            if (dataSet === "1") {
                pElement.textContent = "Nasz zestaw edukacyjny to kompletny pakiet do nauki gry na instrumencie muzycznym. Zawiera 1 moduł stanowiskowy dla nauczyciela i 2 moduły stanowiskowe dla uczniów, co pozwala na interaktywną naukę w małych grupach. To idealne rozwiązanie dla nauczycieli i uczniów pragnących doskonalić swoje umiejętności muzyczne.";
            } else if (dataSet === "2") {
                pElement.textContent = "Nasz zestaw edukacyjny to kompletny pakiet do nauki gry na instrumencie muzycznym. Zawiera 1  moduł stanowiskowy dla nauczyciela i 4 moduły stanowiskowe dla uczniów, co pozwala na interaktywną naukę w małych grupach. To idealne rozwiązanie dla nauczycieli i uczniów pragnących doskonalić swoje umiejętności muzyczne.";
            } else if (dataSet === "3") {
                pElement.textContent = "Nasz zestaw edukacyjny to kompletny pakiet do nauki gry na instrumencie muzycznym. Zawiera 1 moduł stanowiskowy dla nauczyciela i 8 moduły stanowiskowe dla uczniów, co pozwala na interaktywną naukę w małych grupach. To idealne rozwiązanie dla nauczycieli i uczniów pragnących doskonalić swoje umiejętności muzyczne.";
            }
        });
    });
});

