<template>
	<div class="user-container">
		<el-button type="primary" @click="onRouterAdd">添加课程</el-button>

		<div class="table-container">
			<el-table border :height="height - 140" :data="courseArr" style="width: 100%">
				<el-table-column prop="name" label="课程名称"></el-table-column>
				<el-table-column prop="price" label="课程价格"></el-table-column>
				<el-table-column prop="status" label="状态"></el-table-column>
				<!-- 操作列 -->
				<el-table-column label="操作" width="180">
					<template #default="scope">
						<el-button type="primary" @click="onRouterEdit(scope.row)" plain size="small">编辑</el-button>
						<el-button type="danger" @click="handleDelete(scope.row)" plain size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { courseList, deleteCourse } from '@/api';
import router from '@/router';

const { width, height } = useWindowSize();

const courseArr = ref([]);

onMounted(() => {
	getList();
});

async function getList() {
	try {
		const res = await courseList();
		console.log(res);
		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		courseArr.value = res.data;
	} catch (error) {
		ElMessage.error('获取课程列表失败，请稍后重试');
	}
}

function onRouterAdd() {
	router.push({ name: 'addCourse' });
}

function onRouterEdit(row) {
	router.push({ name: 'addCourse', query: { id: row.id } });
}

// 删除课程
async function handleDelete(row) {
	try {
		await ElMessageBox.confirm('确定要删除该课程吗？', '删除确认', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		});

		const res = await deleteCourse(row.id);
		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		ElMessage.success('删除成功');
		getList();
	} catch (error) {
		if (error !== 'cancel') {
			ElMessage.error('删除失败，请稍后重试');
		}
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
