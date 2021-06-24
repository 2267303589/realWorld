<template>
  <div>
      <nuxt-link :to="{name: 'profile', params: {
          username: article.author.username
        }}"><img :src="article.author.image" /></nuxt-link>
        <div class="info">
          <nuxt-link :to="{name: 'profile', params: {
          username: article.author.username
          }}" class="author">{{article.author.username}}</nuxt-link>
          <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
        </div>

        <template v-if="$store.state.user && $store.state.user.username == article.author.username">
          <button class="btn btn-sm btn-outline-secondary"
          @click="onEditor">
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary"
          @click="onDelete">
            <i class="ion-trash-a"></i>
            &nbsp;
             Delete Article
          </button>
        </template>
        <template v-else>
          <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}"
          @click="onFollowing">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{article.author.following ? "Unfollow" : "Follow"}} {{article.author.username}} 
            <!-- <span class="counter">(10)</span> -->
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}"
          @click="onFavorite">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">{{article.favoritesCount}}</span>
          </button>
        </template>
        
  </div>
</template>

<script>
import { followUser, unfollowUser } from '@/api/user'
import { addFavorite, deleteFavorite,deleteArticle } from '@/api/article'

export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    methods: {
      async onFollowing () {
        if (!this.$store.state.user) {
          this.$router.push('/login')

        } else {
          if (this.article.author.following) {
            // 取消关注
            const { data } = await unfollowUser(this.article.author.username)
            this.article.author.following = data.profile.following
          }else{
            // 关注
            const { data } = await followUser(this.article.author.username)
            this.article.author.following = data.profile.following
          }
        }
        
      },
      async onFavorite () {
        console.log(this.$store.state.user)
        if (!this.$store.state.user) {
          this.$router.push({name:'login'})
        } else {
          const article = this.article
          article.favoriteDisable = true
          const onFavorite = article.favorited ? deleteFavorite : addFavorite
          console.log(article.slug)
          const { data } = await onFavorite(article.slug)
          article.favorited = data.article.favorited
          article.favoritesCount = data.article.favoritesCount
          article.favoriteDisable = false
        }
      },
      onEditor(){
        this.$router.push({name: 'editor', query: {slug: this.article.slug}})
      },
      async onDelete(){
        const { data } = await deleteArticle(this.article.slug)
        this.$router.push({name: 'home', query: {tab:'your'}})
      },
        
    }
}
</script>

<style>

</style>