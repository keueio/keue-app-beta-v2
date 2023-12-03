<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
    <div>
        <AlertsBar></AlertsBar>
        <Cookies></Cookies>
        <MobileSideBar></MobileSideBar>
        <SideBar></SideBar>

        <div class="">
            <TopBar></TopBar>
            <main class="xl:pl-72">
                <div
                    class="pb-[24rem] md:pb-0"
                    :class="[
                        asideOpen
                            ? `md:pr-[18rem] lg:pr-[28rem] xl:pr-[34rem]`
                            : 'pr-0'
                    ]"
                >
                    <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                        <RouterView></RouterView>
                    </div>
                </div>
            </main>
            <Transition v-show="asideOpen">
                <aside
                    id="aside"
                    class="fixed sm:max-sm:inset-x-0 bottom-0 md:right-0 w-full h-[24rem] md:h-full md:w-[18rem] lg:w-[28rem] xl:w-[34rem] overflow-y-auto border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-24 px-4 sm:px-6 lg:px-8 md:block bg-white"
                >
                    <!-- Secondary column (hidden on smaller screens) -->
                </aside>
            </Transition>
            <!-- <main class="py-10">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RouterView></RouterView>
                </div>
            </main> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import SideBar from "@/components/primary/SideBar.vue";
import MobileSideBar from "@/components/primary/MobileSideBar.vue";
import TopBar from "@/components/primary/TopBar.vue";
import AlertsBar from "@/components/primary/AlertsBar.vue";
import Cookies from "@/components/primary/Cookies.vue";
import { useNavigation } from "@/composables/navigationComposable";
const { asideOpen } = useNavigation();

onMounted(() => {
    // if ("serviceWorker" in navigator) {
    //     navigator.serviceWorker.register(
    //         "/service-worker.bundle.js?t=" + new Date().valueOf(),
    //         { scope: "/", type: "module" }
    //     );
    // }
});
</script>
