Vue.component('home', {
    data: function () {
        return {
            items: "",
        }
    },
    methods: {
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

    },

    mounted() {
        this.get_item()
    },
    template: `
    <!-- product -->
    
    <section class="product" id="product">
        <div class="container" style="padding-top:300px">
            <div class="row">
                <div class="col-md-12">
                    <h2>
                        Products
                    </h2>
                    <hr>
                </div>
            </div>
            <div class="row">
                <!-- product-list -->
                <div class="col-md-3" v-for="(data,index) in this.items">
                    <div class="card mb-3">
                        <img class="card-img-top" :src="data.img_item"
                            alt="Card image cap">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6 class="card-title">{{data.title}}</h6>
                                </div>
                                <div class="col-md-6">
                                    <p class="card-title">Rp.{{data.price}}</p>
                                </div>
                            </div>

                            <p class="card-text"></p>
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="card-text">Stock : <span>{{data.stock}}</span></p>
                                </div>
                                <div class="col-md-6">
                                <i class="cui-list" aria-hidden="true" style="margin-right:5px"></i>
                                <a  class="badge badge-pill badge-success" style="margin-right:10px" @click="$emit('pages', {link:'detail_item',data:data})">detail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end-product-list -->
            </div>
            <hr>
        </div>
       
    </section>
   


    <!-- end product -->

    `

})