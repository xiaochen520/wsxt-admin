<template>
	<div class="profile-container">
		<el-card class="profile-card">
			<template #header>
				<div class="card-header">
					<h2>个人资料</h2>
					<el-button type="primary" plain @click="goBack">返回</el-button>
				</div>
			</template>

			<el-form :model="userInfo" label-width="120px" :disabled="true">
				<el-form-item label="手机号">
					<el-input v-model="userInfo.phone" />
				</el-form-item>

				<el-form-item label="邀请码">
					<el-input v-model="userInfo.inviteCode" />
				</el-form-item>

				<el-form-item label="用户类型">
					<el-input v-model="userTypeText" />
				</el-form-item>

				<el-form-item label="创建时间">
					<el-input v-model="userInfo.createTime" />
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getCurrentUser } from '@/api';
import { ElMessage } from 'element-plus';
import router from '@/router';

// 用户信息
const userInfo = reactive({
	phone: '',
	inviteCode: '',
	userType: 0,
	createTime: ''
});

// 计算用户类型文本
const userTypeText = computed(() => {
	return userInfo.userType === 0 ? '普通用户' : '渠道用户';
});

// 页面挂载时获取用户信息
onMounted(() => {
	getUserInfo();
});

// 获取用户信息
async function getUserInfo() {
	try {
		const res = await getCurrentUser();
		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		Object.assign(userInfo, res.data);
	} catch (error) {
		ElMessage.error('获取用户信息失败，请稍后重试');
	}
}

// 返回上个路由
function goBack() {
	router.back();
}
</script>

<style scoped lang="scss">
.profile-container {
	padding: 20px;
	
	.profile-card {
		max-width: 600px;
		margin: 0 auto;
		
		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			h2 {
				margin: 0;
				font-size: 18px;
			}
		}
	}
}
</style>