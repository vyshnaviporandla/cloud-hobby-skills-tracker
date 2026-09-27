const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

function dayKey(value) {
  const d = value?.toDate ? value.toDate() : new Date(value || Date.now());
  return d.toISOString().slice(0, 10);
}

exports.onLogCreate = onDocumentCreated("users/{uid}/logs/{logId}", async (event) => {
  const { uid } = event.params;
  const log = event.data.data();
  const statsRef = db.doc(`users/${uid}/stats/main`);
  const old = (await statsRef.get()).data() || {};
  const minutes = Number(log.minutes || 0);
  const today = dayKey(log.date || log.practiced_at);
  const last = old.lastLogDate || null;

  let streak = Number(old.streak || 0);
  if (!last) streak = 1;
  else {
    const diff = Math.round((new Date(today) - new Date(last)) / 86400000);
    if (diff === 0) streak = streak;
    else if (diff === 1) streak += 1;
    else streak = 1;
  }

  await statsRef.set({
    totalMinutes: Number(old.totalMinutes || 0) + minutes,
    weeklyMinutes: Number(old.weeklyMinutes || 0) + minutes,
    streak,
    lastLogDate: today,
    badges: {
      ...(old.badges || {}),
      streak_7: streak >= 7,
      minutes_1000: Number(old.totalMinutes || 0) + minutes >= 1000
    },
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });
});

// Minimal REST endpoint required by the project specification.
// Firebase Auth/Firestore SDK is used by the frontend for most operations;
// this endpoint demonstrates a serverless REST API layer.
exports.health = onRequest((req, res) => {
  res.status(200).json({ service: "Cloud Hobby & Skills Tracker", status: "ok" });
});
