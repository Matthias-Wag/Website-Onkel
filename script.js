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
});