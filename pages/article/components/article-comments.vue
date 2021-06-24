<template>
  <div>
       <form class="card comment-form" @submit.prevent="postComment">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment.body" required></textarea>
          </div>
          <div class="card-footer">
            <img :src="$store.state.user.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>
        
        <div class="card" v-for="comment in comments" :key="comment.id">
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}" class="comment-author">
              <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}" class="comment-author">{{comment.author.username}}</nuxt-link>
            <span class="date-posted">{{comment.createdAt | date('MMM DD,YYYY')}}</span>
          </div>
        </div>
  </div>
</template>

<script>
import { getComments, postComment } from '@/api/article'

export default {
    name: "ArticleComments",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            comments: [],
            comment: {
                body: ""
            }
        }
    },
    async mounted () {
        const { data } = await getComments(this.slug)
        this.comments = data.comments
    },
    methods: {
        async postComment () {
            const { data } = await postComment({slug: this.slug, comment: this.comment})
            this.comments.unshift(data.comment)
            this.comment.body = ""
        }
    }

}
</script>

<style>

</style>