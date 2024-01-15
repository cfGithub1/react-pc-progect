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

// 获取文章列表
export function getArticleListApi(params) {
    return request({
        url: '/mp/articles',
        method: 'get',
        params
    })
}

// 删除文章
export function delArticleApi(target) {
    return request({
        url: `/mp/articles/${target}`,
        method: 'delete',
    })
}

// 获取文章详情
export function getArticleApi(target) {
    return request({
        url: `/mp/articles/${target}`,
        method: 'get',
    })
}

// 编辑文章
export function editArticleApi(data) {
    return request({
        url: `/mp/articles/${data.id}?draft=false`,
        method: 'put',
        data
    })
}