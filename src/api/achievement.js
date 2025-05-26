import request from '@/utils/request'

// 创建或更新成果
export function createOrUpdateAchievement(data, id = null) {
  return request({
    url: id ? `/achievement/${id}` : '/achievement',
    method: id ? 'PUT' : 'POST',
    data
  })
}

// 提交成果审核
export function submitAchievement(id) {
  return request({
    url: `/achievement/${id}/submit`,
    method: 'POST'
  })
}

// 获取成果列表
export function getAchievementList(params) {
  return request({
    url: '/achievement',
    method: 'GET',
    params
  })
}

// 获取成果详情
export function getAchievementDetail(id) {
  return request({
    url: `/achievement/${id}`,
    method: 'GET'
  })
}

// 删除成果
export function deleteAchievement(id) {
  return request({
    url: `/achievement/${id}`,
    method: 'DELETE'
  })
} 