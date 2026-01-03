function openMenu() {
    document.getElementById("drawer").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeMenu() {
    document.getElementById("drawer").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}
console.log("cart.js loaded");
function toggleMore() {
    const list = document.getElementById("more-list");
    const arrow = document.getElementById("more-arrow");

    list.classList.toggle("open");

    if (arrow) {
        arrow.style.transform = list.classList.contains("open")
            ? "rotate(90deg)"
            : "rotate(0deg)";
    }
}