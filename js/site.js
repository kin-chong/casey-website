// Footer (single source of truth)
const footerOwner = "Casey Low";
const footerYear = new Date().getFullYear();
const footerText = `© ${footerYear} ${footerOwner}. All rights reserved.`;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-footer]").forEach(el => {
        el.textContent = footerText;
    });
});

function toggleDetails(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const openClass = "max-h-[500px]"; // adjust if your content is taller
    const closedClass = "max-h-0";

    if (el.classList.contains(closedClass)) {
        el.classList.remove(closedClass);
        el.classList.add(openClass);
    } else {
        el.classList.add(closedClass);
        el.classList.remove(openClass);
    }
}


const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
let menuOpen = false;

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(src) {
    lightbox.classList.remove("hidden");
    lightboxImg.src = src;

    lightboxImg.classList.remove("animate-popIn", "animate-popOut");
    void lightboxImg.offsetWidth; // force reflow
    lightboxImg.classList.add("animate-popIn");
}

function closeLightbox() {
    lightboxImg.classList.remove("animate-popIn");
    lightboxImg.classList.add("animate-popOut");

    lightboxImg.addEventListener("animationend", function handler() {
        lightbox.classList.add("hidden");
        lightboxImg.classList.remove("animate-popOut");
        lightboxImg.removeEventListener("animationend", handler);
    });
}

// Close when clicking outside image
if (lightbox) {
    lightbox.addEventListener("click", function(e) {
        if (e.target.id === "lightbox") {
            closeLightbox();
        }
    });
}

function openMenu() {
    menu.classList.remove("hidden", "translate-x-full");
    menu.classList.add("animate-slideIn");
    overlay.classList.remove("hidden");
    menuOpen = true;
}

function closeMenu() {
    menu.classList.remove("animate-slideIn");
    menu.classList.add("animate-slideOut");
    menu.addEventListener("animationend", function handler() {
        menu.classList.add("hidden", "translate-x-full");
        menu.classList.remove("animate-slideOut");
        menu.removeEventListener("animationend", handler);
    });
    overlay.classList.add("hidden");
    menuOpen = false;
}

btn.addEventListener("click", () => { menuOpen ? closeMenu() : openMenu(); });
overlay.addEventListener("click", () => { if (menuOpen) closeMenu(); });
