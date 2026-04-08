<template>
	<div class="add-course-container">
		<el-card class="add-course-card">
			<template #header>
				<div class="card-header">
					<h2>添加课程</h2>
				</div>
			</template>

			<el-form :model="form" label-width="100px">
				<!-- 课程名称 -->
				<el-form-item label="课程名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入课程名称" />
				</el-form-item>

				<!-- 版本列表 -->
				<el-form-item label="版本列表">
					<div class="version-table-container">
						<el-table :data="form.versions" style="width: 100%" border>
							<el-table-column label="版本名称" width="200">
								<template #default="scope">
									<el-input v-model="scope.row.name" placeholder="请输入版本名称" />
								</template>
							</el-table-column>
							<el-table-column label="版本价格" width="200">
								<template #default="scope">
									<el-input v-model.number="scope.row.price" type="number" placeholder="请输入版本价格" step="0.01" />
								</template>
							</el-table-column>
							<el-table-column label="详情图片">
								<template #default="scope">
									<el-upload
										class="avatar-uploader"
										action="#"
										:show-file-list="false"
										:on-change="(file) => handleImageUpload(file, scope.row)"
										:before-upload="() => false"
									>
										<template v-if="scope.row.detailImage">
											<img :src="scope.row.detailImage" class="avatar" />
										</template>
										<template v-else>
											<el-button size="small" type="primary">上传图片</el-button>
										</template>
									</el-upload>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="80">
								<template #default="scope">
									<el-button type="danger" size="small" @click="removeVersion(scope.$index)" :disabled="form.versions.length <= 1">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button type="primary" plain size="small" @click="addVersion" style="margin-top: 10px">添加版本</el-button>
					</div>
				</el-form-item>

				<!-- 保存按钮 -->
				<el-form-item>
					<el-button type="primary" @click="saveCourse">保存</el-button>
					<el-button @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { createCourse, getCourseDetail, updateCourse } from '@/api';
import router from '@/router';
import { upload } from '@/utils/qiniu';

// 表单数据
const form = reactive({
	name: '',
	versions: [
		{
			name: '',
			price: 0,
			detailImage: '',
		},
	],
});

onMounted(() => {
	if (router.currentRoute.value.query.id) {
		getDetail();
	}
});

function getDetail() {
	getCourseDetail(router.currentRoute.value.query.id).then((res) => {
		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		form.name = res.data.name;
		form.versions = res.data.versions;
	});
}

// 添加版本
function addVersion() {
	form.versions.push({
		name: '',
		price: 0,
		detailImage: '',
	});
}

// 删除版本
function removeVersion(index) {
	if (form.versions.length <= 1) {
		ElMessage.warning('至少保留一个版本');
		return;
	}
	form.versions.splice(index, 1);
}

// 处理图片上传
function handleImageUpload(file, row) {
	console.log(file.raw, 11111);
	upload(file.raw).then((res) => {
		row.detailImage = res.path;
	});
}

// 保存课程
async function saveCourse() {
	console.log(form);
	// 验证表单
	if (!form.name) {
		ElMessage.warning('请输入课程名称');
		return;
	}

	if (form.versions.length === 0) {
		ElMessage.warning('请添加版本');
		return;
	}

	// 验证版本列表
	const hasInvalidVersion = form.versions.some((version) => {
		return !version.name || !version.price || !version.detailImage;
	});

	if (hasInvalidVersion) {
		ElMessage.warning('请完善所有版本信息');
		return;
	}

	try {
		let res;
		if (router.currentRoute.value.query.id) {
			form.id = router.currentRoute.value.query.id;
			res = await updateCourse(form);
		} else {
			res = await createCourse(form);
		}

		if (res.code !== 200) {
			ElMessage.error(res.msg);
			return;
		}
		ElMessage.success(router.currentRoute.value.query.id ? '课程更新成功' : '课程创建成功');
		router.push({ name: 'course' });
	} catch (error) {
		ElMessage.error(router.currentRoute.value.query.id ? '更新课程失败，请稍后重试' : '创建课程失败，请稍后重试');
	}
}

// 取消
function cancel() {
	router.push({ name: 'course' });
}
</script>

<style scoped lang="scss">
.add-course-container {
	padding: 20px;

	.add-course-card {
		max-width: 800px;
		margin: 0 auto;

		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			h2 {
				margin: 0;
				font-size: 18px;
			}
		}
	}

	.version-table-container {
		margin-top: 10px;
	}

	.avatar-uploader {
		.avatar {
			width: 100%;
		}
	}
}
</style>
