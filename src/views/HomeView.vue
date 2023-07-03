<script setup lang="ts">
import { useFirebase } from "@/composables/firebaseComposable";
import { onMounted } from "vue";
const { appCheck } = useFirebase();
onMounted(() => {});
</script>

<template>
    <main>
        <h1 class="title text-lg font-medium text-gray-700">Your queues</h1>
    </main>
</template>
