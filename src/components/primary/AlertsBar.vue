<template>
    <div class="fixed bottom-0 left-0 w-full p-10">
        <div
            v-if="alerts && alerts.length > 0"
            class="rounded-md bg-yellow-50 p-4"
        >
            <div class="flex">
                <div class="flex-shrink-0">
                    <CheckCircleIcon
                        class="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                    />
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-yellow-800">
                        Successfully uploaded
                    </p>
                </div>
                <div class="ml-auto pl-3">
                    <div class="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            class="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                        >
                            <span class="sr-only">Dismiss</span>
                            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CheckCircleIcon, XMarkIcon } from "@heroicons/vue/20/solid";
const alerts = [];
</script>
