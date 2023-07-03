<script setup lang="ts">
import {
    signInWithPopup,
    GoogleAuthProvider,
    OAuthCredential
} from "firebase/auth";
import { useFirebase } from "@/composables/firebaseComposable";
const { auth, provider } = useFirebase();

const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            console.log("result from signInWithGoogle: ", result);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential: OAuthCredential | null =
                GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            console.log("error from signInWithGoogle: ", error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};
</script>

<template>
    <main>
        <h1 class="title text-lg font-medium text-gray-700">Keue IO</h1>
        <button @click="signInWithGoogle">Sign in with Google</button>
    </main>
</template>
