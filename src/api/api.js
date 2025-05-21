// API接口定义


export const AUTH_API = {
  REGISTER: '/api/auth/register', // 注册（仅限密码登录）
  LOGIN: '/api/auth/login', // 登录（密码登录）
  REFRESH: '/api/auth/refresh', // 刷新token
  LOGOUT: '/api/auth/logout', // 登出
  OAUTH2_AUTHORIZE: (provider) => `/api/auth/oauth2/${provider}/authorize`, // 向第三方 OAuth2 提供者发起授权请求
  OAUTH2_CALLBACK: (provider) => `/api/auth/oauth2/${provider}/callback`, // 第三方授权完成后的回调接口
  VERIFY_TOKEN: '/api/auth/token', // 验证token是否有效，有效返回user id
};


export const USER_API = {
  CREATE: '/api/users', // 创建用户（管理员权限）
  LIST: '/api/users', // 列表查询用户，支持分页、按角色/状态筛选
  GET_DETAIL: (userId) => `/api/users/${userId}`, // 获取单个用户详情
  GET_CURRENT_USER: '/api/users/me', // 获取当前登录用户信息
  UPDATE: (userId) => `/api/users/${userId}/update`, // 更新用户信息（用户名、邮箱、角色等）
  DELETE: (userId) => `/api/users/${userId}/delete`, // 删除用户
  BAN: (userId) => `/api/users/${userId}/ban`, // 封禁或者解放用户
  SET_ROLE: (userId) => `/api/users/${userId}/role`, // 为用户分配角色
  GET_ROLE: (userId) => `/api/users/${userId}/role`, // 查询用户当前角色
};


export const USER_ACHIEVEMENT_API = {
  UPLOAD_PRIMARY: '/api/user/achievements/upload-primary', // 上传主要材料（触发 OCR+LLM 处理）
  CREATE_UPDATE: '/api/user/achievements', // 创建或修改自己的成果
  LIST: '/api/user/achievements', // 查询自己的成果（支持按类型/日期/状态筛选）
  GET_DETAIL: (id) => `/api/user/achievements/${id}`, // 获取自己的单个成果详情
  DELETE: (id) => `/api/user/achievements/${id}/delete`, // 删除自己的成果
  SUBMIT: (id) => `/api/user/achievements/${id}/submit`, // 提交成果，标记为待审核
  TASK: (task_id) => `/api/user/achievements/task/${task_id}`
};


export const ADMIN_ACHIEVEMENT_API = {
  LIST: '/api/admin/achievements', // 查询所有成果，支持分页、类型/时间/状态筛选
  GET_DETAIL: (id) => `/api/admin/achievements/${id}`, // 获取任意成果的详情
  REVIEW: (id) => `/api/admin/achievements/${id}/review`, // 审核成果（通过/驳回等）
  DELETE: (id) => `/api/admin/achievements/${id}/delete`, // 删除任意成果
  UPDATE: (id) => `/api/admin/achievements/${id}`, // 修改任意成果内容
};


export const REPORT_API = {
  SUMMARY: '/api/reports/summary', // 汇总统计
  EXPORT: '/api/reports/export', // 导出 CSV
};


export const ROLE_API = {
  CREATE: '/api/roles', // 创建角色
  LIST: '/api/roles', // 列表查询所有角色
  GET_DETAIL: (roleId) => `/api/roles/${roleId}`, // 获取单个角色详情
  UPDATE: (roleId) => `/api/roles/${roleId}/update`, // 更新角色（修改 name/label）
  DELETE: (roleId) => `/api/roles/${roleId}/delete`, // 删除角色
};


export const ROLE_PERMISSION_API = {
  ASSIGN: (roleId) => `/api/roles/${roleId}/permissions`, // 为角色分配权限
  LIST: (roleId) => `/api/roles/${roleId}/permissions`, // 查询角色已分配权限
  REMOVE: (roleId, permissionId) => `/api/roles/${roleId}/permissions/${permissionId}/remove`, // 从角色移除单个权限
};

export const PERMISSION_API = {
  LIST: '/api/permissions', // 查询所有可分配权限
};

export const COMPETITION_API = {
  LIST: '/api/competitions/list', // 查询所有竞赛，支持分页、是否为A类查询
  GET_DETAIL: (competitionId) => `/api/competitions/${competitionId}`, // 根据竞赛ID获取竞赛详情
  CREATE: '/api/competitions', // 创建新竞赛
  UPDATE: (competitionId) => `/api/competitions/${competitionId}/update`, // 根据竞赛ID更新竞赛信息
  DELETE: (competitionId) => `/api/competitions/${competitionId}/delete`, // 根据竞赛ID删除竞赛
};

export const FILE_API = {
  UPLOAD: '/api/file/upload', // 文件上传接口
  GET_ALL: '/api/file', // 获取文件列表（管理员权限）
  GET_MY_FILES: '/api/file/my', // 获取该用户上传的文件列表
  GET_FILE_INFO: (fileId) => `/api/file/info/${fileId}`, // 获取文件信息
  UPDATE_FILE: (fileId) => `/api/file/update/${fileId}`, // 更新文件信息
  DELETE_FILE: (fileId) => `/api/file/delete/${fileId}`, // 删除文件信息
};

export const JOURNAL_API = {
  LIST: '/api/journals/list', // 获取期刊列表
  GET_DETAIL: (journalId) => `/api/journals/${journalId}`, // 获取期刊详情
  CREATE: '/api/journals', // 创建新期刊
  UPDATE: (journalId) => `/api/journals/${journalId}/update`, // 更新期刊信息
  DELETE: (journalId) => `/api/journals/${journalId}/delete`, // 删除期刊
  SEARCH: '/api/journals/search', // 按名称搜索期刊
};

// 系统配置API
export const SYS_CONFIG_API = {
  LIST: '/api/sys-config', // 获取系统配置列表
  TYPES: '/api/sys-config/types', // 获取配置类型列表
  GROUP: '/api/sys-config/group', // 获取指定分组的系统配置
  KEY: '/api/sys-config/key', // 获取指定键的系统配置
  CREATE: '/api/sys-config/create', // 创建系统配置
  UPDATE: '/api/sys-config/key/update', // 更新系统配置
  DELETE: '/api/sys-config/key/delete', // 删除系统配置
  REFRESH_CACHE: '/api/sys-config/refresh-cache', // 刷新系统配置缓存
  MENU: '/api/sys-config/menu', // 获取菜单
}; 