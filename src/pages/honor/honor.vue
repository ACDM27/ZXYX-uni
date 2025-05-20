<template>
  <view class="honor-page">
    <!-- 顶部区域 -->
    <view class="header-area">
      <!-- 标题 -->
      <view class="honor-title-container">
        <view class="title-decoration left"></view>
        <text class="honor-title">学生成果荣誉墙</text>
        <view class="title-decoration right"></view>
      </view>
    </view>

    <!-- 蓝色背景块 -->
    <view class="blue-block"></view>
    
    <view class="categories-container">
      <view 
        class="honor-category" 
        v-for="(category, index) in categories" 
        :key="index"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <view class="category-icon" :style="{ backgroundColor: category.iconBg }">
          <uni-icons :type="category.icon" size="28" :color="category.iconColor" />
        </view>
        <view class="category-content">
          <text class="category-title">{{ category.title }}</text>
          <view class="category-items">
            <text class="item" v-for="(item, itemIndex) in category.items" :key="itemIndex">
              {{ item }}
            </text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="honor-footer">
      <view class="share-button" @tap="shareHonors">
        <uni-icons type="share" size="20" color="#409EFF" />
        <text>分享我的荣誉</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          icon: 'file',
          title: '证书',
          iconBg: '#E3F2FD',
          iconColor: '#1976D2',
          items: [
            '1、普通话水平考试二甲证书',
            '2、全国计算机二级证书'
          ]
        },
        {
          icon: 'star',
          title: '科研成果',
          iconBg: '#E8F5E9',
          iconColor: '#388E3C',
          items: [
            '1、桂警调项目立项',
            '2、一篇科学类SCI论文'
          ]
        },
        {
          icon: 'chart',
          title: '成绩与排名',
          iconBg: '#FFF3E0',
          iconColor: '#F57C00',
          items: [
            '1、大一上绩点3.8，排名第一',
            '2、大一下绩点3.7，排名第三'
          ]
        },
        {
          icon: 'flag',
          title: '志愿活动',
          iconBg: '#E8EAF6',
          iconColor: '#3949AB',
          items: [
            '1、2025年3月4日学雷锋活动',
            '2、2025年5月2日校园清扫活动'
          ]
        },
        {
          icon: 'medal',
          title: '校内奖项',
          iconBg: '#FFF8E1',
          iconColor: '#FFA000',
          items: [
            '1、院级创新赛二等奖',
            '2、院级拔河大赛第二名'
          ]
        }
      ]
    }
  },
  methods: {
    shareHonors() {
      uni.showToast({
        title: '分享功能即将上线',
        icon: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style>
.honor-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  position: relative;
}

.header-area {
  background-color: #409EFF;
  padding: 80rpx 32rpx 200rpx;
  position: relative;
  z-index: 1;
}

.blue-block {
  height: 320rpx;
  background-color: #409EFF;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.honor-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 80rpx;
  padding: 0 80rpx;
  margin-top: 40rpx;
}

.title-decoration {
  flex: 1;
  height: 4rpx;
  width: 120rpx;
  background: linear-gradient(90deg, transparent, #fff);
  position: relative;
}

.title-decoration.left {
  margin-right: 30rpx;
  background: linear-gradient(90deg, transparent, #fff);
}

.title-decoration.right {
  margin-left: 30rpx;
  background: linear-gradient(90deg, #fff, transparent);
}

.title-decoration::before {
  content: '';
  position: absolute;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: #fff;
  top: -4rpx;
}

.title-decoration.left::before {
  right: 0;
}

.title-decoration.right::before {
  left: 0;
}

.honor-title {
  color: #fff;
  font-size: 44rpx;
  font-weight: bold;
  margin: 0;
  padding: 0 20rpx;
  white-space: nowrap;
}

.categories-container {
  margin-top: -120rpx;
  padding: 0 40rpx;
  position: relative;
  z-index: 1;
}

.honor-category {
  display: flex;
  background-color: #ffffff;
  border-radius: 32rpx;
  padding: 36rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.06);
  transform: translateY(0);
  opacity: 0;
  animation: fade-up 0.5s forwards;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(40rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112rpx;
  height: 112rpx;
  border-radius: 28rpx;
  margin-right: 36rpx;
}

.category-content {
  flex: 1;
}

.category-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.category-items {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.item {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

.honor-footer {
  padding: 40rpx;
  display: flex;
  justify-content: center;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 12rpx;
  background-color: #fff;
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.share-button text {
  font-size: 28rpx;
  color: #409EFF;
}
</style> 