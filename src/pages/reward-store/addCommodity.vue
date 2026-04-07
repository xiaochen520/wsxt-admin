<template>
    <div class="addCommodity">
        <el-card style="margin: 15px 10px 10px;">
            <el-page-header @back="goBack" style="margin-bottom: 20px;">
                <template #content>
                    <span class="text-large font-600 mr-3">{{ type === 'add' ? '新增商品' : '编辑商品' }} </span>
                </template>
            </el-page-header>
            <div class="addCommodity_content">
                <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" label-position="left">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入商品名称" style="width: 300px;"></el-input>
                    </el-form-item>
                    <!-- 简介 -->
                    <el-form-item label="商品简介" prop="description">
                        <el-input type="textarea" v-model="form.description" placeholder="请输入商品简介" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="price">
                        <el-input v-model="form.price" placeholder="请输入商品价格" style="width: 300px;"></el-input>
                    </el-form-item>
                    <!-- 商品图片 -->
                    <el-form-item label="商品图片" prop="image">
                        <UploadImage v-model="form.image" :limit="1" :isSingle="true"></UploadImage>
                    </el-form-item>
                    <el-form-item label="商品详情" prop="modelValue">
                        <WangedEditor v-model="form.modelValue"></WangedEditor>
                    </el-form-item>
                    <!-- 提交按钮 -->
                    <div style="text-align: center;">
                        <el-button type="info" @click="resetForm">重置</el-button>
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </div>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import WangedEditor from '@/components/wangeditor.vue';
import UploadImage from '@/components/UploadImage.vue';
import router from '@/router';
const form = ref({  // 表单数据
    name: '',
    description: '',
    modelValue: '',
    price: '',
});
const type = ref('add');
onMounted(() => {
    type.value = router.currentRoute.value.query.type || 'add';
});



const rules = ref({ // 表单验证规则
    name: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入商品价格', trigger: 'blur' },
    ],
});

const resetForm = () => {   // 重置表单
    formRef.value.resetFields();
};



const formRef = ref(null);

const submitForm = async () => {    
    // 验证表单
    await formRef.value.validate();
};
const goBack = () => {  // 返回上一页
    router.back();
};
</script>
<style scoped lang="scss">

</style>
