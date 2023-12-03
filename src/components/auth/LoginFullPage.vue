<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
    <div
        class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="h-14 w-auto mx-auto" src="/logo.png" alt="Keue IO" />
            <h2
                class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
                Get me back into my account
            </h2>
            <p class="mt-2 text-sm text-center leading-6 text-gray-500">
                Not a member?
                {{ " " }}
                <a
                    href="#"
                    class="font-semibold text-primary-600 hover:text-primary-500"
                    >What's up with that?<br />Start now for forever free
                    tier</a
                >
            </p>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6">
                <div class="flex justify-center">
                    <GoogleLoginButton
                        @click="loginWithGoogle"
                    ></GoogleLoginButton>
                </div>
                <div class="flex justify-center">
                    <GithubLoginButton
                        @click="loginWithGithub"
                    ></GithubLoginButton>
                </div>
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                Free forever limits.
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import GoogleLoginButton from "@/components/auth/GoogleLoginButton.vue";
import GithubLoginButton from "@/components/auth/GithubLoginButton.vue";
import { useFirebase } from "@/composables/firebaseComposable";
const { signInWithGoogle, signInWithGithub } = useFirebase();
const loginWithGoogle = async () => {
    await signInWithGoogle();
    window.location.href = "/";
};
const loginWithGithub = async () => {
    await signInWithGithub();
    window.location.href = "/";
};
</script>
