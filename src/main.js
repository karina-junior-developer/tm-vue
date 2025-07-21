import { createApp } from 'vue';
import App from './components/app/App.vue';
import store from './store/store';
import router from './routing/router';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import 'primeicons/primeicons.css';
import './style.css';

createApp(App).use(router).use(store).use(VCalendar, {}).mount('#app');
