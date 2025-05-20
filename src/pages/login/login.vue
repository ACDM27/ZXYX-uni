<template>
  <view class="login">
    <text class="login-title">登录页面</text>
    <form @submit="handleSubmit">
      <view class="form-group">
        <text class="label">用户名</text>
        <input 
          class="uni-input" 
          type="text" 
          v-model="username" 
          placeholder="请输入用户名"
        />
      </view>
      <view class="form-group">
        <text class="label">密码</text>
        <input 
          class="uni-input" 
          type="password" 
          v-model="password" 
          placeholder="请输入密码"
        />
      </view>
      <button 
        class="submit-btn" 
        type="primary" 
        @tap="handleSubmit"
      >登录</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      uni.showToast({
        title: '登录中...',
        icon: 'loading'
      })
      // TODO: 实现实际的登录逻辑
      setTimeout(() => {
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        uni.switchTab({
          url: '/pages/home/home'
        })
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
.login {
  padding: 30rpx;
  
  .login-title {
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 60rpx;
  }
  
  .form-group {
    margin-bottom: 30rpx;
    
    .label {
      display: block;
      margin-bottom: 20rpx;
      font-size: 28rpx;
    }
    
    .uni-input {
      width: 100%;
      height: 80rpx;
      border: 1rpx solid #dcdfe6;
      border-radius: 8rpx;
      padding: 0 20rpx;
      font-size: 28rpx;
    }
  }
  
  .submit-btn {
    margin-top: 60rpx;
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
  }
}
</style> 