import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const tenantId = "users-g0l30";
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || "keue-dev";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: PROJECT_ID,
    authDomain: `${PROJECT_ID}.firebaseapp.com`
};

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.tenantId = tenantId;
const db = getFirestore(app);
export const useFirebase = () => {
    return { app, db, auth, provider };
};
