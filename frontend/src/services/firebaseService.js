import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot,
  query, orderBy, serverTimestamp, setDoc, updateDoc, where
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uid = () => auth.currentUser?.uid;

export async function saveProfile(data) {
  if (!uid()) throw new Error("Please log in.");
  await setDoc(doc(db, "users", uid(), "profile", "main"), {
    ...data, email: auth.currentUser.email, updatedAt: serverTimestamp()
  }, { merge: true });
}

export async function getProfile(userId = uid()) {
  if (!userId) return null;
  const snap = await getDoc(doc(db, "users", userId, "profile", "main"));
  return snap.exists() ? snap.data() : null;
}

export async function uploadMedia(file, folder = "posts") {
  if (!uid()) throw new Error("Please log in.");
  if (!file) return null;
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) throw new Error("Only JPG, PNG or WEBP images are allowed.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be smaller than 5 MB.");
  const path = `${folder}/${uid()}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function createSkill(data) {
  return addDoc(collection(db, "users", uid(), "hobbies"), {
    ...data, createdAt: serverTimestamp()
  });
}

export async function getSkills() {
  const snap = await getDocs(query(collection(db, "users", uid(), "hobbies"), orderBy("createdAt", "desc")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateSkill(id, data) {
  await updateDoc(doc(db, "users", uid(), "hobbies", id), data);
}

export async function deleteSkill(id) {
  await deleteDoc(doc(db, "users", uid(), "hobbies", id));
}

export async function createGoal(data) {
  return addDoc(collection(db, "users", uid(), "goals"), {
    ...data, currentValue: 0, status: "ACTIVE", createdAt: serverTimestamp()
  });
}

export async function createPractice(data) {
  return addDoc(collection(db, "users", uid(), "logs"), {
    ...data, minutes: Number(data.minutes), createdAt: serverTimestamp()
  });
}

export async function getLogs() {
  const snap = await getDocs(query(collection(db, "users", uid(), "logs"), orderBy("createdAt", "desc")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export function listenStats(callback) {
  if (!uid()) return () => {};
  return onSnapshot(doc(db, "users", uid(), "stats", "main"), s => callback(s.exists() ? s.data() : {}));
}

export async function createPost({ text, skillId, file }) {
  const mediaUrl = file ? await uploadMedia(file, "posts") : null;
  return addDoc(collection(db, "posts"), {
    uid: uid(), text: text || "", skillId: skillId || null, mediaUrl,
    createdAt: serverTimestamp(), likes: 0, comments: 0, visibility: "public"
  });
}

export function listenFeed(callback) {
  return onSnapshot(query(collection(db, "posts"), orderBy("createdAt", "desc")), callback);
}

export async function toggleLike(postId, liked) {
  const likeRef = doc(db, "posts", postId, "likes", uid());
  const postRef = doc(db, "posts", postId);
  if (liked) {
    await deleteDoc(likeRef);
  } else {
    await setDoc(likeRef, { createdAt: serverTimestamp() });
  }
  const snap = await getDocs(collection(db, "posts", postId, "likes"));
  await updateDoc(postRef, { likes: snap.size });
}

export async function addComment(postId, text) {
  return addDoc(collection(db, "posts", postId, "comments"), {
    uid: uid(), text, createdAt: serverTimestamp()
  });
}

export async function getComments(postId) {
  const snap = await getDocs(query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "asc")));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deletePost(postId) {
  const post = await getDoc(doc(db, "posts", postId));
  if (!post.exists() || post.data().uid !== uid()) throw new Error("You can delete only your own posts.");
  await deleteDoc(doc(db, "posts", postId));
}
