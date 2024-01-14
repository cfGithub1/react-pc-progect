import { request } from '@/utils/request'

// 登录请求
export function loginApi(data) {
    return request({
        url: '/authorizations',
        method: 'post',
        data
    })
}

// 获取用户信息
export function getProfileApi() {
    return request({
        url: '/user/profile',
        method: 'get',
    })
}