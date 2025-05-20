<template>
  <view class="resume-page">
    <view class="page-header">
      <view class="back-button" @tap="goBack">
        <uni-icons type="left" size="20"></uni-icons>
      </view>
      <text class="title">简历生成器</text>
      <view class="more-options">
        <uni-icons type="more" size="20"></uni-icons>
      </view>
    </view>

    <view class="content-container">
      <view v-if="step === 1" class="step-container">
        <view class="step-title">
          <text class="step-number">01</text>
          <text class="step-text">填写基本信息</text>
        </view>
        
        <view class="form-container">
          <view class="form-item">
            <text class="label">姓名</text>
            <input 
              class="input" 
              v-model="basicInfo.name" 
              placeholder="请输入姓名"
              placeholder-class="placeholder"
            />
          </view>
          
          <view class="form-item">
            <text class="label">学校</text>
            <input 
              class="input" 
              v-model="basicInfo.school" 
              placeholder="请输入学校"
              placeholder-class="placeholder"
            />
          </view>
          
          <view class="form-item">
            <text class="label">学院</text>
            <input 
              class="input" 
              v-model="basicInfo.college" 
              placeholder="请输入学院"
              placeholder-class="placeholder"
            />
          </view>
          
          <view class="form-item">
            <text class="label">专业</text>
            <input 
              class="input" 
              v-model="basicInfo.major" 
              placeholder="请输入专业"
              placeholder-class="placeholder"
            />
          </view>
          
          <view class="form-item">
            <text class="label">联系电话</text>
            <input 
              class="input" 
              v-model="basicInfo.phone" 
              type="number"
              placeholder="请输入联系电话"
              placeholder-class="placeholder"
            />
          </view>
          
          <view class="form-item">
            <text class="label">邮箱</text>
            <input 
              class="input" 
              v-model="basicInfo.email" 
              type="text"
              placeholder="请输入邮箱"
              placeholder-class="placeholder"
            />
          </view>
          
          <view class="form-item">
            <text class="label">自我介绍</text>
            <textarea 
              class="textarea" 
              v-model="basicInfo.introduction" 
              placeholder="请简要介绍自己（200字以内）"
              placeholder-class="placeholder"
              maxlength="200"
            ></textarea>
          </view>
        </view>
        
        <view class="action-buttons">
          <button 
            class="next-btn" 
            type="primary" 
            :disabled="!isBasicInfoValid" 
            @tap="nextStep"
          >下一步</button>
        </view>
      </view>
      
      <view v-if="step === 2" class="step-container">
        <view class="step-title">
          <text class="step-number">02</text>
          <text class="step-text">选择简历内容</text>
        </view>
        
        <view class="data-source-options">
          <view class="switch-container">
            <switch 
              :checked="useHonorData" 
              @change="onSwitchChange"
              color="#409EFF"
            />
            <text class="switch-label">{{ useHonorData ? '使用荣誉墙数据' : '手动输入数据' }}</text>
          </view>
        </view>

        <view v-if="useHonorData" class="honor-data-selection">
          <text class="selection-title">从荣誉墙数据中选择你想要包含的内容：</text>
          
          <view 
            class="honor-category" 
            v-for="(category, index) in honorCategories" 
            :key="index"
          >
            <view class="category-header">
              <checkbox 
                :value="category.selected" 
                @tap="toggleCategory(index)"
                :checked="category.selected"
                color="#409EFF"
              />
              <text class="category-title">{{ category.title }}</text>
            </view>
            
            <view v-if="category.selected" class="honor-items">
              <checkbox-group @change="(e) => onItemsChange(e, index)">
                <view 
                  class="honor-item"
                  v-for="(item, itemIndex) in category.items" 
                  :key="itemIndex"
                >
                  <checkbox 
                    :value="item"
                    :checked="category.selectedItems.includes(item)"
                    color="#409EFF"
                  />
                  <text class="item-text">{{ item }}</text>
                </view>
              </checkbox-group>
            </view>
          </view>
        </view>
        
        <view v-else class="manual-input-container">
          <view 
            class="manual-section" 
            v-for="(section, index) in manualSections" 
            :key="index"
          >
            <view class="section-header">
              <text class="section-title">{{ section.title }}</text>
              <view class="add-btn" @tap="addItem(index)">
                <uni-icons type="plus" size="20" color="#409EFF"></uni-icons>
              </view>
            </view>
            
            <view 
              class="section-item"
              v-for="(item, itemIndex) in section.items" 
              :key="itemIndex"
            >
              <input 
                class="item-input"
                v-model="section.items[itemIndex]" 
                placeholder="请输入内容"
                placeholder-class="placeholder"
              />
              <view class="delete-btn" @tap="removeItem(index, itemIndex)">
                <uni-icons type="trash" size="20" color="#F56C6C"></uni-icons>
              </view>
            </view>
          </view>
        </view>
        
        <view class="action-buttons">
          <button class="prev-btn" @tap="prevStep">上一步</button>
          <button class="next-btn" type="primary" @tap="nextStep">下一步</button>
        </view>
      </view>
      
      <view v-if="step === 3" class="step-container">
        <view class="step-title">
          <text class="step-number">03</text>
          <text class="step-text">选择简历模板</text>
        </view>
        
        <view class="templates-container">
          <view 
            v-for="(template, index) in templates" 
            :key="index"
            class="template-item"
            :class="{ 'selected': selectedTemplate === index }"
            @tap="selectTemplate(index)"
          >
            <view class="template-preview">
              <image :src="template.preview" mode="aspectFit" class="preview-image"></image>
            </view>
            <view class="template-info">
              <text class="template-name">{{ template.name }}</text>
              <text class="template-desc">{{ template.description }}</text>
            </view>
          </view>
        </view>
        
        <view class="action-buttons">
          <button class="prev-btn" @tap="prevStep">上一步</button>
          <button 
            class="next-btn" 
            type="primary" 
            :disabled="selectedTemplate === null" 
            @tap="generateResume"
          >生成简历</button>
        </view>
      </view>
      
      <view v-if="step === 4" class="step-container result-container">
        <view class="step-title">
          <text class="step-number">04</text>
          <text class="step-text">预览简历</text>
        </view>
        
        <view class="resume-preview">
          <view :class="'resume-template-' + (selectedTemplate + 1)">
            <view class="resume-header">
              <text class="resume-name">{{ basicInfo.name }}</text>
              <view class="contact-info">
                <view class="contact-item">
                  <uni-icons type="school" size="16"></uni-icons>
                  <text>{{ basicInfo.school }} | {{ basicInfo.college }}</text>
                </view>
                <view class="contact-item">
                  <uni-icons type="phone" size="16"></uni-icons>
                  <text>{{ basicInfo.phone }}</text>
                </view>
                <view class="contact-item">
                  <uni-icons type="email" size="16"></uni-icons>
                  <text>{{ basicInfo.email }}</text>
                </view>
              </view>
            </view>
            
            <view class="resume-section">
              <text class="section-title">教育背景</text>
              <view class="section-content">
                <text>{{ basicInfo.school }} | {{ basicInfo.college }} | {{ basicInfo.major }}</text>
              </view>
            </view>
            
            <block v-if="useHonorData">
              <view 
                v-for="(category, index) in honorCategories.filter(c => c.selected && c.selectedItems.length > 0)" 
                :key="index"
                class="resume-section"
              >
                <text class="section-title">{{ category.title }}</text>
                <view class="section-content">
                  <view 
                    class="content-item"
                    v-for="(item, itemIndex) in category.selectedItems" 
                    :key="itemIndex"
                  >
                    <text>{{ item }}</text>
                  </view>
                </view>
              </view>
            </block>
            
            <block v-else>
              <view 
                v-for="(section, index) in manualSections.filter(s => s.items.length > 0)" 
                :key="index"
                class="resume-section"
              >
                <text class="section-title">{{ section.title }}</text>
                <view class="section-content">
                  <view 
                    class="content-item"
                    v-for="(item, itemIndex) in section.items" 
                    :key="itemIndex"
                  >
                    <text>{{ item }}</text>
                  </view>
                </view>
              </view>
            </block>
            
            <view class="resume-section" v-if="basicInfo.introduction">
              <text class="section-title">自我评价</text>
              <view class="section-content">
                <text>{{ basicInfo.introduction }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <view class="action-buttons">
          <button class="prev-btn" @tap="prevStep">返回修改</button>
          <button class="download-btn" type="primary" @tap="downloadPDF">下载 PDF</button>
          <button class="save-btn" type="success" @tap="saveResume">保存简历</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {
    // 尝试恢复上次未完成的简历数据
    try {
      const draftResume = uni.getStorageSync('resume_draft');
      if (draftResume) {
        const { basicInfo, useHonorData, honorCategories, manualSections, selectedTemplate, step } = JSON.parse(draftResume);
        this.basicInfo = basicInfo || this.basicInfo;
        this.useHonorData = useHonorData ?? this.useHonorData;
        this.honorCategories = honorCategories || this.honorCategories;
        this.manualSections = manualSections || this.manualSections;
        this.selectedTemplate = selectedTemplate ?? this.selectedTemplate;
        this.step = step || 1;
      }
    } catch (error) {
      console.error('恢复草稿数据失败:', error);
    }
  },
  onUnload() {
    // 保存当前数据为草稿
    try {
      const draftData = {
        basicInfo: this.basicInfo,
        useHonorData: this.useHonorData,
        honorCategories: this.honorCategories,
        manualSections: this.manualSections,
        selectedTemplate: this.selectedTemplate,
        step: this.step
      };
      uni.setStorageSync('resume_draft', JSON.stringify(draftData));
    } catch (error) {
      console.error('保存草稿数据失败:', error);
    }
  },
  data() {
    return {
      step: 1,
      basicInfo: {
        name: '',
        school: '',
        college: '',
        major: '',
        phone: '',
        email: '',
        introduction: ''
      },
      useHonorData: true,
      honorCategories: [
        {
          title: '获奖经历',
          selected: false,
          items: [
            '2023年全国大学生数学建模竞赛一等奖',
            '2023年互联网+创新创业大赛铜奖',
            '2022年校级优秀学生干部'
          ],
          selectedItems: []
        },
        {
          title: '项目经验',
          selected: false,
          items: [
            '校园二手交易平台开发（前端负责人）',
            '智能问答系统设计与实现（全栈开发）',
            '数据分析可视化平台（后端开发）'
          ],
          selectedItems: []
        },
        {
          title: '技能证书',
          selected: false,
          items: [
            '计算机二级证书（Python）',
            'CET-6证书（分数：556）',
            '软件设计师证书'
          ],
          selectedItems: []
        }
      ],
      manualSections: [
        {
          title: '教育经历',
          items: []
        },
        {
          title: '项目经验',
          items: []
        },
        {
          title: '获奖情况',
          items: []
        },
        {
          title: '技能特长',
          items: []
        }
      ],
      templates: [
        {
          name: '简约专业',
          description: '清晰的布局，突出重要信息',
          preview: '/static/resume/template1.png'
        },
        {
          name: '现代时尚',
          description: '独特的设计，彰显个性',
          preview: '/static/resume/template2.png'
        },
        {
          name: '传统商务',
          description: '稳重大方，适合正式场合',
          preview: '/static/resume/template3.png'
        }
      ],
      selectedTemplate: null
    }
  },
  computed: {
    isBasicInfoValid() {
      const { name, school, college, major, phone, email } = this.basicInfo;
      return name && 
             school && 
             college && 
             major && 
             this.isValidPhone(phone) && 
             this.isValidEmail(email);
    }
  },
  methods: {
    isValidPhone(phone) {
      const phoneRegex = /^1[3-9]\d{9}$/;
      return phoneRegex.test(phone);
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateBasicInfo() {
      const { name, school, college, major, phone, email } = this.basicInfo;
      if (!name) {
        uni.showToast({ title: '请输入姓名', icon: 'none' });
        return false;
      }
      if (!school) {
        uni.showToast({ title: '请输入学校', icon: 'none' });
        return false;
      }
      if (!college) {
        uni.showToast({ title: '请输入学院', icon: 'none' });
        return false;
      }
      if (!major) {
        uni.showToast({ title: '请输入专业', icon: 'none' });
        return false;
      }
      if (!this.isValidPhone(phone)) {
        uni.showToast({ title: '请输入有效的手机号', icon: 'none' });
        return false;
      }
      if (!this.isValidEmail(email)) {
        uni.showToast({ title: '请输入有效的邮箱', icon: 'none' });
        return false;
      }
      return true;
    },
    goBack() {
      uni.navigateBack()
    },
    nextStep() {
      if (this.step === 1 && !this.validateBasicInfo()) {
        return;
      }
      if (this.step < 4) {
        this.step++;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--
      }
    },
    onSwitchChange(e) {
      this.useHonorData = e.detail.value
    },
    toggleCategory(index) {
      this.honorCategories[index].selected = !this.honorCategories[index].selected
      if (!this.honorCategories[index].selected) {
        this.honorCategories[index].selectedItems = []
      }
    },
    onItemsChange(e, categoryIndex) {
      this.honorCategories[categoryIndex].selectedItems = e.detail.value
    },
    addItem(sectionIndex) {
      this.manualSections[sectionIndex].items.push('')
    },
    removeItem(sectionIndex, itemIndex) {
      this.manualSections[sectionIndex].items.splice(itemIndex, 1)
    },
    selectTemplate(index) {
      this.selectedTemplate = index
    },
    generateResume() {
      this.step = 4
    },
    async downloadPDF() {
      try {
        uni.showLoading({
          title: '正在生成PDF...'
        });
        
        const element = document.querySelector('.resume-preview');
        const opt = {
          margin: 1,
          filename: `${this.basicInfo.name}_简历.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        const html2pdf = (await import('html2pdf.js')).default;
        await html2pdf().set(opt).from(element).save();
        
        uni.hideLoading();
        uni.showToast({
          title: 'PDF生成成功',
          icon: 'success'
        });
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'PDF生成失败',
          icon: 'error'
        });
        console.error('PDF生成错误:', error);
      }
    },
    saveResume() {
      try {
        const resumeData = {
          basicInfo: this.basicInfo,
          useHonorData: this.useHonorData,
          honorCategories: this.honorCategories,
          manualSections: this.manualSections,
          selectedTemplate: this.selectedTemplate,
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString()
        };
        
        // 保存到本地存储
        const savedResumes = uni.getStorageSync('saved_resumes') || [];
        savedResumes.push(resumeData);
        uni.setStorageSync('saved_resumes', savedResumes);
        
        uni.showToast({
          title: '简历保存成功',
          icon: 'success'
        });
      } catch (error) {
        uni.showToast({
          title: '简历保存失败',
          icon: 'error'
        });
        console.error('简历保存错误:', error);
      }
    }
  }
}
</script>

<style>
.resume-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.page-header {
  position: relative;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
}

.back-button {
  position: absolute;
  left: 20rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.more-options {
  position: absolute;
  right: 20rpx;
}

.content-container {
  padding: 20rpx;
}

.step-container {
  background: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.step-title {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.step-number {
  font-size: 40rpx;
  font-weight: bold;
  color: #409EFF;
  margin-right: 20rpx;
}

.step-text {
  font-size: 32rpx;
  font-weight: bold;
}

.form-container {
  margin-bottom: 30rpx;
}

.form-item {
  margin-bottom: 20rpx;
}

.label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.input {
  width: 100%;
  height: 80rpx;
  background: #f5f7fa;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.textarea {
  width: 100%;
  height: 200rpx;
  background: #f5f7fa;
  border-radius: 8rpx;
  padding: 20rpx;
  font-size: 28rpx;
}

.placeholder {
  color: #999;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
}

.prev-btn,
.next-btn,
.download-btn,
.save-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
}

.data-source-options {
  margin-bottom: 30rpx;
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.switch-label {
  font-size: 28rpx;
  color: #333;
}

.honor-data-selection {
  margin-bottom: 30rpx;
}

.selection-title {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.honor-category {
  margin-bottom: 20rpx;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 10rpx;
}

.category-title {
  font-size: 28rpx;
  font-weight: bold;
}

.honor-items {
  padding-left: 40rpx;
}

.honor-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 10rpx;
}

.item-text {
  font-size: 26rpx;
  color: #666;
}

.manual-section {
  margin-bottom: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 10rpx;
}

.item-input {
  flex: 1;
  height: 70rpx;
  background: #f5f7fa;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 26rpx;
}

.templates-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.template-item {
  background: #fff;
  border-radius: 8rpx;
  padding: 20rpx;
  border: 2rpx solid #eee;
}

.template-item.selected {
  border-color: #409EFF;
}

.template-preview {
  width: 100%;
  height: 300rpx;
  margin-bottom: 20rpx;
}

.preview-image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.template-info {
  text-align: center;
}

.template-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.template-desc {
  font-size: 24rpx;
  color: #666;
}

.resume-preview {
  background: #fff;
  border-radius: 8rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
}

.resume-header {
  text-align: center;
  margin-bottom: 40rpx;
}

.resume-name {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  font-size: 24rpx;
  color: #666;
}

.resume-section {
  margin-bottom: 30rpx;
}

.section-content {
  font-size: 26rpx;
  line-height: 1.6;
  color: #333;
}

.content-item {
  margin-bottom: 10rpx;
}
</style> 