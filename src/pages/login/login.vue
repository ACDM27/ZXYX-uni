<template>
  <view class="login" :class="{ 'loading': loading }">
    <view class="header-section">
      <view class="title-container">
        <view class="login-title">
          <text class="greeting">你好！</text>
          <text class="system-name">欢迎使用学生成果管理系统</text>
        </view>
      </view>
    </view>
    <view class="content-section">
      <view class="form-container">
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
          <view class="action-links">
            <text class="link-text" @tap="handleRegister">用户注册</text>
            <text class="link-text" @tap="handleForgetPassword">忘记密码</text>
          </view>
    </form>
        <view class="third-party-login">
          <view class="divider">
            <text class="divider-text">第三方登录</text>
          </view>
          <view class="login-methods">
            <view class="login-item" @tap="handleThirdPartyLogin('weixin')">
              <uni-icons type="weixin" size="30" color="#07c160"></uni-icons>
              <text class="login-text">微信登录</text>
            </view>
            <view class="login-item" @tap="handleThirdPartyLogin('qq')">
              <uni-icons type="qq" size="30" color="#1296db"></uni-icons>
              <text class="login-text">QQ登录</text>
            </view>
            <view class="login-item" @tap="handleThirdPartyLogin('phone')">
              <uni-icons type="phone" size="30" color="#ff5a5f"></uni-icons>
              <text class="login-text">手机登录</text>
            </view>
          </view>
        </view>
      </view>
      <view class="agreement-text">
        <text class="normal-text">登录即代表您已阅读并同意</text>
        <text class="link-text" @tap="handleViewAgreement('user')">《用户协议》</text>
        <text class="normal-text">与</text>
        <text class="link-text" @tap="handleViewAgreement('privacy')">《隐私政策》</text>
      </view>
    </view>
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
    },
    handleRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      })
    },
    handleForgetPassword() {
      uni.navigateTo({
        url: '/pages/forget-password/forget-password'
      })
    },
    handleThirdPartyLogin(type) {
      // 处理第三方登录
      console.log('第三方登录:', type)
      // 根据类型处理不同的登录方式
    },
    handleViewAgreement(type) {
      const url = type === 'user' ? '/pages/agreement/user' : '/pages/agreement/privacy'
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss">
.login {
  min-height: 100vh;
  background-color: #f5f5f5;
  
  &.loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  .header-section {
    background: linear-gradient(135deg, #4e8cff 0%, #2d5cff 100%);
    padding: 60rpx 40rpx 120rpx;
    
    .title-container {
  .login-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        
        .greeting {
          font-size: 48rpx;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 20rpx;
        }
        
        .system-name {
          font-size: 48rpx;
    font-weight: bold;
          color: #ffffff;
        }
      }
    }
  }
  
  .content-section {
    margin-top: -60rpx;
    padding: 0 40rpx;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    
    .form-container {
      background-color: #ffffff;
      border-radius: 20rpx;
      padding: 50rpx 30rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
      flex: 1;
      display: flex;
      flex-direction: column;
  
  .form-group {
        margin-bottom: 40rpx;
        padding: 0 15rpx;
    
    .label {
      display: block;
      margin-bottom: 20rpx;
          font-size: 35rpx;
          color: #333;
          padding: 0 5rpx;
    }
    
    .uni-input {
      width: 100%;
      height: 80rpx;
      border: 1rpx solid #dcdfe6;
      border-radius: 8rpx;
      padding: 0 20rpx;
          font-size: 32rpx;
          box-sizing: border-box;
      
      &.error {
        border-color: #f56c6c;
      }
    }
    
    .error-text {
          font-size: 30rpx;
      color: #f56c6c;
      margin-top: 8rpx;
          padding: 0 5rpx;
    }
  }
  
  .submit-btn {
        margin: 100rpx 15rpx 30rpx;
        width: calc(100% - 30rpx);
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
        border-radius: 44rpx;
        background: linear-gradient(135deg, #4e8cff 0%, #2d5cff 100%);
    
    &[disabled] {
      opacity: 0.7;
      cursor: not-allowed;
        }
      }

      .action-links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30rpx;
        margin-bottom: 20rpx;

        .link-text {
          font-size: 28rpx;
          color: #2d5cff;
          padding: 10rpx;
          
          &:active {
            opacity: 0.8;
          }
        }
      }

      .third-party-login {
        margin-top: auto;
        padding-top: 100rpx;
        
        .divider {
          position: relative;
          text-align: center;
          margin-bottom: 40rpx;
          
          &::before,
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 30%;
            height: 1rpx;
            background-color: #dcdfe6;
          }
          
          &::before {
            left: 0;
          }
          
          &::after {
            right: 0;
          }
          
          .divider-text {
            display: inline-block;
            padding: 0 20rpx;
            color: #909399;
            font-size: 24rpx;
            background-color: #fff;
          }
        }
        
        .login-methods {
          display: flex;
          justify-content: space-around;
          padding: 0 40rpx;
          
          .login-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20rpx;
            
            .login-text {
              margin-top: 10rpx;
              font-size: 24rpx;
              color: #606266;
            }
          }
        }
      }
    }

    .agreement-text {
      text-align: center;
      padding: 40rpx 30rpx;
      font-size: 24rpx;
      margin-top: auto;
      
      .normal-text {
        color: #909399;
      }
      
      .link-text {
        color: #2d5cff;
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style> 