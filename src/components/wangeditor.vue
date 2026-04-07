<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc" />
        <Editor v-model="valueHtml" :defaultConfig="editorConfig" style="height: 500px; overflow-y: hidden"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>

<script setup>
import { ref, shallowRef, onBeforeUnmount, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 定义 props 和 emits
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.modelValue || '');

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
    if (newValue !== valueHtml.value) {
        valueHtml.value = newValue
    }
})

// 工具栏配置
const toolbarConfig = { excludeKeys: ['uploadImage', 'uploadVideo','insertVideo', 'video' ] }

// 编辑器配置
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例
}

const handleChange = () => {
    emit('update:modelValue', valueHtml.value)
}
</script>
<style lang="less" scoped>

</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>