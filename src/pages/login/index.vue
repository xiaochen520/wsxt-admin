<template>
	<div class="login-container">
		<!-- 中间登录卡片 -->
		<div class="login-card">
			<!-- Logo / 头像 -->
			<div class="logo">
				<img src="/logo.svg" alt="logo" />
			</div>

			<h2 class="title">吴山学堂管理系统</h2>

			<el-form ref="formRef" :model="form" :rules="rules" class="login-form" @submit.prevent="handleLogin">
				<el-form-item label="账号" prop="phone">
					<el-input v-model="form.phone" placeholder="请输入账号">
						<template #prefix>
							<el-icon>
								<i-ep-user></i-ep-user>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password" placeholder="请输入密码" show-password>
						<template #prefix>
							<el-icon>
								<i-ep-lock></i-ep-lock>
							</el-icon>
						</template>
					</el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" class="login-btn" native-type="submit">登录</el-button>
				</el-form-item>
			</el-form>

			<div class="tips" v-if="false">默认：admin / 123456</div>

			<!-- <div class="register-link">
				<span>还没有账号？</span>
				<router-link to="/register">立即注册</router-link>
			</div> -->
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import router from '@/router';
import { login, getCurrentUser } from '@/api';

const form = reactive({
	phone: '',
	password: '',
});

const rules = ref({
	phone: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const formRef = ref(null);

const handleLogin = async () => {
	if (!formRef.value) return;

	formRef.value.validate(async (valid) => {
		if (valid) {
			try {
				const res = await login(form);
				if (res.code !== 200) {
					ElMessage.error(res.msg);
					return;
				}
				const currentUser = await getCurrentUser();
				localStorage.setItem('user', JSON.stringify(currentUser.data || '{}'));

				ElMessage.success('登录成功');
				localStorage.setItem('token', res.data);
				setTimeout(() => {
					router.push({ name: 'course' });
				}, 500);
			} catch (error) {
				ElMessage.error('账号或密码错误');
			}
		}
	});
};
</script>

<style scoped lang="scss">
.login-container {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	/* 农场背景（可换成你自己的） */
	background: url('https://images.unsplash.com/photo-1606787366850-de6330128bfc') no-repeat center;
	background-size: cover;
}

/* 登录卡片 */
.login-card {
	width: 360px;
	padding: 30px 25px;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	text-align: center;
	.logo {
		font-size: 40px;
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 80px;
			height: auto;
		}
	}

	.title {
		font-size: 20px;
		margin-bottom: 20px;
		font-weight: 600;
	}
	// input 样式 加高
	:deep(.el-input__inner) {
		height: 40px;
	}

	.login-btn {
		width: 100%;
		padding: 20px 0;
		border-radius: 8px;
	}

	.tips {
		margin-top: 10px;
		font-size: 12px;
		color: #999;
	}

	.register-link {
		margin-top: 15px;
		font-size: 14px;
		a {
			color: #409eff;
			text-decoration: none;
			margin-left: 5px;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
