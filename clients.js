document.addEventListener("DOMContentLoaded", function () {
    // قراءة البيانات من localStorage (إذا كانت موجودة) أو تهيئة قائمة فارغة
    let clients = JSON.parse(localStorage.getItem("clients")) || [];
    let clientsList = document.getElementById("clients-list");

    // دالة لعرض قائمة العملاء في الصفحة
    function displayClients() {
        clientsList.innerHTML = "";  // مسح محتوى القائمة قبل الإضافة
        clients.forEach(client => {
            // إضافة العميل الجديد مع رابط لفتح الملف
            let li = document.createElement("li");
            li.innerHTML = `📁 ${client.name} - <a href="${client.doc}" target="_blank">📂 فتح الملف</a>`;
            clientsList.appendChild(li);
        });
    }

    // إضافة عميل جديد عند إرسال النموذج
    document.getElementById("add-client-form").addEventListener("submit", function (event) {
        event.preventDefault();  // منع إعادة تحميل الصفحة عند إرسال النموذج

        let clientName = document.getElementById("client-name").value;  // الحصول على اسم العميل
        let clientDoc = document.getElementById("client-doc").files[0];  // الحصول على الملف من المدخل

        // التأكد من رفع ملف
        if (!clientDoc) {
            alert("❌ الرجاء رفع مستند!");
            return;
        }

        // قراءة محتوى الملف باستخدام FileReader
        let reader = new FileReader();
        reader.onload = function () {
            // إضافة العميل إلى القائمة
            clients.push({ name: clientName, doc: reader.result });
            // تخزين البيانات في localStorage
            localStorage.setItem("clients", JSON.stringify(clients));
            // تحديث عرض العملاء
            displayClients();
        };
        // قراءة الملف كـ base64
        reader.readAsDataURL(clientDoc);
    });

    // عرض العملاء عند تحميل الصفحة
    displayClients();
});
