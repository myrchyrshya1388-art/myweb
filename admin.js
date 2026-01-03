document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("ordersTable");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (!orders.length) {
    table.innerHTML = `
      <tr>
        <td colspan="5" class="empty">هیچ سفارشی ثبت نشده</td>
      </tr>
    `;
    return;
  }

  table.innerHTML = "";

  orders.forEach((order, index) => {

    // تاریخ
    let dateStr = "-";
    let timeStr = "-";

    if (order.createdAt) {
      const date = new Date(order.createdAt);
      if (!isNaN(date)) {
        dateStr = date.toLocaleDateString("fa-IR");
        timeStr = date.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit"
        });
      }
    }

    // محصولات
    let itemsText = "";
    let items = order.items || [];

    if (!Array.isArray(items)) {
      items = [items];
    }

    items.forEach(item => {
      const qty = item.qty ?? item.quantity ?? 1;
      itemsText += `${item.name} × ${qty}<br>`;
    });

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.trackingCode}</td>
      <td>${order.customer?.fullname || "-"}</td>
      <td>${itemsText}</td>
      <td>${dateStr}<br>${timeStr}</td>
      <td>
        <select onchange="changeStatus(${index}, this.value)">
          <option ${order.status === "در حال پردازش" ? "selected" : ""}>در حال پردازش</option>
          <option ${order.status === "ارسال شد" ? "selected" : ""}>ارسال شد</option>
          <option ${order.status === "تحویل شد" ? "selected" : ""}>تحویل شد</option>
        </select>
      </td>
    `;
      

    table.appendChild(row);
  });
});

function changeStatus(index, value) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders[index].status = value;
  localStorage.setItem("orders", JSON.stringify(orders));
}