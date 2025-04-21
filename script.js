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

    document.getElementById('kontaktForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Verhindert das Standard-Formularverhalten (Seitenreload)

        const formData = new FormData(this); // Holt die Formulardaten
        const data = Object.fromEntries(formData.entries()); // Konvertiert FormData in ein Objekt

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Zeige das Overlay bei Erfolg
                const overlay = document.getElementById('successOverlay');
                overlay.style.display = 'block';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 3000); // Blendet das Overlay nach 3 Sekunden aus
            } else {
                alert('Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.');
            }
        } catch (error) {
            console.error('Fehler:', error);
            alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
        }
    });
});