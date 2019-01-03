

Vue.component('category_page', {
    data: function () {
        return {
            form_category: "add",
            category_id: "",
            category_name: "",
            categories: ""

        }
    },

    methods: {
        change_admin_add() {
            this.form_category = "add"
        },

        add_category() {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "POST",
                url: "http://localhost:3000/categories",
                data: {
                    name: this.category_name
                },
                headers: {
                    token: V_TOKEN
                }

            }).then((result) => {
                this.category_name = ""
                this.get_category()

            }).catch((err) => {

            });
        },
        get_category() {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "GET",
                url: "http://localhost:3000/categories",
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.categories = result.data.result
                }).catch((err) => {

                });
        },
        change_form_category(params) {
            this.form_category = params
        },
        show_update_category(params) {
            this.category_id = params._id
            this.category_name = params.name
            this.form_category = "update"

        },
        update_category() {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "PUT",
                url: `http://localhost:3000/categories/${this.category_id}`,
                data: {
                    name: this.category_name
                },
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.category_name = ""
                    this.category_id = ""
                    this.get_category()

                }).catch((err) => {

                });

        },
        delete_category(params) {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "DELETE",
                url: `http://localhost:3000/categories/${params}`,
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.get_category()

                }).catch((err) => {

                });
        }


    },
    mounted() {
        this.get_category()
    },



    template: `
    <div class="col-md-10">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Category</h1>
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <div class="card bg-light mb-3">
                <div class="card-header"><a @click="change_admin_add()"> Add Category</a></div>
                <div class="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr class="text-center" >
                                <th scope="col">No</th>
                                <th scope="col">Title</th>
                                <th scope="col"  >Option</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,index) in this.categories" class="text-center">
                                <th scope="row">{{index+1}}</th>
                                <td> {{data.name}}</td>
                                <th scope="col"><button type="button" class="btn btn-primary btn-sm text-center" @click="show_update_category(data)">edit</button>|<button @click="delete_category(data._id)"type="button" class="btn btn-danger btn-sm">delete</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card mb-3">
                <div class="card-header">
                    Category
                </div>
                <div class="card-body" v-if="this.form_category=='add'">
                    <form v-on:submit.prevent="add_category()">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input v-model="category_name" type="text" class="form-control" placeholder="title">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="card-body" v-if="form_category=='update'">
                    <form v-on:submit.prevent="update_category()">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input v-model="category_name" type="text" class="form-control" placeholder="title">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    `
})