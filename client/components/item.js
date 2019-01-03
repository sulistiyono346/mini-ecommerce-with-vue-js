Vue.component('items_page', {
    data: function () {
        return {
            item_pages: "list_items",
            item: {
                id: "",
                title: "",
                price: "",
                stock: "",
                description: "",
                category: "",
                img: ""
            },
            items: "",
            categories: ""
        }
    },

    methods: {
        change_admin_items(param, data) {
            if (data == undefined) {
                this.item_pages = param
            }
            else {
                this.item_pages = param
                this.show_update_item(data)
            }
        },

        show_update_item(data) {
            this.item.title = data.title
            this.item.price = data.price
            this.item.stock = data.stock
            this.item.description = data.description
            this.item.category = data.category
            this.item.img = data.img_item
            this.item.id = data._id

        },

        get_image(event) {
            this.item.img = event.target.files[0];
        },
        add_item() {
            let V_TOKEN = localStorage.getItem("token");
            let formData = new FormData();

            formData.append("img", this.item.img);
            formData.append("title", this.item.title);
            formData.append("price", this.item.price);
            formData.append("stock", this.item.stock);
            formData.append("description", this.item.description);
            formData.append("category", this.item.category);


            axios({
                method: "POST",
                url: "http://localhost:3000/items",
                data: formData,
                headers: {
                    token: V_TOKEN
                }
            }).then((result) => {
                this.item = {
                    title: "",
                    price: "",
                    stock: "",
                    description: "",
                    category: "",
                    img: ""
                }
                this.get_item()

            }).catch((err) => {
                console.log(err);

            });
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

                    this.items = result.data.result

                })
                .catch((err) => {
                    console.log(err);

                });
        },
        update_item() {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "PUT",
                url: `http://localhost:3000/items/${this.item.id}`,
                data: this.item,
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.item = {
                        title: "",
                        price: "",
                        stock: "",
                        description: "",
                        category: "",
                        img_item: ""
                    }
                    this.get_item()
                }).catch((err) => {

                });
        },
        delete_item(id) {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "DELETE",
                url: `http://localhost:3000/items/${id}`,
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.get_item()

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
        }
    },
    mounted() {
        this.get_item()
        this.get_category()
    }
    ,

    template: `
    <div class="col-md-10">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header" @click="change_admin_items('list_items')">Items</h1>
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12" v-if="item_pages=='list_items'">
            <div class="card bg-light mb-3">
                <div class="card-header"><a data-toggle="modal" data-target="#add_item_modal" @click="change_admin_items('add_items')">add new</a></div>
                <div class="card-body">
    
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Category</th>
                                <th class="text-center" scope="col">Options</th>
    
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data,index) in this.items">
                                <th scope="row">{{index+1}}</th>
                                <td>{{data.title}}</td>
                                <th scope="col">{{data.price}}</th>
                                <th scope="col">{{data.stock}}</th>
                                <th scope="col">{{data.category.name}}</th>
                                <th class="text-center" scope="col">
                                <button type="button" class="btn btn-primary btn-sm text-center" @click="change_admin_items('update_items',data)">edit</button>|
                                <button type="button" class="btn btn-danger btn-sm" @click="delete_item(data._id)">delete</button></th>
    
                            </tr>
                        </tbody>
                    </table>
    
                </div>
            </div>
        </div>
    </div>
    <!-- additem -->
    <!-- star-add-items -->
    <div class="card mb-3" v-if="item_pages=='add_items'">
        <div class="card-header">
            Form Items
        </div>
        <div class="card-body">
            <form v-on:submit.prevent="add_item">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input v-model="item.title" type="text" class="form-control" placeholder="title">
    
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Price</label>
                            <input v-model="item.price" type="text" class="form-control" placeholder="Price">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Stock</label>
                            <input  v-model="item.stock" type="text" class="form-control" placeholder="Stock">
                        </div>
    
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control" v-model="item.category"  >
                                <option disabled value="">Please select one</option>
                                <option v-for="data in this.categories" :value="data._id">{{data.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Images</label>
                            <input   @change="get_image" type="file" class="form-control-file" id="exampleFormControlFile1">

                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Description</label>
                            <textarea v-model="item.description" class="form-control" rows="20"></textarea>
                        </div>
                    </div>
                </div>
    
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    <!-- end-add-items -->
    
    <!-- start-update-items -->
    <div class="card mb-3" v-if="item_pages=='update_items'">
        <div class="card-header">
            Form Items
        </div>
        <div class="card-body">
            <form v-on:submit.prevent="update_item">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input v-model="item.title" type="text" class="form-control" placeholder="title">
    
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Price</label>
                            <input v-model="item.price" type="text" class="form-control" placeholder="Price">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Stock</label>
                            <input v-model="item.stock" type="text" class="form-control" placeholder="Stock">
                        </div>
    
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control" v-model="item.category"  >
                                <option disabled value="">Please select one</option>
                                <option v-for="data in this.categories" :value="data._id">{{data.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Images</label>
                            <input   @change="get_image" type="file" class="form-control-file" id="exampleFormControlFile1">
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Description</label>
                            <textarea v-model="item.description" class="form-control" rows="20"></textarea>
                        </div>
                    </div>
                </div>
    
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
    </div>
    <!-- end-update-items -->
    <!-- items -->
    `
})