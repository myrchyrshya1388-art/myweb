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