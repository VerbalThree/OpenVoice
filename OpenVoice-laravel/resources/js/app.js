import './bootstrap';

import { createApp } from 'vue';
import ExampleComponent from "/workspace/OpenVoice/OpenVoice-laravel/resources/js/app.js"

const app = createApp({
    components: {
        'example-component': ExampleComponent
    }
});

app.mount('#app');

