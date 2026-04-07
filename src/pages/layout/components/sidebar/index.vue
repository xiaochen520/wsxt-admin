<template>
	<el-menu class="sidebar-menu" router>
		<div class="logo">
			<img src="@/assets/chicken_logo.png" alt="logo" />
			<span class="logo-text">认养一只鸡</span>
		</div>

		<template v-for="item in menuItems" :key="item.index">
			<template v-if="item.children">
				<el-sub-menu :index="item.index">
					<template #title>
						<component style="margin-left: 8px;" class="icon" :is="item.icon"></component>
						<span>{{ item.title }}</span>
					</template>
					<el-menu-item v-for="child in item.children" :key="child.index" :index="child.index" :route="child.route">
						{{ child.title }}
					</el-menu-item>
				</el-sub-menu>
			</template>
			<template v-else>
				<el-menu-item :index="item.index" :route="item.route">
					<component class="icon" :is="item.icon"></component>
					<span>{{ item.title }}</span>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup>
import { DataLine, Document, Present, User } from '@element-plus/icons-vue';

const icons = {
	DataLine,
	Document,
	Present,
	User,
};

const menuItems = [
	{
		index: '1',
		route: '/home',
		title: '概览',
		icon: icons.DataLine,
	},
	{
		index: '4',
		route: '/user',
		title: '用户管理',
		icon: icons.User,
	},
	{
		index: '2',
		title: '订单管理',
		icon: icons.Document,
		children: [
			{
				index: '2-1',
				title: '认养订单列表',
				route: '/order/adoptoption',
			},
			{
				index: '2-2',
				title: '饲料订单列表',
				route: '/order/feed',
			},
		],
	},
	{
		index: '3',
		route: '/reward-store',
		title: '兑换商城',
		icon: icons.Present,
	},
];
</script>

<style lang="scss" scoped>
.logo {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px 0;
	img {
		width: 54px;
		height: auto;
		border-radius: 4px;
		margin-right: 10px;
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
	
  .el-menu-item,
  .el-sub-menu__title {
    display: flex;
    align-items: center;
    transition: all 0.3s;
	height: 40px;
	font-weight: 500;
    span {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }

    .icon {
      width: 18px;
	  min-width: 18px;
    }

    // ✅ hover 状态
    &:hover {
      color: #fff !important;
    }
  }
  .el-menu-item {
	height: 36px;
	margin: 8px 8px;
	border-radius: 6px;
	}
  // ✅ 子菜单 hover
  .el-sub-menu__title:hover {
    color: #fff !important;
  }

  // ✅ 选中菜单
  .el-menu-item.is-active {
    background-color: #1890ff !important;
    color: #fff !important;
  }

  // ✅ 选中时图标也变白
  .el-menu-item.is-active .icon {
    color: #fff;
  }
}
</style>
