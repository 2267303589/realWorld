<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <ul class="error-messages">
          <template v-for="(value, key) in error">
            <li v-for="item in value" :key="item">{{key}} {{item}}</li>
          </template>
        </ul> 

        <form @submit.prevent="updateUser">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" required v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" required v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8" v-model="user.password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import { updateUser } from '@/api/user'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
    middleware: 'auth',
    name: 'SettingsIndex',
    data(){
      return {
        user:{
          email: "",
          username: "",
          bio: "",
          password: "",
          image: ""
        },
        error: {}
      }
    },
    methods: {
      async updateUser() {
        try {
          const { data } = await updateUser(this.user)
          // 保存登陆状态
          this.$store.commit('setUser', data.user);

          // 持久化登录状态
          Cookie.set('user', data.user)

          this.$router.push({name:'profile', params: {username: data.user.username}})
        } catch (error) {
          this.error = error.response.data.errors
        }
       
      }
    }
}
</script>

<style>

</style>