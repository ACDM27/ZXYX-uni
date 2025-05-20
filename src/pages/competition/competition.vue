<template>
  <view class="competition-page">
    <!-- Hero Section -->
    <view class="hero-section">
      <view class="hero-overlay"></view>
      <view class="hero-content">
        <view class="back-button" @tap="goBack">
          <uni-icons type="back" size="20" color="#fff" />
        </view>
        <text class="hero-title">竞赛推荐</text>
        <text class="hero-subtitle">为您精选适合警校学生的优质竞赛</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <!-- Featured Competition -->
      <view class="featured-competition">
        <text class="badge">热门推荐</text>
        <view class="featured-card" @tap="visitWebsite('https://www.qingjiaoclass.com/')">
          <image class="featured-image" src="/static/img/police_contest.jpg" mode="aspectFill"></image>
          <view class="featured-overlay"></view>
          <view class="featured-content">
            <text class="featured-title">南京警察学院"警信杯"大数据技能竞赛</text>
            <view class="featured-info">
              <view class="countdown-chip">
                <uni-icons type="calendar" size="14" color="#fff" />
                <text>{{ calculateDaysLeft('2025-04-30') }}天后截止</text>
              </view>
              <button class="featured-btn" size="mini" type="primary">立即报名</button>
            </view>
          </view>
        </view>
      </view>

      <!-- Section: Police Competitions -->
      <view class="section">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="medal" size="20" color="#409EFF" />
            <text>公安系统专项竞赛</text>
          </view>
          <view class="section-more" @tap="showMore">
            <text>查看全部</text>
            <uni-icons type="right" size="14" color="#666" />
          </view>
        </view>

        <view class="competition-cards">
          <!-- Police Competition Card 1 -->
          <view class="competition-card">
            <view class="card-image-container">
              <image class="card-image" src="/static/img/data_contest.jpg" mode="aspectFill"></image>
              <text class="status-tag">报名中</text>
            </view>
            <view class="card-content">
              <text class="card-title">南京警察学院第四届"警信杯"大数据技能竞赛</text>
              
              <view class="info-row">
                <view class="info-item">
                  <uni-icons type="calendar" size="14" color="#666" />
                  <text>2025年4月30日截止</text>
                </view>
                <view class="info-item">
                  <uni-icons type="person" size="14" color="#666" />
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
              <button type="primary" @tap="visitWebsite('https://www.qingjiaoclass.com/')" class="action-button" size="mini">
                查看详情
              </button>
            </view>
          </view>

          <!-- Police Competition Card 2 -->
          <view class="competition-card">
            <view class="card-image-container">
              <image class="card-image" src="/static/img/network_security.jpg" mode="aspectFill"></image>
              <text class="status-tag status-coming">即将开始</text>
            </view>
            <view class="card-content">
              <text class="card-title">第二届黄河流域公安院校网络攻防比赛</text>
              
              <view class="info-row">
                <view class="info-item">
                  <uni-icons type="info" size="14" color="#666" />
                  <text>山西警察学院</text>
                </view>
                <view class="info-item">
                  <uni-icons type="settings" size="14" color="#666" />
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
              <button type="primary" @tap="showComingSoon" class="action-button" size="mini">
                敬请期待
              </button>
            </view>
          </view>
        </view>
      </view>

      <!-- Section: Computer Competitions -->
      <view class="section">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="bars" size="20" color="#409EFF" />
            <text>通用计算机竞赛</text>
          </view>
          <view class="section-more" @tap="showMore">
            <text>查看全部</text>
            <uni-icons type="right" size="14" color="#666" />
          </view>
        </view>

        <scroll-view class="competition-scroll" scroll-x>
          <view class="scroll-card" @tap="visitWebsite('http://jsjds.blcu.edu.cn/')">
            <image class="scroll-image" src="/static/img/computer_design.jpg" mode="aspectFill"></image>
            <view class="scroll-content">
              <text class="scroll-title">中国大学生计算机设计大赛</text>
              <text class="scroll-desc">面向公安专业的数据可视化与智能系统赛道</text>
            </view>
          </view>

          <view class="scroll-card" @tap="visitWebsite('https://developer.huaweicloud.com/codecraft2025')">
            <image class="scroll-image" src="/static/img/huawei_challenge.jpg" mode="aspectFill"></image>
            <view class="scroll-content">
              <text class="scroll-title">华为软件精英挑战赛</text>
              <text class="scroll-desc">优胜者可获华为校招绿卡</text>
            </view>
          </view>

          <view class="scroll-card" @tap="visitWebsite('https://icpc.global/')">
            <image class="scroll-image" src="/static/img/acm_icpc.jpg" mode="aspectFill"></image>
            <view class="scroll-content">
              <text class="scroll-title">ACM-ICPC程序设计</text>
              <text class="scroll-desc">全球顶级算法竞赛</text>
            </view>
          </view>

          <view class="scroll-card" @tap="visitWebsite('https://dasai.lanqiao.cn/')">
            <image class="scroll-image" src="/static/img/lanqiao.jpg" mode="aspectFill"></image>
            <view class="scroll-content">
              <text class="scroll-title">蓝桥杯大赛</text>
              <text class="scroll-desc">适合初学者的算法竞赛</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- Popular Competitions List -->
      <view class="section">
        <view class="section-header">
          <view class="section-title">
            <uni-icons type="chart" size="20" color="#409EFF" />
            <text>流行数据科学竞赛</text>
          </view>
        </view>

        <view class="list-card">
          <view class="list-item" @tap="visitWebsite('https://www.kaggle.com/competitions')">
            <image class="list-image" src="/static/img/kaggle.jpg" mode="aspectFill"></image>
            <view class="list-content">
              <text class="list-title">Kaggle数据科学竞赛</text>
              <text class="list-desc">全球最大数据挖掘平台，提供企业级数据集，适合学习机器学习、数据分析。</text>
            </view>
            <uni-icons type="right" size="16" color="#ccc" />
          </view>
          
          <view class="list-item" @tap="visitWebsite('https://tianchi.aliyun.com/')">
            <image class="list-image" src="/static/img/tianchi.jpg" mode="aspectFill"></image>
            <view class="list-content">
              <text class="list-title">阿里天池大赛</text>
              <text class="list-desc">阿里巴巴主办的多元竞赛（算法、网络安全、可视化），奖金丰厚，部分赛题涉及公共安全数据。</text>
            </view>
            <uni-icons type="right" size="16" color="#ccc" />
          </view>
          
          <view class="list-item" @tap="visitWebsite('https://leetcode.cn/contest/')">
            <image class="list-image" src="/static/img/leetcode.jpg" mode="aspectFill"></image>
            <view class="list-content">
              <text class="list-title">LeetCode周赛/双周赛</text>
              <text class="list-desc">个人算法实战平台，题目贴合大厂面试，适合日常刷题备赛。</text>
            </view>
            <uni-icons type="right" size="16" color="#ccc" />
          </view>
        </view>
      </view>

      <!-- Footer note -->
      <view class="reference-section">
        <view class="reference-list">
          <text class="reference-title">数据来源与参考</text>
          <text class="reference-item">[1] 南京警察学院第四届"警信杯"竞赛通知</text>
          <text class="reference-item">[2] 中国大学生计算机设计大赛官方指南</text>
          <text class="reference-item">[3] 华为软件精英挑战赛2025赛季规则</text>
          <text class="reference-item">[4] 第二届黄河流域公安院校网络攻防比赛指引</text>
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
    goBack() {
      uni.navigateBack()
    },
    visitWebsite(url) {
      // 在小程序中，需要配置业务域名才能打开外部链接
      uni.showModal({
        title: '提示',
        content: '是否打开外部链接：' + url,
        success: function (res) {
          if (res.confirm) {
            // 如果是H5端，直接打开
            // #ifdef H5
            window.open(url, '_blank')
            // #endif
            
            // 如果是小程序，使用复制链接的方式
            // #ifdef MP
            uni.setClipboardData({
              data: url,
              success: function () {
                uni.showToast({
                  title: '链接已复制',
                  icon: 'success'
                })
              }
            })
            // #endif
          }
        }
      })
    },
    showComingSoon() {
      uni.showToast({
        title: '详细信息即将发布，请稍后查看！',
        icon: 'none'
      })
    },
    showMore() {
      uni.showToast({
        title: '更多竞赛信息即将上线',
        icon: 'none'
      })
    },
    calculateDaysLeft(endDateStr) {
      const endDate = new Date(endDateStr)
      const today = new Date()
      const timeDiff = endDate.getTime() - today.getTime()
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return daysLeft > 0 ? daysLeft : 0
    }
  }
}
</script>

<style>
.competition-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.hero-section {
  position: relative;
  height: 300rpx;
  background-color: #409EFF;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.8) 0%, rgba(100, 181, 246, 0.8) 100%);
}

.hero-content {
  position: relative;
  padding: 40rpx;
  color: white;
  z-index: 1;
}

.back-button {
  margin-bottom: 20rpx;
}

.hero-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.hero-subtitle {
  display: block;
  font-size: 28rpx;
  opacity: 0.9;
}

.main-content {
  margin-top: -60rpx;
  padding: 0 30rpx;
  position: relative;
}

.featured-competition {
  position: relative;
  margin-bottom: 40rpx;
}

.badge {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  background: #ff4d4f;
  color: white;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  z-index: 2;
}

.featured-card {
  position: relative;
  border-radius: 20rpx;
  overflow: hidden;
  height: 360rpx;
}

.featured-image {
  width: 100%;
  height: 100%;
}

.featured-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
}

.featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  color: white;
}

.featured-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.featured-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.countdown-chip {
  display: flex;
  align-items: center;
  gap: 10rpx;
  background: rgba(255,255,255,0.2);
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}

.featured-btn {
  margin: 0;
  padding: 0 30rpx;
}

.section {
  margin-bottom: 40rpx;
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
  font-size: 32rpx;
  font-weight: bold;
}

.section-more {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 26rpx;
  color: #666;
}

.competition-cards {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.competition-card {
  background: white;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.1);
}

.card-image-container {
  position: relative;
  height: 300rpx;
}

.card-image {
  width: 100%;
  height: 100%;
}

.status-tag {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  background: #52c41a;
  color: white;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.status-coming {
  background: #faad14;
}

.card-content {
  padding: 20rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.info-row {
  display: flex;
  gap: 40rpx;
  margin-bottom: 20rpx;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 24rpx;
  color: #666;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 20rpx;
}

.tag {
  background: #f0f5ff;
  color: #409EFF;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}

.card-description {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.card-footer {
  padding: 20rpx;
  border-top: 2rpx solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.action-button {
  margin: 0;
}

.competition-scroll {
  white-space: nowrap;
  padding: 10rpx 0;
}

.scroll-card {
  display: inline-block;
  width: 300rpx;
  margin-right: 20rpx;
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.1);
}

.scroll-image {
  width: 100%;
  height: 160rpx;
}

.scroll-content {
  padding: 16rpx;
}

.scroll-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.scroll-desc {
  font-size: 24rpx;
  color: #666;
}

.list-card {
  background: white;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.1);
}

.list-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.list-item:last-child {
  border-bottom: none;
}

.list-image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.list-content {
  flex: 1;
}

.list-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.list-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
}

.reference-section {
  padding: 40rpx 0;
}

.reference-list {
  background: white;
  border-radius: 20rpx;
  padding: 20rpx;
}

.reference-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.reference-item {
  font-size: 24rpx;
  color: #666;
  line-height: 2;
}
</style> 