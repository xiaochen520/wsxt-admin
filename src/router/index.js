import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    // 	path: '/',
    // 	redirect: '/login', // 👈 关键
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/layout/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          title: '概览',
          component: () => import('@/pages/home/index.vue'),
        },
        {
          path: '/order/adoptoption',
          name: 'adoptoption',
          title: '认养订单列表',
          component: () => import('@/pages/order/adoptoption'),
        },
        {
          path: '/order/feed',
          name: 'feed',
          title: '饲料订单列表',
          component: () => import('@/pages/order/feed'),
        },
        {
          path: '/reward-store',
          name: 'reward-store',
          title: '兑换商城',
          component: () => import('@/pages/reward-store'),
        },
        {
          path: '/user',
          name: 'user',
          title: '用户管理',
          component: () => import('@/pages/user/index.vue'),
        },
      ],
    },
  ],
});

export default router;
