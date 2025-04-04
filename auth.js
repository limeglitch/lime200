// بيانات المستخدمين الافتراضية
const users = [
    { username: "admin", password: "01010993077", role: "admin" },
    { username: "lawyer1", password: "123456", role: "lawyer" },
    { username: "lawyer2", password: "654321", role: "lawyer" }
];

// حفظ بيانات المستخدمين في localStorage لو مش متخزنة
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}
