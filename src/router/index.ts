import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebase } from "@/composables/firebaseComposable";
const { auth, currentUser, getToken, appCheck } = useFirebase();
const checkAuthState = async () => {
    return new Promise<void>(async (resolve, reject) => {
        onAuthStateChanged(auth, async (user: any) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log("user is logged in (router): ", user);
                currentUser.value = user;

                const appCheckToken = await getToken(appCheck, false);
                console.log("appCheckToken: ", appCheckToken);
                resolve();
            } else {
                // User is signed out
                console.log("user is logged out");
                resolve();
            }
        });
    });
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/auth/login",
            name: "login",
            component: () => import("../views/auth/LoginView.vue")
        },
        {
            path: "/start",
            name: "start",
            component: () => import("../views/StartView.vue")
        },
        {
            path: "/app/:app/:id",
            name: "queue-view",
            component: () => import("../views/Queues/QueueView.vue")
        }
    ]
});

router.beforeEach(async (to, from) => {
    console.log("before each");
    await checkAuthState();
    return true;
});

export default router;
