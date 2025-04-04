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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// دالة لإضافة مستخدم جديد
function addUser(username, email, password, role) {
    // إنشاء حساب جديد باستخدام البريد الإلكتروني وكلمة المرور
    auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            const user = userCredential.user;

            // إضافة البيانات إلى قاعدة بيانات Firestore
            db.collection("users").doc(user.uid).set({
                username: username,
                email: email,
                role: role,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(function() {
                console.log("تم إنشاء الحساب بنجاح!");
            })
            .catch(function(error) {
                console.error("خطأ في إضافة المستخدم: ", error);
            });
        })
        .catch(function(error) {
            console.error("خطأ في إنشاء الحساب: ", error);
        });
}

// استخدام الدالة لإضافة حساب جديد
const username = "newUser";  // اسم المستخدم
const email = "newUser@example.com";  // البريد الإلكتروني
const password = "userPassword123";  // كلمة المرور
const role = "lawyer";  // الدور (يمكن أن يكون "admin" أو "lawyer")

// استدعاء الدالة لإنشاء المستخدم
addUser(username, email, password, role);
