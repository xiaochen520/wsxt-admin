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
			path: '/register',
			name: 'register',
			component: () => import('@/pages/register/index.vue'),
		},
		{
			path: '/',
			name: 'layout',
			component: () => import('@/pages/layout/index.vue'),
			children: [
				{
					path: '/course',
					name: 'course',
					title: '课程管理',
					component: () => import('@/pages/course/index.vue'),
				},
				{
					path: '/course/add',
					name: 'addCourse',
					title: '添加课程',
					component: () => import('@/pages/course/add/index.vue'),
				},
				{
					path: '/user',
					name: 'user',
					title: '用户管理',
					component: () => import('@/pages/user/index.vue'),
				},
				{
					path: '/order',
					name: 'order',
					title: '课程订单',
					component: () => import('@/pages/order/index.vue'),
				},
				{
					path: '/reward-store',
					name: 'reward-store',
					title: '兑换商城',
					component: () => import('@/pages/reward-store'),
				},
				{
					path: '/reward-store/addCommodity',
					name: 'addCommodity',
					title: '新增商品',
					component: () => import('@/pages/reward-store/addCommodity.vue'),
				},
			],
		},
	],
});

export default router;
