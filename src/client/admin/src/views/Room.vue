<template>
    <div class="background">
        <audio src="static/audio/ui_wait.mp3" preload="auto" id="music" loop="loop"></audio>
        <div class="wrap">
            <Row>
                <i-col span="4" class="leave-button">
                    <Button type="error" @click="leave" class="pad" size="large" long>
                        <span>返回大厅</span>
                    </Button>
                </i-col>
                <i-col span="8" offset="3" class="center" v-if="gameStatus === 0">
                    <Card :bordered=false class="card-r" :padding="10">
                        <Button type="info" @click="makeRoom" class="pad" size="large" long>
                            <span>创建房间</span>
                        </Button>
                        <Button type="info" @click="addRoom" class="pad" size="large" long>
                            <span>加入房间</span>
                        </Button>
                    </Card>
                </i-col>
                <i-col span="8" offset="3" class="center" v-if="gameStatus === 1 || gameStatus === 2">
                    <Card :bordered=false class="card-r" :padding="10">
                        <Input v-model="room" size="large" placeholder="请输入房间号" class="pad-sure"></Input>
                        <Tooltip content="地图长宽" placement="left" class="center-left" v-if="gameStatus === 1">
                                    <Input-number :max="10" :min="4" v-model="mapLength" size="large"
                                                  class="input-number"></Input-number>
                                    <Input-number :max="10" :min="4" v-model="mapWidth" size="large"
                                                  class="input-number"></Input-number>
                        </Tooltip>
                        <Button type="info" @click="submit" class="pad-sure" size="large" v-if="!loading">
                            <span>确认</span>
                        </Button>
                        <Button type="info" loading class="pad-sure" size="large" v-else>
                            <span>请求发送中</span>
                        </Button>
                        <Button type="info" @click="cancel" class="pad-cancel" size="large">
                            <span>取消</span>
                        </Button>
                    </Card>
                </i-col>
                <i-col span="10" offset="2" class="center" v-if="gameStatus === 3 || gameStatus === 4 || gameStatus === 5">
                    <Card :bordered=false class="card-r">
                    <Row>
                        <i-col v-for="{_id, _username, _avatar, _isReady} in users" span="6">
                            <img :src="_avatar" v-bind:class="[_isReady ? 'ready' : 'not-ready']">
                            <p class="text-center">{{ _username }}</p>
                        </i-col>
                    </Row>
                        <Button type="success" @click="ready()" class="pad-sure" size="large" v-if="this.gameStatus === 3">
                            <span>准备开始</span>
                        </Button>
                        <Button type="warning" @click="notReady" class="pad-sure" size="large" v-if="this.gameStatus === 4">
                            <span>取消准备</span>
                        </Button>
                        <a :src="gameLink"><Button type="error" size="large"
                                class="pad-sure" v-if="gameStatus === 5">
                            <span>游戏开始!</span>
                        </Button></a>
                    </Card>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
    import 'iview/dist/styles/iview.css'
    import { mapGetters } from 'vuex'
    import api from '../api'
    import router from '../router'
    import Vue from 'vue'
    import Cookie from 'js-cookie'

    export default {
        name: 'room',
        data () {
            return {
                gameStatus: 0,
                room: '',
                mapLength: 4,
                mapWidth: 4,
                users: [],
                gameID: -1,
                gameLink: '',
                loading: false
            }
        },
        computed: {
            ...mapGetters([
                'user_id',
                'username',
                'avatar'
            ])
        },
        create () {
            this.users = []
        },
        sockets: {
            'joined': function (userID) {
                this.pushUsers(userID, false)
            },
            'left': function (userID) {
                this.popUsers(userID)
            },
            'is ready': function (userID) {
                this.makeReady(userID, true)
            },
            'is not ready': function (userID) {
                this.makeReady(userID, false)
            },
            'game start': function (gameID) {
                console.log('game start')
                Cookie.set('userID', this.user_id)
                Cookie.set('gameID', gameID)
                this.gameID = gameID
                this.gameStatus = 5
                this.gameLink = api.baseWeb + '/main/' // gameLink can be replaced by the true link
                window.location.href = this.gameLink
                window.location.replace(this.gameLink)
            }
        },
        methods: {
            makeRoom () {
                this.gameStatus = 1
            },
            addRoom () {
                this.gameStatus = 2
            },
            submit () {
                this.loading = true
                if (this.gameStatus === 1) {
                    this.create()
                } else if (this.gameStatus === 2) {
                    this.join()
                }
            },
            online () {
                this.$socket.emit('online', this.user_id)
            },
            create () {
                let room = this
                this.$socket.emit('create',
                    this.room,
                    this.mapLength,
                    this.mapWidth
                , function (success) {
                    if (!success) {
                        console.log('error')
                        room.error('房间已经存在')
                    } else {
                        room.users.push({_id: room.user_id, _avatar: room.avatar, _isReady: false, _username: room.username})
                        room.gameStatus = 3
                    }
                    room.loading = false
                })
            },
            join () {
                console.log('Try to join')
                let room = this
                this.$socket.emit('join', this.room, function (success, users, size) {
                    if (success) {
                        this.mapLength = size.mapLength
                        this.mapWidth = size.mapWidth
                        for (let user of users) {
                            room.pushUsers(user[0], user[1])
                        }
                        room.users.push({_id: room.user_id, _avatar: room.avatar, _isReady: false, _username: room.username})
                        room.gameStatus = 3
                    } else {
                        console.log('error')
                        if (users === 'room_not_exist') {
                            room.error('房间不存在')
                        } else if (users === 'room_full') {
                            room.error('房间已满')
                        }
                    }
                    room.loading = false
                })
            },
            leave () {
                this.$socket.emit('leave')
                router.push('hall')
            },
            ready () {
                this.$socket.emit('ready')
                this.gameStatus = 4
                this.makeReady(this.user_id, true)
                let audio = document.getElementById('music')
                audio.play()
            },
            notReady () {
                this.$socket.emit('not ready')
                this.gameStatus = 3
                this.makeReady(this.user_id, false)
                let audio = document.getElementById('music')
                audio.pause()
                audio.currentTime = 0
            },
            pushUsers (userID, isReady) {
                let otherUserAvatar = 0
                let otherUserUsername = ''
                api.getOtherUserInfo({id: userID}).then(response => {
                    otherUserAvatar = './static/img/avatars/' + response.data['avatarID'] + '.jpg'
                    otherUserUsername = response.data['username']
                    this.users.push({_id: userID, _avatar: otherUserAvatar, _isReady: isReady, _username: otherUserUsername})
                }).catch(error => console.log(error))
            },
            popUsers (userID) {
                let index = this.findUsers(userID, this.users)
                if (index > -1) {
                    this.users.splice(index, 1)
                }
            },
            findUsers (userID, list) {
                console.log(list)
                for (let i = 0; i < list.length; i++) {
                    if (list[i]._id === userID) {
                        return i
                    } else {
                        console.log(list[i]._id)
                        console.log(userID)
                    }
                }
                return -1
            },
            cancel () {
                this.gameStatus = 0
            },
            startGame () {
                this.gameLink = api.baseWeb + '/main/'
                window.location.href = this.gameLink
                window.location.replace(this.gameLink)
            },
            makeReady (userID, bool) {
                let index = this.findUsers(userID, this.users)
                console.log(index)
                let id = this.users[index]._id
                let avatar = this.users[index]._avatar
                let username = this.users[index]._username
                Vue.set(this.users, index, {_id: id, _avatar: avatar, _isReady: bool, _username: username})
            },
            error (error) {
                this.$Message.error(error)
            },
            success (message) {
                this.$Message.success(message)
            }
        },
        mounted () {
            this.online()
        },
        created () {
            this.$Message.config({
                top: 64
            })
        }
    }
</script>

<style scoped>
    .wrap {
        width: 100%;
        height: 100%;
    }

    .background {
        width: 100%;
        height: 100%;
        min-height: 75vh;
        min-width: 200vh;
        margin-left: -30px;
        margin-top: -25px;

        background: url("../../static/img/background/6.jpg") no-repeat bottom center scroll;
        background-color: black;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        background-size: cover;
        -o-background-size: cover;
    }

    .center {
        margin-top: 5%;
        min-height: 36vh;
        max-height: 36vh;
    }

    .pad {
        margin: 30px 20%;
        width: 60%;
        font-size: 20px;
    }

    .pad-sure {
        margin: 17px 20%;
        width: 60%;
    }

    .pad-cancel {
        margin: 10px 20%;
        width: 60%;
    }

    .input-number {
        width: 49%;
    }

    .card-r {
        background-color: rgba(255, 255, 255, 0.618);
    }

    .center-left {
        margin: 0 20%;
        width: 60%;
    }

    .leave-button {
        margin-top: 25%;
    }

    .ready {
        width: 100%;
        height: 100%;
    }

    .not-ready {
        width: 100%;
        height: 100%;
        opacity: 0.4;
    }

    .text-center {
        text-align: center;
    }
</style>
