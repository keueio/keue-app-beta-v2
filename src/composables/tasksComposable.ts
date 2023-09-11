import { ref } from "vue";
import moment from "moment";
const selectedTask: any = ref(null);

const timestampToHuman = (ts: string) => {
    return moment(ts).fromNow();
};

export function useTasksComposable() {
    return {
        selectedTask,
        timestampToHuman
    };
}
