<template>
        <model-three :backgroundAlpha="0" :src="model"></model-three>
</template>

<script>
    import { ModelThree } from 'vue-3d-model'
    import { mapGetters } from 'vuex'

    export default {
        name: 'role',
        components: { ModelThree },
        computed: {
            ...mapGetters([
                'model'
            ])
        }
    }
</script>
