// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueSocketio from 'vue-socket.io'
import iView from 'iview'
import api from './api'

Vue.config.productionTip = false
Vue.use(VueSocketio, api.baseURL + '/room')
Vue.use(iView)

const whiteList = ['/pages/Login', '/pages/Register', '/pages/Page404', '/pages/Page500']
router.beforeEach((to, from, next) => {
    if (store.getters.user_id !== '-1') { // 判断是否有token
        if (whiteList.indexOf(to.path) !== -1) {
            next('hall')
        }
        next()
        /*
         if (to.path === '/login') {
         next({ path: '/' })
         } else {
         if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
         store.dispatch('GetInfo').then(res => { // 拉取user_info
         const roles = res.data.role;
         store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
         router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
         next(to.path); // hack方法 确保addRoutes已完成
         })
         }).catch(err => {
         console.log(err);
         })
         }
         }
         */
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            store.dispatch('setUserInfo').then(() => {
                if (store.getters.user_id !== '-1') { // 在免登录白名单，直接进入
                    console.log('here')
                    next()
                } else {
                    next('/pages/Login')
                }
            }).catch(() => {
                next('/pages/Login')
            })
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
