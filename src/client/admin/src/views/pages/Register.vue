<template>
    <div>
        <Row type="flex" align="middle">
            <i-col span="10" offset="7">
                <Card class="" dis-hover class="card-box">
                    <p slot="title" class="card-header-r">SIGN UP</p>
                    <router-link :to="'/pages/Login'" slot="extra" class="card-header-r">
                        <Icon type="ios-compose"></Icon>
                        Sign In
                    </router-link>
                    <Steps :current="3" direction="vertical">
                        <Step title="个人信息" content="">
                            <Form ref="form" :model="form" :rules="rule" class="form">
                                <Form-item prop="username">
                                    <Input type="text" v-model="form.username" placeholder="Username" size="large">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                    </Input>
                                </Form-item>
                                <Form-item prop="password">
                                    <Input type="password" v-model="form.password" placeholder="Password" size="large">
                                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                    </Input>
                                </Form-item>
                                <Form-item prop="desc">
                                    <Input v-model="form.signature" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                           placeholder="请输入个人签名..." size="large"></Input>
                                </Form-item>
                            </Form>
                        </Step>
                        <Step title="选择头像" content="">
                            <Radio-group v-model="form.avatarID">
                                <Row>
                                    <i-col v-for="{url,id} in avatars" v-bind:url="url" v-bind:id="id" span="6"
                                           class="img-col">
                                        <img :src="url">
                                        <Radio :label="id" class="radio"></Radio>
                                    </i-col>
                                </Row>
                            </Radio-group>
                        </Step>
                        <Step title="选择模型" content="">
                            <Radio-group v-model="form.modelID">
                                <Row>
                                    <template v-for="{url, id} in models" v-bind:url="url" v-bind:id="id">
                                        <i-col span="6" class="img-col">
                                            <model-three :src="url" :backgroundAlpha="0"></model-three>
                                            <Radio :label="id" class="radio"></Radio>
                                        </i-col>
                                    </template>
                                </Row>
                            </Radio-group>
                        </Step>
                    </Steps>
                    <Button type="primary" @click="register" long size="large" class="submit">Sign Up
                    </Button>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import 'iview/dist/styles/iview.css'
    import { ModelThree } from 'vue-3d-model'
    import api from '../../api'
    import router from '../../router'

    export default {
        name: 'Register',
        data () {
            return {
                form: {
                    username: '',
                    password: '',
                    avatarID: 0,
                    modelID: 0,
                    signature: ''
                },
                rule: {
                    username: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ],
                    signature: [
                        {required: true, message: '请输入个人签名', trigger: 'blur'},
                        {type: 'string', min: 10, message: '介绍不能少于10字', trigger: 'blur'}
                    ]
                },
                avatars: [
                    {url: '/static/img/avatars/0.jpg', id: 0},
                    {url: '/static/img/avatars/1.jpg', id: 1},
                    {url: '/static/img/avatars/2.jpg', id: 2},
                    {url: '/static/img/avatars/3.jpg', id: 3},
                    {url: '/static/img/avatars/4.jpg', id: 4},
                    {url: '/static/img/avatars/5.jpg', id: 5},
                    {url: '/static/img/avatars/6.jpg', id: 6},
                    {url: '/static/img/avatars/7.jpg', id: 7},
                    {url: '/static/img/avatars/8.jpg', id: 8},
                    {url: '/static/img/avatars/9.jpg', id: 9},
                    {url: '/static/img/avatars/10.jpg', id: 10},
                    {url: '/static/img/avatars/11.jpg', id: 11}
                ],
                models: [
                    {url: '/static/models/0/model.json', id: 0},
                    {url: '/static/models/1/model.json', id: 1},
                    {url: '/static/models/2/model.json', id: 2},
                    {url: '/static/models/3/model.json', id: 3}
                ]
            }
        },
        components: {
            ModelThree
        },
        methods: {
            register () {
                const data = {
                    username: this.form['username'],
                    password: this.form['password'],
                    avatarID: this.form['avatarID'],
                    modelID: this.form['modelID'],
                    signature: this.form['signature']
                }
                api.register(data).then(response => {
                    if (response.status === 200) {
                        router.push({path: '/hall'})
                    }
                }).catch(error => {
                    console.log(error.response)
                    if (error.response.data.code === 'username_existed') {
                        this.error('用户名已经存在')
                    }
                })
            },
            error (error) {
                this.$Message.error(error)
            }
        }
    }
</script>


<style>
    .card-box {
        width: 100%;
    }

    .img-col {
        margin: 3px 0;
    }

    img {
        width: 61.8%;
        height: 61.8%;
    }

    .radio {
        display: block;
        margin: 0 25%;
        padding: 3px 0;
    }

    .submit {
        margin: 10px 0;
    }

    .card-header-r {
        font-size: 24px;
        text-align: center;
        margin-top: 10px;
    }
</style>
