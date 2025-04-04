document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // جلب المستخدمين من localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // ✅ حفظ اسم المستخدم فقط
    localStorage.setItem("currentUser", username);
    localStorage.setItem("currentUserRole", user.role);

    // تحويل المستخدم حسب نوعه
    if (user.role === "admin") {
      window.location.href = "admin_dashboard.html";
    } else if (user.role === "lawyer") {
      window.location.href = "lawyer_dashboard.html";
    } else {
      alert("❌ دور المستخدم غير معروف.");
    }
  } else {
    alert("❌ اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
});
