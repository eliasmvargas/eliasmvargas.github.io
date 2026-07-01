const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// When the hamburger is clicked, toggle the 'active' class
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// When a user clicks a link, close the menu automatically
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});