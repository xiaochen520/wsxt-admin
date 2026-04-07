<template>
    <div>
        <el-upload v-model:file-list="fileList" :action="action" list-type="picture-card" :limit="limit"
            :on-success="handleSuccess" :on-remove="handleRemove" :on-preview="handlePreview" :on-exceed="handleExceed"
            :before-upload="beforeUpload">
            <!-- 单图时隐藏上传按钮 -->
            <el-icon v-if="!isSingle || fileList.length === 0">
                <Plus />
            </el-icon>
        </el-upload>

        <!-- 预览 -->
        <el-dialog v-model="dialogVisible">
            <img style="width: 100%" :src="dialogImageUrl" />
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// ===== props =====
const props = defineProps({
    modelValue: {
        type: [String, Array],
        default: ''
    },
    action: {
        type: String,
        default: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15'
    },
    limit: {
        type: Number,
        default: 1 // 默认单图
    }
})

// ===== emit =====
const emit = defineEmits(['update:modelValue'])

// ===== 状态 =====
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// ===== 是否单图 =====
const isSingle = computed(() => props.limit === 1)

// ===== 初始化回显 =====
watch(
    () => props.modelValue,
    (val) => {
        if (!val) {
            fileList.value = []
            return
        }

        // 单图
        if (isSingle.value) {
            fileList.value = [
                {
                    name: 'image',
                    url: val
                }
            ]
        } else {
            // 多图
            fileList.value = val.map((url, index) => ({
                name: 'image-' + index,
                url
            }))
        }
    },
    { immediate: true }
)

// ===== 上传成功 =====
const handleSuccess = (response, uploadFile, uploadFiles) => {
    // ⚠️ 根据后端返回改
    const getUrl = (file) =>
        file.response?.url || file.url

    if (isSingle.value) {
        const url = getUrl(uploadFile)
        emit('update:modelValue', url)
    } else {
        const urls = uploadFiles.map(getUrl)
        emit('update:modelValue', urls)
    }
}

// ===== 删除 =====
const handleRemove = (file, files) => {
    if (isSingle.value) {
        emit('update:modelValue', '')
    } else {
        const urls = files.map(item => item.url)
        emit('update:modelValue', urls)
    }
}

// ===== 预览 =====
const handlePreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

// ===== 限制提示 =====
const handleExceed = () => {
    ElMessage.warning(`最多上传 ${props.limit} 张`)
}

// ===== 上传前校验 =====
const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
        ElMessage.error('只能上传图片')
        return false
    }
    return true
}
</script>