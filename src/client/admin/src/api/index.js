/**
 * Created by syang on 2017/6/6.
 */
import axios from 'axios'

const baseURL = 'localhost:3000'
const baseWeb = 'localhost:3000'

axios.defaults.timeout = 10000
axios.defaults.baseURL = baseURL // baseURL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

function post (url, params) {
    return axios.post(url, params)
}

function get (url, params) {
    return axios.get(url, params)
}

function getNoArgs (url) {
    return axios.get(url)
}

function login (parmas) {
    return post('/api/user/login', parmas)
}

function register (parmas) {
    return post('api/user/register', parmas)
}

function logout () {
    return post('api/user/logout')
}

function modifyPassword (parmas) {
    return post('/api/user/password/modify', parmas)
}

function modify (parmas) {
    return post('/api/user/modify', parmas)
}

function getUserInfo () {
    return getNoArgs('/api/user/info')
}

function getOtherUserInfo (_parmas) {
    return get('/api/user/info', {params: _parmas})
}

function getRecords () {
    return getNoArgs('/api/user/records')
}

export default {
    register,
    login,
    logout,
    modifyPassword,
    modify,
    getUserInfo,
    getOtherUserInfo,
    getRecords,
    baseURL,
    baseWeb
}
