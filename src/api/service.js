import {
  AUTH_API,
  USER_API,
  USER_ACHIEVEMENT_API,
  ADMIN_ACHIEVEMENT_API,
  REPORT_API,
  ROLE_API,
  ROLE_PERMISSION_API,
  PERMISSION_API,
  COMPETITION_API,
  FILE_API,
  JOURNAL_API,
  SYS_CONFIG_API
} from './api';
import {get, post, put, del} from '@/utils/request';

// ===== 3.3.1 认证服务 =====
/**
 * 用户注册
 * @param {Object} data - 包含用户名、密码等注册信息
 * @returns {Promise}
 */
export function register(data) {
  return post(AUTH_API.REGISTER, data);
}

/**
 * 用户登录
 * @param {Object} data - 包含用户名、密码的登录信息
 * @returns {Promise}
 */
export function login(data) {
  return post(AUTH_API.LOGIN, data);
}

/**
 * 刷新token
 * @param {Object} data - 包含refresh_token的刷新信息
 * @returns {Promise}
 */
export function refreshToken(data) {
  return post(AUTH_API.REFRESH, data);
}

/**
 * 用户登出
 * @returns {Promise}
 */
export function logout() {
  return post(AUTH_API.LOGOUT);
}

/**
 * 验证token是否有效
 * @returns {Promise} 返回用户ID
 */
export function verifyToken() {
  return get(AUTH_API.VERIFY_TOKEN);
}

/**
 * 发起OAuth2授权请求
 * @param {String} provider - OAuth2提供者，如'github'/'google'等
 * @returns {Promise}
 */
export function oauthAuthorize(provider) {
  return get(AUTH_API.OAUTH2_AUTHORIZE(provider));
}

/**
 * 接收OAuth2回调
 * @param {String} provider - OAuth2提供者
 * @param {Object} params - 回调参数
 * @returns {Promise}
 */
export function oauthCallback(provider, params) {
  return get(AUTH_API.OAUTH2_CALLBACK(provider), { params });
}

// ===== 3.3.2 用户管理 =====
/**
 * 创建用户（管理员权限）
 * @param {Object} data - 用户信息
 * @returns {Promise}
 */
export function createUser(data) {
  return post(USER_API.CREATE, data);
}

/**
 * 获取用户列表
 * @param {Object} params - 查询参数(分页、筛选条件等)
 * @returns {Promise}
 */
export function getUserList(params) {
  return get(USER_API.LIST, { params });
}

/**
 * 获取用户详情
 * @param {String|Number} userId - 用户ID
 * @returns {Promise}
 */
export function getUserDetail(userId) {
  return get(USER_API.GET_DETAIL(userId));
}

/**
 * 获取当前登录用户信息
 * @returns {Promise} 返回当前用户详细信息
 */
export function getCurrentUser() {
  return get(USER_API.GET_CURRENT_USER);
}


/**
 * 更新用户信息
 * @param {String|Number} userId - 用户ID
 * @param {Object} data - 更新的用户信息
 * @returns {Promise}
 */
export function updateUser(userId, data) {
  return post(USER_API.UPDATE(userId), data);
}

/**
 * 删除用户
 * @param {String|Number} userId - 用户ID
 * @returns {Promise}
 */
export function deleteUser(userId) {
  return post(USER_API.DELETE(userId));
}

/**
 * 禁用/启用用户
 * @param {String|Number} userId - 用户ID
 * @param {Boolean} isBanned - 是否禁用
 * @returns {Promise}
 */
export function banUser(userId, isBanned) {
  return post(USER_API.BAN(userId), { isBanned });
}

/**
 * 为用户分配角色
 * @param {String|Number} userId - 用户ID
 * @param {String|Number} roleId - 角色ID
 * @returns {Promise}
 */
export function setUserRole(userId, roleId) {
  return post(USER_API.SET_ROLE(userId), { role_id: roleId });
}

/**
 * 获取用户角色
 * @param {String|Number} userId - 用户ID
 * @returns {Promise}
 */
export function getUserRole(userId) {
  return get(USER_API.GET_ROLE(userId));
}

// ===== 3.3.3 成果管理（用户接口）=====
/**
 * 上传主要材料（触发 OCR+LLM 处理）
 * @param {Object} data - 包含file_id, type
 * @returns {Promise}
 */
export function uploadPrimaryMaterial(data) {
  return post(USER_ACHIEVEMENT_API.UPLOAD_PRIMARY, data);
}

/**
 * 创建或修改自己的成果
 * @param {Object} data - 成果信息
 * @param {String|Number} id - 成果ID（修改时需要）
 * @returns {Promise}
 */
export function createOrUpdateAchievement(data, id) {
  return id 
    ? post(`${USER_ACHIEVEMENT_API.CREATE_UPDATE}/${id}`, data)
    : post(USER_ACHIEVEMENT_API.CREATE_UPDATE, data);
}

/**
 * 获取自己的成果列表
 * @param {Object} params - 查询参数（类型/日期/状态筛选）
 * @returns {Promise}
 */
export function getUserAchievements(params) {
  return get(USER_ACHIEVEMENT_API.LIST, { params });
}

/**
 * 获取自己的成果详情
 * @param {String|Number} id - 成果ID
 * @returns {Promise}
 */
export function getUserAchievementDetail(id) {
  return get(USER_ACHIEVEMENT_API.GET_DETAIL(id));
}

/**
 * 删除自己的成果
 * @param {String|Number} id - 成果ID
 * @returns {Promise}
 */
export function deleteUserAchievement(id) {
  return post(USER_ACHIEVEMENT_API.DELETE(id));
}

/**
 * 提交成果进行审核
 * @param {String|Number} id - 成果ID
 * @returns {Promise}
 */
export function submitAchievement(id) {
  return post(USER_ACHIEVEMENT_API.SUBMIT(id));
}

/**
 * 查询材料解析任务
 * @param {String|Number} task_id - 任务ID  
 * @returns {Promise}
 */
export function getTask(task_id) {
  return get(USER_ACHIEVEMENT_API.TASK(task_id));
}

// ===== 3.3.4 成果管理（管理员接口）=====
/**
 * 管理员获取所有成果列表
 * @param {Object} params - 查询参数（分页、类型/时间/状态筛选）
 * @returns {Promise}
 */
export function getAdminAchievements(params) {
  return get(ADMIN_ACHIEVEMENT_API.LIST, { params });
}

/**
 * 管理员获取任意成果详情
 * @param {String|Number} id - 成果ID
 * @returns {Promise}
 */
export function getAdminAchievementDetail(id) {
  return get(ADMIN_ACHIEVEMENT_API.GET_DETAIL(id));
}

/**
 * 审核成果（通过/驳回等）
 * @param {String|Number} id - 成果ID
 * @param {Object} data - 审核信息，如{status: 'approved', comment: '通过'}
 * @returns {Promise}
 */
export function reviewAchievement(id, data) {
  return post(ADMIN_ACHIEVEMENT_API.REVIEW(id), data);
}

/**
 * 管理员删除任意成果
 * @param {String|Number} id - 成果ID
 * @returns {Promise}
 */
export function deleteAdminAchievement(id) {
  return post(ADMIN_ACHIEVEMENT_API.DELETE(id));
}

/**
 * 管理员修改任意成果
 * @param {String|Number} id - 成果ID
 * @param {Object} data - 成果信息
 * @returns {Promise}
 */
export function updateAdminAchievement(id, data) {
  return request.put(ADMIN_ACHIEVEMENT_API.UPDATE(id), data);
}

// ===== 3.3.5 报表统计 =====
/**
 * 获取汇总统计数据
 * @returns {Promise}
 */
export function getReportSummary() {
  return get(REPORT_API.SUMMARY);
}

/**
 * 导出报表
 * @param {String} format - 导出格式，默认为'csv'
 * @param {Object} params - 其他参数
 * @returns {Promise}
 */
export function exportReport(format = 'csv', params = {}) {
  return get(REPORT_API.EXPORT, { 
    params: { format, ...params },
    responseType: 'blob'
  });
}

// ===== 3.3.6 角色管理 =====
/**
 * 创建角色
 * @param {Object} data - 角色信息
 * @returns {Promise}
 */
export function createRole(data) {
  return post(ROLE_API.CREATE, data);
}

/**
 * 获取角色列表
 * @returns {Promise}
 */
export function getRoleList() {
  return get(ROLE_API.LIST);
}

/**
 * 获取角色详情
 * @param {String|Number} roleId - 角色ID
 * @returns {Promise}
 */
export function getRoleDetail(roleId) {
  return get(ROLE_API.GET_DETAIL(roleId));
}

/**
 * 更新角色
 * @param {String|Number} roleId - 角色ID
 * @param {Object} data - 更新信息
 * @returns {Promise}
 */
export function updateRole(roleId, data) {
  return post(ROLE_API.UPDATE(roleId), data);
}

/**
 * 删除角色
 * @param {String|Number} roleId - 角色ID
 * @returns {Promise}
 */
export function deleteRole(roleId) {
  return post(ROLE_API.DELETE(roleId));
}

// ===== 3.3.7 角色-权限关联 =====
/**
 * 为角色分配权限
 * @param {String|Number} roleId - 角色ID
 * @param {Array} permissionIds - 权限ID列表
 * @returns {Promise}
 */
export function assignRolePermissions(roleId, permissionIds) {
  return post(ROLE_PERMISSION_API.ASSIGN(roleId), { permission_ids: permissionIds });
}

/**
 * 获取角色已分配的权限
 * @param {String|Number} roleId - 角色ID
 * @returns {Promise}
 */
export function getRolePermissions(roleId) {
  return get(ROLE_PERMISSION_API.LIST(roleId));
}

/**
 * 从角色移除单个权限
 * @param {String|Number} roleId - 角色ID
 * @param {String|Number} permissionId - 权限ID
 * @returns {Promise}
 */
export function removeRolePermission(roleId, permissionId) {
  return post(ROLE_PERMISSION_API.REMOVE(roleId, permissionId));
} 

/**
 * 获取所有可分配权限
 * @returns {Promise}
 */
export function getPermissions() {
  return get(PERMISSION_API.LIST);
}

// ===== 3.3.9 竞赛管理 =====
/**
 * 获取竞赛列表
 * @param {Object} params - 查询参数，支持分页、是否为A类查询等
 * @returns {Promise}
 */
export function getCompetitionList(params) {
  return get(COMPETITION_API.LIST, { params });
}

/**
 * 获取竞赛详情
 * @param {String|Number} competitionId - 竞赛ID
 * @returns {Promise}
 */
export function getCompetitionDetail(competitionId) {
  return get(COMPETITION_API.GET_DETAIL(competitionId));
}

/**
 * 创建竞赛
 * @param {Object} data - 竞赛信息
 * @returns {Promise}
 */
export function createCompetition(data) {
  return post(COMPETITION_API.CREATE, data);
}

/**
 * 更新竞赛信息
 * @param {String|Number} competitionId - 竞赛ID
 * @param {Object} data - 更新的竞赛信息
 * @returns {Promise}
 */
export function updateCompetition(competitionId, data) {
  return post(COMPETITION_API.UPDATE(competitionId), data);
}

/**
 * 删除竞赛
 * @param {String|Number} competitionId - 竞赛ID
 * @returns {Promise}
 */
export function deleteCompetition(competitionId) {
  return post(COMPETITION_API.DELETE(competitionId));
}

// ===== 3.3.10 文件管理 =====
/**
 * 上传文件
 * @param {Object} formData - 包含文件的FormData对象 {file: File}
 * @returns {Promise}
 */
export function uploadFile(formData) {
  return post(FILE_API.UPLOAD, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 获取所有文件列表（管理员权限）
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export function getAllFiles(params) {
  return post(FILE_API.GET_ALL, params);
}

/**
 * 获取当前用户的文件列表
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export function getMyFiles(params) {
  return post(FILE_API.GET_MY_FILES, params);
}

/**
 * 获取文件信息
 * @param {String|Number} fileId - 文件ID
 * @returns {Promise}
 */
export function getFileInfo(fileId) {
  return post(FILE_API.GET_FILE_INFO(fileId));
}

/**
 * 更新文件信息
 * @param {String|Number} fileId - 文件ID
 * @param {Object} data - 更新的文件信息
 * @returns {Promise}
 */
export function updateFile(fileId, data) {
  return post(FILE_API.UPDATE_FILE(fileId), data);
}

/**
 * 删除文件
 * @param {String|Number} fileId - 文件ID
 * @returns {Promise}
 */
export function deleteFile(fileId) {
  return post(FILE_API.DELETE_FILE(fileId));
}

// ===== 3.3.11 期刊管理 =====
/**
 * 获取期刊列表
 * @param {Object} params - 查询参数，支持分页、按类别筛选等
 * @returns {Promise}
 */
export function getJournalList(params) {
  return get(JOURNAL_API.LIST, { params });
}

/**
 * 获取期刊详情
 * @param {String|Number} journalId - 期刊ID
 * @returns {Promise}
 */
export function getJournalDetail(journalId) {
  return get(JOURNAL_API.GET_DETAIL(journalId));
}

/**
 * 创建期刊
 * @param {Object} data - 期刊信息
 * @returns {Promise}
 */
export function createJournal(data) {
  return post(JOURNAL_API.CREATE, data);
}

/**
 * 更新期刊信息
 * @param {String|Number} journalId - 期刊ID
 * @param {Object} data - 更新的期刊信息
 * @returns {Promise}
 */
export function updateJournal(journalId, data) {
  return post(JOURNAL_API.UPDATE(journalId), data);
}

/**
 * 删除期刊
 * @param {String|Number} journalId - 期刊ID
 * @returns {Promise}
 */
export function deleteJournal(journalId) {
  return post(JOURNAL_API.DELETE(journalId));
}

/**
 * 按名称搜索期刊
 * @param {Object} params - 搜索参数，包含name字段
 * @returns {Promise}
 */
export function searchJournalByName(params) {
  return get(JOURNAL_API.SEARCH, { params });
}

// ===== 系统配置管理 =====
/**
 * 获取系统配置列表
 * @returns {Promise}
 */
export function getSysConfigList() {
  return get(SYS_CONFIG_API.LIST);
}

/**
 * 获取配置类型列表
 * @returns {Promise}
 */
export function getSysConfigTypes() {
  return get(SYS_CONFIG_API.TYPES);
}

/**
 * 获取指定分组的系统配置
 * @param {Object} params - 包含group参数
 * @returns {Promise}
 */
export function getGroupSysConfig(params) {
  return get(SYS_CONFIG_API.GROUP, { params });
}

/**
 * 获取指定键的系统配置
 * @param {Object} params - 包含key参数
 * @returns {Promise}
 */
export function getKeySysConfig(params) {
  return get(SYS_CONFIG_API.KEY, { params });
}

/**
 * 创建系统配置
 * @param {Object} data - 系统配置信息
 * @returns {Promise}
 */
export function createSysConfig(data) {
  return post(SYS_CONFIG_API.CREATE, data);
}

/**
 * 更新系统配置
 * @param {Object} data - 更新的系统配置信息
 * @returns {Promise}
 */
export function updateSysConfig(data) {
  return post(SYS_CONFIG_API.UPDATE, data);
}

/**
 * 删除系统配置
 * @param {Object} data - 包含key参数
 * @returns {Promise}
 */
export function deleteSysConfig(data) {
  return post(SYS_CONFIG_API.DELETE, data);
}

/**
 * 刷新系统配置缓存
 * @returns {Promise}
 */
export function refreshSysConfigCache() {
  return post(SYS_CONFIG_API.REFRESH_CACHE);
}

/**
 * 获取菜单
 * @returns {Promise}
 */
export function getMenu() {
  return get(SYS_CONFIG_API.MENU);
}