<template>
    <div class="animated fadeIn">
        <Table :data="data1" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import 'iview/dist/styles/iview.css'
    import api from '../api'
    import { formatDate } from '../utils'

    export default {
        data () {
            return {
                records: [],
                data1: [],
                total: 0,
                tableColumns: [
                    {
                        title: 'Game',
                        key: 'gameID'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            const row = params.row

                            let color, text
                            if (row.status === 1) {
                                color = 'blue'
                                text = '胜利'
                            } else if (row.status === 2) {
                                color = 'red'
                                text = '失败'
                            } else {
                                color = 'gray'
                                text = '游戏未完成'
                            }

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text)
                        }
                    },
                    {
                        title: '得分',
                        key: 'score'
                    },
                    {
                        title: '地图长度',
                        key: 'mapLength'
                    },
                    {
                        title: '地图宽度',
                        key: 'mapWidth'
                    },
                    {
                        title: '时间',
                        key: 'time',
                        render: (h, params) => {
                            return h('div', formatDate(this.data1[params.index].update))
                        }
                    }
                ]
            }
        },
        mounted () {
            this.getRecords()
        },
        methods: {
            getRecords () {
                api.getRecords().then(response => {
                    this.records = this.split(response.data)
                    this.total = response.data.length
                    this.data1 = this.records[0]
                }).catch(error => {
                    console.log(error.response)
                })
            },
            changePage (index) {
                this.data1 = this.records[index - 1]
            },
            split (obj) {
                let length = obj.length
                let list = []
                for (let i = 0; i < Math.ceil(length / 8); i++) {
                    list[i] = []
                    for (let j = 0; j < 8; j++) {
                        list[i].push(obj[8 * i + j])
                    }
                }
                return list
            }
        }
    }
</script>
