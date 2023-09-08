<template>
    <ul role="list" class="divide-y divide-gray-100">
        <li
            v-if="tasks.length === 0"
            v-for="item in 5"
            :key="item"
            class="flex flex-col space-y-3 py-5"
        >
            <div class="flex flex-row space-x-4">
                <div
                    class="animate-pulse w-36 h-4 rounded-lg bg-gray-200"
                ></div>
                <div
                    class="animate-pulse w-24 h-4 rounded-md bg-gray-200"
                ></div>
            </div>
            <div class="flex flex-row space-x-4">
                <div
                    class="animate-pulse w-96 h-4 rounded-lg bg-gray-200"
                ></div>
            </div>
        </li>
        <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            v-model="selectedTask"
        ></TaskItem>
    </ul>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TaskItem from "@/components/tasks/TaskItem.vue";

const props = defineProps({
    tasks: {
        type: Array,
        required: false
    }
});

const selectedTask = ref(null);

const tasks: any = computed(() => props.tasks || []);
</script>
