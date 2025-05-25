<template>
  <view class="form-container">
    <view class="form-content">
      <view class="form-item">
        <text class="label required">成果名称</text>
        <input 
          class="input" 
          v-model="formData.name" 
          placeholder="请输入成果名称"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item">
        <text class="label required">成果类型</text>
        <picker 
          class="picker" 
          mode="selector" 
          :range="achievementTypes" 
          @change="handleTypeChange"
          :value="achievementTypeIndex"
        >
          <view class="picker-text" :class="{ empty: !formData.type }">
            {{ formData.type || '请选择成果类型' }}
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label required">指导老师</text>
        <input 
          class="input" 
          v-model="formData.teacher" 
          placeholder="请输入指导老师姓名"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item">
        <text class="label required">获得时间</text>
        <picker 
          class="picker" 
          mode="date" 
          :value="formData.date" 
          @change="handleDateChange"
        >
          <view class="picker-text" :class="{ empty: !formData.date }">
            {{ formData.date || '请选择获得时间' }}
          </view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="label required">成果描述</text>
        <textarea 
          class="textarea" 
          v-model="formData.description" 
          placeholder="请输入成果描述"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item">
        <text class="label required">证明材料</text>
        <view class="upload-box" @tap="chooseImage">
          <uni-icons v-if="!formData.image" type="camera" size="24" color="#999"></uni-icons>
          <image v-else :src="formData.image" mode="aspectFill" class="preview-image"></image>
        </view>
      </view>
    </view>
    
    <view class="form-footer">
      <button class="submit-btn" @tap="submitForm">提交</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        type: '',
        teacher: '',
        date: '',
        description: '',
        image: '',
        presetField: ''
      },
      achievementTypeIndex: -1,
      achievementTypes: ['证书', '奖项', '竞赛', '论文', '专利', '其他']
    }
  },
  onLoad(options) {
    if (options.type) {
      const type = decodeURIComponent(options.type)
      const index = this.achievementTypes.indexOf(type)
      if (index !== -1) {
        this.achievementTypeIndex = index
        this.formData.type = this.achievementTypes[index]
      }
    }
    if (options.preset) {
      this.formData.presetField = decodeURIComponent(options.preset)
    }
  },
  methods: {
    handleTypeChange(e) {
      const index = e.detail.value
      this.achievementTypeIndex = index
      this.formData.type = this.achievementTypes[index]
    },
    handleDateChange(e) {
      this.formData.date = e.detail.value
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.formData.image = res.tempFilePaths[0]
        }
      })
    },
    submitForm() {
      if (!this.formData.name) {
        uni.showToast({
          title: '请输入成果名称',
          icon: 'none'
        })
        return
      }
      if (!this.formData.type) {
        uni.showToast({
          title: '请选择成果类型',
          icon: 'none'
        })
        return
      }
      if (!this.formData.teacher) {
        uni.showToast({
          title: '请输入指导老师姓名',
          icon: 'none'
        })
        return
      }
      
      console.log('提交的表单数据：', this.formData)
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      })
    }
  }
}
</script>

<style>
/* 基础样式 */
.form-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 30rpx;
}

.form-content {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.form-item {
  margin-bottom: 40rpx;
}

.form-item:last-child {
  margin-bottom: 0;
}

.label {
  display: block;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.label.required::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 8rpx;
}

.input {
  width: 100%;
  height: 88rpx;
  background-color: #f8f9fd;
  border-radius: 16rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  border: 2rpx solid #f0f0f0;
}

.picker {
  width: 100%;
  height: 88rpx;
  background-color: #f8f9fd;
  border-radius: 16rpx;
  padding: 0 30rpx;
  border: 2rpx solid #f0f0f0;
  box-sizing: border-box;
}

.picker-text {
  line-height: 88rpx;
  font-size: 28rpx;
  color: #333;
}

.picker-text.empty {
  color: #999;
}

.textarea {
  width: 100%;
  height: 200rpx;
  background-color: #f8f9fd;
  border-radius: 16rpx;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  border: 2rpx solid #f0f0f0;
}

.upload-box {
  width: 200rpx;
  height: 200rpx;
  background-color: #f8f9fd;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #f0f0f0;
}

.preview-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}

.placeholder {
  color: #999;
}

.form-footer {
  margin-top: 60rpx;
  padding: 0 30rpx;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(180deg, #4169E1 0%, #1E90FF 100%);
  border-radius: 44rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.submit-btn:active {
  opacity: 0.9;
}
</style>
