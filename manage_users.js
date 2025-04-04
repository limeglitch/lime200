// إعداد Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

// إعداد بيانات Firebase الخاصة بك
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
const db = getFirestore(app);
const auth = getAuth(app);

// العناصر من HTML
const addUserButton = document.getElementById("add-user-btn");
const newUsernameInput = document.getElementById("new-username");
const newPasswordInput = document.getElementById("new-password");
const userRoleSelect = document.getElementById("user-role");
const userList = document.getElementById("user-list");
const logoutButton = document.getElementById("logout-btn");

// إضافة مستخدم جديد إلى Firebase Firestore
async function addUser(username, password, role) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: username,
      password: password,
      role: role
    });
    console.log("Document written with ID: ", docRef.id);
    loadUsers(); // تحديث القائمة بعد إضافة المستخدم
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// تحميل قائمة المستخدمين من Firebase
async function loadUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  userList.innerHTML = ''; // تفريغ القائمة

  querySnapshot.forEach((doc) => {
    const user = doc.data();
    const listItem = document.createElement("li");
    listItem.textContent = `اسم المستخدم: ${user.username}, الدور: ${user.role}`;
    userList.appendChild(listItem);
  });
}

// إضافة مستخدم عند الضغط على الزر
addUserButton.addEventListener("click", () => {
  const username = newUsernameInput.value;
  const password = newPasswordInput.value;
  const role = userRoleSelect.value;

  if (username && password) {
    addUser(username, password, role); // إضافة المستخدم إلى Firebase
    newUsernameInput.value = '';
    newPasswordInput.value = '';
  } else {
    alert("الرجاء ملء جميع الحقول");
  }
});

// تسجيل الخروج
logoutButton.addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
});

// تحميل المستخدمين عند تحميل الصفحة
loadUsers();
