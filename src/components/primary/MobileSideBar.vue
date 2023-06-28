<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot
} from "@headlessui/vue";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useNavigation } from "@/composables/navigationComposable";
const { navigation, teams, sidebarOpen } = useNavigation();
</script>

<template>
    <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog
            as="div"
            class="relative z-50 lg:hidden"
            @close="sidebarOpen = false"
        >
            <TransitionChild
                as="template"
                enter="transition-opacity ease-linear duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm"
                />
            </TransitionChild>

            <div class="fixed inset-0 flex">
                <TransitionChild
                    as="template"
                    enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full"
                    enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leave-from="translate-x-0"
                    leave-to="-translate-x-full"
                >
                    <DialogPanel
                        class="relative mr-16 flex w-full max-w-xs flex-1"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-in-out duration-300"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="ease-in-out duration-300"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div
                                class="absolute left-full top-0 flex w-16 justify-center pt-5"
                            >
                                <button
                                    type="button"
                                    class="-m-2.5 p-2.5"
                                    @click="sidebarOpen = false"
                                >
                                    <span class="sr-only">Close sidebar</span>
                                    <XMarkIcon
                                        class="h-6 w-6 text-white"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </TransitionChild>
                        <!-- Sidebar component, swap this element with another sidebar if you like -->
                        <div
                            class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
                        >
                            <div class="flex h-16 shrink-0 items-center">
                                <img
                                    class="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                                    alt="Your Company"
                                />
                            </div>
                            <nav class="flex flex-1 flex-col">
                                <ul
                                    role="list"
                                    class="flex flex-1 flex-col gap-y-7"
                                >
                                    <li>
                                        <ul role="list" class="-mx-2 space-y-1">
                                            <li
                                                v-for="item in navigation"
                                                :key="item.name"
                                            >
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
                                        <ul
                                            role="list"
                                            class="-mx-2 mt-2 space-y-1"
                                        >
                                            <li
                                                v-for="team in teams"
                                                :key="team.name"
                                            >
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
                                                        >{{
                                                            team.initial
                                                        }}</span
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
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
