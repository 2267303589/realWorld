import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _405df128 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _a53dacbe = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _02075a32 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _0a5a05a7 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _5bb28036 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _57fba4a2 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _1db76e18 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _405df128,
    children: [{
      path: "",
      component: _a53dacbe,
      name: "home"
    }, {
      path: "/login",
      component: _02075a32,
      name: "login"
    }, {
      path: "/register",
      component: _02075a32,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _0a5a05a7,
      name: "profile"
    }, {
      path: "/settings",
      component: _5bb28036,
      name: "settings"
    }, {
      path: "/editor",
      component: _57fba4a2,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _1db76e18,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
