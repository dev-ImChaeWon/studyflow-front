

import JoinPage from '@/components/pages/JoinPage.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import MainPage from '@/components/pages/MainPage.vue';
import PasswordResetPage from '@/components/pages/PasswordResetPage.vue';
import {  createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', component: MainPage },
    { path: '/login', component: LoginPage },
    { path: '/join', component: JoinPage },
    { path: '/find-password', component: PasswordResetPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;