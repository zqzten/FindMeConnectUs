<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">
                        <i class="fa fa-align-justify"></i> Records
                    </div>
                    <div class="card-block">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Role</th>
                                <th>Date</th>
                                <th>Rank</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Ta</td>
                                <td>2017/05/05</td>
                                <td><span class="badge badge-warning"><i class="fa fa-trophy"></i></span> No.1</td>
                                <td>
                                    <span class="badge badge-success">Active</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Ta</td>
                                <td>2017/05/04</td>
                                <td><span class="badge badge-default"><i class="fa fa-trophy"></i></span> No.2</td>
                                <td>
                                    <span class="badge badge-danger">Defeat</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Ta</td>
                                <td>2017/05/03</td>
                                <td><span class="badge badge-success"><i class="fa fa-trophy"></i></span> No.3</td>
                                <td>
                                    <span class="badge badge-success">Victory</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Ta</td>
                                <td>2017/04/30</td>
                                <td><span class="badge badge-primary"><i class="fa fa-gamepad"></i></span> No.4</td>
                                <td>
                                    <span class="badge badge-danger">Defeat</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Ta</td>
                                <td>2017/04/29</td>
                                <td><span class="badge badge-primary"><i class="fa fa-gamepad"></i></span> No.5</td>
                                <td>
                                    <span class="badge badge-success">Victory</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Ta</td>
                                <td>2017/04/29</td>
                                <td><span class="badge badge-primary"><i class="fa fa-gamepad"></i></span> No.6</td>
                                <td>
                                    <span class="badge badge-success">Victory</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                            <li class="page-item active">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div><!--/.col-->
        </div>
    </div>
</template>

<script>

  export default {
    name: 'records',
    components: {}
  }
</script>
