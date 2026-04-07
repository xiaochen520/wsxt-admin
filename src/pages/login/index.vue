<template>
    <div class="login-container">
        <!-- 中间登录卡片 -->
        <div class="login-card">
            <!-- Logo / 头像 -->
            <div class="logo">
                <img src="@/assets/chicken_logo.png" alt="logo">
            </div>

            <h2 class="title">认养鸡管理系统</h2>

            <el-form :model="form" class="login-form" @submit.prevent="handleLogin">
                <el-form-item>
                    <el-input v-model="form.username" placeholder="请输入账号" prefix-icon="User">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password>
                        <template #prefix>
                            <el-icon><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="login-btn" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>

            <div class="tips" v-if="false">
                默认：admin / 123456
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import router from '@/router';
const form = reactive({
    username: '',
    password: ''
})

const handleLogin = () => { 
    if (!form.username || !form.password) {
        ElMessage.warning('请输入账号密码')
        return
    }
    //  模拟登录
    //  实际项目中，这里应该调后端接口进行登录验证
    if (form.username === 'admin' && form.password === '123456') {
        ElMessage.success('登录成功')
        localStorage.setItem('token', 'demo')
        router.push({ name: 'home' })
    } else {
        ElMessage.error('账号或密码错误')
    }
}
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
            width: 108px;
            height: auto;
            border-radius: 50%;
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
}
</style>