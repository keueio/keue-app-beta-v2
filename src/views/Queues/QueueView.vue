<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import TaskList from "@/components/tasks/TaskList.vue";
import TaskListTabs from "@/components/tasks/TaskListTabs.vue";
import QueueViewHeader from "@/components/queues/QueueViewHeader.vue";
import gql from "graphql-tag";
import { computed, onMounted, ref, watch } from "vue";
const route = useRoute();
const keueId = computed(() => route.params.id);
const appId = computed(() => route.params.app);
const keueFullId = computed(() => `${route.params.app}---${route.params.id}`);
const { result: getKeueResult, refetch } = useQuery(
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
const { result: listKeueTasks } = useQuery(
    gql`
        query Tasks($input: TasksQueryInput) {
            tasks(input: $input) {
                id
                payload
                status
                created
                createdAt
                publishedAt
                taskName
                queueId
                appId
            }
        }
    `,
    {
        input: {
            queueId: keueFullId,
            options: {
                limit: 20
            }
        }
    }
);
</script>
<template>
    <div class="">
        <QueueViewHeader></QueueViewHeader>
        <TaskListTabs class="mt-12 mb-6"></TaskListTabs>
        <TaskList :tasks="listKeueTasks?.tasks" />
    </div>
</template>
