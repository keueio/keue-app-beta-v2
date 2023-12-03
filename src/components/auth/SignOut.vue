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
                Signing Out...
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useFirebase } from "@/composables/firebaseComposable";
const { signOut } = useFirebase();
onMounted(async () => {
    await signOut();
    setTimeout(() => {
        window.location.href = "/auth/login";
    }, 1000);
});
</script>
