<template>
  <view class="report-page">
    <view class="report-header">
      <view class="back-button" @tap="goBack">
        <uni-icons type="left" size="20"></uni-icons>
      </view>
      <view class="header-overlay"></view>
      <view class="header-content">
        <text class="header-title">黄坤的学情报告</text>
        <text class="header-subtitle">全面了解您的学习情况与发展建议</text>
      </view>
    </view>

    <view class="main-content">
      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="chart" size="20"></uni-icons>
            <text>学习概览</text>
          </view>
          <view class="semester-select">
            <picker 
              :value="semesterIndex" 
              :range="semesters" 
              @change="onSemesterChange"
              class="picker"
            >
              <text>{{ semesters[semesterIndex] }}</text>
            </picker>
          </view>
        </view>

        <view class="overview-grid">
          <view class="grid-item">
            <text class="stat-value">{{ studentData.gpa }}</text>
            <text class="stat-label">GPA</text>
            <view class="trend-indicator" :class="studentData.gpaTrend">
              <uni-icons v-if="studentData.gpaTrend === 'up'" type="arrow-up" size="14"></uni-icons>
              <uni-icons v-if="studentData.gpaTrend === 'down'" type="arrow-down" size="14"></uni-icons>
              <text v-if="studentData.gpaTrendValue">{{ studentData.gpaTrendValue }}</text>
            </view>
          </view>
          <view class="grid-item">
            <text class="stat-value">{{ studentData.rank }}</text>
            <text class="stat-label">班级排名</text>
            <view class="trend-indicator" :class="studentData.rankTrend">
              <uni-icons v-if="studentData.rankTrend === 'up'" type="arrow-up" size="14"></uni-icons>
              <uni-icons v-if="studentData.rankTrend === 'down'" type="arrow-down" size="14"></uni-icons>
              <text v-if="studentData.rankTrendValue">{{ studentData.rankTrendValue }}</text>
            </view>
          </view>
          <view class="grid-item">
            <text class="stat-value">{{ studentData.courseCount }}</text>
            <text class="stat-label">已学课程</text>
          </view>
          <view class="grid-item">
            <text class="stat-value">{{ studentData.creditEarned }}</text>
            <text class="stat-label">已获学分</text>
          </view>
        </view>
      </view>

      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="pie" size="20"></uni-icons>
            <text>成绩分布</text>
          </view>
        </view>
        <view class="chart-container">
          <qiun-data-charts 
            type="pie"
            :opts="gradeChartOpts"
            :chartData="gradeChartData"
          />
        </view>
      </view>

      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="bars" size="20"></uni-icons>
            <text>学科能力分析</text>
          </view>
        </view>
        <view class="chart-container">
          <qiun-data-charts 
            type="radar"
            :opts="radarChartOpts"
            :chartData="radarChartData"
          />
        </view>
      </view>

      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="file" size="20"></uni-icons>
            <text>综合分析报告</text>
          </view>
        </view>

        <view class="report-analysis">
          <view class="report-paragraph">
            <text class="strong">学习情况总结：</text>
            <text>{{ studentData.summary }}</text>
          </view>

          <view class="strength-weakness">
            <view class="strength">
              <view class="sub-title">
                <uni-icons type="star" size="16"></uni-icons>
                <text>优势学科</text>
              </view>
              <view class="list">
                <view class="list-item" v-for="(item, index) in studentData.strengths" :key="'str-'+index">
                  <text>{{ item }}</text>
                </view>
              </view>
            </view>
            <view class="weakness">
              <view class="sub-title">
                <uni-icons type="info" size="16"></uni-icons>
                <text>提升空间</text>
              </view>
              <view class="list">
                <view class="list-item" v-for="(item, index) in studentData.weaknesses" :key="'wek-'+index">
                  <text>{{ item }}</text>
                </view>
              </view>
            </view>
          </view>

          <view class="report-paragraph">
            <text class="strong">学科建议：</text>
            <text>{{ studentData.suggestions }}</text>
          </view>
        </view>
      </view>

      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="staff" size="20"></uni-icons>
            <text>推荐课程</text>
          </view>
        </view>

        <view class="recommended-courses">
          <view v-for="(course, index) in studentData.recommendedCourses" :key="index" class="course-card">
            <view class="course-icon" :style="{ backgroundColor: course.color }">
              <uni-icons :type="course.uniIcon" size="24" color="#fff"></uni-icons>
            </view>
            <view class="course-details">
              <text class="course-name">{{ course.name }}</text>
              <view class="course-info">
                <text><uni-icons type="calendar" size="14"></uni-icons> {{ course.credits }}学分</text>
                <text><uni-icons type="person" size="14"></uni-icons> {{ course.teacher }}</text>
              </view>
              <text class="course-desc">{{ course.description }}</text>
            </view>
            <button class="course-btn" type="primary" size="mini" @tap="viewCourseDetail(course)">查看详情</button>
          </view>
        </view>
      </view>

      <view class="section card">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="compose" size="20"></uni-icons>
            <text>学习路径规划</text>
          </view>
        </view>
        <view class="chart-container">
          <qiun-data-charts 
            type="line"
            :opts="pathChartOpts"
            :chartData="pathChartData"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      semesterIndex: 0,
      semesters: [
        '2023-2024学年第二学期',
        '2023-2024学年第一学期',
        '2022-2023学年第二学期',
        '2022-2023学年第一学期'
      ],
      studentData: {
        gpa: '3.82',
        gpaTrend: 'up',
        gpaTrendValue: '+0.21',
        rank: '5/89',
        rankTrend: 'up',
        rankTrendValue: '+2',
        courseCount: '32',
        creditEarned: '87.5',
        summary: '您在本学期表现优异，专业课成绩位于班级前列，且较上学期有明显进步。特别在计算机编程与大数据分析等技术类课程中表现突出，显示出较强的逻辑思维能力和实践动手能力。',
        strengths: [
          '信息安全技术（94分，班级第3名）',
          '计算机编程（92分，班级第1名）',
          '大数据分析基础（91分，班级第2名）'
        ],
        weaknesses: [
          '法医学基础（78分，班级第22名）',
          '英语口语交流（82分，班级第15名）',
          '刑事侦查学（85分，班级第11名）'
        ],
        suggestions: '建议您在保持技术课程优势的同时，重点提升法医学和刑事侦查等专业基础课程的学习。同时，加强英语口语练习，为今后可能的国际交流做准备。下学期可考虑选修法律英语课程，结合您的技术优势和需要提升的领域。',
        recommendedCourses: [
          {
            name: '法律英语',
            credits: '2.0',
            teacher: '李明教授',
            description: '专为警察学院学生设计的法律英语课程，结合专业术语与实战案例',
            color: '#64B5F6',
            uniIcon: 'book'
          },
          {
            name: '刑事案例分析',
            credits: '3.0',
            teacher: '王强教授',
            description: '通过典型案例强化刑事侦查理论知识，提升综合分析能力',
            color: '#FF7043',
            uniIcon: 'file'
          },
          {
            name: '数据挖掘与犯罪分析',
            credits: '4.0',
            teacher: '张芳教授',
            description: '结合您的数据分析优势，将技术应用于犯罪模式识别',
            color: '#7E57C2',
            uniIcon: 'chart'
          }
        ]
      },
      gradeChartOpts: {
        padding: [15, 15, 15, 15],
        legend: { show: true },
        series: [{ type: 'pie' }]
      },
      gradeChartData: {
        series: [{
          data: [
            { name: '优秀(90-100)', value: 35 },
            { name: '良好(80-89)', value: 45 },
            { name: '中等(70-79)', value: 15 },
            { name: '及格(60-69)', value: 5 }
          ]
        }]
      },
      radarChartOpts: {
        padding: [15, 15, 15, 15],
        radar: {
          indicator: [
            { name: '专业基础', max: 100 },
            { name: '编程能力', max: 100 },
            { name: '数据分析', max: 100 },
            { name: '英语水平', max: 100 },
            { name: '实践能力', max: 100 }
          ]
        }
      },
      radarChartData: {
        series: [{
          name: '能力分布',
          data: [[85, 95, 90, 75, 88]]
        }]
      },
      pathChartOpts: {
        padding: [15, 15, 15, 15],
        xAxis: { type: 'category' },
        yAxis: { type: 'value' }
      },
      pathChartData: {
        categories: ['大一上', '大一下', '大二上', '大二下', '大三上'],
        series: [{
          name: 'GPA走势',
          data: [3.2, 3.4, 3.6, 3.82, 3.9]
        }]
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    onSemesterChange(e) {
      this.semesterIndex = e.detail.value
      // TODO: 根据选择的学期更新数据
    },
    viewCourseDetail(course) {
      // TODO: 实现课程详情查看功能
      uni.showToast({
        title: `查看${course.name}的详情`,
        icon: 'none'
      })
    }
  }
}
</script>

<style>
.report-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.report-header {
  position: relative;
  height: 200rpx;
  background: linear-gradient(135deg, #409EFF, #36D1DC);
  padding: 20rpx;
}

.back-button {
  position: absolute;
  top: 40rpx;
  left: 20rpx;
  z-index: 2;
  color: #fff;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.header-content {
  position: relative;
  z-index: 1;
  padding: 40rpx 30rpx;
  color: #fff;
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

.main-content {
  padding: 20rpx;
}

.section {
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  background: #fff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.card {
  padding: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.semester-select {
  font-size: 24rpx;
}

.picker {
  padding: 10rpx 20rpx;
  background: #f5f7fa;
  border-radius: 8rpx;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 10rpx;
}

.grid-item {
  background: #f8f9fa;
  padding: 20rpx;
  border-radius: 8rpx;
  text-align: center;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 10rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

.trend-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
  font-size: 20rpx;
}

.trend-indicator.up {
  color: #67C23A;
}

.trend-indicator.down {
  color: #F56C6C;
}

.chart-container {
  height: 400rpx;
  padding: 20rpx 0;
}

.report-analysis {
  padding: 20rpx;
}

.report-paragraph {
  margin-bottom: 30rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: #333;
}

.strong {
  font-weight: bold;
  margin-right: 10rpx;
}

.strength-weakness {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin: 30rpx 0;
}

.sub-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 26rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.list {
  font-size: 24rpx;
}

.list-item {
  margin-bottom: 10rpx;
  color: #666;
}

.recommended-courses {
  padding: 10rpx;
}

.course-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
}

.course-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-details {
  flex: 1;
}

.course-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.course-info {
  display: flex;
  gap: 20rpx;
  font-size: 22rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.course-desc {
  font-size: 24rpx;
  color: #666;
}

.course-btn {
  font-size: 24rpx;
}
</style> 