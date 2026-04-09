<template>
	<div class="header-container">
		<div class="user-info">
			<el-dropdown>
				<span class="user-dropdown">
					<el-avatar :size="40" :src="userAvatar" />
					<span class="user-name">{{ userName }}</span>
					<el-icon class="el-icon--right"><ArrowDown /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="handleRouterProfile">个人资料</el-dropdown-item>
						<el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import router from '@/router';
import { ref, onMounted } from 'vue';

const userAvatar = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=default%20user%20avatar%20simple%20style&image_size=square';
const userName = ref('默认用户');

onMounted(() => {
	const user = JSON.parse(localStorage.getItem('user') || '{}');
	userName.value = user.phone || '默认用户';
});

const handleLogout = () => {
	// 退出登录逻辑
	// 用户点击的时候需要一个弹窗，确认是否退出登录
	ElMessageBox.confirm('确定退出登录吗？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		localStorage.removeItem('token');
		router.push({ name: 'login' });
	});
};

function handleRouterProfile() {
	router.push({ name: 'profile' });
}
</script>

<style lang="scss" scoped>
.header-container {
	display: flex;
	justify-content: flex-end;
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
