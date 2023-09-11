<template>
    <div class="w-full overflow-clip">
        <h1 class="text-xl font-bold">Selected Task</h1>
        <div class="flex items-start gap-x-3 pb-1">
            <p class="text-sm font-semibold leading-6 text-gray-900">
                {{ selectedTask?.taskName || selectedTask?.id }}
            </p>
            <p
                :class="[
                    statuses[selectedTask?.status],
                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                ]"
            >
                {{ selectedTask?.status }}
            </p>
        </div>
        <div class="flex items-start gap-x-3 text-xs leading-5 text-gray-500">
            <p class="truncate">
                Published at
                {{ selectedTask?.createdAt || selectedTask?.created }}
            </p>

            <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                <circle cx="1" cy="1" r="1" />
            </svg>
            <p class="truncate">
                {{
                    timestampToHuman(
                        selectedTask?.createdAt || selectedTask?.created
                    )
                }}
            </p>
        </div>
        <div class="mt-4">
            <h3 class="text-md font-medium">Payload</h3>
            <div class="my-2">
                <pre
                    class="text-xs mb-2 text-gray-500 break-words whitespace-pre-wrap"
                    >{{ decodedPayload }}</pre
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTasksComposable } from "@/composables/tasksComposable";
const { timestampToHuman } = useTasksComposable();
const props = defineProps({
    selectedTask: {
        type: Object,
        required: false
    }
});
const decodedPayload = computed(() => {
    if (props.selectedTask?.payload) {
        function base64Decode(str: string) {
            try {
                return decodeURIComponent(atob(str));
            } catch (error) {
                return str;
            }
        }

        return base64Decode(props.selectedTask.payload);
    }
    return "";
});

const statuses: any = {
    "task-delivered": "text-green-700 bg-green-50 ring-green-600/20",
    "task-enqueued": "text-gray-600 bg-gray-50 ring-gray-500/10",
    "task-failed": "text-red-800 bg-red-50 ring-red-600/20"
};
</script>
