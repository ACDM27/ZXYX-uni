<template>
  <view class="paper-form">
    <view class="form-header">
      <text class="title">学术论文信息</text>
      <button @click="addPaper">添加论文</button>
    </view>
    <view v-if="items.length === 0" class="empty-state">
      <text>暂无论文信息，点击上方按钮添加</text>
    </view>
    <view v-else class="paper-list">
      <view v-for="(paper, index) in items" :key="index" class="paper-item">
        <view class="card-header">
          <text>论文 #{{ index + 1 }}</text>
          <button @click="removePaper(index)">删除</button>
        </view>
        <view class="form-group">
          <text>论文题目</text>
          <input v-model="paper.title" placeholder="请输入论文题目" />
        </view>
        <view class="form-group">
          <text>发表期刊/会议名称</text>
          <input v-model="paper.journal" placeholder="请输入发表期刊或会议名称" />
        </view>
        <view class="form-group">
          <text>论文类型</text>
          <picker :range="paperTypes" v-model="paper.type">
            <view>{{ paperTypes[paper.type] || '请选择论文类型' }}</view>
          </picker>
        </view>
        <view class="form-group">
          <text>发表时间</text>
          <input v-model="paper.publishDate" placeholder="选择发表日期" />
        </view>
        <view class="form-group">
          <text>作者排序</text>
          <input v-model="paper.authorOrder" type="number" placeholder="请输入作者排序" />
        </view>
        <view class="form-group">
          <text>收录情况</text>
          <input v-model="paper.indexInfo" placeholder="请输入论文收录信息" />
        </view>
        <view class="form-group">
          <text>论文摘要</text>
          <textarea v-model="paper.abstract" placeholder="请输入论文摘要" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      paperTypes: ['SCI论文', 'EI论文', '核心期刊', '一般期刊', '国际会议', '国内会议']
    }
  },
  methods: {
    addPaper() {
      this.items.push({
        title: '',
        journal: '',
        type: '',
        publishDate: '',
        authorOrder: 1,
        indexInfo: '',
        abstract: ''
      })
    },
    removePaper(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.paper-form {
  padding: 20rpx;
}
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}
.paper-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.paper-item {
  margin-bottom: 20rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  padding: 16rpx;
  background: #fff;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}
.form-group {
  margin-bottom: 10rpx;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
}
.empty-state {
  margin: 40rpx 0;
  color: #999;
  text-align: center;
}
</style> 