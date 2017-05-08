<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-info">
                    <div class="card-block pb-0">
                        <dropdown class="float-right" type="transparent p-0">
                            <i slot="button" class="icon-trophy"></i>
                        </dropdown>
                        <h4 class="mb-0">Champion</h4>
                        <p>You get the first champion!</p>
                    </div>
                    <card-line2-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->

            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-warning">
                    <div class="card-block pb-0">
                        <div class="btn-group float-right">
                            <dropdown class="float-right" type="transparent p-0">
                                <i slot="button" class="icon-map"></i>
                            </dropdown>
                        </div>
                        <h4 class="mb-0">First Map</h4>
                        <p>The first western country map</p>
                    </div>
                    <card-line3-chart-example class="chart-wrapper" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->

            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-danger">
                    <div class="card-block pb-0">
                        <div class="btn-group float-right">
                            <dropdown class="float-right" type="transparent p-0">
                                <i slot="button" class="icon-like"></i>
                            </dropdown>
                        </div>
                        <h4 class="mb-0">Likes</h4>
                        <p>9.823 people give you the like!</p>
                    </div>
                    <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->

            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-primary">
                    <div class="card-block pb-0">
                        <dropdown class="float-right" type="transparent p-0">
                            <i slot="button" class="icon-key"></i>
                        </dropdown>
                        <h4 class="mb-0">Open the door!</h4>
                        <p>Open your first door!</p>
                    </div>
                    <card-line1-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->
        </div>

        <div class="row">
            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-info">
                    <div class="card-block pb-0">
                        <dropdown class="float-right" type="transparent p-0">
                            <i slot="button" class="icon-trophy"></i>
                        </dropdown>
                        <h4 class="mb-0">Champion</h4>
                        <p>You get the first champion!</p>
                    </div>
                    <card-line2-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->

            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-warning">
                    <div class="card-block pb-0">
                        <div class="btn-group float-right">
                            <dropdown class="float-right" type="transparent p-0">
                                <i slot="button" class="icon-map"></i>
                            </dropdown>
                        </div>
                        <h4 class="mb-0">First Map</h4>
                        <p>The first western country map</p>
                    </div>
                    <card-line3-chart-example class="chart-wrapper" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->

            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-danger">
                    <div class="card-block pb-0">
                        <div class="btn-group float-right">
                            <dropdown class="float-right" type="transparent p-0">
                                <i slot="button" class="icon-like"></i>
                            </dropdown>
                        </div>
                        <h4 class="mb-0">Likes</h4>
                        <p>9.823 people give you the like!</p>
                    </div>
                    <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->

            <div class="col-sm-6 col-lg-3">
                <div class="card card-inverse card-primary">
                    <div class="card-block pb-0">
                        <dropdown class="float-right" type="transparent p-0">
                            <i slot="button" class="icon-key"></i>
                        </dropdown>
                        <h4 class="mb-0">Open the door!</h4>
                        <p>Open your first door!</p>
                    </div>
                    <card-line1-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
                </div>
            </div><!--/.col-->
        </div>
    </div>
</template>

<script>

  export default {
    name: 'achievement',
    components: {}
  }
</script>
