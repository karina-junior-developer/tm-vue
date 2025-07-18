import { createApp } from 'vue';
import App from './components/app/App.vue';
import store from './store/store';
import router from './routing/router';
import './style.css';

createApp(App).use(router).use(store).mount('#app');
