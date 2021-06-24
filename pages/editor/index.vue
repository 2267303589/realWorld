<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onCommit">
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" required v-model="article.title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" required v-model="article.description">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" required v-model="article.body"> </textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="article.tagList"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { publishArticle, updateArticle, getArticle } from '@/api/article' 
export default {
  middleware: 'auth',
  name: 'Editor',
  data(){
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: ""
      }      
    }
  },
  async created () {
    const slug = this.$route.query.slug
    if (slug) {
      const { data } = await getArticle(slug)
      data.article.tagList = data.article.tagList.join(',')
      this.article = data.article
    
    }
  },
  methods: {
    async onCommit () {
      this.article.tagList = this.article.tagList ? this.article.tagList.split(',') : []

      if (this.article.slug) {
        // 修改
        const { data } = await updateArticle({article:this.article, slug: this.article.slug})
        this.$router.push({name:'article', params: {slug: data.article.slug}})
      }
      else {
        // 新增
        const { data } = await publishArticle(this.article)
        this.$router.push({name:'article', params: {slug: data.article.slug}})
      }
    }
  }
}
</script>

<style>

</style>