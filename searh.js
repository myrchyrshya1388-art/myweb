document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const products = document.querySelectorAll(".product-card");

  console.log("searchInput:", searchInput);
  console.log("products found:", products.length);

  if (!searchInput || products.length === 0) {
    console.warn("Search not initialized");
    return;
  }

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();

    products.forEach(product => {
      const name =
        product.dataset.name ||
        product.textContent.toLowerCase();

      if (name.includes(value)) {
        product.style.removeProperty("display"); // 👈 مهم
      } else {
        product.style.display = "none";
      }
    });
  });
});
