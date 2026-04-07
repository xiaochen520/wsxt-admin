<template>
	<ElConfigProvider :locale="zhCn">
		<router-view />
	</ElConfigProvider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
