import { request } from '@/plugins/request'

export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        headers: {
            Authorization: `Token {{params.token}}`
        },
        params
    })
}

export const getTags = () => {
    return request({
        method: 'GET',
        url: '/api/tags'
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章内容
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获取文章内容
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}
// 评价
export const postComment = ({slug, comment}) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data :{
            comment
        }
    })
}

export const publishArticle = (article) => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data :{
            article
        }
    })
}
export const updateArticle = ({slug, article}) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data :{
            article
        }
    })
}

export const deleteArticle = (slug) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}