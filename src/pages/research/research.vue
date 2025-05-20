<template>
	<view class="research-container">
		<!-- 顶部搜索栏 -->
		<view class="search-box">
			<uni-search-bar
				v-model="searchValue"
				placeholder="搜索科研项目"
				@confirm="handleSearch"
				@clear="handleClear"
			/>
		</view>
		
		<!-- 科研项目列表 -->
		<view class="research-list">
			<view class="list-header">
				<text class="title">科研项目</text>
				<button class="add-btn" @click="handleAdd">添加项目</button>
			</view>
			
			<view class="list-content">
				<view v-for="(item, index) in researchList" :key="index" class="research-item">
					<view class="item-header">
						<text class="item-title">{{item.title}}</text>
						<text class="item-status" :class="item.status">{{item.statusText}}</text>
					</view>
					<view class="item-content">
						<text class="item-desc">{{item.description}}</text>
					</view>
					<view class="item-footer">
						<text class="item-date">{{item.date}}</text>
						<view class="item-actions">
							<button class="action-btn" @click="handleEdit(item)">编辑</button>
							<button class="action-btn delete" @click="handleDelete(item)">删除</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchValue: '',
			researchList: [
				{
					title: '示例科研项目1',
					description: '这是一个示例科研项目描述',
					status: 'ongoing',
					statusText: '进行中',
					date: '2024-05-20'
				},
				{
					title: '示例科研项目2',
					description: '这是另一个示例科研项目描述',
					status: 'completed',
					statusText: '已完成',
					date: '2024-05-19'
				}
			]
		}
	},
	methods: {
		handleSearch(e) {
			console.log('搜索内容：', e.value)
			// TODO: 实现搜索功能
		},
		handleClear() {
			this.searchValue = ''
		},
		handleAdd() {
			uni.showActionSheet({
				itemList: ['添加学术活动', '添加学术论文'],
				success: (res) => {
					if (res.tapIndex === 0) {
						uni.navigateTo({
							url: '/pages/research/activity-form'
						})
					} else if (res.tapIndex === 1) {
						uni.navigateTo({
							url: '/pages/research/paper-form'
						})
					} else if (res.tapIndex === 2) {
						uni.navigateTo({
							url: '/pages/research/project-form'
						})
					}
				}
			})
		},
		handleEdit(item) {
			console.log('编辑项目：', item)
			// TODO: 实现编辑功能
		},
		handleDelete(item) {
			uni.showModal({
				title: '确认删除',
				content: '确定要删除这个科研项目吗？',
				success: (res) => {
					if (res.confirm) {
						console.log('删除项目：', item)
						// TODO: 实现删除功能
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
.research-container {
	padding: 20rpx;
	
	.search-box {
		margin-bottom: 20rpx;
	}
	
	.research-list {
		.list-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			.title {
				font-size: 32rpx;
				font-weight: bold;
			}
			
			.add-btn {
				background-color: #409EFF;
				color: #fff;
				font-size: 28rpx;
				padding: 10rpx 30rpx;
				border-radius: 8rpx;
			}
		}
		
		.research-item {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
			
			.item-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 16rpx;
				
				.item-title {
					font-size: 30rpx;
					font-weight: bold;
				}
				
				.item-status {
					font-size: 24rpx;
					padding: 4rpx 16rpx;
					border-radius: 20rpx;
					
					&.ongoing {
						background-color: #e6f7ff;
						color: #1890ff;
					}
					
					&.completed {
						background-color: #f6ffed;
						color: #52c41a;
					}
				}
			}
			
			.item-content {
				margin-bottom: 16rpx;
				
				.item-desc {
					font-size: 28rpx;
					color: #666;
				}
			}
			
			.item-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.item-date {
					font-size: 24rpx;
					color: #999;
				}
				
				.item-actions {
					display: flex;
					gap: 16rpx;
					
					.action-btn {
						font-size: 24rpx;
						padding: 6rpx 20rpx;
						border-radius: 6rpx;
						background-color: #f0f0f0;
						
						&.delete {
							background-color: #fff1f0;
							color: #ff4d4f;
						}
					}
				}
			}
		}
	}
}
</style> 