import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data loginName password code loginType clientToken
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data,
  })
}

//获取图片验证码
export const getVerificationCode = (clientToken) => {
  return request({
    method: 'GET',
    url: `/api/user-service/user/imageCode/${clientToken}`,
    responseType: "arraybuffer",
  })
}
