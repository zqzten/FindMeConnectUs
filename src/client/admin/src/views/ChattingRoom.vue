<template>
    <div class="animated fadeIn">
        <div id="contianer" class="card">
            <h1>This will be a chatting room here!</h1>
            <br />
            <h2>Be patient!</h2>
        </div>
    </div>
</template>

<script>

  import BarExample from './charts/BarExample'
  import LineExample from './charts/LineExample'
  import DoughnutExample from './charts/DoughnutExample'
  import RadarExample from './charts/RadarExample'
  import PieExample from './charts/PieExample'
  import PolarAreaExample from './charts/PolarAreaExample'

  export default {
    name: 'chatting-room',
    components: {
      BarExample,
      LineExample,
      DoughnutExample,
      RadarExample,
      PieExample,
      PolarAreaExample
    }
  }
</script>
