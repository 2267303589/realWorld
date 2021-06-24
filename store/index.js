// 在服务端渲染期间运行的都是一个实例
// 为了防止数据冲突，务必把state定义成一个函数，返回数据对象
export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}
const cookieparser = process.server ? require('cookieparser') : undefined
export const actions = {
    // nuxtServerInit是nuxt中特殊的一个action方法，这个action会在服务端渲染期间自动调用，而且仅在服务端渲染期间运行，
    // 主要作用的初始化容器数据，传递数据给客户端使用
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        // 如果请求头里有cookie，使用CookieParse解析成数据对象
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)

            try {
                user = JSON.parse(parsed.user)
            }
            catch (err) {

            }

            commit('setUser', user)
        }

    }
}