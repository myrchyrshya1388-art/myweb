console.log("SEARCH JS LOADED");

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (!searchInput || !searchResults) {
  console.error("Search elements not found");
}

const products = [
  { name: "پردازنده i7", link: "product-i7.html" },
  { name: "Xbox Series X", link: "xbox.html" },
  { name: "هارد HDD", link: "hdd.html" },
  { name: "پردازنده Ryzen", link: "ryzen.html" }
];

searchInput.addEventListener("input", function () {
  const value = this.value.trim().toLowerCase();
  searchResults.innerHTML = "";

  if (!value) return;

  products
    .filter(p => p.name.toLowerCase().includes(value))
    .forEach(p => {
      const a = document.createElement("a");
      a.href = p.link;
      a.textContent = p.name;
      a.className = "search-item";
      searchResults.appendChild(a);
    });
});
function openMenu() {
  document.getElementById("drawer").classList.add("active");
  document.getElementById("overlay").classList.add("active");
}

function closeMenu() {
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}