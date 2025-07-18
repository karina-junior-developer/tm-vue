import { createRouter, createWebHistory } from 'vue-router';
import { Calendar, MyProfile, Notifications, Settings, Home } from '../pages';
import MainLayout from '../MainLayout.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', component: Home },
        { path: '/my-profile', component: MyProfile },
        { path: '/notifications', component: Notifications },
        { path: '/calendar', component: Calendar },
        { path: '/settings', component: Settings },
      ],
    },
  ],
});
