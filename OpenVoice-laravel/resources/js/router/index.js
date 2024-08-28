import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from "/workspace/OpenVoice/OpenVoice-laravel/resources/components/HomeComponent.vue";
import AboutComponent from "/workspace/OpenVoice/OpenVoice-laravel/resources/components/AboutComponent.vue";

const routes = [
    {path: '/', component: HomeComponent},
    {path: '/about', component: AboutComponent},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;