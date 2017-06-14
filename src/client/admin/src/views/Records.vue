<template>
    <div>
        <Table :data="table_data" :columns="table_columns" stripe></Table>
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
                table_data: [],
                records: [],
                table_columns: [
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
                        key: 'time'
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
                    this.table_data = this.getData(1)
                }).catch(error => {
                    console.log(error.response)
                })
            },
            changePage (index) {
                this.table_data = this.getData(index)
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
            },
            getData (index) {
                index--
                let data = []
                for (let i = 0; i < 8; i++) {
                    if (this.records[index][i] === undefined) {
                        break
                    }
                    data.push({
                        gameID: this.records[index][i].gameID,
                        status: this.records[index][i].state,
                        score: this.records[index][i].score,
                        mapLength: this.records[index][i].mapLength,
                        mapWidth: this.records[index][i].mapWidth,
                        time: formatDate(this.records[index][i].time)
                    })
                }
                return data
            }
        }
    }
</script>
