import { ref } from "vue";
import { initializeApp } from "firebase/app";
import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
    getToken
} from "firebase/app-check";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const tenantId = import.meta.env.VITE_FIREBASE_TENANT_ID || "users-g0l30";
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || "keue-dev";
const RECAPTCHA_KEY = import.meta.env.VITE_FIREBASE_RECAPTCHA_KEY || "";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: PROJECT_ID,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    appId: "1:219374522857:web:1957bd9c8479074b0cbb78"
};

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.tenantId = tenantId;
const db = getFirestore(app);
console.log("firebaseConfig", firebaseConfig);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_KEY),
    isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});

const currentUser = ref(null);
export const useFirebase = () => {
    return { app, db, auth, provider, currentUser, appCheck, getToken };
};
