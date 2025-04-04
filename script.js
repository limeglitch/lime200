<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📂 متابعة القضايا القديمة</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .header { background-color: #4CAF50; color: white; padding: 15px; text-align: center; }
        .container { margin: 20px; }
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid black; }
        th, td { padding: 10px; text-align: center; }
        button { background-color: #4CAF50; color: white; padding: 10px; border: none; cursor: pointer; }
    </style>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"></script>
</head>
<body>

    <div class="header">
        <div class="office-name">📌 مكتب محمد منطاوي</div>
        <div class="developer">🚀 تطوير Lime Glitch</div>
    </div>

    <div class="container">
        <h2>📂 القضايا القديمة</h2>
        <button onclick="loadCases()">تحميل القضايا</button>
        <table id="casesTable">
            <thead>
                <tr>
                    <th>رقم القضية</th>
                    <th>اسم العميل</th>
                    <th>اسم المحكمة</th>
                    <th>اسم المحامي</th>
                    <th>حالة القضية</th>
                </tr>
            </thead>
            <tbody id="casesBody"></tbody>
        </table>
    </div>

    <script>
        // إعداد Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyDikvQqTbn8x2Yd2FiyzrMOVO7dO-r-3og",
            authDomain: "lime-4c195.firebaseapp.com",
            projectId: "lime-4c195",
            storageBucket: "lime-4c195.appspot.com",
            messagingSenderId: "253428642396",
            appId: "1:253428642396:web:e0136755418eaf6534ac99",
            measurementId: "G-VV32PRPQGX"
        };
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore(app);

        function loadCases() {
            db.collection("cases").get().then((querySnapshot) => {
                const caseTable = document.getElementById("casesBody");
                caseTable.innerHTML = '';
                querySnapshot.forEach((doc) => {
                    const caseData = doc.data();
                    const newRow = caseTable.insertRow();
                    newRow.innerHTML = `
                        <td>${caseData.caseNumber}</td>
                        <td>${caseData.clientName}</td>
                        <td>${caseData.courtName}</td>
                        <td>${caseData.lawyerName}</td>
                        <td class="status">${caseData.caseStatus}</td>
                    `;
                });
            });
        }

        function addCase(caseNumber, clientName, courtName, lawyerName, caseStatus) {
            db.collection("cases").add({
                caseNumber: caseNumber,
                clientName: clientName,
                courtName: courtName,
                lawyerName: lawyerName,
                caseStatus: caseStatus
            }).then(() => {
                loadCases();
            });
        }
    </script>
</body>
</html>
