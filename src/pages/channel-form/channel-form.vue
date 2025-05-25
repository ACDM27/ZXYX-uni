<template>
  <view class="channel-form-container">
    <view class="form-grid">
      <view 
        v-for="(form, index) in formCards" 
        :key="index"
        class="form-card"
        hover-class="form-card-hover"
        @tap="navigateToForm(form)"
      >
        <view class="card-icon">
          <uni-icons :type="form.icon" size="28" :color="iconColor"></uni-icons>
        </view>
        <text class="card-title">{{ form.title }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      iconColor: '#4285F4',
      formCards: [
        {
          title: '成果信息收集',
          icon: 'medal',
          presetField: '这是通道表单字段A',
          type: '成果信息收集',
          path: '/pages/form/achievement-form'
        },
        {
          title: '竞赛信息收集',
          icon: 'flag',
          presetField: '这是通道表单字段B',
          type: '竞赛信息收集',
          path: '/pages/form/competition-form'
        },
        {
          title: '论文信息收集',
          icon: 'paperclip',
          presetField: '',
          type: '论文信息收集',
          path: '/pages/form/paper-form'
        },
        {
          title: '专利信息收集',
          icon: 'star',
          presetField: '',
          type: '专利信息收集',
          path: '/pages/form/patent-form'
        },
        {
          title: '其他信息收集',
          icon: 'more',
          presetField: '',
          type: '其他信息收集',
          path: '/pages/form/other-form'
        }
      ]
    }
  },
  methods: {
    navigateToForm(form) {
      uni.navigateTo({
        url: form.path + '?type=' + encodeURIComponent(form.type) + '&preset=' + encodeURIComponent(form.presetField || '')
      })
    }
  }
}
</script>

<style>
.channel-form-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 30rpx;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  padding: 20rpx 0;
}

.form-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24rpx;
  transition: all 0.3s ease-in-out;
}

.form-card-hover {
  transform: scale(1.03);
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.15);
}

.form-card-hover .card-icon uni-icons {
  color: #000000 !important;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}
</style> 