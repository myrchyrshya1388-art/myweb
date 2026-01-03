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
