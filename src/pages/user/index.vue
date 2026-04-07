<template>
    <div class="user-container">

        <!-- 搜索卡片 -->

        <el-card style="margin: 15px 10px 10px;">
            <div class="mb-4">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item label="用户名称:">
                        <el-input v-model="searchForm.username" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:">
                        <el-input v-model="searchForm.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="状态:">
                        <el-select v-model="searchForm.status" placeholder="请选择状态" style="width: 120px;">
                            <el-option label="启用" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                        </el-select>
                    </el-form-item>                    
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch" :icon="Search">搜索</el-button>
                        <el-button @click="handleReset" link>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <!-- 用户列表卡片 -->

        <el-card style="margin: 15px 10px 10px;">
            <div class="mb-4" style="padding-bottom: 20px;">
                <el-table :data="userList" style="width: 100%">
                    <el-table-column prop="username" label="用户信息" width="180"></el-table-column>
                    <el-table-column prop="phone" label="鸡蛋数量" width="180"></el-table-column>
                    <el-table-column prop="phone" label="鸡的数量" width="180"></el-table-column>
                    <el-table-column prop="phone" label="雏鸡数量" width="180"></el-table-column>
                    <el-table-column prop="phone" label="邀请人数" width="180"></el-table-column>
                    <el-table-column prop="phone" label="上级用户手机号" width="180"></el-table-column>
                    <el-table-column prop="status" label="状态" width="180">
                        <template #default="scope">
                            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-tag>
                        </template>
                    </el-table-column>
                    <!-- 操作列 -->
                    <el-table-column label="操作" width="180" fixed="right">
                        <template #default="scope">
                            <el-button type="primary" link size="small">编辑</el-button>
                            <el-button type="danger" link size="small">禁用</el-button>
                            <el-button type="success" link size="small">启用</el-button>
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
import { ref,reactive } from 'vue';
import { Search } from '@element-plus/icons-vue';
const listQuery = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0
});
// 初始搜索参数
const initialSearchForm = {
    username: '',
    phone: '',
    status: ''
};

const searchForm = ref({ ...initialSearchForm });

// userList
const userList = ref([
    {
        username: '用户1',
        phone: '13800000000',
        status: 1
    },
    {
        username: '用户2',
        phone: '13800000001',
        status: 0
    },
    {
        username: '用户3',
        phone: '13800000002',
        status: 1
    },
]);   // 用户列表



const handleSearch = () => {    // 搜索用户
    console.log('搜索参数:', searchForm.value);
    // 这里可以添加搜索逻辑
};

const handleReset = () => { // 重置搜索参数
    searchForm.value = { ...initialSearchForm };
    console.log('重置搜索参数');
};

const handleSizeChange = (val) => {  // 分页大小改变
    console.log(`${val} items per page`);
    listQuery.pageSize = val;
    // getList();
};
const handleCurrentChange = (value) => {    // 分页改变
    console.log(`current page: ${value}`);
    listQuery.pageNo = value;
    // getList();
};

</script>

<style scoped lang="scss">
    :deep(.el-card__body) {
        padding: 18px 18px 0px;
    }
    .user-container {
      
    }

    .pagination{
        padding: 0px 0px 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>
