<template>
	<div class="order-container">
		<!-- 筛选栏 -->
		<div class="filter-container">
			<el-form :inline="true" :model="filterForm" class="demo-form-inline">
				<el-form-item label="课程名称">
					<el-input v-model="filterForm.courseName" placeholder="请输入课程名称" />
				</el-form-item>
				<el-form-item label="用户手机号">
					<el-input v-model="filterForm.userPhone" placeholder="请输入用户手机号" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getOrderList">查询</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 订单表格 -->
		<div class="table-container">
			<el-table border :height="height - 200" :data="orderArr" style="width: 100%">
				<el-table-column prop="id" label="订单ID"></el-table-column>
				<el-table-column prop="courseName" label="课程名称"></el-table-column>
				<el-table-column prop="userPhone" label="用户手机号"></el-table-column>
				<el-table-column prop="price" label="订单金额"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column prop="status" label="订单状态"></el-table-column>
			</el-table>
		</div>

		<!-- 分页 -->
		<div class="pagination-container">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pagination.page"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pagination.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.total"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { orderList } from '@/api';
import { ElMessage } from 'element-plus';

const { width, height } = useWindowSize();

// 订单列表数据
const orderArr = ref([]);

// 筛选表单
const filterForm = reactive({
	courseName: '',
	userPhone: '',
});

// 分页参数
const pagination = reactive({
	page: 1,
	size: 10,
	total: 0,
});

// 页面挂载时获取订单列表
onMounted(() => {
	getOrderList();
});

// 获取订单列表
async function getOrderList() {
	try {
		const params = {
			...filterForm,
			page: pagination.page,
			size: pagination.size,
		};
		const res = await orderList(params);
		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		orderArr.value = res.data.list;
		pagination.total = res.data.total;
	} catch (error) {
		ElMessage.error('获取订单列表失败，请稍后重试');
	}
}

// 处理分页大小变化
function handleSizeChange(size) {
	pagination.size = size;
	getOrderList();
}

// 处理当前页变化
function handleCurrentChange(current) {
	pagination.page = current;
	getOrderList();
}
</script>

<style scoped lang="scss">
.order-container {
	.filter-container {
		background-color: #fff;
		border-radius: 6px;
		padding: 15px;
		margin-bottom: 10px;
	}

	.table-container {
		background-color: #fff;
		border-radius: 6px;
		margin-bottom: 10px;
		padding: 10px;
	}

	.pagination-container {
		background-color: #fff;
		border-radius: 6px;
		padding: 15px;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
