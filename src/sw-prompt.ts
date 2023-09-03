import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY || "";
const FIREBASE_PROJECT_ID =
    import.meta.env.VITE_FIREBASE_PROJECT_ID || "keue-dev";
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    projectId: FIREBASE_PROJECT_ID,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    appId: "1:219374522857:web:1957bd9c8479074b0cbb78"
};
// // Initialize the Firebase app in the service worker script.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const getIdTokenPromise = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                getIdToken(user).then(
                    (idToken) => {
                        resolve(idToken);
                    },
                    (error) => {
                        resolve(null);
                    }
                );
            } else {
                resolve(null);
            }
        });
    });
};

const getAppCheckToken = () => {
    return new Promise(async (resolve, reject) => {
        console.log("getAppCheckToken");
        const db = await idbOpen();
        const data = await idbGet(db, "compositeKey");
        const token = "token";
        resolve(token);
    });
};

declare let self: ServiceWorkerGlobalScope | any;

self.addEventListener("message", (event: any) => {
    if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event: any) => {
    event.respondWith(
        (async function () {
            // Get the original request
            const originalRequest = event.request;
            console.log("url: ", originalRequest.url);
            if (
                !originalRequest.url.includes(
                    "https://keue-app-graphql-beta-dev-nov2022-eu-qcyyqf7fqq-ez.a.run.app/graphql"
                )
            ) {
                return fetch(originalRequest);
            }
            // Clone the request as the request body is a stream and can only be used once
            const requestClone = originalRequest.clone();

            // Create a new headers object based on the original request headers
            const headers = new Headers();
            for (const entry of requestClone.headers.entries()) {
                headers.append(entry[0], entry[1]);
            }
            const idToken: any = await getIdTokenPromise();
            const appCheckToken: any = await getAppCheckToken();
            // // Add new header
            headers.append("X-App-Check-Token", appCheckToken ?? "CustomValue");
            headers.append("Authorization", idToken);

            console.log("headers: ", headers.get("Authorization"));

            // Create a new request based on the original request but with the new headers
            const newRequest = new Request(originalRequest, {
                headers: headers
            });

            // Fetch the new request
            const response = await fetch(newRequest);

            // Return the response
            return response;
        })()
    );
});

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));

function idbOpen() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("firebase-app-check-database", 1);
        request.onerror = (event: any) => {
            console.log("open db error: ", event.target.errorCode);
            reject(`Error opening IndexedDB: ${event.target.errorCode}`);
        };
        request.onsuccess = (event: any) => {
            console.log("open db result: ", event.target.result);
            resolve(event.target.result);
        };
    });
}

function idbGet(db: any, key: any) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            "firebase-app-check-store",
            "readonly"
        );
        const store = transaction.objectStore(
            "1:219374522857:web:1957bd9c8479074b0cbb78-[DEFAULT]"
        );
        const request = store.get(key);
        request.onsuccess = (event: any) => {
            console.log("get db result: ", event.target.result);
            resolve(event.target.result);
        };
        request.onerror = (event: any) => {
            console.log("get db error: ", event.target.errorCode);
            reject(`Error getting from IndexedDB: ${event.target.errorCode}`);
        };
    });
}
