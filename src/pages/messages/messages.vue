<template>
  <view class="competition-page">
    <!-- 顶部区域 -->
    <view class="hero-section">
      <view class="hero-overlay"></view>
      <view class="hero-content">
        <view class="back-button" @tap="goBack">
          <uni-icons type="back" size="20" color="#fff"></uni-icons>
        </view>
        <view class="title-container">
          <text class="hero-title">竞赛推荐</text>
          <text class="hero-subtitle">为您精选适合警校学生的优质竞赛</text>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 热门推荐 -->
      <view class="featured-competition">
        <view class="badge">热门推荐</view>
        <view class="featured-card" @tap="visitWebsite('https://www.qingjiaoclass.com/')">
          <view class="featured-overlay"></view>
          <view class="featured-content">
            <text class="featured-title">南京警察学院"警信杯"大数据技能竞赛</text>
            <view class="featured-info">
              <view class="countdown-chip">
                <uni-icons type="calendar" size="14" color="#fff"></uni-icons>
                <text>{{calculateDaysLeft('2025-04-30')}}天后截止</text>
              </view>
              <button class="featured-btn" size="mini" type="primary">立即报名</button>
            </view>
          </view>
        </view>
      </view>

      <!-- 公安系统专项竞赛 -->
      <view class="section">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="medal" size="20" color="#1565C0"></uni-icons>
            <text>公安系统专项竞赛</text>
          </view>
          <view class="section-more" @tap="showMore">
            <text>查看全部</text>
            <uni-icons type="right" size="14" color="#757575"></uni-icons>
          </view>
        </view>

        <view class="competition-cards">
          <!-- 竞赛卡片1 -->
          <view class="competition-card">
            <view class="card-image">
              <text class="status-tag">报名中</text>
            </view>
            <view class="card-content">
              <text class="card-title">南京警察学院第四届"警信杯"大数据技能竞赛</text>
              
              <view class="info-row">
                <view class="info-item">
                  <uni-icons type="calendar" size="16" color="#1976D2"></uni-icons>
                  <text>2025年4月30日截止</text>
                </view>
                <view class="info-item">
                  <uni-icons type="person" size="16" color="#1976D2"></uni-icons>
                  <text>3人组队</text>
                </view>
              </view>

              <view class="info-tags">
                <text class="tag">Python数据分析</text>
                <text class="tag">Excel数据可视化</text>
                <text class="tag">Linux环境</text>
              </view>

              <text class="card-description">专业组面向信息技术学院学生，非专业组面向其他学院学生。优胜者直推"智警杯"全国赛。</text>
            </view>
            <view class="card-footer">
              <button class="action-button" type="primary" size="mini" @tap="visitWebsite('https://www.qingjiaoclass.com/')">查看详情</button>
            </view>
          </view>

          <!-- 竞赛卡片2 -->
          <view class="competition-card">
            <view class="card-image">
              <text class="status-tag status-coming">即将开始</text>
            </view>
            <view class="card-content">
              <text class="card-title">第二届黄河流域公安院校网络攻防比赛</text>
              
              <view class="info-row">
                <view class="info-item">
                  <uni-icons type="location" size="16" color="#1976D2"></uni-icons>
                  <text>山西警察学院</text>
                </view>
                <view class="info-item">
                  <uni-icons type="info" size="16" color="#1976D2"></uni-icons>
                  <text>AWD攻防赛</text>
                </view>
              </view>

              <view class="info-tags">
                <text class="tag">Burp Suite</text>
                <text class="tag">漏洞挖掘</text>
                <text class="tag">代码修复</text>
              </view>

              <text class="card-description">动态攻防模式，考察网络安全实战能力，参赛期间禁止使用互联网和手机。</text>
            </view>
            <view class="card-footer">
              <button class="action-button" type="primary" size="mini" @tap="showComingSoon">敬请期待</button>
            </view>
          </view>
        </view>
      </view>

      <!-- 通用计算机竞赛 -->
      <view class="section">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="star" size="20" color="#1565C0"></uni-icons>
            <text>通用计算机竞赛</text>
          </view>
          <view class="section-more" @tap="showMore">
            <text>查看全部</text>
            <uni-icons type="right" size="14" color="#757575"></uni-icons>
          </view>
        </view>

        <scroll-view class="competition-scroll" scroll-x>
          <view class="scroll-card" @tap="visitWebsite('http://jsjds.blcu.edu.cn/')">
            <view class="scroll-image"></view>
            <view class="scroll-content">
              <text class="scroll-title">中国大学生计算机设计大赛</text>
              <text class="scroll-desc">面向公安专业的数据可视化与智能系统赛道</text>
            </view>
          </view>

          <view class="scroll-card" @tap="visitWebsite('https://developer.huaweicloud.com/codecraft2025')">
            <view class="scroll-image"></view>
            <view class="scroll-content">
              <text class="scroll-title">华为软件精英挑战赛</text>
              <text class="scroll-desc">优胜者可获华为校招绿卡</text>
            </view>
          </view>

          <view class="scroll-card" @tap="visitWebsite('https://icpc.global/')">
            <view class="scroll-image"></view>
            <view class="scroll-content">
              <text class="scroll-title">ACM-ICPC程序设计</text>
              <text class="scroll-desc">全球顶级算法竞赛</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 流行数据科学竞赛 -->
      <view class="section">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="chart" size="20" color="#1565C0"></uni-icons>
            <text>流行数据科学竞赛</text>
          </view>
        </view>

        <view class="list-card">
          <view class="list-item" @tap="visitWebsite('https://www.kaggle.com/competitions')">
            <view class="list-image"></view>
            <view class="list-content">
              <text class="list-title">Kaggle数据科学竞赛</text>
              <text class="list-desc">全球最大数据挖掘平台，提供企业级数据集，适合学习机器学习、数据分析。</text>
            </view>
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
          
          <view class="list-item" @tap="visitWebsite('https://tianchi.aliyun.com/')">
            <view class="list-image"></view>
            <view class="list-content">
              <text class="list-title">阿里天池大赛</text>
              <text class="list-desc">阿里巴巴主办的多元竞赛（算法、网络安全、可视化），奖金丰厚，部分赛题涉及公共安全数据。</text>
            </view>
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </view>
      </view>

      <!-- 参考来源 -->
      <view class="reference-section">
        <view class="reference-list">
          <text class="reference-title">数据来源与参考</text>
          <text class="reference-item">[1] 南京警察学院第四届"警信杯"竞赛通知</text>
          <text class="reference-item">[2] 中国大学生计算机设计大赛官方指南</text>
          <text class="reference-item">[3] 华为软件精英挑战赛2025赛季规则</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 返回上一页
    goBack() {
      // 尝试返回上一页
      uni.navigateBack({
        delta: 1,
        fail: () => {
          // 如果返回失败，则跳转到首页
          uni.reLaunch({
            url: '/pages/home/home'
          })
        }
      })
    },

    // 访问网站
    visitWebsite(url) {
      // uniapp中使用plus.runtime.openURL在APP环境打开外部链接
      // #ifdef APP-PLUS
      plus.runtime.openURL(url)
      // #endif
      
      // 其他环境使用window.open
      // #ifdef H5
      window.open(url, '_blank')
      // #endif
    },

    // 显示即将推出提示
    showComingSoon() {
      uni.showToast({
        title: '详细信息即将发布，请稍后查看！',
        icon: 'none'
      })
    },

    // 显示更多
    showMore() {
      uni.showToast({
        title: '更多内容正在开发中',
        icon: 'none'
      })
    },

    // 计算剩余天数
    calculateDaysLeft(endDateStr) {
      const endDate = new Date(endDateStr)
      const today = new Date()
      const diffTime = endDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }
  }
}
</script>

<style>
.competition-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 顶部区域 */
.hero-section {
  height: 400rpx;
  background-color: #4169E1;
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
}

.hero-content {
  position: relative;
  z-index: 2;
  color: #fff;
  padding: 40rpx;
  height: 100%;
}

.title-container {
  margin-top: 120rpx;
}

.hero-title {
  font-size: 56rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
  display: block;
}

.hero-subtitle {
  font-size: 32rpx;
  opacity: 0.9;
}

.back-button {
  position: absolute;
  top: 40rpx;
  left: 30rpx;
  width: 72rpx;
  height: 72rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主要内容区域 */
.main-content {
  padding: 30rpx;
  margin-top: -40rpx;
  border-radius: 40rpx 40rpx 0 0;
  background-color: #f8f9fa;
  position: relative;
  z-index: 3;
}

/* 热门推荐 */
.featured-competition {
  position: relative;
  margin-bottom: 48rpx;
}

.badge {
  position: absolute;
  top: -20rpx;
  left: 32rpx;
  background-color: #FF3D00;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 8rpx 24rpx;
  border-radius: 24rpx;
  z-index: 4;
  box-shadow: 0 4rpx 16rpx rgba(255, 61, 0, 0.3);
}

.featured-card {
  height: 360rpx;
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
  background-color: #1976D2;
}

.featured-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32rpx;
  color: #fff;
}

.featured-title {
  margin: 0 0 20rpx 0;
  font-size: 36rpx;
  font-weight: bold;
  line-height: 1.3;
}

.featured-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.countdown-chip {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32rpx;
  padding: 8rpx 24rpx;
  font-size: 24rpx;
}

.countdown-chip text {
  margin-left: 8rpx;
}

.featured-btn {
  font-weight: bold;
}

/* 分区样式 */
.section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 36rpx;
  font-weight: bold;
  color: #1565C0;
}

.section-title text {
  margin-left: 16rpx;
}

.section-more {
  font-size: 28rpx;
  color: #757575;
  display: flex;
  align-items: center;
}

/* 竞赛卡片 */
.competition-cards {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.competition-card {
  background: #fff;
  border-radius: 32rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.05);
}

.card-image {
  height: 280rpx;
  background-color: #1976D2;
  position: relative;
}

.status-tag {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  background-color: #4CAF50;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 6rpx 20rpx;
  border-radius: 24rpx;
}

.status-coming {
  background-color: #FF9800;
}

.card-content {
  padding: 32rpx;
}

.card-title {
  margin: 0 0 24rpx 0;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
}

.info-row {
  display: flex;
  margin-bottom: 24rpx;
}

.info-item {
  display: flex;
  align-items: center;
  margin-right: 32rpx;
  font-size: 26rpx;
  color: #666;
}

.info-item text {
  margin-left: 8rpx;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 24rpx;
}

.tag {
  background-color: #E3F2FD;
  color: #1565C0;
  font-size: 24rpx;
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
}

.card-description {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.card-footer {
  padding: 24rpx 32rpx;
  border-top: 2rpx solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

/* 横向滚动卡片 */
.competition-scroll {
  white-space: nowrap;
  margin: 0 -30rpx;
  padding: 0 30rpx;
}

.scroll-card {
  display: inline-block;
  width: 320rpx;
  margin-right: 24rpx;
  border-radius: 32rpx;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.scroll-image {
  height: 180rpx;
  background-color: #1976D2;
}

.scroll-content {
  padding: 24rpx;
}

.scroll-title {
  display: block;
  margin: 0 0 8rpx 0;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.scroll-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

/* 列表项目 */
.list-card {
  background: #fff;
  border-radius: 32rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.05);
}

.list-item {
  display: flex;
  padding: 32rpx;
  border-bottom: 2rpx solid #f0f0f0;
  align-items: center;
}

.list-item:last-child {
  border-bottom: none;
}

.list-image {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  background-color: #1976D2;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.list-content {
  flex: 1;
}

.list-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.list-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
}

/* 参考部分 */
.reference-section {
  margin-top: 80rpx;
}

.reference-list {
  background: #fff;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.05);
}

.reference-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #555;
  margin-bottom: 20rpx;
}

.reference-item {
  display: block;
  font-size: 26rpx;
  color: #777;
  margin-bottom: 12rpx;
}
</style>
