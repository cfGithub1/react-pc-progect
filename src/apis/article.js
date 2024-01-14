import { request } from '@/utils/request'

// 获取频道列表
export function getChannelApi() {
    return request({
        url: '/channels',
        method: 'get',
    })
}

// 新增文章
export function createArticleApi(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'post',
        data
    })
}