<template>
	<el-container class="layout">
		<!-- 左侧菜单 -->
		<el-aside class="aside" width="200px">
			<Sidebar />
		</el-aside>

		<!-- 右侧 -->
		<el-container>
			<!-- 顶部 Header -->
			<el-header class="header" height="60px">
				<Header />
			</el-header>

			<!-- 内容区 -->
			<el-main class="main">
				<div class="content">
					<router-view />
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
import Sidebar from './components/sidebar';
import Header from './components/header';
</script>

<style lang="scss" scoped>
.layout {
	height: 100vh;
	overflow: hidden; // ⭐ 防止整体滚动

	// 左侧菜单
	.aside {
		background-color: #001529;
		color: #fff;
		height: 100vh;
		overflow: auto;
	}

	// 顶部 Header（固定）
	.header {
		background: #fff;
		padding: 0;
		display: flex;
		align-items: center;

		position: sticky; // ⭐ 固定关键
		top: 0;
		z-index: 1000;

		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	// 主体
	.main {
		padding: 0;
		background: #f5f7fa;
		overflow: hidden; // ⭐ 防止 main 滚动
	}

	// 真正滚动区域
	.content {
		height: calc(100vh - 60px); // 减去 header 高度
		overflow-y: auto;
		box-sizing: border-box;
	}
}
</style>