/* ================== MENU ================== */
function openMenu() {
  document.getElementById("drawer")?.classList.add("active");
  document.getElementById("overlay")?.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  document.getElementById("drawer")?.classList.remove("active");
  document.getElementById("overlay")?.classList.remove("active");
  document.body.classList.remove("menu-open");
}

/* ================== MORE LIST ================== */
function toggleMore() {
  const list = document.getElementById("more-list");
  const arrow = document.getElementById("more-arrow");
  if (!list) return;

  list.classList.toggle("open");
  if (arrow) {
    arrow.style.transform = list.classList.contains("open")
      ? "rotate(90deg)"
      : "rotate(0deg)";
  }
}

/* ================== CART ================== */
function addToCart(name, price, image = "") {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price: Number(price), image, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("به سبد خرید اضافه شد");
}


/* ================== PAYMENT ================== */
function generateTrackingCode() {
  return "GC-" + Math.floor(100000 + Math.random() * 900000);
}

/* ================== PROFILE ================== */
function saveProfile() {
  const user = {
    username: document.getElementById("username")?.value || "",
    email: document.getElementById("email")?.value || "",
    mobile: document.getElementById("mobile")?.value || ""
  };
  localStorage.setItem("user", JSON.stringify(user));
  alert("ذخیره شد ✅");
}

/* ================== WISHLIST ================== */
function toggleWishlist(btn) {
  btn.classList.toggle("active");
}

/* ================== IMAGE CHANGE ================== */
function changeImage(img) {
  const main = document.getElementById("mainImage");
  if (main) main.src = img.src;
}

/* ================== DOM READY ================== */
document.addEventListener("DOMContentLoaded", () => {

  renderCart();

  /* ===== Slider ===== */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (slides.length) {
    let current = 0;

    const showSlide = i => {
      slides.forEach(s => s.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));
      slides[i].classList.add("active");
      dots[i]?.classList.add("active");
    };

    nextBtn && (nextBtn.onclick = () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });

    prevBtn && (prevBtn.onclick = () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });

    dots.forEach((dot, i) => dot.onclick = () => {
      current = i;
      showSlide(i);
    });

    setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 4000);
  }

  /* ===== Search ===== */
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    const cards = document.querySelectorAll(".product-card");
    searchInput.addEventListener("input", () => {
      const val = searchInput.value.toLowerCase();
      cards.forEach(c =>
        c.style.display = c.innerText.toLowerCase().includes(val)
          ? "block"
          : "none"
      );
    });
  }

  /* ===== Color & Model ===== */
  document.addEventListener("click", e => {
    const color = e.target.closest(".color-option");
    if (color) {
      document.querySelectorAll(".color-option").forEach(c => c.classList.remove("active"));
      color.classList.add("active");
    }

    const model = e.target.closest(".model-btn");
    if (model) {
      document.querySelectorAll(".model-btn").forEach(m => m.classList.remove("active"));
      model.classList.add("active");
    }
  });
});
