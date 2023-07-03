<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, onMounted, ref, watch } from "vue";
const route = useRoute();
const keueId = computed(() => route.params.id);
const appId = computed(() => route.params.app);
const keueFullId = computed(() => `${route.params.app}---${route.params.id}`);
const { result, refetch } = useQuery(
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
</script>
<template>
    <p v-if="keueFullId" class="text-darkBlueGray-400 leading-8">
        {{ keueFullId }}
        <pre>{{ result?.keue }}</pre>
    </p>
</template>
