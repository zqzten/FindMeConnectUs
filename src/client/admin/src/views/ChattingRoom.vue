<template>
    <div class="animated fadeIn" ref="scroll">
        <div class="wrap">
            <div class="message-list">
                <div class="" v-for="(item, index) in messageList">
                    <div v-if="item.type === 2" class="row row-left">
                        <div class="avatar">
                            <img :src="item.msgUser.avatar" class="img-rounded"/>
                        </div>
                        <div class="text-box">
                            <div class="user-left">{{ item.msgUser.username }}</div>
                            <div class="text-left"><span class="horn">◀</span><span class="text">{{ item.msg }}</span>
                            </div>
                        </div>
                        <br style="clear: both;"/>
                    </div>
                    <div v-if="item.type === 3" class="row row-right">
                        <div class="avater">
                            <img :src="avatar" class="img-rounded">
                        </div>
                        <div class="text-box">
                            <div class="user-right">{{ item.msgUser.username }}</div>
                            <div class="text-right"><span class="text-me">{{ item.msg }}</span><span class="horn-me">▶</span>
                            </div>
                        </div>
                        <br style="clear: both;"/>
                    </div>
                    <div v-if="item.type === 1" class="row row-center">
                        <span class="tip">{{ item.msg }}</span>
                    </div>
                </div>
            </div>
        </div>
        <footer class="message-box">
            <div class="col-sm-12 card">
                <div class="card-block">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-ms-6 col-lg-11">
                                <input type="text" class="form-control" id="name"
                                       placeholder="Enter your message"
                                       v-model="inputValue" @keyup.enter="send" v-show="connectState">
                                <input type="text" class="input" disabled v-show="!connectState"
                                       v-model="inputValue"/>
                            </div>
                            <div class="col-ms-6 col-lg-1">
                                <button class="btn btn-info" :class="{logout: !connectState}"
                                        @click="send">
                                    发送
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import io from 'socket.io-client'

    import api from '../api'

    export default {
        name: 'chatting-room',
        components: {},
        data () {
            return {
                onlineUserList: {},
                messageList: [],
                inputValue: '',
                connectState: false,
                chat_socket: null
            }
        },
        created () {
            this.messageList = []
            /* type = 1 提示信息     type = 2 对方内容     type = 3 我发送内容 */
        },
        computed: {
            ...mapGetters([
                'user_id',
                'username',
                'avatar'
            ])
        },
        updated () {
            this.scroll()
        },
        methods: {
            join () {
                this.chat_socket.emit('join', this.user_id)
            },
            send () {
                this.message = this.trim(this.inputValue)
                if (this.message.length > 0) {
                    this.chat_socket.emit('msg', this.message)
                    this.inputValue = ''
                }
            },
            trim (s) {
                return s.replace(/(^\s*)|(\s*$)/g, '')
            },
            scroll () {
                this.$refs.scroll.scrollTop = this.$refs.scrollHeight
            },
            pushUsers (userID) {
                let otherUserAvatar = 0
                let otherUserUsername = ''
                api.getOtherUserInfo({id: userID}).then(response => {
                    otherUserAvatar = './static/img/avatars/' + response.data['avatarID'] + '.jpg'
                    otherUserUsername = response.data['username']
                    this.onlineUserList[userID] = {_avatar: otherUserAvatar, _username: otherUserUsername}
                }).catch(error => console.log(error))
            },
            popUsers (userID) {
                delete this.onlineUserList[userID]
            },
            joined (userID) {
                return new Promise((resolve, reject) => {
                    let otherUserAvatar = 0
                    let otherUserUsername = ''
                    api.getOtherUserInfo({id: userID}).then(response => {
                        otherUserAvatar = './static/img/avatars_g/' + response.data['avatarID'] + '.jpg'
                        otherUserUsername = response.data['username']
                        this.onlineUserList[userID] = {_avatar: otherUserAvatar, _username: otherUserUsername}
                        resolve(response)
                    }).catch(error => {
                        console.log(error.response)
                        reject(error)
                    })
                })
            },
            putMessage (username, avatar, msg, type) {
                this.messageList.push({
                    type: type,
                    msg: msg,
                    msgUser: {
                        username: username, avatar: avatar
                    }
                })
            }
        },
        mounted () {
            this.chat_socket = io(api.baseURL + '/chat')
            this.join()
            this.connectState = true
            let self = this
            this.chat_socket.on('left', function (userID) {
                self.messageList.push({
                    type: 1,
                    msg: '用户 ' + self.onlineUserList[userID]._username + ' 退出聊天',
                    msgUser: null
                })
                delete self.onlineUserList[userID]
            })
            this.chat_socket.on('joined', function (userID) {
                console.log('join: ' + userID)
                let otherUserAvatar = 0
                let otherUserUsername = ''
                api.getOtherUserInfo({id: userID}).then(response => {
                    otherUserAvatar = './static/img/avatars/' + response.data['avatarID'] + '.jpg'
                    otherUserUsername = response.data['username']
                    self.onlineUserList[userID] = {_avatar: otherUserAvatar, _username: otherUserUsername}
                    self.messageList.push({type: 1, msg: '用户 ' + otherUserUsername + ' 加入聊天', msgUser: null})
                }).catch(error => console.log(error))
            })
            this.chat_socket.on('msg received', function (obj) {
                let userID = obj.userID
                let msg = obj.msg
                let user = self.onlineUserList[userID]
                if (user === undefined) {
                    self.joined(userID).then(() => {
                        user = self.onlineUserList[userID]
                        self.putMessage(user._username, user._avatar, msg, 2)
                    })
                } else {
                    if (userID === self.user_id) {
                        self.putMessage(self.username, self.avatar, msg, 3)
                    } else {
                        self.putMessage(user._username, user._avatar, msg, 2)
                    }
                }
            })
        }
    }
</script>

<style scoped>
    .form-group {
        margin-bottom: 0;
    }

    .message-list {
        flex: 1;
    }

    .message-box {
        flex: 0 0 60px;
    }

    .wrap {
        display: flex;
        min-height: 54vh;
        flex-direction: column;
    }

    footer {
        height: 80px;
    }

    .row {
        margin: 4px 5px;
    }

    .row-right {
        display: flex;
        flex-direction: row-reverse;
    }

    .row-center {
        display: flex;
        justify-content: center;
    }

    .row-left {
        display: flex;
        justify-content: flex-start;
    }

    .avatar img {
        max-width: 40px;
        max-height: 40px;
    }

    .tip {
        padding: 3px 6px;
        margin: 2px 3px;
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 12px;
        line-height: 12px;
    }

    .text {
        background: #39b2d5;
        margin-left: -2px;
        margin-right: -2px;
        padding: 6px;
    }

    .text-me {
        background: #1dd500;
        margin-left: -2px;
        margin-right: -2px;
        padding: 6px;
    }

    .text-left {
        color: #fff;
    }

    .text-right {
        color: #fff;
        text-align: right;
    }

    .horn {
        color: #39b2d5;
        margin: 0;
    }

    .horn-me {
        color: #1dd500;
        margin: 0;
    }

    .user-left {
        text-align: left;
        margin-bottom: 5px;
        margin-left: 5px;
        font-size: 12px;
        color: #aaa;
        line-height: 12px;
    }

    .user-right {
        text-align: right;
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 12px;
        color: #aaa;
        line-height: 12px;
    }

    .text-box {
        max-width: 100%;
        display: block;
    }

    .img-rounded {
        width: 40px;
        height: 40px;
    }
</style>
