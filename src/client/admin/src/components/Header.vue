<template>
    <navbar>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
            &#9776;
        </button>
        <a class="navbar-brand" href="#"></a>
        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item">
                <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarMinimize">&#9776;</a>
            </li>
        </ul>
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item d-md-down-none">
                <a class="nav-link" href="#"><i class="icon-home"></i></a>
            </li>
            <dropdown size="nav" class="nav-item">
        <span slot="button">
          <img :src="avatar" class="img-avatar">
          <span class="d-md-down-none">{{username}}</span>
        </span>
                <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">

                    <div class="dropdown-header text-center"><strong>Account</strong></div>
                    <a class="dropdown-item" @click="changePath('chatting-room')"> <i class="fa fa-comments"></i>
                        Chatting </a>

                    <div class="dropdown-header text-center"><strong>Settings</strong></div>

                    <a class="dropdown-item" @click="changePath('information')"><i class="fa fa-user"></i> Information </a>
                    <a class="dropdown-item"><i class="fa fa-wrench"></i> Settings</a>
                    <div class="divider"></div>
                    <a class="dropdown-item" v-show="!locked" @click="lock"><i class="fa fa-lock"></i>Lock Account</a>
                    <a class="dropdown-item" v-show="locked" @click="lock"><i class="fa fa-unlock-alt "></i>UnLock Account</a>
                    <a class="dropdown-item" @click="logout"><i class="fa fa-lock" @click="logout"></i> Logout</a>
                </div>
            </dropdown>
            <li class="nav-item d-md-down-none">
                <a class="nav-link navbar-toggler aside-menu-toggler" href="#" @click="asideToggle"><i
                        class="icon-people"></i></a>
            </li>
        </ul>
    </navbar>
</template>

<script>
    import navbar from './Navbar'
    import { dropdown } from 'vue-strap'
    import { mapGetters } from 'vuex'
    import router from '../router'

    import api from '../api'

    export default {
        name: 'header',
        data () {
            return {
                locked: false
            }
        },
        components: {
            navbar,
            dropdown
        },
        methods: {
            click () {
                // do nothing
            },
            sidebarToggle (e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-hidden')
            },
            sidebarMinimize (e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-minimized')
            },
            mobileSidebarToggle (e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-mobile-show')
            },
            asideToggle (e) {
                e.preventDefault()
                document.body.classList.toggle('aside-menu-hidden')
            },
            changePath (p) {
                router.push(p)
            },
            logout () {
                if (!this.locked) {
                    console.log('Try to logout')
                    api.logout().then(response => {
                        if (response.status === 200) {
                            router.push('/pages/Login')
                        }
                        console.log(response)
                    }).catch(error => console.log(error.response))
                }
            },
            lock () {
                this.locked = !this.locked
            }
        },
        computed: {
            ...mapGetters([
                'username',
                'avatar'
            ])
        }
    }
</script>
