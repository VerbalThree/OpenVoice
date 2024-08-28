import './bootstrap';
import { createApp } from 'vue';
import router from './router';
import ExampleComponent from "/workspace/OpenVoice/OpenVoice-laravel/resources/components/examplecomponent.vue"

const app = createApp({});
app.use(router);
app.mount('#app');

