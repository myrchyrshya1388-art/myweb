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


/* ===== افزودن به سبد خرید ===== */
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!Array.isArray(cart)) {
        cart = [];
    }

    cart.push({
        name: name,
        price: Number(price),
        image: image,
        qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("به سبد خرید اضافه شد");
}

/* ===== نمایش سبد خرید ===== */
function renderCart() {
    const container = document.getElementById("cart-items");
    const totalBox = document.getElementById("total");

    if (!container || !totalBox) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.textContent = "سبد خرید خالی است";
        totalBox.textContent = "";
        return;
    }

    cart.forEach((item, index) => {
        const row = document.createElement("div");
        row.style.marginBottom = "12px";
        
        const info = document.createElement("span");
        info.textContent =
            item.name + " - " +
            item.price.toLocaleString() + " تومان";

        const controls = document.createElement("div");
        controls.style.marginTop = "6px";

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "−";
        minusBtn.onclick = () => decreaseQty(index);

        const qtySpan = document.createElement("span");
        qtySpan.textContent = item.qty;
        qtySpan.style.margin = "0 10px";

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.onclick = () => increaseQty(index);

        controls.appendChild(minusBtn);
        controls.appendChild(qtySpan);
        controls.appendChild(plusBtn);

        row.appendChild(info);
        row.appendChild(controls);
        container.appendChild(row);

        total += item.price * item.qty;
    });

    totalBox.textContent =
        "جمع کل: " + total.toLocaleString() + " تومان";
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart(); // رفرش نمایش
}

function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1); // حذف کالا اگر صفر شد
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
document.addEventListener("DOMContentLoaded", renderCart);

function openProduct(productId) {
    window.location.href = "product.html?id=" + productId;
}
function isValidCard(number) {
    if (!/^\d{16}$/.test(number)) return false;

    let sum = 0;
    let alt = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let n = parseInt(number[i], 10);
        if (alt) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alt = !alt;
    }
    return sum % 10 === 0;
}



    // اگر همه پر بود → برو صفحه پرداخت
// ساخت کد پیگیری (مثلاً GC-834921)
function generateTrackingCode() {
    return "GC-" + Math.floor(100000 + Math.random() * 900000);
}
function trackOrder() {
    const inputEl = document.getElementById("trackInput");
    const resultEl = document.getElementById("trackResult");

    if (!inputEl || !resultEl) {
        return;
    }

    const input = inputEl.value.trim();
    const order = JSON.parse(localStorage.getItem("lastOrder"));

    if (!order) {
        resultEl.innerText = "هیچ سفارشی ثبت نشده است";
        return;
    }

    if (input === order.code) {
        resultEl.innerHTML = '   <strong>${order.status}</strong><br> تاریخ ثبت سفارش:  ${order.date}';
    } else {
        resultEl.innerText = "کد پیگیری نامعتبر است";
    }
}
function goToAccount() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // کاربر ثبت‌نام کرده
    window.location.href = "profil.html";
  } else {
    // کاربر ثبت‌نام نکرده
    window.location.href = "signup.html";
  }
}

(function loadProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  document.getElementById("username").value = user.username || "";
  document.getElementById("email").value = user.email || "";
  document.getElementById("mobile").value = user.mobile || "";
})();

// ذخیره اطلاعات کاربر
function saveProfile() {
  const user = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    mobile: document.getElementById("mobile").value.trim()
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("اطلاعات با موفقیت ذخیره شد ✅");
}
function toggleWishlist(btn) {
  btn.classList.toggle("active");
}
function changeImage(img) {
  document.getElementById("mainImage").src = img.src;
}

function toggleWishlist(btn) {
  btn.classList.toggle("active");
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("به سبد خرید اضافه شد");
}
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let current = 0;

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

document.querySelector(".next").onclick = () => {
  current = (current + 1) % slides.length;
  showSlide(current);
};

document.querySelector(".prev").onclick = () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
};

dots.forEach((dot,i)=>{
  dot.onclick = ()=> {
    current = i;
    showSlide(i);
  }
});

/* auto slide */
setInterval(()=>{
  current = (current + 1) % slides.length;
  showSlide(current);
},4000);
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");

  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const value = this.value.trim().toLowerCase();

    productCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
});
document.querySelectorAll(".color-option").forEach(option => {
  option.addEventListener("click", () => {
    // پاک کردن انتخاب قبلی
    document.querySelectorAll(".color-option").forEach(o => {
      o.classList.remove("active");
    });

    // فعال کردن انتخاب جدید
    option.classList.add("active");

    // ذخیره رنگ انتخاب‌شده
    const selectedColor = option.dataset.color;
    localStorage.setItem("selectedColor", selectedColor);
  });
});
document.querySelectorAll(".color-option").forEach(opt => {
  opt.addEventListener("click", () => {
    document
      .querySelectorAll(".color-option")
      .forEach(o => o.classList.remove("active"));

    opt.classList.add("active");
  });
});

// مدل‌ها
document.querySelectorAll(".model-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".model-btn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
  });
});
document.addEventListener("click", function (e) {
  // رنگ‌ها
  const color = e.target.closest(".color-option");
  if (color) {
    document.querySelectorAll(".color-option").forEach(c => c.classList.remove("active"));
    color.classList.add("active");
    e.stopPropagation();
    e.preventDefault();
  }

  // مدل‌ها
  const model = e.target.closest(".model-btn");
  if (model) {
    document.querySelectorAll(".model-btn").forEach(m => m.classList.remove("active"));
    model.classList.add("active");
    e.stopPropagation();
    e.preventDefault();
  }
}, true);