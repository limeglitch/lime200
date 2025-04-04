const admin = require('firebase-admin');
const fs = require('fs');

// تحميل مفتاح الخدمة
const serviceAccount = require('./serviceAccountKey.json');

// تهيئة Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function assignRolesToUsers() {
  try {
    const usersSnapshot = await db.collection('users').get();

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      const uid = doc.id;
      const role = userData.role;

      if (!role) {
        console.log(`❌ المستخدم ${uid} ليس له دور.`);
        continue;
      }

      const userRecord = await admin.auth().getUser(uid);
      const existingClaims = userRecord.customClaims || {};

      if (existingClaims.role === role) {
        console.log(`✅ الدور '${role}' موجود مسبقًا للمستخدم ${uid}.`);
        continue;
      }

      await admin.auth().setCustomUserClaims(uid, { role });
      console.log(`🎯 تم تعيين الدور '${role}' للمستخدم ${uid}.`);
    }

    console.log('🚀 تم الانتهاء من تعيين الأدوار.');
  } catch (error) {
    console.error('حدث خطأ أثناء تعيين الأدوار:', error);
  }
}

assignRolesToUsers();
