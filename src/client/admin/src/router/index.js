import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Hall from '@/views/Hall'
import Role from '@/views/Role'
import Information from '@/views/Information'
import ChattingRoom from '@/views/ChattingRoom.vue'
import Records from '@/views/Records'
import Achievement from '@/views/Achievement'
import Room from '@/views/Room'

// Views - Components
import Buttons from '@/views/components/Buttons'
import SocialButtons from '@/views/components/SocialButtons'
import Cards from '@/views/components/Cards'
import Forms from '@/views/components/Forms'
import Modals from '@/views/components/Modals'
import Switches from '@/views/components/Switches'
import Tables from '@/views/components/Tables'

// Views - Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'

Vue.use(Router)

export default new Router({
    mode: 'hash', // Demo is living in GitHub.io, so required!
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            redirect: '/hall',
            name: 'Home',
            component: Full,
            children: [
                {
                    path: 'role',
                    name: 'Role',
                    component: Role
                },
                {
                    path: 'information',
                    name: 'Information',
                    component: Information
                },
                {
                    path: 'records',
                    name: 'Records',
                    component: Records
                },
                {
                    path: 'achievement',
                    name: 'Achievement',
                    component: Achievement
                },
                {
                    path: 'hall',
                    name: 'Hall',
                    component: Hall
                },
                {
                    path: 'chatting-room',
                    name: 'ChattingRoom',
                    component: ChattingRoom
                },
                {
                    path: 'room',
                    name: 'Room',
                    component: Room
                },
                {
                    path: 'components',
                    redirect: '/components/buttons',
                    name: 'Components',
                    component: {
                        render (c) { return c('router-view') }
                    },
                    children: [
                        {
                            path: 'buttons',
                            name: 'Buttons',
                            component: Buttons
                        },
                        {
                            path: 'social-buttons',
                            name: 'Social Buttons',
                            component: SocialButtons
                        },
                        {
                            path: 'cards',
                            name: 'Cards',
                            component: Cards
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms
                        },
                        {
                            path: 'modals',
                            name: 'Modals',
                            component: Modals
                        },
                        {
                            path: 'switches',
                            name: 'Switches',
                            component: Switches
                        },
                        {
                            path: 'tables',
                            name: 'Tables',
                            component: Tables
                        }
                    ]
                }
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render (c) { return c('router-view') }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        }
    ]
})
