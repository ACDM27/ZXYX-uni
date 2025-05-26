{
  "passwordSecret": "your-password-secret", // 密码加密密钥（需替换）
  "tokenSecret": "your-token-secret",      // Token 加密密钥（需替换）
  "tokenExpiresIn": 7200,                  // Token 有效期（秒）
  "tokenExpiresThreshold": 600,             // Token 过期前刷新阈值（秒）

  // 微信登录配置（关键部分）
  "oauth": {
    "weixin": {
      "appid": "微信小程序/公众号/开放平台的AppID",
      "appsecret": "对应的AppSecret",
      "platform": "mp" // 平台类型：mp（小程序）、h5（网页）、app（移动应用）
    },
    // 可选：多平台微信登录（如同时支持小程序和H5）
    "weixin-h5": {
      "appid": "微信开放平台网站应用的AppID",
      "appsecret": "对应的AppSecret",
      "platform": "h5"
    },
    "weixin-app": {
      "appid": "微信开放平台移动应用的AppID",
      "appsecret": "对应的AppSecret",
      "platform": "app"
    }
  },

  // 接口权限配置（原内容优化）
  "service": {
    "addUser": {
      "role": ["admin"]
    },
    "updateUser": {
      "role": ["admin"]
    },
    "authorizeAppLogin": {
      "role": ["admin"]
    },
    "removeAuthorizedApp": {
      "role": ["admin"]
    },
    "setAuthorizedApp": {
      "role": ["admin"]
    },
    "closeAccount": {
      "auth": true
    },
    "updatePwd": {
      "auth": true
    },
    "logout": {
      "auth": true
    },
    "bindMobileBySms": {
      "auth": true
    },
    "bindMobileByUniverify": {
      "auth": true
    },
    "bindMobileByMpWeixin": {
      "auth": true
    },
    "bindAlipay": {
      "auth": true
    },
    "bindApple": {
      "auth": true
    },
    "bindQQ": {
      "auth": true
    },
    "bindWeixin": {
      "auth": true
    },
    "acceptInvite": {
      "auth": true
    },
    "getInvitedUser": {
      "auth": true
    },
    "setPushCid": {
      "auth": true
    },
    "getAccountInfo": {
      "auth": true
    },
    "unbindWeixin": {
      "auth": true
    },
    "unbindAlipay": {
      "auth": true
    },
    "unbindQQ": {
      "auth": true
    },
    "unbindApple": {
      "auth": true
    },
    "setPwd": {
      "auth": true
    },
    "getFrvCertifyId": {
      "auth": true
    },
    "getFrvAuthResult": {
      "auth": true
    },
    "getRealNameInfo": {
      "auth": true
    }
  }
}