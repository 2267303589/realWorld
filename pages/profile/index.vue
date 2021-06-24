<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="user.image" class="user-img" />
          <h4>{{user.username}}</h4>
          <p>
            {{user.bio}}
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn"
          v-if="user.username !== loginUser.username"
          :class="{
            active: user.following
          }"
          @click="onFollowing">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{user.following ? "Unfollow" : "Follow"}} {{user.username}} 
          </button>
          <button class="btn btn-sm btn-outline-secondary action-btn"
          v-else
          @click="logout">
           Logout
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{name:'profile', query: {tab: 'myArticle'}}"
              :class="{active: tab === 'myArticle'}" exact>My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{name:'profile', query: {tab: 'favArticle'}}"
              :class="{active: tab === 'favArticle'}" exact>Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}" class="author">{{article.author.username}}</nuxt-link>
              <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited}"
            @click="onFavorite(article)">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{name:'article', params: {slug: article.slug}}" class="preview-link">
            <h1>{{article.body}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list"> 
              <li class="tag-default tag-pill tag-outline" v-for="item in article.tagList" :key="item">{{item}}</li>
            </ul>
          </nuxt-link>
        </div>

      </div>

    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfile, followUser, unfollowUser } from '@/api/user'
import { getArticles, addFavorite, deleteFavorite } from '@/api/article'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data () {
    return {
      user: {},
      myArticles: [],
      favArticles: [],
    }
  },
  computed:{
    tab(){
      return this.$route.query.tab || 'myArticle'
    },
    articles(){
      return this.tab === "myArticle" ? this.myArticles : this.favArticles
    },
    ...mapState({
      loginUser: 'user'
    }),
    
    // 两种写法均可
    // loginUser () {
    //   return mapState('user')
    // }
  },
  middleware: 'auth',
  name: 'ProfileIndex',
 
  async created () {
    this.getData()
  },
  methods: {
    async getData(){
      const username = this.$route.params.username
      if (this.$route.params.username === this.loginUser.username) {
        this.user = this.loginUser
      }
      else {
        const {data} = await getProfile(username)
        this.user = data.profile
      }
      
      // 获取文章列表
      const { data: myArticle } = await getArticles({
        author: this.user.username
      })
      this.myArticles = myArticle.articles
        const { data: favrticle } = await getArticles({
        favorited: this.user.username
      })
      this.favArticles = favrticle.articles
    },
    async onFollowing () {
      if (this.user.following) {
        // 取消关注
        const { data } = await unfollowUser(this.user.username)
        this.user.following = data.profile.following
      }else{
        // 关注
        const { data } = await followUser(this.user.username)
        this.user.following = data.profile.following
      }
    },
    async onFavorite (article) {
        article.favoriteDisable = true
        const onFavorite = article.favorited ? deleteFavorite : addFavorite
        console.log(article.slug)
        const { data } = await onFavorite(article.slug)
        article.favorited = data.article.favorited
        article.favoritesCount = data.article.favoritesCount
        article.favoriteDisable = false
    },
    logout(){
      console.log('logout')
      Cookie.set('user', null)
      this.$store.commit('setUser',null)
      this.$router.push('/')
    }
  
  },
  watch:{
    $route: {
      handler(){
        this.getData()
      },
      deep: true
    }
  }
}
</script>

<style>

</style>