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
                <view class="search-box" @tap="openSearchDrawer">
                    <uni-icons type="search" size="16" color="#999"></uni-icons>
                    <text class="search-placeholder">请输入你想搜索的内容</text>
                    <uni-icons type="scan" size="20" color="#999"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 搜索抽屉 -->
        <view class="search-drawer" :class="{ 'drawer-show': isSearchDrawerOpen }" @tap.stop="closeSearchDrawer">
            <view class="drawer-mask"></view>
            <view class="drawer-content">
                <view class="drawer-header">
                    <view class="search-input-box">
                        <uni-icons type="search" size="16" color="#999"></uni-icons>
                        <input 
                            type="text" 
                    v-model="searchText"
                    placeholder="请输入你想搜索的内容"
                            placeholder-class="placeholder"
                            focus
                            @input="onSearchInput"
                        />
                        <uni-icons 
                            v-if="searchText" 
                            type="clear" 
                            size="16" 
                            color="#999" 
                            @tap="clear"
                        ></uni-icons>
                    </view>
                    <text class="cancel-btn" @tap="closeSearchDrawer">取消</text>
                </view>

                <!-- 搜索结果区域 -->
                <scroll-view class="search-results" scroll-y>
                    <view v-if="searchText" class="result-list">
                        <view 
                            v-for="(item, index) in searchResults" 
                            :key="index" 
                            class="result-item"
                            @tap="handleResultClick(item)"
                        >
                            <uni-icons type="search" size="16" color="#999"></uni-icons>
                            <text class="result-text">{{ item.title }}</text>
                        </view>
                    </view>
                    <view v-else class="history-section">
                        <view class="history-header">
                            <text>搜索历史</text>
                            <uni-icons type="trash" size="16" color="#999" @tap="clearHistory"></uni-icons>
                        </view>
                        <view class="history-list">
                            <view 
                                v-for="(item, index) in searchHistory" 
                                :key="index"
                                class="history-item"
                                @tap="useHistoryItem(item)"
                            >
                                <text>{{ item }}</text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
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
            isSearchDrawerOpen: false,
            searchText: '',
            currentTab: 'all',
            activeSection: '',
            tabs: [
                { title: '全部', key: 'all' },
                { title: '热门推荐', key: 'hot' },
                { title: '荣誉展示', key: 'honor' }
            ],
            features: [
                { title: '成果填报', icon: 'person', path: '/pages/channel-form/channel-form' },
                { title: '竞赛信息', icon: 'medal', path: '/pages/messages/messages' }
            ],
            hotItems: [
                { 
                    title: '智能问答', 
                    image: '/static/img/cover/honor.jpg',
                    path: '/pages/honor/honor'
                }
            ],
            appItems: {
                honor: [
                    { name: '荣誉奖项', icon: 'medal', bgColor: '#FFD700', path: '/pages/honor/honor' }
                ]
            },
            searchHistory: [],
            searchResults: []
        }
    },
    methods: {
        openSearchDrawer(e) {
            e.stopPropagation()
            this.isSearchDrawerOpen = true
        },
        closeSearchDrawer() {
            if (this.isSearchDrawerOpen) {
                this.isSearchDrawerOpen = false
                this.searchText = ''
                this.searchResults = []
            }
        },
        onSearchInput() {
            // 模拟搜索结果
            if (this.searchText) {
                this.searchResults = [
                    { title: this.searchText + ' - 搜索结果1' },
                    { title: this.searchText + ' - 搜索结果2' },
                    { title: this.searchText + ' - 搜索结果3' }
                ]
            } else {
                this.searchResults = []
            }
        },
        handleResultClick(item) {
            // 处理搜索结果点击
            console.log('选中:', item.title)
            if (this.searchText && !this.searchHistory.includes(this.searchText)) {
                this.searchHistory.unshift(this.searchText)
                // 限制历史记录数量
                if (this.searchHistory.length > 10) {
                    this.searchHistory.pop()
                }
            }
            this.closeSearchDrawer()
        },
        clearHistory() {
            this.searchHistory = []
        },
        useHistoryItem(item) {
            this.searchText = item
            this.onSearchInput()
        },
        clear() {
            this.searchText = ''
            this.searchResults = []
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
    background: linear-gradient(180deg, #4169E1 0%, #1E90FF 100%);
    padding: 60rpx 20rpx 30rpx;
    position: relative;
    z-index: 1;
    box-shadow: 0 4rpx 12rpx rgba(64, 158, 255, 0.1);
}

.honor-title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40rpx 0;
}

.honor-title {
    font-size: 44rpx;
    font-weight: bold;
    margin: 0 30rpx;
    color: #FFFFFF;
    letter-spacing: 2rpx;
}

.title-decoration {
    width: 80rpx;
    height: 3rpx;
    background-color: #FFFFFF;
    opacity: 0.8;
}

.search-container {
    margin: 30rpx 0;
    padding: 0 30rpx;
}

.search-box {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 35rpx;
    padding: 15rpx 25rpx;
    margin-right: 10rpx;
    height: 80rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    width: 600rpx;
}

.search-placeholder {
    flex: 1;
    margin: 0 20rpx;
    font-size: 28rpx;
    color: #999;
}

.search-drawer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    visibility: hidden;
}

.drawer-show {
    visibility: visible;
}

.drawer-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s;
}

.drawer-show .drawer-mask {
    opacity: 1;
}

.drawer-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transform: translateY(-100%);
    transition: all 0.3s ease-out;
    min-height: 40vh;
    max-height: 60vh;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.drawer-show .drawer-content {
    transform: translateY(0);
}

.drawer-show .drawer-mask {
    opacity: 1;
}

.drawer-header {
    padding: 30rpx;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid rgba(238, 238, 238, 0.6);
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.search-input-box {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: rgba(245, 245, 245, 0.8);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 35rpx;
    padding: 15rpx 25rpx;
    margin-right: 30rpx;
    height: 80rpx;
}

.search-input-box .uni-icons {
    font-size: 36rpx;
}

.search-input-box input {
    flex: 1;
    margin: 0 25rpx;
    font-size: 32rpx;
    height: 80rpx;
    line-height: 80rpx;
}

.cancel-btn {
    font-size: 32rpx;
    color: #409EFF;
    padding: 20rpx;
}

.placeholder {
    font-size: 32rpx;
    color: #999;
}

.search-results {
    height: calc(60vh - 120rpx);
    overflow-y: auto;
}

.result-list {
    padding: 20rpx 30rpx;
}

.result-item {
    display: flex;
    align-items: center;
    padding: 25rpx 20rpx;
    border-bottom: 1rpx solid rgba(238, 238, 238, 0.6);
    background-color: rgba(255, 255, 255, 0.6);
}

.result-text {
    margin-left: 20rpx;
    font-size: 28rpx;
    color: #333;
}

.history-section {
    padding: 20rpx 30rpx;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
}

.history-header text {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
}

.history-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    padding-bottom: 30rpx;
}

.history-item {
    background-color: rgba(245, 245, 245, 0.8);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 10rpx 20rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
    color: #666;
}

.blue-block {
    height: 260rpx;
    background: linear-gradient(180deg, #4169E1 0%, #1E90FF 100%);
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

.features-container {
    position: relative;
    z-index: 1;
    margin-top: -40rpx;
    padding: 0;
}

.features-grid {
    background-color: #fff;
    border-radius: 30rpx;
    margin: 0 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
}

.feature-item {
    background-color: #f8f9fd;
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.feature-item:active {
    transform: scale(0.98);
}

.feature-content {
    display: flex;
    align-items: center;
    width: 100%;
}

.feature-icon {
    width: 80rpx;
    height: 80rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
}

.feature-title {
    font-size: 32rpx;
    color: #333;
    flex: 1;
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