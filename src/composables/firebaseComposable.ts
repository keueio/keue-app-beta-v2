import { ref } from "vue";
import { initializeApp } from "firebase/app";
import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
    getToken
} from "firebase/app-check";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    OAuthCredential,
    GithubAuthProvider
} from "firebase/auth";

const tenantId = import.meta.env.VITE_FIREBASE_TENANT_ID || "users-g0l30";
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || "keue-dev";
const RECAPTCHA_KEY = import.meta.env.VITE_FIREBASE_RECAPTCHA_KEY || "";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: PROJECT_ID,
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    appId: "1:219374522857:web:1957bd9c8479074b0cbb78"
};

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user");
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.tenantId = tenantId;
const db = getFirestore(app);
console.log("firebaseConfig", firebaseConfig);
export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_KEY),
    isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});

const currentUser: any = ref(null);

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("result from signInWithGoogle: ", result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential: OAuthCredential | null =
            GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        currentUser.value = result.user;
        return result;
    } catch (error: any) {
        console.log("error from signInWithGoogle: ", error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential_1 = GoogleAuthProvider.credentialFromError(error);
        throw error;
    }
};

const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential: any = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("signin wiht github: ", result);
        // The signed-in user info.
        const user = result.user;
        currentUser.value = user;
        return result;
    } catch (error: any) {
        console.log("error from signInWithGithub: ", error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential_1 = GithubAuthProvider.credentialFromError(error);
        throw error;
    }
};

const signOut = async () => {
    return await auth.signOut();
};
export const useFirebase = () => {
    return {
        app,
        db,
        auth,
        provider: googleProvider,
        currentUser,
        appCheck,
        getToken,
        signInWithGoogle,
        signInWithGithub,
        signOut
    };
};
