<template>
	<div class="user-container">
		<!-- 用户表格 -->
		<div class="table-container">
			<el-table border :height="height - 110" :data="userArr" style="width: 100%">
				<el-table-column prop="phone" label="手机号"></el-table-column>
				<el-table-column prop="userType" label="用户类型">
					<template #default="scope">
						{{ scope.row.userType === 0 ? '普通用户' : '渠道用户' }}
					</template>
				</el-table-column>
				<el-table-column prop="enrolled" label="是否报名" width="120">
					<template #default="{ row }">
						<el-tag effect="dark" :type="row.enrolled ? 'success' : 'info'">{{ row.enrolled ? '已报名' : '未报名' }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="subordinateCount" label="下级人数" width="120" />
				<el-table-column prop="inviteCode" label="邀请码"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="160" fixed="right">
					<template #default="{ row }">
						<el-button v-if="row.userType !== 1" type="primary" plain size="small" @click="setUserType(row, 1)">设为渠道用户</el-button>
						<el-button v-else type="success" plain size="small" @click="setUserType(row, 0)">设为普通用户</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { userList, updateUserType } from '@/api';

const { width, height } = useWindowSize();

// 用户列表数据
const userArr = ref([]);

// 页面挂载时获取用户列表
onMounted(() => {
	getUserList();
});

// 获取用户列表
async function getUserList() {
	try {
		const res = await userList();
		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		userArr.value = res.data;
	} catch (error) {
		ElMessage.error('获取用户列表失败，请稍后重试');
	}
}

async function setUserType(row, userType) {
	const label = userType === 1 ? '渠道用户' : '普通用户';
	try {
		await ElMessageBox.confirm(`确定将该用户设为${label}吗？`, '提示', {
			type: 'warning',
		});
		const res = await updateUserType({ userId: row.id, userType });
		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		ElMessage.success('操作成功');
		getUserList();
	} catch {
		// cancelled
	}
}
</script>

<style scoped lang="scss">
.user-container {
	.table-container {
		background-color: #fff;
		border-radius: 6px;
		margin-top: 10px;
		padding: 10px;
	}
}
</style>
