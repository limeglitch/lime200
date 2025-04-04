// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDikvQqTbn8x2Yd2FiyzrMOVO7dO-r-3og",
    authDomain: "lime-4c195.firebaseapp.com",
    projectId: "lime-4c195",
    storageBucket: "lime-4c195.firebasestorage.app",
    messagingSenderId: "253428642396",
    appId: "1:253428642396:web:e0136755418eaf6534ac99",
    measurementId: "G-VV32PRPQGX"
};

// تهيئة Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// تحميل المصاريف عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function() {
    loadExpenses();
});

// حفظ المصاريف في Firestore
function saveExpense() {
    let amount = document.getElementById("amount").value;
    let note = document.getElementById("note").value;
    let date = new Date().toLocaleString(); // التاريخ والوقت

    if (amount === "" || note === "") {
        alert("يرجى إدخال جميع البيانات!");
        return;
    }

    let expense = {
        amount: amount,
        note: note,
        date: date,
        lawyer: "أحمد محمد" // غير الاسم لو فيه حسابات متعددة
    };

    // إضافة المصروف إلى Firestore
    db.collection("expenses").add(expense)
        .then(() => {
            alert("تم إضافة المصروف بنجاح");
            loadExpenses();
        })
        .catch((error) => {
            console.error("خطأ في إضافة المصروف: ", error);
        });
}

// تحميل المصاريف من Firestore
function loadExpenses() {
    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    db.collection("expenses").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let exp = doc.data();
                let li = document.createElement("li");
                li.textContent = `${exp.date} - ${exp.amount} جنيه - ${exp.note}`;
                expenseList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error("خطأ في تحميل المصاريف: ", error);
        });
}
