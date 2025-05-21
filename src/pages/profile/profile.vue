<template>
  <view class="profile">
    <view class="profile-header">
      <view class="avatar-container">
        <image class="avatar" :src="userInfo?.avatar || '/static/images/avatar.png'" mode="aspectFill" />
        <view class="upload-btn" @tap="uploadAvatar">
          <uni-icons type="camera" size="14" color="#fff" />
        </view>
      </view>
      <text class="welcome">欢迎, {{ userStore.username || '同学' }}</text>
    </view>

    <view class="info-card">
      <view class="card-title">
        <uni-icons type="info" size="18" color="#64B5F6" />
        <text>学校信息</text>
      </view>
      <view class="info-item">
        <text class="label">学校</text>
        <text class="value">{{ userInfo?.meta?.school || '未设置' }}</text>
      </view>
      <view class="info-item">
        <text class="label">学院</text>
        <text class="value">{{ userInfo?.meta?.college || '未设置' }}</text>
      </view>
      <view class="info-item">
        <text class="label">专业</text>
        <text class="value">{{ userInfo?.meta?.major || '未设置' }}</text>
      </view>
      <view class="info-item">
        <text class="label">学号</text>
        <text class="value">{{ userInfo?.meta?.student_id || '未设置' }}</text>
      </view>
    </view>

    <view class="action-list">
      <view class="action-item" @tap="editProfile">
        <uni-icons type="compose" size="18" color="#64B5F6" />
        <text>编辑资料</text>
        <uni-icons class="arrow" type="right" size="16" color="#ccc" />
      </view>
      <view class="action-item" @tap="changePassword">
        <uni-icons type="locked" size="18" color="#64B5F6" />
        <text>修改密码</text>
        <uni-icons class="arrow" type="right" size="16" color="#ccc" />
      </view>
      <view class="action-item" @tap="aboutUs">
        <uni-icons type="info" size="18" color="#64B5F6" />
        <text>关于我们</text>
        <uni-icons class="arrow" type="right" size="16" color="#ccc" />
      </view>
    </view>

    <button type="warn" class="logout-btn" @tap="logout">退出登录</button>
  </view>
</template>

<script>
import { useUserStore } from '@/store/user'

export default {
  data() {
    return {
      userStore: useUserStore()
    }
  },
  computed: {
    userInfo() {
      return this.userStore.userInfo
    }
  },
  onShow() {
    // 每次显示页面时刷新用户信息
    this.refreshUserInfo()
  },
  methods: {
    async refreshUserInfo() {
      if (!this.userInfo) {
        await this.userStore.fetchUserInfo()
      }
    },
    uploadAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // TODO: 实现头像上传逻辑
          uni.showToast({
            title: '头像上传功能开发中',
            icon: 'none'
          })
        }
      })
    },
    editProfile() {
      uni.navigateTo({
        url: '/pages/profile/edit'
      })
    },
    changePassword() {
      uni.navigateTo({
        url: '/pages/profile/change-password'
      })
    },
    aboutUs() {
      uni.navigateTo({
        url: '/pages/about/about'
      })
    },
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除用户信息和token
            this.userStore.clearUserInfo()
            uni.removeStorageSync('access_token')
            uni.removeStorageSync('refresh_token')
            uni.removeStorageSync('token_expires_in')
            uni.removeStorageSync('token_type')
            uni.removeStorageSync('isLogin')
            
            uni.showToast({
              title: '已成功退出登录',
              icon: 'success'
            })
            
            // 重定向到登录页
            uni.reLaunch({
              url: '/pages/login/login'
            })
          }
        }
      })
    }
  }
}
</script>

<style>
.profile {
  padding: 40rpx;
  padding-bottom: 160rpx;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
}

.avatar-container {
  position: relative;
  margin-bottom: 20rpx;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 80rpx;
}

.upload-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48rpx;
  height: 48rpx;
  background-color: #64B5F6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome {
  margin: 20rpx 0 0 0;
  font-size: 40rpx;
  font-weight: 600;
  color: #333;
}

.info-card {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.05);
}

.card-title {
  display: flex;
  align-items: center;
  font-size: 36rpx;
  font-weight: 600;
  margin-bottom: 30rpx;
  color: #333;
}

.card-title uni-icons {
  margin-right: 16rpx;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-size: 28rpx;
}

.value {
  color: #333;
  font-weight: 500;
}

.action-list {
  background: white;
  border-radius: 24rpx;
  padding: 16rpx 32rpx;
  margin-bottom: 60rpx;
  box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.05);
}

.action-item {
  display: flex;
  align-items: center;
  padding: 32rpx 0;
  border-bottom: 1px solid #f5f5f5;
}

.action-item:last-child {
  border-bottom: none;
}

.action-item text {
  margin-left: 20rpx;
  flex: 1;
  font-size: 28rpx;
}

.logout-btn {
  width: 100%;
  height: 88rpx;
  border-radius: 44rpx;
  font-size: 32rpx;
  font-weight: 500;
}
</style> 