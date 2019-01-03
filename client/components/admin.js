Vue.component('admin', {
    data: function () {
        return {
            admin_pages: "dashboard",
            top_selling: "",
            top_category: ""
        }
    },

    methods: {
        change_admin_pages(param) {
            this.admin_pages = param
        },
        get_item() {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "GET",
                url: "http://localhost:3000/items",
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {

                    let categories = {}
                    for (let i = 0; i < result.data.result.length; i++) {
                        if (!categories[result.data.result[i].category.name]) categories[result.data.result[i].category.name] = 1
                        else categories[result.data.result[i].category.name] += 1
                    }

                    var data = Object.keys(categories).map(function (key) {
                        return [key, categories[key]];
                    });
                    this.top_category = data.splice(0, 3)




                    result.data.result.sort(function (a, b) {
                        return a.stock - b.stock
                    })
                    this.top_selling = result.data.result.splice(0, 5)
                })
                .catch((err) => {
                    console.log(err);
                });
        },



    },
    mounted() {
        this.get_item()
    },
    template: `
    <div class="admin">
    <!-- navbar -->
    <div id="admin_navbar">
        <nav class="navbar navbar-light bg-light justify-content-between">
            <h4> watch<span style="color:#00b33c;">Market </span> </h4>
            <form class="form-inline">
                <div id="button-logout">
                    <a @click="$emit('logout')" class="btn btn-sm btn-outline-secondary" style="margin-right:10px">logout</a>
                </div>
            </form>
        </nav>
    </div>
    <!-- body -->
    <div id="main-admin">
        <div class="row">
            <div class="col-md-2" id="sidebar">
                <nav class="navbar navbar-expand navbar-dark flex-md-column flex-row align-items-start py-2">
                    <div class="collapse navbar-collapse">
                        <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                            <li class="nav-item ">
                                <a class="nav-link pl-0 text-nowrap text-dark" @click="change_admin_pages('dashboard')"></i> <span class="font-weight-bold ">Dashboard</span></a>
                                <hr>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link pl-0 text-nowrap text-dark" @click="change_admin_pages('items')"><i class="fa fa-bullseye fa-fw"></i>
                                    <span class="font-weight-bold">Items</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link pl-0 text-dark"  @click="change_admin_pages('category')"><i class="fa fa-list fa-fw" ></i> <span class="d-none d-md-inline">Category</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div class="col-md-10" v-if="admin_pages=='dashboard'">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Dashboard</h1>
                        <hr>
                    </div>
                </div>


                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-primary text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                        <h1>20</h1>
                                    </div>
                                </div>

                            </div>
                            <div class="card-header">Man Category</div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-success text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                        <h1>20</h1>
                                    </div>
                                </div>

                            </div>
                            <div class="card-header">Man Category</div>
                        </div>
                    </div>


                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-info text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                        <h1>20</h1>
                                    </div>
                                </div>

                            </div>
                            <div class="card-header">Man Category</div>
                        </div>
                    </div>


                    <div class="col-lg-3 col-md-6">
                        <div class="card bg-light mb-3" style="max-width: 15rem;">
                            <div class="card-body bg-danger  text-center text-white">
                                <div class="row">
                                    <div class="col-xs-3 ">
                                        <i class="cui-list" style="font-size:4rem"></i>
                                    </div>
                                    <div class="col-xs-9 text-right" style="padding-left:60px">
                                        <h1>20</h1>
                                    </div>
                                </div>

                            </div>
                            <div class="card-header">Man Category</div>
                        </div>
                    </div>
                </div>

                <hr>
                <div class="row">
                    <div class="col-md-8" id="main">
                        <div class="card bg-light mb-3">
                            <div class="card-header">TOP V</div>
                            <div class="card-body">

                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data,index) in this.top_selling">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{data.title}}</td>
                                            <td>{{data.stock}}</td>
                                            <td>{{data.price}}</td>
                                        </tr>
                                       
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                    <div class="col-md-4" id="rightbar">
                        <div class="card bg-light mb-3">
                            <div class="card-header">TOP 3</div>
                            <div class="card-body">

                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Total</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data,index) in this.top_category">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{data[0]}}</td>
                                            <th scope="col">{{data[0]}}</th>

                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- ten-col -->
            </div>
            <items_page v-if="admin_pages=='items'" @change_admin_pages="change_admin_pages($event)"></items_page>
            <category_page v-if="admin_pages=='category'" @change_admin_pages="change_admin_pages($event)"></category_page>
        </div>
    </div>
</div>
    `
})