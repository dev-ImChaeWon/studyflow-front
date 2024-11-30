

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
      ],
      meta: { requiresAuth: true },
     },
    { path: '/login', component: LoginPage },
    { path: '/join', component: JoinPage },
    { path: '/find-password', component: PasswordResetPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 라우터 가드 추가
router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken');  // localStorage에서 authToken 확인
  
  // 인증이 필요한 페이지 (meta.requiresAuth가 true인 경우)
  if (to.meta.requiresAuth && !authToken) {
    // authToken이 없으면 로그인 페이지로 리디렉션
    next('/login');
  } else {
    next();  // 인증이 되면 정상적으로 페이지 접근
  }
});

export default router;