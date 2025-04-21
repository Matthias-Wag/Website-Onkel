document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const nav = document.querySelector("header nav");

    hamburgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});