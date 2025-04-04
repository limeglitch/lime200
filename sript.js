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
const auth = firebase.auth();

// تحميل البيانات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
    document.getElementById("login-btn")?.addEventListener("click", function (event) {
        event.preventDefault(); // منع تحديث الصفحة
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let errorMessage = document.getElementById("error-message");

        loginUser(username, password, errorMessage);
    });

    document.getElementById("logout-btn")?.addEventListener("click", function () {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("خطأ في تسجيل الخروج: ", error);
        });
    });
});

// تسجيل الدخول للمستخدم
function loginUser(username, password, errorMessage) {
    auth.signInWithEmailAndPassword(username, password)
        .then(userCredential => {
            let user = userCredential.user;
            db.collection("users").where("email", "==", user.email).get()
                .then(querySnapshot => {
                    let userDoc = querySnapshot.docs[0].data();
                    localStorage.setItem("loggedInUser", JSON.stringify(userDoc));
                    window.location.href = (userDoc.role === "admin") ? "admin_dashboard.html" : "lawyer_dashboard.html";
                }).catch((error) => {
                    errorMessage.textContent = "خطأ في جلب بيانات المستخدم!";
                    console.error("Error getting user data: ", error);
                });
        })
        .catch((error) => {
            errorMessage.textContent = "خطأ في اسم المستخدم أو كلمة المرور!";
            console.error("Login error: ", error);
        });
}

// تحميل بيانات المستخدمين من Firestore
function loadUsers() {
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let user = doc.data();
            if (user.role === "admin") {
                localStorage.setItem("users", JSON.stringify([user]));
            }
        });
    });
}

// طلب صلاحية الوصول للمشرف
function requestAdminAccess() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;

    let request = {
        username: loggedInUser.username,
        request: "طلب الوصول إلى إدارة العملاء"
    };

    db.collection("accessRequests").add(request)
        .then(() => {
            alert("✅ تم إرسال الطلب إلى الأدمن!");
        }).catch((error) => {
            console.error("Error sending access request: ", error);
        });
}

// عرض طلبات الوصول
function viewRequests() {
    let requestsList = document.getElementById("requests-list");
    if (!requestsList) return;

    db.collection("accessRequests").get()
        .then(querySnapshot => {
            requestsList.innerHTML = "";
            querySnapshot.forEach(doc => {
                let req = doc.data();
                let li = document.createElement("li");
                li.textContent = `${req.username}: ${req.request}`;
                let approveBtn = document.createElement("button");
                approveBtn.textContent = "✔️ موافقة";
                approveBtn.onclick = () => {
                    approveAccess(req.username, doc.id);
                };
                li.appendChild(approveBtn);
                requestsList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error("Error getting requests: ", error);
        });
}

// منح صلاحية الوصول
function approveAccess(username, requestId) {
    db.collection("users").where("username", "==", username).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let userRef = doc.ref;
                userRef.update({ role: "admin" })
                    .then(() => {
                        db.collection("accessRequests").doc(requestId).delete()
                            .then(() => {
                                alert(`✅ تم منح ${username} صلاحية الوصول`);
                                viewRequests(); // تحديث القائمة
                            });
                    })
                    .catch((error) => {
                        console.error("Error approving access: ", error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error getting user: ", error);
        });
}

// إضافة زر جديد للمستخدم
function addNewButton() {
    let buttonName = prompt("🆕 أدخل اسم الزر الجديد:");
    let buttonLink = prompt("🔗 أدخل الرابط أو الصفحة التي يفتحها الزر:");

    if (buttonName && buttonLink) {
        let newButton = document.createElement("button");
        newButton.textContent = buttonName;
        newButton.onclick = function() {
            window.location.href = buttonLink;
        };

        document.getElementById("custom-buttons").appendChild(newButton);
        alert("✅ تم إضافة الزر بنجاح!");
    } else {
        alert("⚠️ يجب إدخال بيانات صحيحة!");
    }
}
