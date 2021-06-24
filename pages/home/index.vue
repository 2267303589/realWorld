<template>
<div class="home-page">
    <div class="banner">
        <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
        </div>
    </div>
    <div class="container page">
        <div class="row">

        <div class="col-md-9">
            <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
                <li class="nav-item" v-if="$store.state.user">
                <nuxt-link class="nav-link" 
                :to="{
                    name:'home', 
                    query: {
                        tab: 'your', 
                        tag: ''
                        }
                    }"
                :class="{active: tab === 'your'}"
                exact
                >Your Feed</nuxt-link>
                </li>
                <li class="nav-item">
                <nuxt-link class="nav-link" 
                :to="{name:'home', query: {tab: 'global', tag: ''}}"
                :class="{active: tab === 'global'}"
                exact
                >Global Feed</nuxt-link>
                </li>
                <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" :class="{active: tag}" :to="{name:'home', query:{tag, tab:''}}" exact># {{tag}}</nuxt-link>
                </li>
            </ul>
            </div>

            <div class="article-preview" v-for="article in articles" :key="article.slug">
                <div class="article-meta">
                    <nuxt-link :to="{
                        name: 'profile',
                        params: {
                            username: article.author.username
                        }
                    }">
                    <img :src="article.author.image"/>
                    </nuxt-link>
                    <div class="info">
                    <nuxt-link :to="{
                        name: 'profile',
                        params: {
                            username: article.author.username
                        }
                    }" class="author"> {{article.author.username}} </nuxt-link>
                    <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
                    </div>
                    <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
                        active: article.favorited,
                        disabled: article.favoriteDisable
                    }"
                    @click="onFavorite(article)"
                    >
                    <i class="ion-heart"></i> {{article.favoritesCount}}
                    </button>
                </div>
                <nuxt-link 
                    :to="{name: 'article',
                    params: {
                        slug: article.slug
                    }}" 
                    class="preview-link">
                    <h1>{{article.title}}</h1>
                    <p>{{article.description}}</p>
                    <span>Read more...</span>
                </nuxt-link>
            </div>

            <nav>
                <ul class="pagination">
                    <li class = "page-item" :class="{active: page === count}" v-for='count in totalPage' :key = "count">
                    <nuxt-link class="page-link" :to="{name: 'home', query: {page: count, tag: tag, tab}}">{{count}}</nuxt-link>
                    </li>

                </ul>
            </nav>
            
        </div>

        <div class="col-md-3">
            <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list" >
                <nuxt-link class="tag-pill tag-default" v-for="item in tags" :key='item' 
                :to = "{
                    name: 'home',
                    query: {
                        tag: item,
                        tab: ''
                    }
                }"
                >{{item}}</nuxt-link>
            </div>
            </div>
        </div>

        </div>
        
    </div>
</div>
</template>

<script>
import { getArticles, getTags, getFeedArticles, deleteFavorite, addFavorite } from '@/api/article'

export default {
    name: 'HomeIndex',
    watchQuery: ['page', 'tag', 'tab'],
    // query 可以获取到url中带的参数 /?page=3 query.page = 3
    async asyncData ( { query }) {
        const page = Number.parseInt(query.page || 1)
        const limit = 20
        const tab =  query.tab || query.tag || "global"

        const getArticles1 = tab === 'your' ? getFeedArticles : getArticles
        // 并行执行异步任务
        const [ articlesResp, tagsResp ] = await Promise.all([
            getArticles1({
                limit,
                offset: limit * (page - 1),
                tag: query.tag,
            }),
            getTags()
        ])
        const { articles, articlesCount } = articlesResp.data
        const { tags } = tagsResp.data

        return {
            articles,
            articlesCount, 
            tags,
            limit,
            page, 
            tag: query.tag,
            tab
        }
    },
    computed: {
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    methods: {
        async onFavorite (article) {
            article.favoriteDisable = true
            const onFavorite = article.favorited ? deleteFavorite : addFavorite
            console.log(article.slug)
            const { data } = await onFavorite(article.slug)
            article.favorited = data.article.favorited
            article.favoritesCount = data.article.favoritesCount
            article.favoriteDisable = false

        }
    }
}
</script>

<style>

</style>