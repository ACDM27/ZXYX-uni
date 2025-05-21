import { defineStore } from 'pinia'
import { getCurrentUser, getMenu } from '@/api/service'
import * as Icons from '@element-plus/icons-vue'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    loading: false,
    error: null,
    menuList: []
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.userInfo,
    username: (state) => state.userInfo?.username || '',
    role: (state) => state.userInfo?.role || '',
    userId: (state) => state.userInfo?.user_id || '',
    userMeta: (state) => state.userInfo?.meta || {}
  },
  
  actions: {
    async fetchUserInfo() {
      this.loading = true
      this.error = null
      
      try {
        const response = await getCurrentUser()
        this.userInfo = response
        // 将用户信息保存到storage中
        setStorage('userInfo', response)
        return this.userInfo
      } catch (err) {
        this.error = err.message || '获取用户信息失败'
        // 使用uni原生toast替代ElementPlus的message
        uni.showToast({
          title: this.error,
          icon: 'none',
          duration: 2000
        })
        console.error('获取用户信息失败:', err)
        return null
      } finally {
        this.loading = false
      }
    },
    
    async fetchMenu() {
      try {
        const menuData = await getMenu()
        // 将字符串图标名称转换为组件实例
        this.menuList = this.processMenuIcons(menuData)
        // 缓存菜单数据
        setStorage('menuList', menuData)
        return this.menuList
      } catch (err) {
        console.error('获取菜单失败:', err)
        uni.showToast({
          title: err.message || '获取菜单失败',
          icon: 'none',
          duration: 2000
        })
        return []
      }
    },
    
    // 处理菜单图标，将字符串转为组件实例
    processMenuIcons(menuData) {
      return menuData.map(item => {
        // 处理图标
        if (item.icon && typeof item.icon === 'string') {
          // 从 Element Plus 图标集合中获取对应的图标组件
          item.icon = Icons[item.icon] || Icons.Document
        }
        
        // 处理子菜单
        if (item.subs && Array.isArray(item.subs)) {
          item.subs = this.processMenuIcons(item.subs)
        }
        
        return item
      })
    },
    
    // 从缓存中恢复状态
    restoreFromStorage() {
      const userInfo = getStorage('userInfo')
      const menuList = getStorage('menuList')
      
      if (userInfo) {
        this.userInfo = userInfo
      }
      
      if (menuList) {
        this.menuList = this.processMenuIcons(menuList)
      }
    },
    
    clearUserInfo() {
      this.userInfo = null
      this.error = null
      this.menuList = []
      
      // 清除缓存
      removeStorage('userInfo')
      removeStorage('menuList')
    }
  }
}) 