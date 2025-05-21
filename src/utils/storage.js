/**
 * 基于uni.storage封装的存储工具类
 */

// Token相关的key常量
const TOKEN_KEY = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  EXPIRES_IN: 'token_expires_in',
  TOKEN_TYPE: 'token_type'
}

/**
 * 设置存储
 * @param {String} key 存储键
 * @param {Any} data 存储值
 * @param {Number} expires 过期时间（秒），不传则永久
 */
export const setStorage = (key, data, expires = 0) => {
  const storage = {
    data,
    expires: expires > 0 ? Date.now() + expires * 1000 : 0
  }
  try {
    uni.setStorageSync(key, JSON.stringify(storage))
    return true
  } catch (e) {
    console.error('存储数据失败:', e)
    return false
  }
}

/**
 * 获取存储
 * @param {String} key 存储键
 * @param {Any} defaultValue 默认值，当获取失败或已过期时返回
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    const storageStr = uni.getStorageSync(key)
    if (!storageStr) return defaultValue
    
    const storage = JSON.parse(storageStr)
    // 判断是否过期
    if (storage.expires > 0 && storage.expires < Date.now()) {
      removeStorage(key) // 过期自动清除
      return defaultValue
    }
    
    return storage.data
  } catch (e) {
    console.error('获取存储数据失败:', e)
    return defaultValue
  }
}

/**
 * 移除存储
 * @param {String} key 存储键
 */
export const removeStorage = (key) => {
  try {
    uni.removeStorageSync(key)
    return true
  } catch (e) {
    console.error('移除存储数据失败:', e)
    return false
  }
}

/**
 * 清空所有存储
 */
export const clearStorage = () => {
  try {
    uni.clearStorageSync()
    return true
  } catch (e) {
    console.error('清空存储数据失败:', e)
    return false
  }
}

/**
 * 获取访问令牌
 * @returns {string|null} 访问令牌
 */
export function getToken() {
  return uni.getStorageSync(TOKEN_KEY.ACCESS_TOKEN)
}

/**
 * 获取刷新令牌
 * @returns {string|null} 刷新令牌
 */
export function getRefreshToken() {
  return uni.getStorageSync(TOKEN_KEY.REFRESH_TOKEN)
}

/**
 * 保存token信息
 * @param {Object} tokenInfo - token信息对象
 * @param {string} tokenInfo.access_token - 访问令牌
 * @param {string} tokenInfo.refresh_token - 刷新令牌
 * @param {number} tokenInfo.expires_in - 过期时间（秒）
 * @param {string} tokenInfo.token_type - 令牌类型
 */
export function setToken(tokenInfo) {
  if (!tokenInfo) return
  
  const { access_token, refresh_token, expires_in, token_type } = tokenInfo
  
  if (access_token) {
    uni.setStorageSync(TOKEN_KEY.ACCESS_TOKEN, access_token)
  }
  
  if (refresh_token) {
    uni.setStorageSync(TOKEN_KEY.REFRESH_TOKEN, refresh_token)
  }
  
  if (expires_in) {
    uni.setStorageSync(TOKEN_KEY.EXPIRES_IN, expires_in)
  }
  
  if (token_type) {
    uni.setStorageSync(TOKEN_KEY.TOKEN_TYPE, token_type)
  }
}

/**
 * 清除所有token相关信息
 */
export function clearToken() {
  uni.removeStorageSync(TOKEN_KEY.ACCESS_TOKEN)
  uni.removeStorageSync(TOKEN_KEY.REFRESH_TOKEN)
  uni.removeStorageSync(TOKEN_KEY.EXPIRES_IN)
  uni.removeStorageSync(TOKEN_KEY.TOKEN_TYPE)
}

export default {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getToken,
  getRefreshToken,
  setToken,
  clearToken
} 