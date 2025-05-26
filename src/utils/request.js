import { getToken, getRefreshToken, setToken, clearToken } from './storage'

// 根据环境变量获取baseURL
const baseURL = import.meta.env.VITE_BASE_API || ''

// 是否正在刷新token
let isRefreshing = false
// 等待刷新token的请求队列
let requests = []

/**
 * 请求拦截
 * @param {Object} config 请求配置
 * @returns {Object} 处理后的请求配置
 */
const requestInterceptor = (config) => {
  // 不需要token的白名单路径
  const whiteList = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/refresh'
  ]
  
  // 获取token
  const token = getToken()
  
  // 初始化header
  config.header = {
    'Content-Type': 'application/json;charset=UTF-8',
    ...config.header
  }
  
  // 如果不在白名单中，则添加token
  if (!whiteList.some(path => config.url.includes(path))) {
    if (token) {
      // 注意：uni-app中header的key必须全小写
      config.header = {
        ...config.header,
        'authorization': `Bearer ${token}`
      }
    } else {
      // 没有token且不在白名单中，跳转到登录页
      uni.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/login/login' })
      }, 1500)
      return Promise.reject(new Error('请先登录'))
    }
  }
  
  return config
}

/**
 * 响应拦截
 * @param {Object} response 响应对象
 * @param {Object} config 请求配置
 * @returns {Promise} 处理后的响应
 */
const responseInterceptor = async (response, config) => {
  const { statusCode, data } = response
  
  // HTTP状态码为200，检查业务状态码
  if (statusCode === 200) {
    // 检查是否是标准格式(含有code和message字段)
    if (data && data.hasOwnProperty('code')) {
      // 业务逻辑错误
      if (data.code !== 200) {
        uni.showToast({
          title: data.message || '操作失败',
          icon: 'none',
          duration: 2000
        })
        return Promise.reject(new Error(data.message || '操作失败'))
      }
      
      // 判断是否为分页响应
      if (data.hasOwnProperty('total') && data.hasOwnProperty('page') && data.hasOwnProperty('page_size')) {
        return {
          data: data.data || [],
          total: data.total,
          page: data.page,
          page_size: data.page_size
        }
      }
      
      // 普通标准响应，返回数据部分
      return data.data
    }
    
    // 非标准格式，直接返回数据
    return data
  }
  
  // HTTP错误状态码处理
  let message = '请求失败'
  let shouldRefreshToken = false
  
  switch (statusCode) {
    case 401:
      message = '未授权，请重新登录'
      shouldRefreshToken = true
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '请求资源不存在'
      break
    case 500:
      message = '服务器错误'
      break
    default:
      message = `请求错误 (${statusCode})`
      if (data && data.message) {
        message += `: ${data.message}`
      }
  }
  
  // 判断是否需要刷新token
  if (shouldRefreshToken && !config.url.includes('/api/auth/login') && !config.url.includes('/api/auth/refresh')) {
    return handleTokenRefresh(config)
  }
  
  // 显示错误消息
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
  
  return Promise.reject(new Error(message))
}

/**
 * 处理token刷新
 * @param {Object} config 原始请求配置
 * @returns {Promise} 处理结果
 */
const handleTokenRefresh = (config) => {
  const refreshToken = getRefreshToken()
  
  if (!refreshToken) {
    // 没有刷新token，清除登录状态并跳转登录页
    clearToken()
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/login/login' })
    }, 1500)
    return Promise.reject(new Error('登录已过期，请重新登录'))
  }
  
  // 如果正在刷新，则将请求加入队列
  if (isRefreshing) {
    return new Promise((resolve) => {
      requests.push((token) => {
        config.header.Authorization = `Bearer ${token}`
        resolve(request(config))
      })
    })
  }
  
  // 开始刷新token
  isRefreshing = true
  
  // 调用刷新token接口
  return new Promise((resolve, reject) => {
    request({
      url: '/api/auth/refresh',
      method: 'POST',
      data: { refresh_token: refreshToken }
    })
      .then(res => {
        // 保存新token
        setToken(res, res.expires_in || 7200)
        
        // 更新当前请求的Authorization头
        config.header.Authorization = `Bearer ${res.access_token}`
        
        // 处理队列中的请求
        requests.forEach(cb => cb(res.access_token))
        requests = []
        
        // 重新发起原请求
        resolve(request(config))
      })
      .catch(() => {
        // 刷新token失败，清除token并跳转到登录页
        clearToken()
        
        uni.showToast({
          title: '登录已过期，请重新登录',
          icon: 'none',
          duration: 2000
        })
        
        setTimeout(() => {
          uni.reLaunch({ url: '/pages/login/login' })
        }, 1500)
        
        reject(new Error('登录已过期，请重新登录'))
      })
      .finally(() => {
        isRefreshing = false
      })
  })
}

/**
 * 封装请求方法
 * @param {Object} options 请求配置
 * @returns {Promise} 请求Promise
 */
const request = (options) => {
  const { url, method = 'GET', data = {}, header = {}, ...rest } = options
  
  // 合并请求配置
  const config = {
    url: url.startsWith('http') ? url : baseURL + url,
    method: method.toUpperCase(), // 确保方法名大写
    data,
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...header
    },
    ...rest
  }
  
  // 请求拦截
  const interceptedConfig = requestInterceptor(config)
  
  // 发起请求
  return new Promise((resolve, reject) => {
    uni.request({
      ...interceptedConfig,
      success: (response) => {
        // 响应拦截
        responseInterceptor(response, interceptedConfig)
          .then(resolve)
          .catch(reject)
      },
      fail: (error) => {
        const message = '网络请求失败'
        uni.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
        reject(new Error(message))
      }
    })
  })
}

// 请求方法别名
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'GET',
    data,
    ...options
  })
}

const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

export { request, get, post, put, del }
export default request 