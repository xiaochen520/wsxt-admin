<template>
	<div class="reward-store">
		<!-- 搜索卡片 -->

        <el-card style="margin: 15px 10px 10px;">
            <div class="mb-4">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <el-form-item label="商品名称:">
                        <el-input v-model="searchForm.name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
      
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch" :icon="Search">搜索</el-button>
                        <el-button @click="handleReset" link>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

		<!-- 商品卡片列表 -->
		<div class="product-list">
			<el-card v-for="product in products" :key="product.id" class="product-card">
				<img :src="product.image" :alt="product.name" class="product-image" />
				<div class="product-info">
					<h3 class="product-name">{{ product.name }}</h3>
					<p class="product-description">{{ product.description }}</p>
					<div class="product-price">
						<span class="price">{{ product.price }}</span>
						<span class="unit">{{ product.unit }}</span>
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
// 初始搜索参数
const initialSearchForm = {
    username: '',
};

const searchForm = ref({ ...initialSearchForm });


// 商品数据
const products = ref([
	{
		id: 1,
		name: '有机鸡蛋',
		description: '新鲜有机鸡蛋，营养丰富',
		price: '30元',
		unit: '盒',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=organic%20eggs%20in%20a%20carton%20fresh%20natural&image_size=square',
	},
	{
		id: 2,
		name: '土鸡',
		description: '散养土鸡，肉质鲜美',
		price: '120元',
		unit: '只',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20free-range%20chicken%20natural&image_size=square',
	},
	{
		id: 3,
		name: '土鸡蛋',
		description: '农家土鸡蛋，蛋黄饱满',
		price: '25元',
		unit: '盒',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20farm%20eggs%20natural&image_size=square',
	},
	{
		id: 4,
		name: '鸡肉礼盒',
		description: '精选鸡肉礼盒，送礼佳品',
		price: '180元',
		unit: '盒',
		image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chicken%20meat%20gift%20box%20premium&image_size=square',
	},
]);

const handleSearch = () => {    // 搜索用户
    console.log('搜索参数:', searchForm.value);
    // 这里可以添加搜索逻辑
};

const handleReset = () => { // 重置搜索参数
    searchForm.value = { ...initialSearchForm };
    console.log('重置搜索参数');
};
</script>

<style lang="scss" scoped>
.reward-store {
	padding: 0px;
	:deep(.el-card__body) {
        padding: 18px 18px 0px;
    }
	.search-container {
		margin-bottom: 20px;

		.search-form {
			display: flex;
			align-items: center;

			.search-input {
				width: 300px;
			}
		}
	}

	.product-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 20px;
		padding: 10px 10px 0;
		.product-card {
			transition: all 0.3s ease;

			&:hover {
				transform: translateY(-5px);
				box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
			}

			.product-image {
				width: 100%;
				height: 200px;
				object-fit: cover;
				border-radius: 4px 4px 0 0;
			}

			.product-info {
				padding: 15px;

				.product-name {
					margin: 0 0 10px 0;
					font-size: 18px;
					font-weight: 600;
				}

				.product-description {
					margin: 0 0 15px 0;
					color: #666;
					font-size: 14px;
					line-height: 1.4;
				}

				.product-price {
					display: flex;
					align-items: baseline;

					.price {
						font-size: 20px;
						font-weight: 600;
						color: #e74c3c;
						margin-right: 5px;
					}

					.unit {
						font-size: 14px;
						color: #666;
					}
				}
			}
		}
	}
}
</style>
