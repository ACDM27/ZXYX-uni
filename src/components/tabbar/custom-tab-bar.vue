<template>
  <view class="custom-tab-bar">
    <view 
      v-for="(item, index) in tabList" 
      :key="index"
      class="tab-item"
      :class="{ active: current === index }"
      @tap="switchTab(index, item.pagePath)"
    >
      <uni-icons
        :type="current === index ? item.selectedIcon : item.icon"
        :color="current === index ? selectedColor : color"
        size="30"
      ></uni-icons>
      <text 
        class="tab-text"
        :style="{ color: current === index ? selectedColor : color }"
      >{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CustomTabBar',
  data() {
    return {
      color: '#7A7E83',
      selectedColor: '#409EFF',
      current: 0,
      tabList: [
        {
          pagePath: '/pages/home/home',
          text: '首页',
          icon: 'home',
          selectedIcon: 'home-filled'
        },
        {
          pagePath: '/pages/honor/honor',
          text: '荣誉',
          icon: 'medal',
          selectedIcon: 'medal-filled'
        },
        {
          pagePath: '/pages/profile/profile',
          text: '我的',
          icon: 'person',
          selectedIcon: 'person-filled'
        }
      ]
    }
  },
  created() {
    // 获取当前页面路径
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    const currentPath = '/' + page.route
    
    // 设置当前选中的tab
    const index = this.tabList.findIndex(item => item.pagePath === currentPath)
    if (index > -1) {
      this.current = index
    }
  },
  methods: {
    switchTab(index, path) {
      if (this.current !== index) {
        this.current = index
        uni.switchTab({
          url: path
        })
      }
    }
  }
}
</script>

<style lang="scss">
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #ffffff;
  display: flex;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
}
  
.custom-tab-bar .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10rpx 0;
}
    
.custom-tab-bar .tab-item .tab-text {
      font-size: 24rpx;
  margin-top: 8rpx;
}
</style> 