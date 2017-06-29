import Cookies from 'js-cookie'
import { formatDate } from '../../utils'
import api from '../../api'

const user = {
    state: {
        token: Cookies.get('token'),
        user_id: '-1',
        username: '',
        avatar: 'static/img/avatars/0.jpg',
        registered_date: '2017/04/08',
        games: '0',
        signature: '',
        model: 'none'
    },

    mutations: {
        SET_USERID: (state, id) => {
            state.user_id = id
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = 'static/img/avatars/' + avatar + '.jpg'
        },
        SET_DATE: (state, date) => {
            console.log(formatDate(date))
            state.registered_date = formatDate(date)
        },
        SET_GAMES: (state, games) => {
            state.games = games
        },
        SET_SIGNATURE: (state, signature) => {
            console.log(signature)
            state.signature = signature
        },
        SET_MODEL: (state, model) => {
            state.model = 'static/models/' + model + '/model.json'
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = ''
        }
    },
    actions: {
        setUserInfo ({commit}) {
            return new Promise((resolve, reject) => {
                api.getUserInfo().then(response => {
                    commit('SET_USERNAME', response.data['username'])
                    commit('SET_USERID', response.data['id'])
                    commit('SET_AVATAR', response.data['avatarID'])
                    commit('SET_GAMES', response.data['gameCount'])
                    commit('SET_DATE', response.data['createdAt'])
                    commit('SET_SIGNATURE', response.data.signature)
                    commit('SET_MODEL', response.data['modelID'])
                    resolve(response)
                }).catch(error => {
                    console.log(error.response)
                    reject(error)
                })
            })
        },
        setSignature ({commit}, signature) {
            commit('SET_SIGNATURE', signature)
        }
    }
}

export default user
