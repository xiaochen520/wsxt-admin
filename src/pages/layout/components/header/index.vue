<template>
	<div class="header-container">
		<div class="logo">
			<!-- <img src="@/assets/chicken_logo-trans.png" alt="logo" />
			<span class="logo-text">认养一只鸡</span> -->
		</div>
		<div class="user-info">
			<el-dropdown>
				<span class="user-dropdown">
					<el-avatar :size="40" :src="userAvatar" />
					<span class="user-name">{{ userName }}</span>
					<el-icon class="el-icon--right"><ArrowDown /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>个人资料</el-dropdown-item>
						<el-dropdown-item>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';

const userAvatar = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=default%20user%20avatar%20simple%20style&image_size=square';
const userName = '默认用户';
</script>

<style lang="scss" scoped>
.header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0 20px;
	.logo {
		display: flex;
		align-items: center;
		gap: 12px;

		img {
			width: 54px;
		}

		.logo-text {
			font-size: 18px;
			font-weight: 600;
			color: #fff;
		}
	}

	.user-info {
		.user-dropdown {
			display: flex;
			align-items: center;
			gap: 10px;
			cursor: pointer;
			color: #333;

			.user-name {
				font-size: 14px;
			}
		}
	}
}
</style>
