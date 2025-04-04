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

document.addEventListener("DOMContentLoaded", function() {
    loadAllExpenses();
});

// تحميل جميع المصاريف من Firebase Firestore
function loadAllExpenses() {
    const expensesContainer = document.getElementById("expenses-container");
    expensesContainer.innerHTML = "";

    db.collection("expenses").get().then((querySnapshot) => {
        let lawyers = {};

        querySnapshot.forEach((doc) => {
            let exp = doc.data();
            if (!lawyers[exp.lawyer]) {
                lawyers[exp.lawyer] = [];
            }
            lawyers[exp.lawyer].push(exp);
        });

        for (let lawyer in lawyers) {
            let total = lawyers[lawyer].reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

            let div = document.createElement("div");
            div.innerHTML = `
                <h3>⚖️ ${lawyer}</h3>
                <ul>
                    ${lawyers[lawyer].map(exp => `<li>${exp.date} - ${exp.amount} جنيه - ${exp.note}</li>`).join("")}
                </ul>
                <h4>💰 إجمالي المصاريف: ${total} جنيه</h4>
                <hr>
            `;
            expensesContainer.appendChild(div);
        }
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

// تسجيل الخروج
document.getElementById("logout-btn").addEventListener("click", function() {
    localStorage.removeItem("userType"); // حذف بيانات تسجيل الدخول من localStorage
    window.location.href = "login.html"; // توجيه لصفحة تسجيل الدخول
});
