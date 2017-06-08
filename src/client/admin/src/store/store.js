/**
 * Created by syang on 2017/5/28.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    },
    getters
})

export default store
