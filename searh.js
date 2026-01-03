document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  const cards = document.querySelectorAll(".product-card");

  if (!input) return;

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase().trim();
    results.innerHTML = "";

    if (!value) return;

    cards.forEach(card => {
      const title = card.querySelector("h4")?.innerText.toLowerCase();
      if (title && title.includes(value)) {
        const div = document.createElement("div");
        div.textContent = card.querySelector("h4").innerText;
        results.appendChild(div);
      }
    });
  });
});