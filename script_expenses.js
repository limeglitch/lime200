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

document.addEventListener("DOMContentLoaded", function () {
    const usersList = document.getElementById("users-list");
    const expensesList = document.getElementById("expenses-list");

    // جلب قائمة المستخدمين من Firestore
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let user = doc.data();
            let li = document.createElement("li");
            li.textContent = user.name;
            li.style.cursor = "pointer";
            li.onclick = () => showExpenses(user.expenses);
            usersList.appendChild(li);
        });
    }).catch((error) => {
        console.log("Error getting users: ", error);
    });

    // وظيفة عرض المصاريف
    function showExpenses(expenses) {
        expensesList.innerHTML = ""; // مسح القائمة السابقة
        expenses.forEach(expense => {
            let li = document.createElement("li");
            li.textContent = expense;
            expensesList.appendChild(li);
        });
    }
});
