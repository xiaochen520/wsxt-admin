<template>
	<div class="adoptoption">
		<!-- 搜索卡片 -->
		<el-card style="margin: 15px 0px 0px">
			<div>
				<el-form :inline="true" :model="searchForm" class="demo-form-inline">
					<el-form-item label="订单号:">
						<el-input v-model="searchForm.orderNo" placeholder="请输入订单号"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleSearch" :icon="Search">搜索</el-button>
						<el-button @click="handleReset" link>重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>

		<!-- 订单列表卡片 -->
		<el-card style="margin: 15px 0px 0px">
			<div class="mb-4" style="padding-bottom: 20px">
				<el-table :height="height - 270" :data="orderList" style="width: 100%">
					<el-table-column label="认养图">
						<template #default="scope">
							<img :src="scope.row.image" :alt="scope.row.orderNo" class="order-image" />
						</template>
					</el-table-column>
					<el-table-column prop="orderNo" label="订单号" ></el-table-column>
					<el-table-column prop="createTime" label="时间"></el-table-column>
					<!-- 操作列 -->
					<el-table-column label="操作" width="180" fixed="right">
						<template #default="scope">
							<el-button type="primary" link size="small" @click="handleViewDetail(scope.row)">查看详情</el-button>
							<el-button type="danger" link size="small" @click="handleDelete(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pagination">
				<el-pagination
					v-model:current-page="listQuery.pageNo"
					v-model:page-size="listQuery.pageSize"
					:page-sizes="[10, 20, 30, 50]"
					:small="false"
					:disabled="false"
					layout="total, sizes, prev, pager, next, jumper"
					:total="listQuery.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
console.log(width.value, height.value);

const listQuery = reactive({
	pageNo: 1,
	pageSize: 10,
	total: 0,
});

// 初始搜索参数
const initialSearchForm = {
	orderNo: '',
};

const searchForm = ref({ ...initialSearchForm });

// 订单列表
const orderList = ref([
	{
		id: 1,
		orderNo: 'ORD20260403001',
		createTime: '2026-04-03 10:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image&image_size=square',
	},
	{
		id: 2,
		orderNo: 'ORD20260403002',
		createTime: '2026-04-03 11:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%202&image_size=square',
	},
	{
		id: 3,
		orderNo: 'ORD20260403003',
		createTime: '2026-04-03 12:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%203&image_size=square',
	},
	{
		id: 4,
		orderNo: 'ORD20260403004',
		createTime: '2026-04-03 13:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%204&image_size=square',
	},
	{
		id: 5,
		orderNo: 'ORD20260403005',
		createTime: '2026-04-03 14:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%205&image_size=square',
	},
    {
		id: 6,
		orderNo: 'ORD20260403006',
		createTime: '2026-04-03 15:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%206&image_size=square',
	},
    {
		id: 7,
		orderNo: 'ORD20260403007',
		createTime: '2026-04-03 16:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%207&image_size=square',
	},
    {
		id: 8,
		orderNo: 'ORD20260403008',
		createTime: '2026-04-03 17:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%208&image_size=square',
	},
    {
		id: 9,
		orderNo: 'ORD20260403009',
		createTime: '2026-04-03 18:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%209&image_size=square',
	},
    {
		id: 10,
		orderNo: 'ORD20260403010',
		createTime: '2026-04-03 19:00:00',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20adoption%20order%20image%2010&image_size=square',
	},

]);

const handleSearch = () => {
	// 搜索订单
	console.log('搜索参数:', searchForm.value);
	// 这里可以添加搜索逻辑
};

const handleReset = () => {
	// 重置搜索参数
	searchForm.value = { ...initialSearchForm };
	console.log('重置搜索参数');
};

const handleViewDetail = (row) => {
	// 查看详情
	console.log('查看详情:', row);
	// 这里可以添加查看详情逻辑
};

const handleDelete = (row) => {
	// 删除订单
	console.log('删除订单:', row);
	// 这里可以添加删除逻辑
};

const handleSizeChange = (val) => {
	// 分页大小改变
	console.log(`${val} items per page`);
	listQuery.pageSize = val;
	// getList();
};

const handleCurrentChange = (value) => {
	// 分页改变
	console.log(`current page: ${value}`);
	listQuery.pageNo = value;
	// getList();
};
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
	padding: 18px 18px 0px;
}

.adoptoption {
	padding: 0 10px;
}

.pagination {
	padding: 0px 0px 20px;
	display: flex;
	justify-content: flex-end;
}

.order-image {
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 4px;
}
</style>
