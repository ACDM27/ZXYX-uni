<template>
  <view class="materials-collection-page">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="header-overlay"></view>
      <view class="header-content">
        <view class="back-button" @tap="goBack">
          <uni-icons type="arrow-left" size="20" color="#fff" />
        </view>
        <text class="header-title">材料提交</text>
        <text class="header-subtitle">提交学生综测所需的各项材料和证明</text>
      </view>
    </view>

    <!-- 主要内容 -->
    <view class="main-content">
      <!-- 说明卡片 -->
      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="info-filled" size="18" color="#409EFF" />
            <text>提交说明</text>
          </view>
        </view>
        
        <view class="instruction-content">
          <text class="instruction-text">请根据以下分类提交相关材料，上传的文件支持图片(jpg, png)、PDF文档和压缩包(zip)格式。</text>
          <text class="instruction-text">每项材料需填写相关说明，并注明对应的加分项。审核老师会在3个工作日内完成审核。</text>
          
          <view class="deadline-alert">
            <uni-icons type="clock" size="16" color="#e6a23c" />
            <text>本学期材料提交截止日期：2024年6月15日 23:59</text>
          </view>
        </view>
      </view>

      <!-- 分类导航 -->
      <view class="tab-navigation card">
        <scroll-view scroll-x class="tab-scroll" :scroll-left="scrollLeft">
          <view 
            v-for="(tab, index) in tabs" 
            :key="tab.name"
            class="tab-item"
            :class="{ active: activeTab === tab.name }"
            @tap="handleTabChange(tab.name)"
          >
            <uni-icons :type="tab.icon" size="16" :color="activeTab === tab.name ? '#409EFF' : '#666'" />
            <text>{{ tab.label }}</text>
          </view>
        </scroll-view>
      </view>
      
      <!-- 当前分类提交表单 -->
      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons :type="currentTabData.icon" size="18" color="#409EFF" />
            <text>{{ currentTabData.title }}材料提交</text>
          </view>
        </view>
        
        <view class="submission-form">
          <view class="form-item">
            <text class="form-label">选择加分项：</text>
            <picker 
              :value="categoryIndex" 
              :range="currentTabData.categories" 
              range-key="label"
              @change="onCategoryChange"
            >
              <view class="uni-input">{{ currentSubmission.category || '请选择加分项类别' }}</view>
            </picker>
          </view>
          
          <view class="form-item">
            <text class="form-label">材料标题：</text>
            <input 
              class="uni-input"
              type="text"
              v-model="currentSubmission.title"
              placeholder="请输入材料标题，简要描述材料内容"
            />
          </view>
          
          <view class="form-item">
            <text class="form-label">材料描述：</text>
            <textarea
              class="uni-textarea"
              v-model="currentSubmission.description"
              placeholder="请详细描述材料内容，如活动时间、地点、参与角色、获得成果等"
              :maxlength="200"
            />
          </view>
          
          <view class="form-item">
            <text class="form-label">上传文件：</text>
            <view class="upload-area">
              <button class="upload-btn" @tap="chooseFile">选择文件</button>
              <text class="upload-tip">支持JPG/PNG/PDF/ZIP格式，单个文件不超过10MB</text>
              
              <view class="file-list" v-if="fileList.length > 0">
                <view 
                  v-for="(file, index) in fileList" 
                  :key="index"
                  class="file-item"
                >
                  <uni-icons type="file" size="16" color="#666" />
                  <text class="file-name">{{ file.name }}</text>
                  <uni-icons 
                    type="close" 
                    size="16" 
                    color="#999"
                    @tap="removeFile(index)"
                  />
                </view>
              </view>
            </view>
          </view>
          
          <view class="form-actions">
            <button 
              class="action-btn" 
              type="default" 
              size="mini" 
              @tap="resetForm"
            >重置</button>
            <button 
              class="action-btn" 
              type="primary" 
              size="mini"
              :loading="submitting"
              @tap="submitMaterial"
            >提交材料</button>
          </view>
        </view>
      </view>
      
      <!-- 提交历史 -->
      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="list" size="18" color="#409EFF" />
            <text>提交历史</text>
          </view>
        </view>
        
        <view class="history-list">
          <view 
            v-for="(item, index) in submissionHistory" 
            :key="index"
            class="history-item"
          >
            <view class="history-main">
              <view class="history-header">
                <text class="history-title">{{ item.title }}</text>
                <text :class="['status-tag', getStatusClass(item.status)]">
                  {{ item.status }}
                </text>
              </view>
              <view class="history-info">
                <text class="info-text">{{ item.submitTime }}</text>
                <text class="info-text">{{ item.category }}</text>
              </view>
            </view>
            <view class="history-actions">
              <button 
                size="mini" 
                @tap="viewSubmission(item)"
              >查看</button>
              <button 
                size="mini" 
                type="warn"
                :disabled="item.status !== '待审核'"
                @tap="deleteSubmission(item)"
              >删除</button>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 查看详情弹窗 -->
    <uni-popup ref="detailPopup" type="center">
      <view class="detail-popup">
        <view class="popup-header">
          <text class="popup-title">提交详情</text>
          <view class="popup-close" @tap="closeDetailPopup">
            <uni-icons type="close" size="16" color="#999" />
          </view>
        </view>
        <view class="popup-content" v-if="viewingSubmission">
          <view class="detail-item">
            <text class="detail-label">提交类别：</text>
            <text class="detail-value">{{ viewingSubmission.category }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">材料标题：</text>
            <text class="detail-value">{{ viewingSubmission.title }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">材料描述：</text>
            <text class="detail-value description">{{ viewingSubmission.description }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">提交时间：</text>
            <text class="detail-value">{{ viewingSubmission.submitTime }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">审核状态：</text>
            <text :class="['status-tag', getStatusClass(viewingSubmission.status)]">
              {{ viewingSubmission.status }}
            </text>
          </view>
          <view class="detail-item" v-if="viewingSubmission.reviewComments">
            <text class="detail-label">审核意见：</text>
            <text class="detail-value description">{{ viewingSubmission.reviewComments }}</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'ideological',
      scrollLeft: 0,
      submitting: false,
      categoryIndex: 0,
      fileList: [],
      viewingSubmission: null,
      currentSubmission: {
        category: '',
        title: '',
        description: '',
        files: []
      },
      tabs: [
        { name: 'ideological', label: '思想品德', icon: 'heart' },
        { name: 'academic', label: '学业成绩', icon: 'medal' },
        { name: 'research', label: '科研创新', icon: 'star' },
        { name: 'practice', label: '实践活动', icon: 'flag' },
        { name: 'physical', label: '身心素质', icon: 'person' }
      ],
      tabsData: {
        ideological: {
          title: '思想品德',
          icon: 'heart',
          categories: [
            { label: '学生干部', value: 'student-leader' },
            { label: '志愿服务', value: 'volunteer' },
            { label: '社会实践', value: 'social-practice' }
          ]
        },
        academic: {
          title: '学业成绩',
          icon: 'medal',
          categories: [
            { label: '期末成绩', value: 'final-exam' },
            { label: '技能证书', value: 'certificate' },
            { label: '竞赛获奖', value: 'competition' }
          ]
        },
        research: {
          title: '科研创新',
          icon: 'star',
          categories: [
            { label: '科研项目', value: 'research-project' },
            { label: '学术论文', value: 'paper' },
            { label: '发明专利', value: 'patent' }
          ]
        },
        practice: {
          title: '实践活动',
          icon: 'flag',
          categories: [
            { label: '社团活动', value: 'club' },
            { label: '文体活动', value: 'sports' },
            { label: '校园文化', value: 'culture' }
          ]
        },
        physical: {
          title: '身心素质',
          icon: 'person',
          categories: [
            { label: '体育成绩', value: 'sports-score' },
            { label: '心理健康', value: 'mental-health' },
            { label: '体质测试', value: 'physical-test' }
          ]
        }
      },
      submissionHistory: [
        {
          submitTime: '2024-03-15 14:30',
          category: '志愿服务',
          title: '2024年春季学雷锋志愿服务活动',
          status: '待审核'
        },
        {
          submitTime: '2024-03-10 09:15',
          category: '技能证书',
          title: '计算机二级证书',
          status: '已通过'
        },
        {
          submitTime: '2024-03-05 16:45',
          category: '科研项目',
          title: '大数据分析创新项目',
          status: '已驳回',
          reviewComments: '请补充项目具体内容和成果说明'
        }
      ]
    }
  },
  computed: {
    currentTabData() {
      return this.tabsData[this.activeTab]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    handleTabChange(tabName) {
      this.activeTab = tabName
      this.resetForm()
    },
    onCategoryChange(e) {
      const index = e.detail.value
      this.categoryIndex = index
      this.currentSubmission.category = this.currentTabData.categories[index].label
    },
    async chooseFile() {
      try {
        const res = await uni.chooseFile({
          count: 5,
          type: 'all',
          extension: ['.jpg', '.png', '.pdf', '.zip'],
          success: (res) => {
            this.fileList = [...this.fileList, ...res.tempFiles]
          }
        })
      } catch (e) {
        uni.showToast({
          title: '选择文件失败',
          icon: 'none'
        })
      }
    },
    removeFile(index) {
      this.fileList.splice(index, 1)
    },
    resetForm() {
      this.currentSubmission = {
        category: '',
        title: '',
        description: '',
        files: []
      }
      this.fileList = []
      this.categoryIndex = 0
    },
    async submitMaterial() {
      if (!this.currentSubmission.category || !this.currentSubmission.title) {
        uni.showToast({
          title: '请填写必填项',
          icon: 'none'
        })
        return
      }

      this.submitting = true
      
      // 模拟提交
      setTimeout(() => {
        this.submitting = false
        uni.showToast({
          title: '提交成功',
          icon: 'success'
        })
        this.resetForm()
      }, 1500)
    },
    viewSubmission(item) {
      this.viewingSubmission = item
      this.$refs.detailPopup.open()
    },
    closeDetailPopup() {
      this.$refs.detailPopup.close()
    },
    deleteSubmission(item) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这条提交记录吗？',
        success: (res) => {
          if (res.confirm) {
            const index = this.submissionHistory.indexOf(item)
            if (index > -1) {
              this.submissionHistory.splice(index, 1)
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              })
            }
          }
        }
      })
    },
    getStatusClass(status) {
      switch (status) {
        case '待审核':
          return 'status-pending'
        case '已通过':
          return 'status-success'
        case '已驳回':
          return 'status-rejected'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss">
.materials-collection-page {
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
          margin-right: 10rpx;
        }
        
        text {
          color: #e6a23c;
          font-size: 24rpx;
        }
      }
    }
    
    .tab-navigation {
      padding: 0;
      
      .tab-scroll {
        white-space: nowrap;
        padding: 20rpx;
      }
      
      .tab-item {
        display: inline-flex;
        align-items: center;
        padding: 20rpx 30rpx;
        font-size: 28rpx;
        color: #666;
        
        &.active {
          color: #409EFF;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 40rpx;
            height: 4rpx;
            background-color: #409EFF;
          }
        }
        
        .uni-icons {
          margin-right: 10rpx;
        }
      }
    }
    
    .submission-form {
      .form-item {
        margin-bottom: 30rpx;
        
        .form-label {
          display: block;
          font-size: 28rpx;
          color: #333;
          margin-bottom: 10rpx;
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
          height: 200rpx;
          border: 1rpx solid #dcdfe6;
          border-radius: 8rpx;
          padding: 20rpx;
          font-size: 28rpx;
          background-color: #fff;
        }
      }
      
      .upload-area {
        .upload-btn {
          margin: 0;
          width: 200rpx;
        }
        
        .upload-tip {
          font-size: 24rpx;
          color: #999;
          margin: 20rpx 0;
        }
        
        .file-list {
          margin-top: 20rpx;
          
          .file-item {
            display: flex;
            align-items: center;
            padding: 10rpx 0;
            
            .file-name {
              flex: 1;
              font-size: 26rpx;
              color: #666;
              margin: 0 20rpx;
            }
          }
        }
      }
      
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 20rpx;
        margin-top: 40rpx;
        
        .action-btn {
          margin: 0;
          min-width: 160rpx;
        }
      }
    }
    
    .history-list {
      .history-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 1rpx solid #eee;
        
        &:last-child {
          border-bottom: none;
        }
        
        .history-main {
          flex: 1;
          margin-right: 20rpx;
          
          .history-header {
            display: flex;
            align-items: center;
            margin-bottom: 10rpx;
            
            .history-title {
              flex: 1;
              font-size: 28rpx;
              font-weight: bold;
            }
          }
          
          .history-info {
            display: flex;
            gap: 20rpx;
            
            .info-text {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
        
        .history-actions {
          display: flex;
          gap: 10rpx;
          
          button {
            margin: 0;
          }
        }
      }
    }
  }
}

.status-tag {
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  
  &.status-pending {
    background-color: #e6a23c;
    color: #fff;
  }
  
  &.status-success {
    background-color: #67c23a;
    color: #fff;
  }
  
  &.status-rejected {
    background-color: #f56c6c;
    color: #fff;
  }
}

.detail-popup {
  background: #fff;
  border-radius: 16rpx;
  width: 600rpx;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;
    
    .popup-title {
      font-size: 32rpx;
      font-weight: bold;
    }
  }
  
  .popup-content {
    padding: 30rpx;
    max-height: 800rpx;
    overflow-y: auto;
    
    .detail-item {
      margin-bottom: 20rpx;
      
      .detail-label {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 10rpx;
      }
      
      .detail-value {
        font-size: 28rpx;
        color: #333;
        
        &.description {
          white-space: pre-wrap;
        }
      }
    }
  }
}
</style> 