<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-sm-6 col-md-3">
                <div class="card">
                    <img src="static/img/hall/1.png" class="card-img" alt="">
                </div>
                <div class="card">
                    <img src="static/img/hall/2.png" class="card-img" alt="">
                </div>
                <div class="card">
                    <img src="static/img/hall/3.png" class="card-img" alt="">
                </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-5">
                <div class="card">
                    <Tabs value="tabs">
                        <Tab-pane label="热点" name="0">
                            <div class="card-block card-block-no-padding">
                                <table class="table">
                                    <tbody>
                                    <tr>
                                        <td>[热点]5月25日 11：00公测 1024服盛大开启</td>
                                    </tr>
                                    <tr>
                                        <td>[热点]天蛤吞日活动</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]游戏玩法大盘点</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]最新人物形象霸气来袭</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]第二波暑期感恩豪礼活动来袭</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab-pane>
                        <Tab-pane label="新闻" name="1">
                            <div class="card-block card-block-no-padding">
                                <table class="table">
                                    <tbody>
                                    <tr>
                                        <td>[热点]5月25日 11：00公测 1024服盛大开启</td>
                                    </tr>
                                    <tr>
                                        <td>[热点]天蛤吞日活动</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]游戏玩法大盘点</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]最新人物形象霸气来袭</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]第二波暑期感恩豪礼活动来袭</td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab-pane>
                        <Tab-pane label="公告" name="2">
                            <div class="card-block card-block-no-padding">
                                <table class="table">
                                    <tbody>
                                    <tr>
                                        <td>[热点]5月25日 11：00公测 1024服盛大开启</td>
                                    </tr>
                                    <tr>
                                        <td>[热点]天蛤吞日活动</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]游戏玩法大盘点</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]最新人物形象霸气来袭</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]第二波暑期感恩豪礼活动来袭</td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab-pane>
                        <Tab-pane label="活动" name="3">
                            <div class="card-block card-block-no-padding">
                                <table class="table">
                                    <tbody>
                                    <tr>
                                        <td>[热点]5月25日 11：00公测 1024服盛大开启</td>
                                    </tr>
                                    <tr>
                                        <td>[热点]天蛤吞日活动</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]游戏玩法大盘点</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]最新人物形象霸气来袭</td>

                                    </tr>
                                    <tr>
                                        <td>[热点]第二波暑期感恩豪礼活动来袭</td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab-pane>
                    </Tabs>
                </div>
                <div class="card-block"></div>
                <div class="card-block"></div>
                <div class="row bs-tether-element-attached-bottom">
                    <div class=col-lg-3></div>
                    <div class="col-lg-6">
                        <Button type="error" @click="goGame" size="large" class="btn btn-danger btn-block" >
                            <span>Game Now!</span>
                        </Button>
                    </div>
                    <div class="col-lg-3"></div>
                </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-md-4">

                <div class="card">
                    <img src="static/img/hall/4.png" class="card-img" alt="">
                </div>
                <div class="card-block"></div>
                <div class="card">
                    <img src="static/img/hall/5.png" class="card-img" alt="">
                </div>
            </div><!--/.col-->

            <div v-show=""></div>
        </div>
    </div>
</template>

<style>
    .pagination {
        margin-bottom: 0
    }

    .card-block-no-padding {
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
    }

</style>

<script>
    import Navbar from '../components/Navbar'
    import router from '../router'
    import 'iview/dist/styles/iview.css'

    export default {
        name: 'hall',
        components: {Navbar},
        methods: {
            goGame () {
                router.push('room')
            }
        }
    }
</script>
