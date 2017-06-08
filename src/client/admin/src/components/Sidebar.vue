<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :to="'/role'" class="nav-link" exact><i class="icon-ghost"></i> Role </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/information'" class="nav-link" exact><i class="icon-user"></i> Information
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/records'" class="nav-link" exact><i class="icon-game-controller"></i> Records
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/achievement'" class="nav-link" exact><i class="icon-badge"></i> Achievement
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/chatting-room'" class="nav-link" exact><i class="icon-bubbles"></i>
                        Chatting Room
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>

    export default {
        name: 'sidebar',
        methods: {
            handleClick (e) {
                e.preventDefault()
                e.target.parentElement.classList.toggle('open')
            }
        }
    }
</script>

<style lang="css">
    .nav-link {
        cursor: pointer;
    }
</style>
