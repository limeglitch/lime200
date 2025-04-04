// استيراد المكتبات المطلوبة من Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// تكوين Firebase باستخدام بيانات مشروعك
const firebaseConfig = {
  apiKey: "AIzaSyDikvQqTbn8x2Yd2FiyzrMOVO7dO-r-3og",
  authDomain: "lime-4c195.firebaseapp.com",
  projectId: "lime-4c195",
  storageBucket: "lime-4c195.appspot.com", // تم تصحيح الرابط
  messagingSenderId: "253428642396",
  appId: "1:253428642396:web:e0136755418eaf6534ac99",
  measurementId: "G-VV32PRPQGX"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تهيئة Firestore
const db = getFirestore(app);

export { db };
