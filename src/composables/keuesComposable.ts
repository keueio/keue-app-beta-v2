import randomWords from "random-words";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");
const generateUniqueName = () => {
    return `${randomWords({ exactly: 2, join: "-" })}-${nanoid(5)}`;
};
export function useKeuesComposable() {
    return {
        generateUniqueName
    };
}
