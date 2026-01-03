console.log("payment.js loaded");

const form = document.getElementById("paymentForm");

if (!form) {
  console.error("paymentForm NOT FOUND");
}

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("PAYMENT SUBMIT");

  const cardNumber = document.getElementById("cardNumber")?.value.replace(/\s/g, "");
  const cvv2 = document.getElementById("cvv2")?.value.trim();
  const expMonth = document.getElementById("expMonth")?.value.trim();
  const expYear = document.getElementById("expYear")?.value.trim();

  if (!/^\d{16}$/.test(cardNumber)) return alert("شماره کارت نامعتبر");
  if (!/^\d{3,4}$/.test(cvv2)) return alert("CVV2 نامعتبر");
  if (!/^\d{2}$/.test(expMonth) || !/^\d{2}$/.test(expYear)) return alert("تاریخ نامعتبر");

  console.log("REDIRECT TO SUCCESS");
  window.location.href = "success.html";
});