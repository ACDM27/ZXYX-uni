<template>
  <view class="student-info-page">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="header-overlay"></view>
      <view class="header-content">
        <view class="back-button" @tap="goBack">
          <uni-icons type="arrow-left" size="20"></uni-icons>
        </view>
        <text class="header-title">学生综测信息收集</text>
        <text class="header-subtitle">填写学生基本信息与学期评价数据</text>
      </view>
    </view>

    <!-- 主要内容 -->
    <view class="main-content">
      <!-- 说明卡片 -->
      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="info-filled" size="18"></uni-icons>
            <text>填写说明</text>
          </view>
        </view>
        
        <view class="instruction-content">
          <text class="instruction-text">请如实填写以下信息，作为学生综合测评的基础数据。所有带*的字段为必填项。</text>
          <text class="instruction-text">本页面信息将与您提交的证明材料共同作为评分依据，请确保信息准确无误。</text>
          
          <view class="deadline-alert">
            <uni-icons type="clock" size="16"></uni-icons>
            <text>信息填写截止日期：2024年6月10日 23:59</text>
          </view>
          
          <view class="link-box">
            <uni-icons type="upload" size="16"></uni-icons>
            <text>需要提交证明材料？请前往</text>
            <text class="link-text" @tap="goToMaterialsCollection">材料提交页面</text>
          </view>
        </view>
      </view>

      <!-- 表单 -->
      <form @submit="submitForm">
        <!-- 基本信息部分 -->
        <view class="form-section card">
          <view class="section-header">
            <view class="section-title">
              <uni-icons type="person" size="18"></uni-icons>
              <text>基本信息</text>
            </view>
          </view>

          <view class="form-item">
            <text class="label">学期 <text class="required">*</text></text>
            <picker 
              :value="semesterIndex" 
              :range="semesters" 
              @change="onSemesterChange"
            >
              <view class="uni-input">{{ semesters[semesterIndex] || '请选择学期' }}</view>
            </picker>
          </view>

          <view class="form-grid">
            <view class="form-item">
              <text class="label">姓名 <text class="required">*</text></text>
              <input 
                class="uni-input"
                type="text"
                v-model="formData.name"
                placeholder="请输入姓名"
              />
            </view>
            
            <view class="form-item">
              <text class="label">学号 <text class="required">*</text></text>
              <input 
                class="uni-input"
                type="text"
                v-model="formData.studentId"
                placeholder="请输入学号"
              />
            </view>
          </view>

          <view class="form-grid">
            <view class="form-item">
              <text class="label">学院 <text class="required">*</text></text>
              <picker 
                :value="collegeIndex" 
                :range="colleges" 
                @change="onCollegeChange"
              >
                <view class="uni-input">{{ colleges[collegeIndex] || '请选择学院' }}</view>
              </picker>
            </view>
            
            <view class="form-item">
              <text class="label">专业 <text class="required">*</text></text>
              <picker 
                :value="majorIndex" 
                :range="filteredMajors"
                :disabled="!formData.college"
                @change="onMajorChange"
              >
                <view class="uni-input">{{ filteredMajors[majorIndex] || '请选择专业' }}</view>
              </picker>
            </view>
          </view>
        </view>

        <!-- 学业成绩部分 -->
        <view class="form-section card">
          <view class="section-header">
            <view class="section-title">
              <uni-icons type="medal" size="18"></uni-icons>
              <text>学业成绩</text>
            </view>
          </view>

          <view class="form-grid">
            <view class="form-item">
              <text class="label">必修课平均分 <text class="required">*</text></text>
              <input 
                class="uni-input"
                type="digit"
                v-model="formData.requiredCourseScore"
                placeholder="0-100"
              />
            </view>
            
            <view class="form-item">
              <text class="label">选修课平均分 <text class="required">*</text></text>
              <input 
                class="uni-input"
                type="digit"
                v-model="formData.electiveCourseScore"
                placeholder="0-100"
              />
            </view>
          </view>

          <view class="form-grid">
            <view class="form-item">
              <text class="label">学期平均绩点 <text class="required">*</text></text>
              <input 
                class="uni-input"
                type="digit"
                v-model="formData.gpa"
                placeholder="0-5"
              />
            </view>
            
            <view class="form-item">
              <text class="label">班级排名 <text class="required">*</text></text>
              <input 
                class="uni-input"
                type="text"
                v-model="formData.ranking"
                placeholder="例如：5/42"
              />
            </view>
          </view>
        </view>

        <button class="submit-btn" form-type="submit" type="primary">提交信息</button>
      </form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      semesterIndex: 0,
      collegeIndex: 0,
      majorIndex: 0,
      semesters: ['2023-2024学年第二学期', '2023-2024学年第一学期', '2022-2023学年第二学期'],
      colleges: ['计算机学院', '信息工程学院', '自动化学院'],
      majors: {
        '计算机学院': ['计算机科学与技术', '软件工程', '人工智能'],
        '信息工程学院': ['通信工程', '电子信息工程'],
        '自动化学院': ['自动化', '电气工程']
      },
      formData: {
        semester: '',
        name: '',
        studentId: '',
        college: '',
        major: '',
        grade: '',
        class: '',
        requiredCourseScore: '',
        electiveCourseScore: '',
        gpa: '',
        ranking: '',
        failedCourses: 0
      }
    }
  },
  computed: {
    filteredMajors() {
      return this.formData.college ? this.majors[this.formData.college] : []
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goToMaterialsCollection() {
      uni.navigateTo({
        url: '/pages/materials-collection/materials-collection'
      })
    },
    onSemesterChange(e) {
      this.semesterIndex = e.detail.value
      this.formData.semester = this.semesters[this.semesterIndex]
    },
    onCollegeChange(e) {
      this.collegeIndex = e.detail.value
      this.formData.college = this.colleges[this.collegeIndex]
      this.majorIndex = 0
      this.formData.major = ''
    },
    onMajorChange(e) {
      this.majorIndex = e.detail.value
      this.formData.major = this.filteredMajors[this.majorIndex]
    },
    submitForm() {
      // 表单验证
      if (!this.formData.semester || !this.formData.name || !this.formData.studentId) {
        uni.showToast({
          title: '请填写必填项',
          icon: 'none'
        })
        return
      }
      
      // TODO: 提交表单数据到服务器
      uni.showLoading({
        title: '提交中...'
      })
      
      setTimeout(() => {
        uni.hideLoading()
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
.student-info-page {
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
    
    .instruction-content {
      .instruction-text {
        display: block;
        font-size: 28rpx;
        color: #666;
        margin-bottom: 20rpx;
      }
      
      .deadline-alert {
        display: flex;
        align-items: center;
        background-color: #fff9ed;
        padding: 20rpx;
        border-radius: 8rpx;
        margin: 20rpx 0;
        
        .uni-icons {
          color: #e6a23c;
          margin-right: 10rpx;
        }
        
        text {
          color: #e6a23c;
          font-size: 24rpx;
        }
      }
      
      .link-box {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #666;
        
        .uni-icons {
          margin-right: 10rpx;
        }
        
        .link-text {
          color: #409EFF;
          margin-left: 10rpx;
        }
      }
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30rpx;
      margin-bottom: 30rpx;
    }
    
    .form-item {
      margin-bottom: 30rpx;
      
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
    }
    
    .submit-btn {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      margin-top: 60rpx;
      font-size: 32rpx;
    }
  }
}
</style> 