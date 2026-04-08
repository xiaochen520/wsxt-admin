<template>
	<el-menu class="sidebar-menu" router :default-active="activeMenu" :default-openeds="openMenus">
		<!-- logo -->
		<div class="logo">
			<img src="/logo.svg" alt="logo" />
			<span class="logo-text">吴山学堂</span>
		</div>

		<!-- 菜单 -->
		<template v-for="item in menuItems" :key="item.index">
			<!-- 有子菜单 -->
			<el-sub-menu v-if="item.children" :index="item.index">
				<template #title>
					<component class="icon" :is="item.icon" />
					<span>{{ item.title }}</span>
				</template>

				<el-menu-item v-for="child in item.children" :key="child.index" :index="child.route">
					{{ child.title }}
				</el-menu-item>
			</el-sub-menu>

			<!-- 单菜单 -->
			<el-menu-item v-else :index="item.route">
				<component class="icon" :is="item.icon" />
				<span>{{ item.title }}</span>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script setup>
import { DataLine, Document, Present, User } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// ✅ 当前激活菜单（核心）
const activeMenu = computed(() => route.path);

// ✅ 自动展开父菜单（核心）
const openMenus = computed(() => {
	const path = route.path;
	const segments = path.split('/').filter(Boolean);
	return segments.length > 1 ? [`/${segments[0]}`] : [];
});

// 图标
const icons = {
	DataLine,
	Document,
	Present,
	User,
};

// 菜单数据
const menuItems = [
	{
		index: '/course',
		route: '/course',
		title: '课程管理',
		icon: icons.DataLine,
	},
	{
		index: '/order',
		title: '订单管理',
		route: '/order',
		icon: icons.Document,
	},
	{
		index: '/user',
		route: '/user',
		title: '用户管理',
		icon: icons.User,
	},
	{
		index: '/reward-store',
		route: '/reward-store',
		title: '兑换商城',
		icon: icons.Present,
	},
];
</script>

<style scoped lang="scss">
.logo {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px 0;

	img {
		width: 32px;
		margin-right: 10px;
		transform: translate(-1000px, -1000px);
		filter: drop-shadow(1000px 1000px 0 #fff);
	}

	.logo-text {
		font-size: 18px;
		font-weight: 600;
		color: #fff;
	}
}

.sidebar-menu {
	--el-menu-bg-color: #001529;
	--el-menu-text-color: #ffffffa6;
	--el-menu-active-color: #ffffff;
	--el-menu-hover-bg-color: transparent;

	height: 100%;
	padding: 0 10px;
	.el-menu-item,
	.el-sub-menu__title {
		display: flex;
		align-items: center;
		height: 36px;
		padding: 8px 0;
		border-radius: 6px;
		box-sizing: content-box;

		span {
			margin-left: 10px;
		}

		.icon {
			width: 18px;
			min-width: 18px;
		}

		&:hover {
			color: #fff !important;
		}
	}

	:deep(.el-sub-menu__title) {
		height: 36px;
		padding: 8px 0;
		box-sizing: content-box;
	}

	// 二级菜单缩进
	.el-sub-menu .el-menu-item {
		padding-left: 40px !important;
	}

	.el-menu-item.is-active {
		background-color: #1890ff !important;
		color: #fff !important;
	}
}
</style>
