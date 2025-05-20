<template>
  <view class="aiqa-page">
    <!-- Header Section -->
    <view class="qa-header">
      <view class="header-overlay"></view>
      <view class="header-content">
        <view class="back-button" @tap="goBack">
          <uni-icons type="back" size="20" color="#fff" />
        </view>
        <text class="header-title">智能问答</text>
        <text class="header-subtitle">专业知识快速解答，人工智能为您提供精准信息</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="main-content">
      <!-- Chat Interface -->
      <view class="chat-container card">
        <scroll-view 
          class="chat-messages" 
          scroll-y 
          :scroll-top="scrollTop"
          @scroll="handleScroll"
          :scroll-with-animation="true"
        >
          <!-- Welcome Message - only shown if API is working -->
          <view class="message system" v-if="!apiConnectionFailed && messages.length === 0">
            <view class="message-content">
              <text>欢迎使用智能问答助手，请问有什么可以帮您解答的问题？</text>
            </view>
          </view>

          <!-- API Error Message -->
          <view class="message warning" v-if="apiConnectionFailed">
            <view class="message-avatar">
              <image src="/static/images/service.png" class="avatar error-avatar" />
            </view>
            <view class="message-content">
              <text>注意: AI服务连接测试失败。您的问题可能无法得到回答。请联系系统管理员检查API配置。</text>
            </view>
          </view>

          <!-- Messages List -->
          <view v-for="(message, index) in messages" 
                :key="index" 
                :class="['message', message.role]">
            <view class="message-avatar">
              <image 
                :src="message.role === 'user' ? '/static/images/user.png' : '/static/images/ai.png'"
                class="avatar"
                :class="message.role === 'user' ? 'user-avatar' : 'ai-avatar'"
              />
            </view>
            <view class="message-content">
              <view v-if="message.role === 'assistant' && message.loading" class="loading-dots">
                <view class="dot"></view>
                <view class="dot"></view>
                <view class="dot"></view>
              </view>
              <rich-text v-else :nodes="formatMessage(message.content)"></rich-text>
            </view>
          </view>

          <!-- Initial Suggested Questions -->
          <view class="suggested-questions-container" v-if="messages.length === 0">
            <view class="suggested-questions">
              <view v-for="(question, index) in suggestedQuestions" 
                   :key="index" 
                   class="suggested-question"
                   @tap="askSuggestedQuestion(question)">
                <text>{{ question }}</text>
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- Input Area -->
        <view class="chat-input">
          <textarea
            v-model="userInput"
            class="input-textarea"
            placeholder="请输入您的问题..."
            :disabled="isLoading"
            @confirm="sendMessage"
            :cursor-spacing="20"
            :show-confirm-bar="false"
            :adjust-position="false"
          />
          <button 
            class="send-button" 
            :disabled="!userInput.trim() || isLoading" 
            @tap="sendMessage"
            :loading="isLoading"
          >
            {{ isLoading ? '请稍候...' : '发送' }}
          </button>
        </view>
      </view>

      <!-- Tips Section -->
      <view class="tips-section card">
        <view class="tips-header">
          <uni-icons type="info" size="20" color="#409EFF" />
          <text class="tips-title">使用技巧</text>
        </view>
        <view class="tips-list">
          <text class="tip-item">• 使用简洁明了的语言描述您的问题</text>
          <text class="tip-item">• 提供必要的背景信息以获得更精准的回答</text>
          <text class="tip-item">• 您可以随时点击顶部建议问题进行咨询</text>
          <text class="tip-item">• 特定专业问题会由相关学科专家AI模型解答</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
      messages: [],
      isLoading: false,
      apiConnectionFailed: false,
      scrollTop: 0,
      fallbackMode: true,
      suggestedQuestions: [
        '警校学生应该如何提高英语口语能力？',
        '大数据和刑侦的结合应用案例有哪些？',
        '法医学基础知识最重要的内容是什么？',
        '如何平衡专业课学习与证书考试的时间？'
      ],
      mockResponses: {
        '如何平衡专业课学习与证书考试的时间？': '平衡专业课学习与证书考试需要合理规划时间：\n\n1. 制定详细的学习计划，将专业课和证书备考时间分配清楚\n2. 优先处理紧急任务，识别哪些课程和内容更重要\n3. 利用零散时间学习，如通勤途中复习证书考点\n4. 寻找专业课与证书考试的知识重叠点，一次学习服务两个目标\n5. 使用番茄工作法等时间管理技巧提高学习效率\n6. 保持充足的休息，避免过度疲劳影响学习效果',
        '警校学生应该如何提高英语口语能力？': '警校学生提高英语口语的有效方法：\n\n1. 参加校内外英语角活动，寻找练习口语的机会\n2. 使用语言交换APP找外国朋友，如HelloTalk、Tandem等\n3. 观看英语警察题材影视剧，模仿对话和专业术语发音\n4. 大声朗读警务英语教材，培养语感\n5. 记录并练习警务英语常用词汇和场景对话\n6. 利用通勤时间听英语播客或警务英语教程\n7. 参加模拟国际警务合作的角色扮演活动\n8. 不怕出错，敢于开口是关键',
        '大数据和刑侦的结合应用案例有哪些？': '大数据在刑侦领域的应用案例：\n\n1. 犯罪热点分析：利用历史犯罪数据预测高风险区域，合理部署警力\n2. 关联分析：通过数据挖掘发现嫌疑人之间的潜在联系和作案模式\n3. 社交网络分析：识别犯罪团伙的核心成员和组织结构\n4. 人脸识别：结合监控视频大数据快速锁定嫌疑人\n5. 预测性警务：分析历史数据预测可能发生的犯罪类型和地点\n6. DNA大数据库比对：加速案件侦破\n7. 电信诈骗分析：识别异常通信模式和诈骗网络\n8. 舆情分析：监测与犯罪相关的网络信息，发现线索',
        '法医学基础知识最重要的内容是什么？': '法医学基础知识核心内容：\n\n1. 死亡时间推断：尸僵、尸斑、尸温下降等死后变化规律的掌握\n2. 损伤识别：钝器伤、锐器伤、枪弹伤等各类创伤的特征识别\n3. 法医病理学：各种死因的病理表现和识别方法\n4. 法医毒理学：常见毒物的检验方法和中毒表现\n5. 法医物证学：DNA分析、指纹、血迹等物证的提取和检验\n6. 法医精神病学：精神状态评估的基本方法\n7. 现场勘验技术：证据保全和采集的正确方法\n8. 法医鉴定规范：鉴定文书的格式和撰写要点'
      }
    }
  },
  methods: {
    formatMessage(content) {
      if (!content) return '';
      
      // Convert URLs to clickable links
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const withLinks = content.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
      
      // Convert line breaks to <br> tags
      return withLinks.replace(/\n/g, '<br>');
    },
    goBack() {
      uni.navigateBack();
    },
    askSuggestedQuestion(question) {
      this.userInput = question;
      this.sendMessage();
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return;
      
      // Add user message to chat
      const userMessage = this.userInput.trim();
      this.messages.push({
        role: 'user',
        content: userMessage
      });
      
      // Clear input and add loading message
      this.userInput = '';
      this.isLoading = true;
      
      // Add temporary loading message for the AI
      this.messages.push({
        role: 'assistant',
        content: '',
        loading: true
      });
      
      // Scroll to bottom
      await this.scrollToBottom();
      
      // Use mock response
      await this.simulateFallbackResponse(userMessage);
    },
    async simulateFallbackResponse(userMessage) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove loading message
      this.messages.pop();
      
      // Find exact match in mock responses
      let response = this.mockResponses[userMessage];
      
      // If no exact match, provide a default response
      if (!response) {
        response = '抱歉，我目前无法回答这个具体问题。请尝试问一些与警务、法律、刑侦相关的基础问题，或者点击上方的推荐问题。';
      }
      
      // Add the response
      this.messages.push({
        role: 'assistant',
        content: response
      });
      
      this.isLoading = false;
      await this.scrollToBottom();
    },
    async scrollToBottom() {
      await new Promise(resolve => setTimeout(resolve, 100));
      const query = uni.createSelectorQuery().in(this);
      query.select('.chat-messages').boundingClientRect(data => {
        if (data) {
          this.scrollTop = data.height;
        }
      }).exec();
    },
    handleScroll(e) {
      // Handle scroll events if needed
    }
  }
}
</script>

<style>
.aiqa-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.qa-header {
  position: relative;
  height: 300rpx;
  background-color: #409EFF;
  overflow: hidden;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.8) 0%, rgba(100, 181, 246, 0.8) 100%);
}

.header-content {
  position: relative;
  padding: 40rpx;
  color: white;
  z-index: 1;
}

.back-button {
  margin-bottom: 20rpx;
}

.header-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.header-subtitle {
  display: block;
  font-size: 28rpx;
  opacity: 0.9;
}

.main-content {
  margin-top: -60rpx;
  padding: 0 30rpx;
  position: relative;
}

.card {
  background: white;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 30rpx;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 400rpx);
}

.chat-messages {
  flex: 1;
  padding: 30rpx;
  overflow-y: scroll;
}

.message {
  display: flex;
  margin-bottom: 30rpx;
}

.message-avatar {
  margin-right: 20rpx;
}

.avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 36rpx;
}

.message-content {
  flex: 1;
  background: #f5f5f5;
  padding: 20rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  line-height: 1.5;
}

.user .message-content {
  background: #e3f2fd;
}

.loading-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  background: #409EFF;
  border-radius: 50%;
  margin: 0 6rpx;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}

.suggested-questions-container {
  margin: 30rpx 0;
}

.suggested-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.suggested-question {
  background: #e3f2fd;
  padding: 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  color: #409EFF;
}

.chat-input {
  padding: 20rpx;
  border-top: 2rpx solid #eee;
  display: flex;
  align-items: flex-end;
  gap: 20rpx;
}

.input-textarea {
  flex: 1;
  height: 80rpx;
  padding: 20rpx;
  font-size: 28rpx;
  border: 2rpx solid #eee;
  border-radius: 12rpx;
}

.send-button {
  width: 160rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  background: #409EFF;
  color: white;
  border-radius: 12rpx;
  padding: 0;
}

.send-button[disabled] {
  background: #a0cfff;
}

.tips-section {
  padding: 30rpx;
}

.tips-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.tips-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-left: 10rpx;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.tip-item {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}
</style> 