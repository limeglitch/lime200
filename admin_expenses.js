// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDikvQqTbn8x2Yd2FiyzrMOVO7dO-r-3og",
  authDomain: "lime-4c195.firebaseapp.com",
  projectId: "lime-4c195",
  storageBucket: "lime-4c195.firebasestorage.app",
  messagingSenderId: "253428642396",
  appId: "1:253428642396:web:e0136755418eaf6534ac99",
  measurementId: "G-VV32PRPQGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// تحميل المصاريف من Firestore عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("lawyers-expenses");

  // جلب البيانات من Firestore
  const querySnapshot = await getDocs(collection(db, "lawyersExpenses"));
  
  if (querySnapshot.empty) {
    container.innerHTML = "<p>🚫 لا توجد بيانات مصاريف حالياً.</p>";
    return;
  }

  const lawyersData = {};

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const username = data.username;
    if (!lawyersData[username]) {
      lawyersData[username] = [];
    }
    lawyersData[username].push({
      note: data.note,
      amount: data.amount,
      date: data.date
    });
  });

  Object.keys(lawyersData).forEach(username => {
    const logs = lawyersData[username];
    let total = 0;

    const section = document.createElement("div");
    section.className = "lawyer-section";

    const title = document.createElement("h3");
    title.textContent = `📄 المحامي: ${username}`;
    section.appendChild(title);

    const ul = document.createElement("ul");
    logs.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `📝 ${item.note} - 💸 ${item.amount} جنيه - 🕒 ${item.date}`;
      ul.appendChild(li);
      total += parseFloat(item.amount);
    });

    const totalEl = document.createElement("p");
    totalEl.className = "total";
    totalEl.textContent = `الإجمالي: ${total} جنيه`;

    section.appendChild(ul);
    section.appendChild(totalEl);
    container.appendChild(section);
  });
});

// دالة لإضافة مصروف جديد
async function addExpense(username, amount, note) {
  const date = new Date().toISOString().split('T')[0]; // تاريخ اليوم

  try {
    await addDoc(collection(db, "lawyersExpenses"), {
      username,
      amount,
      note,
      date
    });
    alert("✅ تم إضافة المصروف بنجاح!");
    location.reload();  // إعادة تحميل الصفحة لعرض البيانات المحدثة
  } catch (error) {
    console.error("❌ خطأ في الإضافة: ", error);
  }
}

// دالة لحذف جميع المصاريف
async function deleteAllExpenses() {
  if (!confirm("⚠️ هل أنت متأكد من حذف جميع المصاريف؟")) return;

  try {
    const querySnapshot = await getDocs(collection(db, "lawyersExpenses"));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    alert("🗑️ تم حذف جميع المصاريف!");
    location.reload();  // إعادة تحميل الصفحة بعد الحذف
  } catch (error) {
    console.error("❌ خطأ أثناء الحذف: ", error);
  }
}
