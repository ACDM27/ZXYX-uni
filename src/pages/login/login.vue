<template>
  <view class="login" :class="{ 'loading': loading }">
    <text class="login-title">学生成果管理系统</text>
    <form @submit.prevent="handleSubmit">
      <view class="form-group">
        <text class="label">用户名</text>
        <input 
          class="uni-input" 
          type="text" 
          v-model="form.username" 
          placeholder="请输入用户名"
          @blur="validateUsername"
        />
        <text class="error-text" v-if="errors.username">{{ errors.username }}</text>
      </view>
      <view class="form-group">
        <text class="label">密码</text>
        <input 
          class="uni-input" 
          type="password" 
          v-model="form.password" 
          placeholder="请输入密码"
          @blur="validatePassword"
        />
        <text class="error-text" v-if="errors.password">{{ errors.password }}</text>
      </view>
      <button 
        class="submit-btn" 
        type="primary" 
        @tap="handleSubmit"
        :disabled="loading"
      >{{ loading ? '登录中...' : '登录' }}</button>
    </form>
  </view>
</template>

<script>
import CryptoJS from 'crypto-js'
import { login as apiLogin } from '@/api/service'
import { useUserStore } from '@/store/user'

export default {
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      },
      errors: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    validateUsername() {
      if (!this.form.username) {
        this.errors.username = '请输入用户名'
        return false
      }
      this.errors.username = ''
      return true
    },
    validatePassword() {
      if (!this.form.password) {
        this.errors.password = '请输入密码'
        return false
      }
      if (this.form.password.length < 4) {
        this.errors.password = '密码长度不能少于4个字符'
        return false
      }
      this.errors.password = ''
      return true
    },
    validate() {
      const usernameValid = this.validateUsername()
      const passwordValid = this.validatePassword()
      return usernameValid && passwordValid
    },
    encryptPassword(password) {
      return CryptoJS.SHA256(password).toString()
    },
    handleSubmit() {
      if (!this.validate()) {
        return
      }

      this.loading = true
      
      const loginData = {
        username: this.form.username,
        password: this.form.password
      }

      apiLogin(loginData)
        .then(response => {
          // 保存token信息
          uni.setStorageSync('access_token', response.access_token)
          uni.setStorageSync('refresh_token', response.refresh_token)
          uni.setStorageSync('token_expires_in', response.expires_in)
          uni.setStorageSync('token_type', response.token_type)
          
          // 获取用户信息和菜单
          const userStore = useUserStore()
          return Promise.all([
            userStore.fetchMenu(),
            userStore.fetchUserInfo()
          ])
        })
        .then(([menuData, userInfo]) => {
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
          
          // 设置登录标志
          uni.setStorageSync('isLogin', '1')
          
          // 跳转到首页
          uni.switchTab({
            url: '/pages/home/home'
          })
        })
        .catch(error => {
          console.error('登录失败:', error)
          let errorMsg = '登录失败，请检查网络'
          
          if (error.response && error.response.status === 401) {
            errorMsg = error.response.data.message || '用户名或密码错误'
            // 清空密码
            this.form.password = ''
          }
          
          uni.showToast({
            title: errorMsg,
            icon: 'none',
            duration: 2000
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.login {
  padding: 30rpx;
  
  &.loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
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
      
      &.error {
        border-color: #f56c6c;
      }
    }
    
    .error-text {
      font-size: 24rpx;
      color: #f56c6c;
      margin-top: 8rpx;
    }
  }
  
  .submit-btn {
    margin-top: 60rpx;
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    
    &[disabled] {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}
</style> 