<template>
  <view class="tab-bar">
    <view 
      class="tab-item" 
      :class="{ active: currentRoute === '/pages/home/home' }" 
      @tap="navigateTo('/pages/home/home')"
    >
      <view class="icon-wrapper">
        <image 
          class="icon" 
          :src="currentRoute === '/pages/home/home' ? '/static/tabbar/home-active.png' : '/static/tabbar/home.png'"
        />
      </view>
      <text class="text">首页</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentRoute === '/pages/ai-qa/ai-qa' }" 
      @tap="navigateTo('/pages/ai-qa/ai-qa')"
    >
      <view class="icon-wrapper">
        <image 
          class="icon" 
          :src="currentRoute === '/pages/ai-qa/ai-qa' ? '/static/tabbar/qa-active.png' : '/static/tabbar/qa.png'"
        />
      </view>
      <text class="text">智能问答</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentRoute === '/pages/multi-report/multi-report' }" 
      @tap="navigateTo('/pages/multi-report/multi-report')"
    >
      <view class="icon-wrapper">
        <image 
          class="icon" 
          :src="currentRoute === '/pages/multi-report/multi-report' ? '/static/tabbar/report-active.png' : '/static/tabbar/report.png'"
        />
      </view>
      <text class="text">综测</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentRoute = ref('')

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  currentRoute.value = '/' + currentPage.route
})

const navigateTo = (path) => {
  uni.switchTab({
    url: path
  })
  currentRoute.value = path
}
</script>

<style lang="scss" scoped>
.tab-bar {
  height: 100rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -4rpx 15rpx rgba(0, 0, 0, 0.06);
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 0 20rpx;
  position: relative;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  position: relative;
  padding: 16rpx 0;
}

.tab-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 48rpx;
  height: 6rpx;
  background-color: #64B5F6;
  border-radius: 6rpx;
  transition: transform 0.3s ease;
}

.tab-item.active::after {
  transform: translateX(-50%) scaleX(1);
}

.tab-item.active {
  color: #64B5F6;
}

.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8rpx;
  position: relative;
  transition: transform 0.3s ease;
}

.icon {
  width: 44rpx;
  height: 44rpx;
  transition: all 0.3s ease;
}

.tab-item.active .icon {
  transform: scale(1.1);
}

.text {
  font-size: 24rpx;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-item.active .text {
  font-weight: 600;
}
</style> 