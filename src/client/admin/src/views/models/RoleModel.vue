<template>
    <div class="role-model"></div>
</template>

<script>
  import Scene from '../../webgl/core/Scene.js'
  import Cube from '../../webgl/meshes/Cube.js'
  export default {
    components: {},
    data () {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        scene: Object(),
        cube: Object()
      }
    },
    created: function () {
      console.log('Successfully!')
      this.scene = new Scene(this.width, this.height)
      this.cube = new Cube()
    },
    mounted: function () {
      window.addEventListener('resize', this.onResize)
      this.scene.add(this.cube.mesh)
      this.$el.appendChild(this.scene.renderer.domElement)
    },
    beforeDestroy: function () {
    },
    methods: {
      onResize: function (event) {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.scene.resize(this.width, this.height)
      },
      update: function (event) {
        this.cube.update()
        this.scene.render()
      }
    }
  }
</script>
