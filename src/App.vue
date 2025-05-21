<script setup>
import { getToken } from '@/utils/storage'
import { useUserStore } from '@/store/user'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import CustomTabBar from './components/tabbar/custom-tab-bar.vue'

// 获取user store
const userStore = useUserStore()

// 检查用户登录状态
const checkLogin = async () => {
  // 获取token，判断用户是否已登录
  const token = getToken()
  
  // 如果有token，尝试获取用户信息
  if (token) {
    try {
      // 恢复缓存的用户状态
      userStore.restoreFromStorage()
      
      // 如果没有用户信息，则重新获取
      if (!userStore.userInfo) {
        await Promise.all([
          userStore.fetchUserInfo(),
          userStore.fetchMenu()
        ])
      }
      
      console.log('用户已登录')
    } catch (err) {
      console.error('获取用户信息失败:', err)
      // 获取失败时跳转到登录页面
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
  } else {
    console.log('用户未登录')
    // 判断当前页面是否为登录页
    const pages = getCurrentPages()
    const currentPage = pages.length > 0 ? pages[pages.length - 1] : null
    
    // 如果当前不在登录页，则跳转到登录页
    if (currentPage && !currentPage.route?.includes('pages/login/login')) {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
  }
}

// 应用启动时
onLaunch(() => {
  console.log('App Launch')
  // 检查用户是否登录
  checkLogin()
})

// 应用显示时
onShow(() => {
  console.log('App Show')
})

// 应用隐藏时
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
/*每个页面公共css */
</style>
