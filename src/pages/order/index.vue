<template>
	<div class="order-container">
		<!-- 筛选栏 -->
		<div class="filter-container">
			<el-form :inline="true" :model="filterForm" class="demo-form-inline">
				<el-form-item label="" class="filter-item w-[200px]">
					<el-input v-model="filterForm.courseName" placeholder="请输入课程名称" />
				</el-form-item>
				<el-form-item label="" class="filter-item w-[200px]">
					<el-input v-model="filterForm.userPhone" placeholder="请输入用户手机号" />
				</el-form-item>
				<el-form-item label="" class="filter-item w-[200px]">
					<el-select placeholder="请选择订单状态" clearable v-model="filterForm.status">
						<el-option label="待上传凭证" :value="0" />
						<el-option label="待审核" :value="1" />
						<el-option label="已报名" :value="2" />
						<el-option label="审核失败" :value="3" />
					</el-select>
				</el-form-item>
				<el-form-item class="filter-btn">
					<el-button type="primary" @click="getOrderList">查询</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 订单表格 -->
		<div class="table-container">
			<el-table border :height="height - 220" :data="orderArr" style="width: 100%">
				<el-table-column prop="courseName" label="课程名称"></el-table-column>
				<el-table-column prop="versionName" label="版本名称"></el-table-column>
				<el-table-column prop="amount" label="订单金额"></el-table-column>
				<el-table-column prop="userPhone" label="手机号"></el-table-column>
				<el-table-column label="订单状态">
					<template #default="scope">
						<el-tag effect="dark" :type="getStatusType(scope.row.status)">
							{{ getStatusText(scope.row.status) }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column label="操作" width="80">
					<template #default="scope">
						<el-button v-if="[2, 3].includes(scope.row.status)" type="primary" @click="showVoucher(scope.row)" plain size="small">查看凭证</el-button>
						<el-button v-if="scope.row.status === 1" type="primary" @click="onRouterEdit(scope.row)" plain size="small">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
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

		<!-- 凭证图片弹框 -->
		<el-dialog v-model="dialogVisible" title="查看凭证" width="800">
			<div class="voucher-image-container">
				<img :src="currentVoucherImage" alt="凭证图片" class="voucher-image" />
			</div>
		</el-dialog>
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

// 凭证图片弹框
const dialogVisible = ref(false);
const currentVoucherImage = ref('');

// 筛选表单
const filterForm = reactive({
	courseName: '',
	userPhone: '',
	status: '',
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
		orderArr.value = res.data.records;
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

// 获取订单状态文本
function getStatusText(status) {
	const statusMap = {
		0: '待上传凭证',
		1: '待审核',
		2: '已报名',
		3: '审核失败',
	};
	return statusMap[status] || '未知状态';
}

// 获取订单状态标签类型
function getStatusType(status) {
	const typeMap = {
		0: 'warning', // 待上传凭证 - 黄色
		1: 'info', // 待审核 - 蓝色
		2: 'success', // 已报名 - 绿色
		3: 'danger', // 审核失败 - 红色
	};
	return typeMap[status] || '';
}

// 显示凭证图片
function showVoucher(order) {
	currentVoucherImage.value = order.voucherImage;
	dialogVisible.value = true;
}
</script>

<style scoped lang="scss">
.order-container {
	.filter-container {
		background-color: #fff;
		border-radius: 6px;
		padding: 15px;
		margin-bottom: 10px;
		.demo-form-inline {
			.filter-item {
				margin-bottom: 0;
				margin-right: 10px;
			}
			.filter-btn {
				margin-bottom: 0;
			}
		}
	}

	.table-container {
		background-color: #fff;
		border-radius: 6px;
		margin-bottom: 10px;
		padding: 10px;
		.pagination {
			margin-top: 10px;
			justify-content: flex-end;
		}
	}

	.pagination-container {
		background-color: #fff;
		border-radius: 6px;
		padding: 15px;
		display: flex;
		justify-content: flex-end;
	}

	// 凭证图片样式
	.voucher-image-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		overflow: auto;
	}

	.voucher-image {
		width: 100%;
	}
}
</style>
