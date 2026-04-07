<template>
	<div class="home">

		<div class="head_card">
			<el-row :gutter="20">
				<el-col :span="6" v-for="item in cards" :key="item.title">
					<el-card class="card_item" shadow="hover">
						<div class="card_content">
							<div class="left">
								<p>{{ item.title }}</p>
								<span>{{ item.value }}</span>
							</div>
							<div class="right">
								<i :class="item.icon"></i>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>

		<div class="line_card">
			<div ref="chartRef" style="height: 400px;"></div>
		</div>

	</div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const cards = [
	{ title: '总收入', value: '¥100,000', icon: 'el-icon-money' },
	{ title: '用户数量', value: '100', icon: 'el-icon-user' },
	{ title: '养鸡数量', value: '100', icon: 'el-icon-chicken' },
	{ title: '订单数量', value: '100', icon: 'el-icon-tickets' },
];

// 1. 创建一个DOM元素的引用
const chartRef = ref(null);
let myChart = null;
// 2. 初始化图表并设置配置项
const initChart = () => {
	if (!chartRef.value) return;

	// 初始化ECharts实例
	myChart = echarts.init(chartRef.value);

	// 3. 配置图表的选项
	const option = {
		grid: {
			top: '20%',
			left: '2%',
			right: '2%',
			bottom: '10%',
			containLabel: true
		},

		title: {
			text: '月度活跃用户趋势',
			left: 'left',
			textStyle: {
				fontSize: 16,
				fontWeight: 600
			}
		},

		tooltip: {
			trigger: 'axis',
			backgroundColor: '#fff',
			borderColor: '#eee',
			borderWidth: 1,
			textStyle: {
				color: '#333'
			}
		},

		legend: {
			bottom: 0,
		},

		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1月', '2月', '3月', '4月', '5月', '6月'],
			axisLine: {
				lineStyle: { color: '#ddd' }
			},
			axisTick: { show: false }
		},

		yAxis: {
			type: 'value',
			splitLine: {
				lineStyle: {
					type: 'dashed',
					color: '#eee'
				}
			}
		},

		series: [
			{
				name: '新增用户',
				type: 'line',
				smooth: true,
				data: [120, 200, 150, 80, 70, 210],
				symbolSize: 6,

				lineStyle: {
					width: 3,
					color: '#5470c6'
				},

				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(84,112,198,0.4)' },
						{ offset: 1, color: 'rgba(84,112,198,0.05)' }
					])
				}
			},
			{
				name: '活跃用户',
				type: 'line',
				smooth: true,
				data: [320, 302, 341, 374, 390, 450],
				symbolSize: 6,

				lineStyle: {
					width: 3,
					color: '#fac858'
				},

				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(250,200,88,0.4)' },
						{ offset: 1, color: 'rgba(250,200,88,0.05)' }
					])
				}
			}
		]
	};

	// 将配置项设置到图表中
	myChart.setOption(option);

	setTimeout(() => {
		myChart?.resize();
	}, 0);
};

// 4. 监听窗口尺寸变化，让图表自适应
const handleResize = () => {
	myChart?.resize();
};

// 组件挂载后，初始化图表
onMounted(() => {
	if (!chartRef.value) return;
	initChart();
	window.addEventListener('resize', handleResize);
});

// 组件销毁前，清理图表实例和事件监听
onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
	myChart?.dispose();
});
</script>

<style lang="scss" scoped>
.home {
	padding: 20px;
	// background: #f5f7fa;

	.head_card {
		.card_item {
			border-radius: 10px;
			transition: all 0.3s;
			&:hover {
				cursor: pointer;
				transform: translateY(-5px);
			}
			.card_content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					p {
						font-size: 14px;
						color: #999;
					}

					span {
						font-size: 26px;
						font-weight: bold;
						margin-top: 8px;
						display: block;
					}
				}
				.right {
					font-size: 30px;
					color: #409eff;
				}
			}
		}
	}

	.line_card {
		margin-top: 20px;
		background: #fff;
		padding: 10px 20px 20px;
		border-radius: 10px;
	}
}
</style>