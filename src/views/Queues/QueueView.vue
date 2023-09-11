<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { apolloClient } from "@/apollo";
import { useTasksComposable } from "@/composables/tasksComposable";
import TaskList from "@/components/tasks/TaskList.vue";
import TaskListTabs from "@/components/tasks/TaskListTabs.vue";
import TaskAside from "@/components/tasks/TaskAside.vue";
import QueueViewHeader from "@/components/queues/QueueViewHeader.vue";
import gql from "graphql-tag";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { orderBy } from "lodash";
import { PlusIcon } from "@heroicons/vue/20/solid";
const { selectedTask } = useTasksComposable();
const route = useRoute();
const keueId = computed(() => route.params.id || "default");
const appId = computed(() => route.params.app);
const keueFullId = computed(
    () => `${route.params.app}---${route.params.id || "default"}`
);
const listKeueTasksFilter = reactive({
    input: {
        queueId: keueFullId,
        options: {
            limit: "20"
        },
        status: "all"
    }
});
const {
    result: listKeueTasks,
    refetch: refetchKeueTasks,
    loading: listKeueTasksLoading
} = useQuery(
    gql`
        query Tasks($input: TasksQueryInput) {
            tasks(input: $input) {
                taskName
                created
                publishedAt
                status
                queueId
                taskMessageId
                id
                appId
                topicId
                payload
            }
        }
    `,
    listKeueTasksFilter
);
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
        name: keueFullId
    }
);
watch(listKeueTasksFilter, () => {
    console.log("listKeueTasksFilter change", listKeueTasksFilter);
});
const filteredTasks = computed(() => {
    const tasks = listKeueTasks.value?.tasks || [];
    return orderBy(tasks, "createdAt", "desc");
});
const refetchTasks = () => {
    console.log("refetchTasks: ", listKeueTasksFilter);
    refetchKeueTasks();
};
</script>
<template>
    <div class="">
        <QueueViewHeader :keueId="keueFullId"></QueueViewHeader>
        <TaskListTabs class="mt-12 mb-6"></TaskListTabs>
        <div
            v-if="false"
            class="rounded-md w-16 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
        >
            <label for="name" class="block text-xs font-medium text-gray-900"
                >Limit</label
            >
            <input
                type="text"
                name="limit"
                id="limit"
                v-model="listKeueTasksFilter.input.options.limit"
                class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="20"
            />
        </div>
        <span v-if="false" class="text-xs text-gray-500"
            >listKeueTasksLoading: {{ listKeueTasksLoading }}</span
        ><br />
        <span v-if="false" class="text-xs text-gray-500"
            >getKeueLoading: {{ getKeueLoading }}</span
        >
        <TaskList :tasks="filteredTasks" />
        <Teleport to="aside">
            <TaskAside :selected-task="selectedTask"></TaskAside>
        </Teleport>
    </div>
</template>
