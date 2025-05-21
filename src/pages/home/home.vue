<template>
    <view class="home">
        <!-- 顶部区域 -->
        <view class="header-area">
            <!-- 标题 -->
            <view class="honor-title-container">
                <view class="title-decoration left"></view>
                <text class="honor-title">学生成果收集</text>
                <view class="title-decoration right"></view>
            </view>
            
            <!-- 搜索框区域 -->
            <view class="search-container">
                <uni-search-bar
                    v-model="searchText"
                    placeholder="请输入你想搜索的内容"
                    @confirm="search"
                    @clear="clear"
                />
            </view>
        </view>

        <!-- 蓝色背景块 -->
        <view class="blue-block"></view>

        <!-- 主要内容区域 -->
        <view class="main-content">
            <!-- 功能区域 -->
            <view class="features-container">
                <view class="features-grid">
                    <view class="feature-item" v-for="(feature, index) in features" :key="index" @tap="navigateTo(feature.path)">
                        <view class="feature-content">
                            <view class="feature-icon">
                                <uni-icons :type="feature.icon" size="20" />
                            </view>
                            <text class="feature-title">{{ feature.title }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 标签页导航 -->
        <view class="tabs-container">
            <scroll-view class="tabs-list" scroll-x>
                <view
                    v-for="tab in tabs" 
                    :key="tab.key"
                    class="tab-item"
                    :class="{ active: currentTab === tab.key }"
                    @tap="switchTab(tab.key)"
                >
                    {{ tab.title }}
                </view>
            </scroll-view>
        </view>

        <!-- 内容展示区域 -->
        <view class="content-cards">
            <!-- 热门推荐区域 -->
            <view class="card-section" v-if="currentTab === 'hot' || currentTab === 'all'" @tap="toggleSection('hot')">
                <view class="section-header">
                    <text :class="{ 'active-section': activeSection === 'hot' }">热门推荐</text>
                </view>
                <view class="hot-content">
                    <scroll-view class="hot-scroll" scroll-x @scroll="handleScroll">
                        <view v-for="(item, index) in hotItems" :key="index" class="hot-item">
                            <text class="hot-title">{{ item.title }}</text>
                            <image class="hot-image" :src="item.image" mode="aspectFill"></image>
                            <button class="hot-detail-btn" size="mini" @tap="navigateTo(item.path)">查看详情</button>
                        </view>
                    </scroll-view>
                </view>
            </view>

            <!-- 荣誉展示区域 -->
            <view class="card-section" v-if="currentTab === 'honor' || currentTab === 'all'">
                <view class="section-header">
                    <text>荣誉展示</text>
                </view>
                <view class="app-grid">
                    <view 
                        v-for="(app, index) in appItems.honor"
                        :key="index"
                        class="app-item"
                        @tap="openApp(app)"
                    >
                        <view class="app-icon" :style="{ backgroundColor: app.bgColor }">
                            <uni-icons :type="app.icon" size="24" color="#fff" />
                        </view>
                        <text class="app-name">{{ app.name }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            searchText: '',
            currentTab: 'all',
            activeSection: '',
            tabs: [
                { title: '全部', key: 'all' },
                { title: '热门推荐', key: 'hot' },
                { title: '荣誉展示', key: 'honor' }
            ],
            features: [
                { title: '个人中心', icon: 'person', path: '/pages/profile/profile' },
                { title: '荣誉奖项', icon: 'medal', path: '/pages/honor/honor' }
            ],
            hotItems: [
                { 
                    title: '荣誉奖项', 
                    image: '/static/img/cover/honor.jpg',
                    path: '/pages/honor/honor'
                }
            ],
            appItems: {
                honor: [
                    { name: '荣誉奖项', icon: 'medal', bgColor: '#FFD700', path: '/pages/honor/honor' }
                ]
            }
        }
    },
    methods: {
        search() {
            console.log('搜索:', this.searchText)
        },
        clear() {
            this.searchText = ''
        },
        toggleSection(section) {
            this.activeSection = this.activeSection === section ? '' : section
        },
        switchTab(tab) {
            this.currentTab = tab
        },
        navigateTo(path) {
            uni.navigateTo({
                url: path
            })
        },
        openApp(app) {
            if (app.path) {
                uni.navigateTo({
                    url: app.path
                })
            }
        },
        handleScroll(e) {
            // 处理滚动事件
            console.log('scroll', e)
        }
    }
}
</script>

<style>
.home {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.header-area {
    background-color: #fff;
    padding: 20rpx;
    position: relative;
    z-index: 1;
}

.honor-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
}

.honor-title {
    font-size: 36rpx;
    font-weight: bold;
    margin: 0 20rpx;
}

.title-decoration {
    width: 60rpx;
    height: 2rpx;
    background-color: #000;
}

.search-container {
    margin: 20rpx 0;
}

.blue-block {
    height: 200rpx;
    background-color: #409EFF;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
}

.main-content {
    position: relative;
    z-index: 1;
    padding: 20rpx;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
    padding: 20rpx;
}

.feature-item {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 30rpx;
    box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.1);
}

.feature-content {
    display: flex;
    align-items: center;
}

.feature-icon {
    margin-right: 20rpx;
}

.feature-title {
    font-size: 28rpx;
}

.tabs-container {
    background-color: #fff;
    margin-top: 20rpx;
}

.tabs-list {
    white-space: nowrap;
    padding: 20rpx;
}

.tab-item {
    display: inline-block;
    padding: 10rpx 30rpx;
    font-size: 28rpx;
    color: #666;
}

.tab-item.active {
    color: #409EFF;
    position: relative;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40rpx;
    height: 4rpx;
    background-color: #409EFF;
}

.content-cards {
    padding: 20rpx;
}

.card-section {
    background-color: #fff;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
}

.section-header {
    margin-bottom: 20rpx;
}

.section-header text {
    font-size: 32rpx;
    font-weight: bold;
}

.hot-content {
    overflow: hidden;
}

.hot-scroll {
    white-space: nowrap;
}

.hot-item {
    display: inline-block;
    width: 300rpx;
    margin-right: 20rpx;
    vertical-align: top;
}

.hot-title {
    font-size: 28rpx;
    margin-bottom: 10rpx;
}

.hot-image {
    width: 100%;
    height: 200rpx;
    border-radius: 10rpx;
    margin-bottom: 10rpx;
}

.hot-detail-btn {
    font-size: 24rpx;
}

.app-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20rpx;
}

.app-item {
    text-align: center;
}

.app-icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10rpx;
}

.app-name {
    font-size: 24rpx;
    color: #666;
}
</style> 