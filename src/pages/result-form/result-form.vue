<template>
  <view class="result-form-page">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="header-overlay"></view>
      <view class="header-content">
        <view class="back-button" @tap="goBack">
          <uni-icons type="arrow-left" size="20" color="#fff" />
        </view>
        <text class="header-title">成果登记表单</text>
        <text class="header-subtitle">记录您的学习成果和获奖情况</text>
      </view>
    </view>

    <!-- 主要内容 -->
    <view class="main-content">
      <!-- 表单区域 -->
      <view class="form-section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="medal" size="18" color="#409EFF" />
            <text>基本信息</text>
          </view>
        </view>

        <view class="form-content">
          <!-- 成果类型选择 -->
          <view class="form-item">
            <text class="label">成果类型 <text class="required">*</text></text>
            <picker 
              :value="formData.typeIndex" 
              :range="resultTypes" 
              @change="onTypeChange"
            >
              <view class="uni-input">{{ resultTypes[formData.typeIndex] || '请选择成果类型' }}</view>
            </picker>
          </view>

          <!-- 成果名称 -->
          <view class="form-item">
            <text class="label">成果名称 <text class="required">*</text></text>
            <input 
              class="uni-input"
              type="text"
              v-model="formData.name"
              placeholder="请输入成果名称"
            />
          </view>

          <!-- 获得时间 -->
          <view class="form-item">
            <text class="label">获得时间 <text class="required">*</text></text>
            <picker 
              mode="date" 
              :value="formData.date" 
              start="2020-01-01" 
              end="2025-12-31" 
              @change="onDateChange"
            >
              <view class="uni-input">{{ formData.date || '请选择日期' }}</view>
            </picker>
          </view>

          <!-- 颁发单位 -->
          <view class="form-item">
            <text class="label">颁发单位 <text class="required">*</text></text>
            <input 
              class="uni-input"
              type="text"
              v-model="formData.issuer"
              placeholder="请输入颁发单位名称"
            />
          </view>

          <!-- 获奖等级 -->
          <view class="form-item">
            <text class="label">获奖等级</text>
            <picker 
              :value="formData.levelIndex" 
              :range="awardLevels" 
              @change="onLevelChange"
            >
              <view class="uni-input">{{ awardLevels[formData.levelIndex] || '请选择获奖等级' }}</view>
            </picker>
          </view>

          <!-- 指导老师 -->
          <view class="form-item">
            <text class="label">指导老师</text>
            <input 
              class="uni-input"
              type="text"
              v-model="formData.teacher"
              placeholder="请输入指导老师姓名"
            />
          </view>

          <!-- 成果描述 -->
          <view class="form-item">
            <text class="label">成果描述 <text class="required">*</text></text>
            <textarea
              class="uni-textarea"
              v-model="formData.description"
              placeholder="请详细描述您的成果内容、过程和意义"
              :maxlength="500"
            />
            <text class="word-count">{{ formData.description.length }}/500</text>
          </view>

          <!-- 证明材料 -->
          <view class="form-item">
            <text class="label">证明材料 <text class="required">*</text></text>
            <view class="upload-area">
              <view class="image-list" v-if="formData.images.length > 0">
                <view 
                  v-for="(image, index) in formData.images" 
                  :key="index"
                  class="image-item"
                >
                  <image :src="image" mode="aspectFill" @tap="previewImage(index)" />
                  <view class="delete-btn" @tap.stop="deleteImage(index)">
                    <uni-icons type="close" size="12" color="#fff" />
                  </view>
                </view>
              </view>
              <button 
                class="upload-btn" 
                @tap="chooseImage" 
                v-if="formData.images.length < 9"
              >
                <uni-icons type="camera" size="24" color="#999" />
                <text>上传图片</text>
              </button>
              <text class="upload-tip">请上传清晰的证书、奖状等证明材料照片（最多9张）</text>
            </view>
          </view>
        </view>

        <!-- 提交按钮 -->
        <view class="form-actions">
          <button 
            class="submit-btn" 
            type="primary" 
            :loading="submitting"
            @tap="submitForm"
          >提交成果</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      submitting: false,
      resultTypes: ['竞赛获奖', '技能证书', '科研成果', '创新项目', '实践成果'],
      awardLevels: ['特等奖', '一等奖', '二等奖', '三等奖', '优秀奖'],
      formData: {
        typeIndex: 0,
        levelIndex: 0,
        name: '',
        date: '',
        issuer: '',
        teacher: '',
        description: '',
        images: []
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    onTypeChange(e) {
      this.formData.typeIndex = e.detail.value
    },
    onDateChange(e) {
      this.formData.date = e.detail.value
    },
    onLevelChange(e) {
      this.formData.levelIndex = e.detail.value
    },
    async chooseImage() {
      try {
        const res = await uni.chooseImage({
          count: 9 - this.formData.images.length,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera']
        })
        this.formData.images = [...this.formData.images, ...res.tempFilePaths]
      } catch (e) {
        uni.showToast({
          title: '选择图片失败',
          icon: 'none'
        })
      }
    },
    deleteImage(index) {
      this.formData.images.splice(index, 1)
    },
    previewImage(index) {
      uni.previewImage({
        urls: this.formData.images,
        current: index
      })
    },
    validateForm() {
      if (!this.formData.name.trim()) {
        uni.showToast({
          title: '请输入成果名称',
          icon: 'none'
        })
        return false
      }
      if (!this.formData.date) {
        uni.showToast({
          title: '请选择获得时间',
          icon: 'none'
        })
        return false
      }
      if (!this.formData.issuer.trim()) {
        uni.showToast({
          title: '请输入颁发单位',
          icon: 'none'
        })
        return false
      }
      if (!this.formData.description.trim()) {
        uni.showToast({
          title: '请填写成果描述',
          icon: 'none'
        })
        return false
      }
      if (this.formData.images.length === 0) {
        uni.showToast({
          title: '请上传证明材料',
          icon: 'none'
        })
        return false
      }
      return true
    },
    async submitForm() {
      if (!this.validateForm()) return
      
      this.submitting = true
      
      // 模拟提交
      setTimeout(() => {
        this.submitting = false
        uni.showToast({
          title: '提交成功',
          icon: 'success'
        })
        
        // 返回上一页
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.result-form-page {
  min-height: 100vh;
  background-color: #f8f8f8;
  
  .page-header {
    position: relative;
    height: 200rpx;
    background: linear-gradient(135deg, #409EFF, #36D1DC);
    padding: 30rpx;
    
    .header-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    .header-content {
      position: relative;
      z-index: 1;
      color: #fff;
      
      .back-button {
        margin-bottom: 20rpx;
      }
      
      .header-title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      
      .header-subtitle {
        font-size: 24rpx;
        opacity: 0.9;
      }
    }
  }
  
  .main-content {
    padding: 30rpx;
    margin-top: -40rpx;
    
    .card {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
    }
    
    .section-header {
      margin-bottom: 30rpx;
      
      .section-title {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        font-weight: bold;
        
        .uni-icons {
          margin-right: 10rpx;
        }
      }
    }
    
    .form-content {
      .form-item {
        margin-bottom: 30rpx;
        position: relative;
        
        .label {
          display: block;
          font-size: 28rpx;
          color: #333;
          margin-bottom: 10rpx;
          
          .required {
            color: #f56c6c;
            margin-left: 4rpx;
          }
        }
        
        .uni-input {
          width: 100%;
          height: 80rpx;
          border: 1rpx solid #dcdfe6;
          border-radius: 8rpx;
          padding: 0 20rpx;
          font-size: 28rpx;
          background-color: #fff;
        }
        
        .uni-textarea {
          width: 100%;
          height: 240rpx;
          border: 1rpx solid #dcdfe6;
          border-radius: 8rpx;
          padding: 20rpx;
          font-size: 28rpx;
          background-color: #fff;
        }
        
        .word-count {
          position: absolute;
          right: 20rpx;
          bottom: 20rpx;
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .upload-area {
        .image-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20rpx;
          margin-bottom: 20rpx;
          
          .image-item {
            position: relative;
            width: 200rpx;
            height: 200rpx;
            
            image {
              width: 100%;
              height: 100%;
              border-radius: 8rpx;
            }
            
            .delete-btn {
              position: absolute;
              top: -10rpx;
              right: -10rpx;
              width: 40rpx;
              height: 40rpx;
              background-color: rgba(0, 0, 0, 0.5);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
        
        .upload-btn {
          width: 200rpx;
          height: 200rpx;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f5f7fa;
          border: 1rpx dashed #dcdfe6;
          border-radius: 8rpx;
          
          text {
            font-size: 24rpx;
            color: #999;
            margin-top: 10rpx;
          }
        }
        
        .upload-tip {
          display: block;
          font-size: 24rpx;
          color: #999;
          margin-top: 20rpx;
        }
      }
    }
    
    .form-actions {
      margin-top: 60rpx;
      
      .submit-btn {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        font-size: 32rpx;
      }
    }
  }
}
</style> 