import { ref } from "vue";
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
const navigation = [
    { name: "Start", href: "/start", icon: HomeIcon, current: true },
    { name: "Team", href: "#", icon: UsersIcon, current: false },
    { name: "Queues", href: "/", icon: FolderIcon, current: false },
    { name: "Alerts", href: "#", icon: CalendarIcon, current: false },
    { name: "Usage", href: "#", icon: ChartPieIcon, current: false }
];
const teams = [
    { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
    { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
    { id: 3, name: "Workcation", href: "#", initial: "W", current: false }
];
const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" }
];

const sidebarOpen = ref(false);

const asideOpen = ref(false);

export const useNavigation = () => {
    return {
        navigation,
        teams,
        userNavigation,
        sidebarOpen,
        asideOpen
    };
};
