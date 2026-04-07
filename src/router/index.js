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
					path: '/course',
					name: 'course',
					title: '课程列表',
					component: () => import('@/pages/course/index.vue'),
				},
				// {
				//   path: '/order/feed',
				//   name: 'feed',
				//   title: '饲料订单列表',
				//   component: () => import('@/pages/order/feed'),
				// },
				// {
				//   path: '/reward-store',
				//   name: 'reward-store',
				//   title: '兑换商城',
				//   component: () => import('@/pages/reward-store'),
				// },
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
