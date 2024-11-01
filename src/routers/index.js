

import JoinPage from '@/components/pages/JoinPage.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import MainPage from '@/components/pages/MainPage.vue';
import PasswordResetPage from '@/components/pages/PasswordResetPage.vue';
import CreateHomework from '@/components/pages/CreateHomework.vue';
import MainLayout from '@/components/layout/MainLayout.vue';
import {  createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', component: MainLayout,
      children:[
        {path:'', component:MainPage},
        {path:'student/:studentId/homework', component:CreateHomework}
      ]
     },
    { path: '/login', component: LoginPage },
    { path: '/join', component: JoinPage },
    { path: '/find-password', component: PasswordResetPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;