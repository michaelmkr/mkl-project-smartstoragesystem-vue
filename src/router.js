import Vue from 'vue';
import Router from 'vue-router';
import Home from "@/components/Home";
import storeFruits from "@/components/storeFruits";
import storageComponent from "@/components/storageComponent";


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/store',
            name: 'store',
            component: storeFruits,
        },
        {
            path: '/storage',
            name: 'storage',
            component: storageComponent,
        },
        ]
})
