<template>
    <div class="background">
        <Row type="flex" align="middle">
            <Col span="8" offset="8">
            <Card dis-hover class="card-box">
                <p slot="title" class="card-header-r">SIGN IN</p>
                <router-link :to="'/pages/Register'" slot="extra" class="card-header-extra">
                    <Icon type="social-snapchat-outline"></Icon>
                    SIGN UP
                </router-link>
                <Form ref="form" :model="form" :rules="rule" class="form">
                    <Form-item prop="user">
                        <Input type="text" v-model="form.username" placeholder="Username" size="large">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="form.password" placeholder="Password" size="large">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" :loading="loading" @keyup.enter="login" @click="login()" long size="large">
                            <span v-if="!loading">Sign In</span>
                            <span v-else>Loading...</span>
                        </Button>
                    </Form-item>
                </Form>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import 'iview/dist/styles/iview.css'
import api from '../../api'
import router from '../../router'

export default {
    name: 'Login',
    data () {
        return {
            form: {
                username: '',
                password: '',
                withCredentials: true
            },
            rule: {
                username: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    methods: {
        login () {
            this.loading = true
            api.login(this.form).then(response => {
                if (response.status === 200) {
                    router.push({ path: '/hall' })
                }
                this.loading = false
            }).catch(error => {
                console.log('this is error: ' + error.response)
                if (error.response.data.code === 'user_not_exist') {
                    this.error('用户名不存在!')
                } else if (error.response.data.code === 'password_mismatch') {
                    this.error('密码不正确!')
                } else if (error.response.data.code === 'request_invalid') {
                    this.error('请正确输入!')
                }
                this.loading = false
            })
        },
        success (success) {
            this.$Message.success(success)
        },
        error (error) {
            this.$Message.error(error)
        }
    }
}
</script>

<style scoped>
.card-box {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 100%;
    border: 1px solid #dddee1;
    background-color: #f8f8f9;
    margin: 140px auto;
}

.background {
    width: 100%;
    height: 100vh;
    background-color: #f8f8f9;
    border: 1px solid;
}

.card-header-r {
    font-size: 24px;
    text-align: center;
    margin-top: 10px;
}

.card-header-extra {
    display: block;
    margin-top: 5px;
}

.form {
    margin-top: -10px;
}
</style>
