<template>
  <view class="form-container">
    <view class="form-content">
      <view class="form-item">
        <text class="label required">竞赛名称</text>
        <input 
          class="input" 
          v-model="formData.name" 
          placeholder="请输入竞赛名称"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item">
        <text class="label required">竞赛级别</text>
        <picker 
          class="picker" 
          mode="selector" 
          :range="competitionLevels" 
          @change="handleLevelChange"
          :value="levelIndex"
        >
          <view class="picker-text" :class="{ empty: !formData.level }">
            {{ formData.level || '请选择竞赛级别' }}
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label required">获奖等级</text>
        <picker 
          class="picker" 
          mode="selector" 
          :range="awardLevels" 
          @change="handleAwardLevelChange"
          :value="awardLevelIndex"
        >
          <view class="picker-text" :class="{ empty: !formData.awardLevel }">
            {{ formData.awardLevel || '请选择获奖等级' }}
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
        <text class="label required">获奖时间</text>
        <picker 
          class="picker" 
          mode="date" 
          :value="formData.date" 
          @change="handleDateChange"
        >
          <view class="picker-text" :class="{ empty: !formData.date }">
            {{ formData.date || '请选择获奖时间' }}
          </view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="label required">竞赛描述</text>
        <textarea 
          class="textarea" 
          v-model="formData.description" 
          placeholder="请输入竞赛描述"
          placeholder-class="placeholder"
        />
      </view>
      
      <view class="form-item">
        <text class="label required">获奖证书</text>
        <view class="upload-box" @tap="chooseImage">
          <uni-icons v-if="!formData.image" type="camera" size="24" color="#999"></uni-icons>
          <image v-else :src="formData.image" mode="aspectFill" class="preview-image"></image>
        </view>
      </view>

      <!-- 参赛学生部分 -->
      <view class="form-item">
        <view class="section-header">
          <text class="label required">参赛学生</text>
          <view class="action-buttons">
            <text class="action-btn" @tap="addSelf">添加自己</text>
            <text class="action-btn" @tap="showStudentSearch">添加校内</text>
            <text class="action-btn" @tap="showExternalStudentForm">添加校外</text>
          </view>
        </view>
        
        <view class="table" v-if="students.length > 0">
          <view class="table-header">
            <text class="th">类型</text>
            <text class="th">学号/工号</text>
            <text class="th">姓名</text>
            <text class="th">操作</text>
          </view>
          <view class="table-row" v-for="(student, index) in students" :key="index">
            <text class="td">{{student.type}}</text>
            <text class="td">{{student.number}}</text>
            <text class="td">{{student.name}}</text>
            <text class="td delete" @tap="removeStudent(index)">删除</text>
          </view>
        </view>
      </view>

      <!-- 指导教师部分 -->
      <view class="form-item">
        <view class="section-header">
          <text class="label required">指导教师</text>
          <view class="action-buttons">
            <text class="action-btn" @tap="showTeacherSearch">添加校内</text>
            <text class="action-btn" @tap="showExternalTeacherForm">添加校外</text>
          </view>
        </view>
        
        <view class="table" v-if="teachers.length > 0">
          <view class="table-header">
            <text class="th">类型</text>
            <text class="th">工号</text>
            <text class="th">姓名</text>
            <text class="th">操作</text>
          </view>
          <view class="table-row" v-for="(teacher, index) in teachers" :key="index">
            <text class="td">{{teacher.type}}</text>
            <text class="td">{{teacher.number}}</text>
            <text class="td">{{teacher.name}}</text>
            <text class="td delete" @tap="removeTeacher(index)">删除</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="form-footer">
      <button class="submit-btn" @tap="submitForm">提交</button>
    </view>

    <!-- 校内学生搜索弹窗 -->
    <uni-popup ref="studentSearchPopup" type="center">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">添加参赛学生</text>
          <text class="popup-close" @tap="closeStudentSearch">×</text>
        </view>
        <view class="popup-body">
          <view class="search-box">
            <input 
              class="search-input" 
              v-model="studentSearch" 
              placeholder="请输入学号搜索"
              @input="handleStudentSearch"
            />
          </view>
          <view class="search-results" v-if="searchResults.length > 0">
            <view 
              class="search-item" 
              v-for="(item, index) in searchResults" 
              :key="index"
              @tap="selectStudent(item)"
            >
              <text>{{item.number}} - {{item.name}}</text>
            </view>
          </view>
          <view class="no-result" v-else-if="studentSearch">
            <text>未找到相关学生</text>
          </view>
        </view>
        <view class="popup-footer">
          <button class="cancel-btn" @tap="closeStudentSearch">取消</button>
        </view>
      </view>
    </uni-popup>

    <!-- 校内教师搜索弹窗 -->
    <uni-popup ref="teacherSearchPopup" type="center">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">添加指导教师</text>
          <text class="popup-close" @tap="closeTeacherSearch">×</text>
        </view>
        <view class="popup-body">
          <view class="search-box">
            <input 
              class="search-input" 
              v-model="teacherSearch" 
              placeholder="请输入工号搜索"
              @input="handleTeacherSearch"
            />
          </view>
          <view class="search-results" v-if="searchResults.length > 0">
            <view 
              class="search-item" 
              v-for="(item, index) in searchResults" 
              :key="index"
              @tap="selectTeacher(item)"
            >
              <text>{{item.number}} - {{item.name}}</text>
            </view>
          </view>
          <view class="no-result" v-else-if="teacherSearch">
            <text>未找到相关教师</text>
          </view>
        </view>
        <view class="popup-footer">
          <button class="cancel-btn" @tap="closeTeacherSearch">取消</button>
        </view>
      </view>
    </uni-popup>

    <!-- 校外学生信息填写弹窗 -->
    <uni-popup ref="externalStudentFormPopup" type="center">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">添加校外学生</text>
          <text class="popup-close" @tap="closeExternalStudentForm">×</text>
        </view>
        <view class="popup-body">
          <view class="form-group">
            <text class="label">姓名</text>
            <input class="input" v-model="externalStudent.name" placeholder="请输入姓名" />
          </view>
          <view class="form-group">
            <text class="label">性别</text>
            <picker class="picker" mode="selector" :range="['男', '女']" @change="handleGenderChange">
              <view class="picker-text">{{externalStudent.gender || '请选择性别'}}</view>
            </picker>
          </view>
          <view class="form-group">
            <text class="label">学校</text>
            <input class="input" v-model="externalStudent.school" placeholder="请输入学校" />
          </view>
          <view class="form-group">
            <text class="label">学院</text>
            <input class="input" v-model="externalStudent.college" placeholder="请输入学院" />
          </view>
        </view>
        <view class="popup-footer">
          <button class="cancel-btn" @tap="closeExternalStudentForm">取消</button>
          <button class="confirm-btn" @tap="confirmExternalStudent">确定</button>
        </view>
      </view>
    </uni-popup>

    <!-- 校外教师信息填写弹窗 -->
    <uni-popup ref="externalTeacherFormPopup" type="center">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">添加校外教师</text>
          <text class="popup-close" @tap="closeExternalTeacherForm">×</text>
        </view>
        <view class="popup-body">
          <view class="form-group">
            <text class="label">姓名</text>
            <input class="input" v-model="externalTeacher.name" placeholder="请输入姓名" />
          </view>
          <view class="form-group">
            <text class="label">性别</text>
            <picker class="picker" mode="selector" :range="['男', '女']" @change="handleTeacherGenderChange">
              <view class="picker-text">{{externalTeacher.gender || '请选择性别'}}</view>
            </picker>
          </view>
          <view class="form-group">
            <text class="label">学校</text>
            <input class="input" v-model="externalTeacher.school" placeholder="请输入学校" />
          </view>
          <view class="form-group">
            <text class="label">职称</text>
            <input class="input" v-model="externalTeacher.title" placeholder="请输入职称" />
          </view>
        </view>
        <view class="popup-footer">
          <button class="cancel-btn" @tap="closeExternalTeacherForm">取消</button>
          <button class="confirm-btn" @tap="confirmExternalTeacher">确定</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { createOrUpdateAchievement, submitAchievement } from '@/api/achievement'

export default {
  data() {
    const userStore = useUserStore()
    const { userId, role } = storeToRefs(userStore)
    
    return {
      userStore,
      userId: userId.value,
      userRole: role.value,
      formData: {
        name: '',
        level: '',
        awardLevel: '',
        teacher: '',
        date: '',
        description: '',
        image: '',
        presetField: '',
        organizer: '',
        is_A_class: false,
        edition: '',
        work_name: '',
        award_grade: '',
        award_time: '',
        certificate: ''
      },
      levelIndex: -1,
      awardLevelIndex: -1,
      competitionLevels: ['国际级', '国家级', '省级', '市级', '校级'],
      awardLevels: ['特等奖', '一等奖', '二等奖', '三等奖', '优秀奖'],
      studentSearch: '',
      teacherSearch: '',
      students: [],
      teachers: [],
      searchResults: [],
      externalStudent: {
        name: '',
        gender: '',
        school: '',
        college: ''
      },
      externalTeacher: {
        name: '',
        gender: '',
        school: '',
        title: ''
      }
    }
  },
  onLoad(options) {
    if (options.preset) {
      this.formData.presetField = decodeURIComponent(options.preset)
    }
  },
  methods: {
    handleLevelChange(e) {
      const index = e.detail.value
      this.levelIndex = index
      this.formData.level = this.competitionLevels[index]
    },
    handleAwardLevelChange(e) {
      const index = e.detail.value
      this.awardLevelIndex = index
      this.formData.awardLevel = this.awardLevels[index]
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
    submitForm(submitForReview = false) {
      // 表单验证
      if (!this.formData.name) {
        uni.showToast({
          title: '请输入竞赛名称',
          icon: 'none'
        })
        return
      }
      if (!this.formData.level) {
        uni.showToast({
          title: '请选择竞赛级别',
          icon: 'none'
        })
        return
      }
      if (!this.formData.awardLevel) {
        uni.showToast({
          title: '请选择获奖等级',
          icon: 'none'
        })
        return
      }
      
      // 构建所有参与者数据
      const allParticipants = [
        ...this.students.map(s => ({
          user_id: s.type === '校内' ? s.number : null,
          external_name: s.type === '校外' ? s.name : null,
          role_type: 'student',
          is_primary: s.type === '本人'
        })),
        ...this.teachers.map(t => ({
          user_id: t.type === '校内' ? t.number : null,
          external_name: t.type === '校外' ? t.name : null,
          role_type: 'teacher',
          is_primary: false
        }))
      ]
      
      // 如果当前用户是学生但不在参与者中，自动添加
      const userStore = useUserStore()
      if (userStore.role === 'student' && !allParticipants.some(p => p.role_type === 'student' && p.user_id === userStore.userId)) {
        allParticipants.push({
          user_id: userStore.userId,
          external_name: null,
          role_type: 'student',
          is_primary: false
        })
      }
      
      // 构建提交数据
      const data = {
        type: 'competition',
        date: new Date().toISOString(),
        participants: JSON.parse(JSON.stringify(allParticipants)),
        competition_info: {
          name: this.formData.name || '',
          organizer: this.formData.organizer || '',
          is_A_class: Boolean(this.formData.is_A_class),
          edition: this.formData.edition || '',
          work_name: this.formData.work_name || '',
          level: this.formData.level || '',
          award_grade: this.formData.award_grade || '',
          award_time: this.formData.award_time || '',
          certificate: this.formData.certificate || ''
        }
      }
      
      // 显示加载提示
      uni.showLoading({
        title: '提交中...',
        mask: true
      })
      
      // 调用API提交数据
      createOrUpdateAchievement(data, this.editMode ? this.currentAchievementId : null)
        .then(response => {
          const achievementId = response.data?.id || response.id || this.currentAchievementId
          
          if (submitForReview && achievementId) {
            // 如果需要直接提交审核
            return submitAchievement(achievementId)
              .then(() => {
                uni.showToast({
                  title: this.editMode ? '更新并提交成果成功' : '创建并提交成果成功',
                  icon: 'success'
                })
                // 关闭表单并刷新列表
                this.closeForm()
                this.$emit('refresh')
              })
              .catch(error => {
                console.error('提交成果失败:', error)
                uni.showToast({
                  title: '提交成果失败，但已保存为草稿',
                  icon: 'none'
                })
              })
          } else {
            uni.showToast({
              title: this.editMode ? '更新竞赛成果成功' : '创建竞赛成果成功',
              icon: 'success'
            })
            // 关闭表单并刷新列表
            this.closeForm()
            this.$emit('refresh')
          }
        })
        .catch(error => {
          console.error(this.editMode ? '更新竞赛成果失败:' : '创建竞赛成果失败:', error)
          uni.showToast({
            title: this.editMode ? '更新竞赛成果失败' : '创建竞赛成果失败',
            icon: 'none'
          })
        })
        .finally(() => {
          uni.hideLoading()
        })
    },
    // 学生相关方法
    addSelf() {
      const currentUser = {
        type: '本人',
        number: '2021001',
        name: '当前用户',
        gender: '男',
        school: '本校'
      }
      this.students.push(currentUser)
    },

    showStudentSearch() {
      this.$refs.studentSearchPopup.open()
    },

    closeStudentSearch() {
      this.$refs.studentSearchPopup.close()
      this.studentSearch = ''
      this.searchResults = []
    },

    handleStudentSearch(e) {
      if (this.studentSearch.length >= 3) {
        this.searchResults = [
          { type: '校内', number: this.studentSearch, name: '张三', gender: '男' }
        ]
      } else {
        this.searchResults = []
      }
    },

    selectStudent(student) {
      this.students.push(student)
      this.closeStudentSearch()
    },

    showExternalStudentForm() {
      this.$refs.externalStudentFormPopup.open()
    },

    closeExternalStudentForm() {
      this.$refs.externalStudentFormPopup.close()
      this.externalStudent = {
        name: '',
        gender: '',
        school: '',
        college: ''
      }
    },

    handleGenderChange(e) {
      const genders = ['男', '女']
      this.externalStudent.gender = genders[e.detail.value]
    },

    confirmExternalStudent() {
      if (!this.externalStudent.name || !this.externalStudent.gender || !this.externalStudent.school) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
      
      this.students.push({
        type: '校外',
        number: '-',
        name: this.externalStudent.name,
        gender: this.externalStudent.gender,
        school: this.externalStudent.school,
        college: this.externalStudent.college
      })
      
      this.closeExternalStudentForm()
    },

    removeStudent(index) {
      this.students.splice(index, 1)
    },

    // 教师相关方法
    showTeacherSearch() {
      this.$refs.teacherSearchPopup.open()
    },

    closeTeacherSearch() {
      this.$refs.teacherSearchPopup.close()
      this.teacherSearch = ''
      this.searchResults = []
    },

    handleTeacherSearch(e) {
      if (this.teacherSearch.length >= 3) {
        this.searchResults = [
          { type: '校内', number: this.teacherSearch, name: '李四', title: '教授' }
        ]
      } else {
        this.searchResults = []
      }
    },

    selectTeacher(teacher) {
      this.teachers.push(teacher)
      this.closeTeacherSearch()
    },

    showExternalTeacherForm() {
      this.$refs.externalTeacherFormPopup.open()
    },

    closeExternalTeacherForm() {
      this.$refs.externalTeacherFormPopup.close()
      this.externalTeacher = {
        name: '',
        gender: '',
        school: '',
        title: ''
      }
    },

    handleTeacherGenderChange(e) {
      const genders = ['男', '女']
      this.externalTeacher.gender = genders[e.detail.value]
    },

    confirmExternalTeacher() {
      if (!this.externalTeacher.name || !this.externalTeacher.gender || !this.externalTeacher.school) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        })
        return
      }
      
      this.teachers.push({
        type: '校外',
        number: '-',
        name: this.externalTeacher.name,
        gender: this.externalTeacher.gender,
        school: this.externalTeacher.school,
        title: this.externalTeacher.title
      })
      
      this.closeExternalTeacherForm()
    },

    removeTeacher(index) {
      this.teachers.splice(index, 1)
    },
    
    // 关闭表单
    closeForm() {
      uni.navigateBack()
    }
  }
}
</script>

<style>
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

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  color: #4169E1;
  font-size: 28rpx;
}

.table {
  border: 2rpx solid #f0f0f0;
  border-radius: 16rpx;
  overflow: hidden;
}

.table-header {
  display: flex;
  background-color: #f8f9fd;
  padding: 20rpx 0;
}

.table-row {
  display: flex;
  border-top: 2rpx solid #f0f0f0;
  padding: 20rpx 0;
}

.th, .td {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
}

.th {
  color: #666;
  font-weight: 500;
}

.td {
  color: #333;
}

.td.delete {
  color: #ff4d4f;
}

.popup-content {
  background-color: #fff;
  border-radius: 24rpx;
  width: 600rpx;
  padding: 30rpx;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.popup-close {
  font-size: 40rpx;
  color: #999;
  padding: 10rpx;
}

.popup-body {
  max-height: 600rpx;
  overflow-y: auto;
}

.search-box {
  margin-bottom: 20rpx;
}

.search-input {
  width: 100%;
  height: 88rpx;
  background-color: #f8f9fd;
  border-radius: 16rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  border: 2rpx solid #f0f0f0;
}

.search-results {
  margin-top: 20rpx;
}

.search-item {
  padding: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.search-item:active {
  background-color: #f8f9fd;
}

.no-result {
  padding: 40rpx 0;
  text-align: center;
  color: #999;
}

.popup-footer {
  margin-top: 30rpx;
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
}

.cancel-btn, .confirm-btn {
  padding: 16rpx 40rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.cancel-btn {
  background-color: #f5f7fa;
  color: #666;
}

.confirm-btn {
  background-color: #4169E1;
  color: #fff;
}
</style> 