<template>
    <button
        type="button"
        @click="$emit('clicked')"
        :disabled="disabled"
        class="inline-flex items-center rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-not-allowed"
        :class="{ 'animate animate-pulse': loading }"
    >
        <!-- <SpinnerIcon></SpinnerIcon> -->
        <slot />
    </button>
</template>
<script setup lang="ts">
// import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";
const props = defineProps({
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    loading: {
        type: Boolean,
        required: false,
        default: false
    }
});
const emits = defineEmits(["clicked"]);
</script>
