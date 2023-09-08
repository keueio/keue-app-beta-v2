<template>
    <div class="w-full overflow-clip">
        <h1 class="text-xl font-bold">Selected Task</h1>
        <h2 class="text-md font-medium">{{ selectedTask?.taskName }}</h2>
        <div class="mt-4">
            <h3 class="text-md font-medium">Payload</h3>
            <div class="my-2">
                <pre class="text-xs">{{ selectedTask?.payload }}</pre>
                <pre class="text-xs">{{ decodedPayload }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
    selectedTask: {
        type: Object,
        required: false
    }
});
const decodedPayload = computed(() => {
    if (props.selectedTask?.payload) {
        function base64Decode(str: string) {
            return decodeURIComponent(atob(str));
        }

        return base64Decode(props.selectedTask.payload);
    }
    return "";
});
</script>
