<template>
	<div class="payment-container">
		<el-card class="payment-card">
			<template #header>
				<h2>支付收款码设置</h2>
			</template>

			<el-form :model="formData" label-width="120px">
				<!-- 微信收款码 -->
				<el-form-item label="微信收款码">
					<el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleWechatUpload" :before-upload="beforeUpload">
						<img v-if="formData.wechatQr" :src="formData.wechatQr" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>
					<el-button type="text" @click="formData.wechatQr = ''" v-if="formData.wechatQr">删除</el-button>
				</el-form-item>

				<!-- 支付宝收款码 -->
				<el-form-item label="支付宝收款码">
					<el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="handleAlipayUpload" :before-upload="beforeUpload">
						<img v-if="formData.alipayQr" :src="formData.alipayQr" class="avatar" />
						<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>
					<el-button type="text" @click="formData.alipayQr = ''" v-if="formData.alipayQr">删除</el-button>
				</el-form-item>

				<!-- 保存按钮 -->
				<el-form-item>
					<el-button type="primary" @click="handleSave">保存设置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { getPaymentConfig, updatePaymentConfig } from '@/api';
import { upload } from '@/utils/qiniu';

// 表单数据
const formData = reactive({
	wechatQr: '', // 微信收款码
	alipayQr: '', // 支付宝收款码
});

onMounted(() => {
	getPaymentConfig().then((res) => {
		formData.wechatQr = res.data.wechatQr || '';
		formData.alipayQr = res.data.alipayQr || '';
	});
});

// 图片上传前的校验
function beforeUpload(file) {
	const isImage = file.type.startsWith('image/');
	if (!isImage) {
		ElMessage.error('只能上传图片文件！');
		return false;
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		ElMessage.error('图片大小不能超过 2MB！');
		return false;
	}
	return true;
}

// 微信收款码上传处理
function handleWechatUpload(file) {
	upload(file.raw).then((res) => {
		formData.wechatQr = res.path;
	});
}

// 支付宝收款码上传处理
function handleAlipayUpload(file) {
	upload(file.raw).then((res) => {
		formData.alipayQr = res.path;
	});
}

// 保存设置
function handleSave() {
	updatePaymentConfig(formData).then((res) => {
		if (res.code === 200) {
			ElMessage.success('保存成功！');
		} else {
			ElMessage.error(res.msg || '保存失败！');
		}
	});
}
</script>

<style scoped lang="scss">
.payment-container {
	padding: 20px;

	.payment-card {
		max-width: 600px;
		margin: 0 auto;

		:deep(.el-card__header) {
			padding: 15px 20px;
			h2 {
				margin: 0;
				font-size: 18px;
			}
		}
	}

	.avatar-uploader {
		display: flex;
		width: 200px;
		height: 200px;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		align-items: center;
		justify-content: center;

		.avatar-uploader-icon {
			font-size: 48px;
			color: #999;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}

		.avatar {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>
