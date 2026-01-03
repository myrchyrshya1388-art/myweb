function generateCode() {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
}

// ثبت سفارش
function submitOrder(product, qty) {
  const now = new Date();

  const order = {
    trackingCode: generateCode(),
    items: [{ name: product, qty }],
    date: now.toLocaleDateString("fa-IR"),
    day: now.toLocaleDateString("fa-IR", { weekday: "long" }),
    time: now.toLocaleTimeString("fa-IR"),
    status: "ثبت شد"
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  return order.trackingCode;
}

// پیگیری سفارش
function trackOrder(code) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  return orders.find(o => o.trackingCode === code);
}