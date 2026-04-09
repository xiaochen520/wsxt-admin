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
					path: '/profile',
					name: 'profile',
					title: '个人资料',
					component: () => import('@/pages/profile/index.vue'),
				},
				{
					path: '/payment',
					name: 'payment',
					title: '支付管理',
					component: () => import('@/pages/payment/index.vue'),
				},
			],
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.name === 'login' || to.name === 'register') {
		next();
	} else {
		const token = localStorage.getItem('token');
		if (token) {
			next();
		} else {
			next({ name: 'login' });
		}
	}
});

export default router;
