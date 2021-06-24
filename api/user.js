import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
    return request ({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

// 用户注册
export const register = data => {
    return request ({
        method: 'POST',
        url: '/api/users',
        data
    })
}
// follow user
export const followUser = username => {
    return request ({
        method: 'POST',
        url: `/api/profiles/${username}/follow`
    })
}

// unfollow user
export const unfollowUser = username => {
    return request ({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`
    })
}

export const getProfile = username => {
    return request ({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}

export const updateUser = data => {
    return request ({
        method: "PUT",
        url: '/api/user',
        data
    })
}