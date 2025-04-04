import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDikvQqTbn8x2Yd2FiyzrMOVO7dO-r-3og",
  authDomain: "lime-4c195.firebaseapp.com",
  projectId: "lime-4c195",
  storageBucket: "lime-4c195.appspot.com",
  messagingSenderId: "253428642396",
  appId: "1:253428642396:web:e0136755418eaf6534ac99",
  measurementId: "G-VV32PRPQGX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async function () {
    const usersList = document.getElementById("users-list");

    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        
        if (querySnapshot.empty) {
            usersList.innerHTML = "<p>❌ لا يوجد مستخدمين!</p>";
            return;
        }

        querySnapshot.forEach(async (docSnapshot) => {
            const user = docSnapshot.data();
            const userId = docSnapshot.id;
            const username = user.username || "🚫 غير معروف";
            let role = user.role && user.role.trim() !== "" ? user.role : "⚖️ محامي"; // تعيين المحامي كدور افتراضي

            // تحديث الدور في قاعدة البيانات إذا لم يكن موجودًا
            if (!user.role || user.role.trim() === "") {
                await updateDoc(doc(db, "users", userId), { role: "⚖️ محامي" });
            }

            let li = document.createElement("li");
            li.textContent = `👤 ${username} - ${role}`;
            usersList.appendChild(li);
        });
    } catch (error) {
        console.error("❌ خطأ أثناء تحميل الحسابات:", error);
        usersList.innerHTML = "<p>❌ فشل تحميل الحسابات!</p>";
    }
});
