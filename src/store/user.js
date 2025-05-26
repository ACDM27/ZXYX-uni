import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: uni.getStorageSync('userId') || '',
    role: uni.getStorageSync('userRole') || '',
    userInfo: uni.getStorageSync('userInfo') || null,
    token: uni.getStorageSync('access_token') || ''
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    isStudent: (state) => state.role === 'student',
    isTeacher: (state) => state.role === 'teacher',
    isAdmin: (state) => state.role === 'admin'
  },
  
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.userId = userInfo.id
      this.role = userInfo.role
      // 持久化存储
      uni.setStorageSync('userInfo', userInfo)
      uni.setStorageSync('userId', userInfo.id)
      uni.setStorageSync('userRole', userInfo.role)
    },
    
    // 设置token
    setToken(token) {
      this.token = token
      uni.setStorageSync('access_token', token)
    },
    
    // 清除用户信息
    clearUserInfo() {
      this.userInfo = null
      this.userId = ''
      this.role = ''
      this.token = ''
      // 清除存储
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('userId')
      uni.removeStorageSync('userRole')
      uni.removeStorageSync('access_token')
    },
    
    // 获取用户信息
    async fetchUserInfo() {
      try {
        const response = await uni.request({
          url: '/api/user/info',
          method: 'GET',
          header: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        
        if (response.statusCode === 200) {
          this.setUserInfo(response.data)
          return response.data
        }
        throw new Error('获取用户信息失败')
      } catch (error) {
        console.error('获取用户信息失败:', error)
        throw error
      }
    }
  }
}) 