<template>
    <div class="animated fadeIn">
        <Row>
            <i-col span="18" offset="3">
                <Card dis-hover>
                    <p slot="title"><i class="fa fa-align-justify"></i> Information</p>
                    <a slot="extra">
                        <i-switch v-model="edit" style="margin-right: 5px"></i-switch>
                    </a>
                    <div>
                        <table class="table">
                            <tbody>
                            <tr>
                                <th>Nickname</th>
                                <td colspan="5">{{username}}</td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td colspan="5" v-show="!edit">{{password}}</td>
                                <td colspan="2" v-show="edit"><Input placeholder="原密码" size="small" type="password"
                                                                     v-model="oldPassword"></Input></td>
                                <td colspan="2" v-show="edit"><Input placeholder="新密码" size="small" type="password"
                                                                     v-model="newPassword"></Input></td>
                                <td v-show="edit">
                                    <Button type="success" size="small" long @click="changePassword">保存密码</Button>
                                </td>
                            </tr>
                            <tr>
                                <th>Date registered</th>
                                <td colspan="5">{{ registered_date }}</td>
                            </tr>
                            <tr>
                                <th>Games</th>
                                <td colspan="5"> {{ games }}</td>
                            </tr>
                            <tr>
                                <th>Signature</th>
                                <td colspan="5" v-show="!edit">{{ signature }}</td>
                                <td colspan="4" v-show="edit"><Input placeholder="在此修改签名" size="small"
                                                                     v-model="Signature"></Input></td>
                                <td v-show="edit">
                                    <Button type="success" size="small" long @click="saveSignature">保存签名</Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import 'iview/dist/styles/iview.css'
    import { mapGetters } from 'vuex'
    import api from '../api'
    import store from '../store/store'

    export default {
        name: 'information',
        components: {},
        data () {
            return {
                password: '******',
                Signature: '',
                oldPassword: '',
                newPassword: '',
                edit: false
            }
        },
        computed: {
            ...mapGetters([
                'username',
                'user_id',
                'registered_date',
                'games',
                'signature'
            ])
        },
        created () {
            this.$Message.config({
                top: 64
            })
        },
        methods: {
            changePassword () {
                console.log('try to modify password')
                api.modifyPassword({oldPassword: this.oldPassword, newPassword: this.newPassword}).then(response => {
                    this.edit = false
                    this.success('修改密码成功')
                }).catch(error => {
                    console.log(error.response)
                    if (error.response.data.code === 'password_mismatch') {
                        this.error('原密码错误')
                    } else if (error.response.data.code === 'request_invalid') {
                        this.error('请求格式不正确')
                    }
                })
            },
            saveSignature () {
                if (this.Signature !== '') {
                    api.modify(this.Signature).then(response => {
                        if (response.status === 200) {
                            this.edit = false
                            this.success('修改签名成功')
                            store.dispatch('setSignature', this.Signature)
                        }
                    }).catch(error => {
                        console.log('签名修改')
                        if (error.response.data.code === 'request_invalid') {
                            this.$Notice.warning({
                                title: '格式不正确'
                            })
                            this.error('请求格式不正确')
                        }
                    })
                } else {
                    this.error('新签名不能为空')
                }
            },
            success (message) {
                this.$Message.success(message)
            },
            error (message) {
                this.$Message.error(message)
            }
        }

    }
</script>

<style scoped>
    #save {
        margin: auto;
        width: 30%;
        height: 100%;

    }

    th {
        width: 160px;
        font-size: 16px;
    }
</style>
