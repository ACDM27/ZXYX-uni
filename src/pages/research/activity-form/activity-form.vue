<template>
  <view class="activity-form">
    <view class="form-header">
      <text class="title">学术活动信息</text>
      <button @click="addActivity">添加活动</button>
    </view>
    <view v-if="items.length === 0" class="empty-state">
      <text>暂无活动信息，点击上方按钮添加</text>
    </view>
    <view v-else class="activity-list">
      <view v-for="(activity, index) in items" :key="index" class="activity-item">
        <view class="card-header">
          <text>活动 #{{ index + 1 }}</text>
          <button @click="removeActivity(index)">删除</button>
        </view>
        <view class="form-group">
          <text>活动名称</text>
          <input v-model="activity.name" placeholder="请输入活动名称" />
        </view>
        <view class="form-group">
          <text>活动类型</text>
          <picker :range="activityTypes" v-model="activity.type">
            <view>{{ activityTypes[activity.type] || '请选择活动类型' }}</view>
          </picker>
        </view>
        <view class="form-group">
          <text>活动时间</text>
          <input v-model="activity.timeRange" placeholder="请输入活动时间" />
        </view>
        <view class="form-group">
          <text>活动地点</text>
          <input v-model="activity.location" placeholder="请输入活动地点" />
        </view>
        <view class="form-group">
          <text>参与角色</text>
          <picker :range="activityRoles" v-model="activity.role">
            <view>{{ activityRoles[activity.role] || '请选择参与角色' }}</view>
          </picker>
        </view>
        <view class="form-group">
          <text>活动描述</text>
          <textarea v-model="activity.description" placeholder="请描述活动内容和您的参与情况" />
        </view>
        <view class="form-group">
          <text>成果与收获</text>
          <textarea v-model="activity.achievements" placeholder="请描述参与活动的主要成果与收获" />
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
      activityTypes: ['学术会议', '学术讲座', '学术研讨会', '工作坊', '其他'],
      activityRoles: ['主办方', '特邀报告人', '参会代表', '志愿者']
    }
  },
  methods: {
    addActivity() {
      this.items.push({
        name: '',
        type: '',
        timeRange: '',
        location: '',
        role: '',
        description: '',
        achievements: ''
      })
    },
    removeActivity(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.activity-form {
  padding: 20rpx;
}
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.activity-item {
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