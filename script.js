document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const nav = document.querySelector("header nav");
    const navLinks = document.querySelectorAll("header nav ul li a");

    // Toggle Navigation beim Klicken auf das Hamburger-Menü
    hamburgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Navigation schließen, wenn ein Link angeklickt wird
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    const projektItems = document.querySelectorAll(".projekt-item");

    projektItems.forEach(item => {
        const images = item.querySelectorAll(".projekt-gallery img");
        const prevButton = item.querySelector(".prev");
        const nextButton = item.querySelector(".next");
        let currentIndex = 0;

        // Funktion zum Anzeigen des aktuellen Bildes
        const showImage = (index) => {
            images.forEach((img, i) => {
                img.classList.toggle("active", i === index);
            });
        };

        // Event-Listener für die Pfeile
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        // Initiales Bild anzeigen
        showImage(currentIndex);
    });
});