import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _72ddea1c = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _7aa6f851 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _4b1f4b92 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _4e2d0e12 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _54f492d6 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _670f105f = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _80988778 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _72ddea1c,
    children: [{
      path: "",
      component: _7aa6f851,
      name: "home"
    }, {
      path: "/login",
      component: _4b1f4b92,
      name: "login"
    }, {
      path: "/register",
      component: _4b1f4b92,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _4e2d0e12,
      name: "profile"
    }, {
      path: "/settings",
      component: _54f492d6,
      name: "settings"
    }, {
      path: "/editor",
      component: _670f105f,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _80988778,
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
