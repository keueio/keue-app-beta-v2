<template>
    <li
        @click="openTask"
        class="flex items-center justify-between gap-x-6 py-5 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
    >
        <div class="min-w-0">
            <div class="flex items-start gap-x-3">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                    {{ task.taskName || task.id }}
                </p>
                <p
                    :class="[
                        statuses[task.status],
                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                    ]"
                >
                    {{ task.status }}
                </p>
            </div>
            <div
                class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
            >
                <!-- <p class="whitespace-nowrap">
                    Due on
                    <time :datetime="task.dueDateTime">{{ task.dueDate }}</time>
                </p>
                <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                    <circle cx="1" cy="1" r="1" />
                </svg> -->
                <p class="truncate">
                    Published at
                    {{ task.createdAt || task.created }}
                </p>

                <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                    <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="truncate">
                    {{ timestampToHuman(task.createdAt || task.created) }}
                </p>
            </div>
        </div>
        <div class="flex flex-none items-center gap-x-4">
            <a
                :href="task.href"
                @click="openTask"
                class="hidden cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:bg-gray-200 sm:block"
                >View task<span class="sr-only">, {{ task.name }}</span></a
            >
            <Menu as="div" class="relative flex-none">
                <MenuButton
                    class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                >
                    <span class="sr-only">Open options</span>
                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                </MenuButton>
                <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <MenuItems
                        class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                        <MenuItem v-slot="{ active }">
                            <a
                                href="#"
                                :class="[
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                ]"
                                >Edit<span class="sr-only"
                                    >, {{ task.name }}</span
                                ></a
                            >
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a
                                href="#"
                                :class="[
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                ]"
                                >Move<span class="sr-only"
                                    >, {{ task.name }}</span
                                ></a
                            >
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a
                                href="#"
                                :class="[
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                ]"
                                >Delete<span class="sr-only"
                                    >, {{ task.name }}</span
                                ></a
                            >
                        </MenuItem>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
    </li>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import { useTasksComposable } from "@/composables/tasksComposable";
import { useNavigation } from "@/composables/navigationComposable";
const { asideOpen } = useNavigation();
const { selectedTask, timestampToHuman } = useTasksComposable();

const props = defineProps({
    task: {
        type: Object,
        required: false
    }
});

const task: any = computed(() => props.task || {});

const openTask = () => {
    asideOpen.value = true;
    selectedTask.value = task.value;
};

const statuses: any = {
    "task-delivered": "text-green-700 bg-green-50 ring-green-600/20",
    "task-enqueued": "text-gray-600 bg-gray-50 ring-gray-500/10",
    "task-failed": "text-red-800 bg-red-50 ring-red-600/20"
};
</script>
