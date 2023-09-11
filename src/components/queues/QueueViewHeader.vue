<template>
    <div class="lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
            <div class="flex items-center gap-x-2">
                <CheckCircleIcon
                    class="w-8 h-8 fill-primary-500 -mr-1"
                ></CheckCircleIcon>
                <a
                    :href="`/app/${app}`"
                    class="curser-pointer hover:underline text-xl font-medium leading-7 text-gray-700 sm:truncate sm:text-xl sm:tracking-tight"
                >
                    {{ app }}
                </a>
                <p
                    class="text-2xl font-bold leading-7 text-gray-800 sm:truncate sm:text-2xl sm:tracking-tight"
                >
                    /
                </p>
                <p
                    class="text-2xl font-bold leading-7 text-gray-800 sm:truncate sm:text-2xl sm:tracking-tight"
                >
                    {{ keueName }}
                </p>
                <p
                    :class="[
                        statuses[state || 'RUNNING'],
                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-sm font-medium ring-1 ring-inset'
                    ]"
                >
                    {{ state }}
                </p>
            </div>
            <div
                v-if="false"
                class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
            >
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <BriefcaseIcon
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Full-time
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <MapPinIcon
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Remote
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <CurrencyDollarIcon
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    $120k &ndash; $140k
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarIcon
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                    Closing on January 9, 2020
                </div>
            </div>
        </div>
        <div class="mt-5 flex lg:ml-4 lg:mt-0">
            <span class="hidden sm:block">
                <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <PencilIcon
                        class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    Edit
                </button>
            </span>

            <span v-if="false" class="ml-3 hidden sm:block">
                <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <LinkIcon
                        class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    View
                </button>
            </span>

            <span class="sm:ml-3">
                <button
                    type="button"
                    @click="pauseKeue"
                    :disabled="pauseKeueLoading"
                    class="inline-flex items-center rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:bg-gray-400 disabled:hover:bg-gray-500"
                    :class="{ 'animate animate-pulse': pauseKeueLoading }"
                >
                    <PauseCircleIcon
                        class="-ml-0.5 mr-1.5 h-5 w-5"
                        aria-hidden="true"
                    />
                    Pause
                </button>
            </span>
            <span class="sm:ml-3">
                <button
                    type="button"
                    :disabled="pauseKeueLoading"
                    class="inline-flex items-center rounded-md bg-lime-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 disabled:bg-gray-400 disabled:hover:bg-gray-500"
                    :class="{ 'animate animate-pulse': pauseKeueLoading }"
                >
                    <PlayCircleIcon
                        class="-ml-0.5 mr-1.5 h-5 w-5"
                        aria-hidden="true"
                    />
                    Run
                </button>
            </span>

            <!-- Dropdown -->
            <Menu as="div" class="relative ml-3 sm:hidden">
                <MenuButton
                    class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                >
                    More
                    <ChevronDownIcon
                        class="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </MenuButton>

                <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <MenuItems
                        class="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <MenuItem v-slot="{ active }">
                            <a
                                href="#"
                                :class="[
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                ]"
                                >Edit</a
                            >
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a
                                href="#"
                                :class="[
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                ]"
                                >View</a
                            >
                        </MenuItem>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    PauseCircleIcon,
    PlayCircleIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon
} from "@heroicons/vue/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed } from "vue";
const props = defineProps({
    keueId: {
        type: String,
        required: true
    }
});

const app = computed(() => {
    return props.keueId.split("---")[0];
});

const keueName = computed(() => {
    return props.keueId.split("---")[1];
});

const {
    result: getKeueResult,
    refetch,
    loading: getKeueLoading
} = useQuery(
    gql`
        query getKeue($name: String!) {
            keue(name: $name) {
                name
                state
            }
        }
    `,
    {
        name: props.keueId
    }
);
console.log("props.keueId: ", props.keueId);
console.log("getKeueResult: ", getKeueResult);
const state = computed(() => {
    return getKeueResult.value?.keue?.state;
});
const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const statuses: any = {
    RUNNING: "text-green-700 bg-green-50 ring-green-600/20",
    "task-enqueued": "text-gray-600 bg-gray-50 ring-gray-500/10",
    "task-failed": "text-red-800 bg-red-50 ring-red-600/20"
};

// MUTATIONS

const { mutate: pauseKeue, loading: pauseKeueLoading } = useMutation(
    gql`
        mutation PauseKeue($pauseKeueInput: CreateKeueInput) {
            pauseKeue(input: $pauseKeueInput) {
                name
                state
            }
        }
    `,
    {
        pauseKeueInput: {
            app: app.value,
            name: props.keueId
        }
    }
);
</script>
