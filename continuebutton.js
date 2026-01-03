document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("continueBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {

    // ===== گرفتن اطلاعات فرم =====
    const fullname   = document.getElementById("fullname")?.value.trim();
    const mobile     = document.getElementById("mobile")?.value.trim();
    const nationalId = document.getElementById("nationalId")?.value.trim();
    const country    = document.getElementById("country")?.value;
    const province   = document.getElementById("province")?.value;
    const city       = document.getElementById("city")?.value.trim();
    const address    = document.getElementById("address")?.value.trim();
    const cardNumber = document.getElementById("cardNumber")?.value.replace(/\s/g, "");

    // ===== شرط‌ها =====
    if (!fullname) return alert("نام و نام خانوادگی را وارد کنید");
    if (!/^09\d{9}$/.test(mobile)) return alert("شماره موبایل معتبر نیست");
    if (!/^\d{10}$/.test(nationalId)) return alert("کد ملی معتبر نیست");
    if (!country) return alert("کشور را انتخاب کنید");
    if (!province) return alert("استان را انتخاب کنید");
    if (!city) return alert("نام شهر را وارد کنید");
    if (!address) return alert("آدرس و پلاک را وارد کنید");
    if (!/^\d{16}$/.test(cardNumber)) return alert("شماره کارت معتبر نیست");

    // ===== گرفتن محصولات سبد خرید =====
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.length) {
      alert("سبد خرید خالی است");
      return;
    }

    // ===== ساخت سفارش =====
    const trackingCode = "ORD-" + Date.now();

    const order = {
      trackingCode,
      status: "ثبت شد (پرداخت نشده)",
      createdAt: new Date().toISOString(),

      customer: {
        fullname,
        mobile,
        nationalId,
        country,
        province,
        city,
        address,
        cardNumber
      },

      items: cart.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      }))
    };

    // ===== ذخیره سفارش‌ها برای پنل ادمین =====
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // ===== ذخیره آخرین سفارش برای پیگیری =====
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // ===== خالی کردن سبد خرید =====
    localStorage.removeItem("cart");

    // ===== رفتن به صفحه پیگیری =====
    window.location.href = "success.html";
  });
});