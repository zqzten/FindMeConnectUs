<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <i class="fa fa-align-justify"></i> Information
                    </div>
                    <div class="card-block">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th>Nickname</th>
                                <td colspan="3">{{username}}</td>
                            </tr>
                            <tr>
                                <th>UserID</th>
                                <td colspan="3">{{ user_id }}</td>
                            </tr>
                            <tr>
                                <th>Date registered</th>
                                <td colspan="3">{{ registered_date }}</td>
                            </tr>
                            <tr>
                                <th>Games</th>
                                <td colspan="3">{{games}}</td>
                            </tr>
                            <tr>
                                <th>Signature</th>
                                <td colspan="3">{{signature}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div><!--/.col-->
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'information',
        components: {},
        computed: {
            ...mapGetters([
                'username',
                'user_id',
                'registered_date',
                'games',
                'signature'
            ])
        }
    }
</script>
