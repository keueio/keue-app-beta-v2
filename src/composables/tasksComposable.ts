import { ref } from "vue";
const selectedTask: any = ref(null);
export function useTasksComposable() {
    return {
        selectedTask
    };
}
