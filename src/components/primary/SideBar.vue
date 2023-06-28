<script setup lang="ts">
import {
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon
} from "@heroicons/vue/24/outline";
import { useNavigation } from "@/composables/navigationComposable";
const { navigation, teams } = useNavigation();
</script>

<template>
    <!-- Static sidebar for desktop -->
    <div
        class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
            class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
        >
            <div class="flex h-16 shrink-0 items-center">
                <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                    alt="Your Company"
                />
            </div>
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigation" :key="item.name">
                                <a
                                    :href="item.href"
                                    :class="[
                                        item.current
                                            ? 'bg-gray-50 text-primary-600'
                                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    ]"
                                >
                                    <component
                                        :is="item.icon"
                                        :class="[
                                            item.current
                                                ? 'text-primary-600'
                                                : 'text-gray-400 group-hover:text-primary-600',
                                            'h-6 w-6 shrink-0'
                                        ]"
                                        aria-hidden="true"
                                    />
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div
                            class="text-xs font-semibold leading-6 text-gray-400"
                        >
                            Your teams
                        </div>
                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                            <li v-for="team in teams" :key="team.name">
                                <a
                                    :href="team.href"
                                    :class="[
                                        team.current
                                            ? 'bg-gray-50 text-primary-600'
                                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    ]"
                                >
                                    <span
                                        :class="[
                                            team.current
                                                ? 'text-primary-600 border-primary-600'
                                                : 'text-gray-400 border-gray-200 group-hover:border-primary-600 group-hover:text-primary-600',
                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                        ]"
                                        >{{ team.initial }}</span
                                    >
                                    <span class="truncate">{{
                                        team.name
                                    }}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="mt-auto">
                        <a
                            href="#"
                            class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                        >
                            <Cog6ToothIcon
                                class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-600"
                                aria-hidden="true"
                            />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
