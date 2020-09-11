import Vue from 'vue';
import VueRouter from 'vue-router';
import FirstMenu from '@/components/FirstMenu.vue';
import SecondMenu from '@/components/SecondMenu.vue';
import ThirdMenu from '@/components/ThirdMenu.vue';
import ForthMenu from '@/components/ForthMenu.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/1'
        },
        {
            path: '/1',
            component: FirstMenu
        },
        {
            path: '/2',
            component: SecondMenu
        },
        {
            path: '/3',
            component: ThirdMenu
        },
        {
            path: '/4',
            component: ForthMenu
        }
    ]
}); 