<template>
<div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <div class="article-meta">
        <article-meta :article="article"></article-meta>
      </div>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <div class="article-meta">
        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <article-comments :slug="article.slug" v-if="$store.state.user"></article-comments>
        
      </div>

    </div>

  </div>

</div>

</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import articleMeta from './components/article-meta.vue'
import ArticleComments from './components/article-comments.vue'

export default {
  components: { articleMeta, ArticleComments },
  name: 'ArticleIndex',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: data.article
    }
  },
  head() {
      return {
        title: this.article.title + "- RealWorld",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    }
}
</script>

<style>

</style>