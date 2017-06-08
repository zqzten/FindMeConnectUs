<template>
    <div class="animated fadeIn" ref="scroll">
        <div class="wrap">
            <div class="message-list">
                <div class="" v-for="(item, index) in messageList">
                    <div v-if="item.type === 2" class="row row-left">
                        <div class="avater">
                            <img src="static/img/images/1.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 1"/>
                            <img src="static/img/images/2.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 2"/>
                            <img src="static/img/images/3.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 3"/>
                            <img src="static/img/images/4.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 4"/>
                            <img src="static/img/images/5.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 5"/>
                            <img src="static/img/images/6.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 6"/>
                            <img src="static/img/images/7.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 7"/>
                            <img src="static/img/images/8.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 8"/>
                            <img src="static/img/images/9.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 9"/>
                            <img src="static/img/images/10.png" class="img-rounded"
                                 v-if="item.msgUser.userImg === 10"/>
                        </div>
                        <div class="">
                            <div class="user-left">{{ item.msgUser.username }}</div>
                            <div class="text-left"><span class="horn">◀</span>{{ item.msg }}</div>
                        </div>
                        <br style="clear: both;"/>
                    </div>
                    <div v-if="item.type === 3" class="row row-right">
                        <div class="avater">
                            <img src="static/img/images/1.png" class="img-rounded"
                                 v-if="userInfo.userImg === 1"/>
                            <img src="static/img/images/2.png" class="img-rounded"
                                 v-if="userInfo.userImg === 2"/>
                            <img src="static/img/images/3.png" class="img-rounded"
                                 v-if="userInfo.userImg === 3"/>
                            <img src="static/img/images/4.png" class="img-rounded"
                                 v-if="userInfo.userImg === 4"/>
                            <img src="static/img/images/5.png" class="img-rounded"
                                 v-if="userInfo.userImg === 5"/>
                            <img src="static/img/images/6.png" class="img-rounded"
                                 v-if="userInfo.userImg === 6"/>
                            <img src="static/img/images/7.png" class="img-rounded"
                                 v-if="userInfo.userImg === 7"/>
                            <img src="static/img/images/8.png" class="img-rounded"
                                 v-if="userInfo.userImg === 8"/>
                            <img src="static/img/images/9.png" class="img-rounded"
                                 v-if="userInfo.userImg === 9"/>
                            <img src="static/img/images/10.png" class="img-rounded"
                                 v-if="userInfo.userImg === 10"/>
                        </div>
                        <div class="text-box">
                            <div class="user-right">{{ item.msgUser.username }}</div>
                            <div class="text-right"><span class="text">{{ item.msg }}</span><span class="horn">▶</span></div>
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
                                       v-model="inputValue" @keyup.enter="sendEvent" v-show="connectState">
                                <input type="text" class="input" disabled v-show="!connectState"
                                       v-model="inputValue"/>
                            </div>
                            <div class="col-ms-6 col-lg-1">
                                <button class="btn btn-info" :class="{logout: !connectState}"
                                        @click="sendEvent">
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

<style>
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

    .avater img {
        max-width: 40px;
        max-height: 40px;
    }

    .tip{
        padding: 3px 6px;
        margin: 2px 3px;
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 12px;
        line-height: 12px;
    }

    .text{
        background: #39b2d5;
        margin-left: -2px;
        margin-right: -2px;
        padding: 4px;
    }

    .text-left {
        font-size: 0;
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

    .text-box{
        max-width: 100%;
        display: block;
    }
</style>

<script>
    /* eslint-disable no-new */
    import { mapGetters } from 'vuex'

    export default {
        name: 'chatting-room',
        components: {},
        data () {
            return {
                userInfo: {},
                onlineUserList: [],
                messageList: [],
                inputValue: '',
                connectState: false
            }
        },
        created () {
            this.userInfo = {}
            this.messageList = []
            /* type = 1 提示信息     type = 2 对方内容     type = 3 我发送内容 */
        },
        computed: {
            ...mapGetters([
                'username',
                'avatar'
            ])
        },
        updated () {
            this.scroll()
        },
        sockets: {
            login: function (obj) {
                console.log(obj)
                this.onlineUserList = obj.onlineUserList
                this.messageList.push({type: 1, msg: '用户 ' + obj.msgUser.username + ' 加入聊天', msgUser: obj.msgUser})
            },
            loginSuccess: function (obj) { /* 1 成功 */
                if (obj.sign === 1) {
                    this.onlineUserList = obj.onlineUserList
                    this.connectState = true
                    /* 登录状态 */
                    this.headerConfig.left = this.userInfo.userImg.toString()
                    console.log('连接!')
                }
            },
            logout: function (obj) {
                this.messageList.push({type: 1, msg: '用户 ' + obj.msgUser.username + ' 退出聊天', msgUser: obj.msgUser})
            },
            message: function (obj) {
                console.log(obj)
                this.onlineUserList = obj.onlineUserList
                this.messageList.push({type: 2, msg: obj.msg, msgUser: obj.user})
            }
        },
        methods: {
            connectEvent () {
                this.userInfo = {
                    username: this.username,
                    userImg: this.avatar
                }
                this.$socket.emit('login', this.userInfo)
                this.onlineUserList.push(this.userInfo)
            },
            unConnectEvent () {

            },
            configEvent () {
                console.log('聊天室设置触发事件')
            },
            loginEvent () {
                console.log('加入聊天室事件')
                console.log(this.connectState)
                if (!this.connectState) {
                    this.$refs.confirm.modelOpen()
                }
            },
            headCenterEvent () {
                if (this.connectState) {
                    console.log('弹出群组全部成员弹窗事件')
                    this.$refs.pop.modelOpen()
                    console.log(this.onlineUserList)
                }
            },
            alertBtnEvent () {
                console.log('alert弹窗确认事件')
            },
            sendEvent () {
                this.inputValue = this.trim(this.inputValue)
                if (this.inputValue.length > 0) {
                    if (this.connectState) {
                        this.$socket.emit('message', {msg: this.inputValue, user: this.userInfo})
                        this.messageList.push({type: 3, msg: this.inputValue, msgUser: this.userInfo})
                        this.inputValue = ''
                    }
                }
            },
            trim (s) {
                return s.replace(/(^\s*)|(\s*$)/g, '')
            },
            confirmBtnEvent (num) {
                if (num === 1) {
                    this.connectEvent()
                }
            },
            scroll () {
                this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
            }
        }
    }
</script>
