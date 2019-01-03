

Vue.component('detail_item', {
    data: function () {
        return {
            data_item: "",
            cart_detail: {
                item: "",
                qty: 1
            }
        }
    },
    props: ["item_id", "cart_item"],
    methods: {
        get_detail_item() {
            axios({
                method: "GET",
                url: `http://localhost:3000/items/${this.item_id}`,
            })
                .then((result) => {
                    this.data_item = result.data.result
                    this.cart_detail.item = result.data.result

                }).catch((err) => {
                    console.log(err);

                });

        },
        up_qty() {
            if (this.cart_detail.qty < this.data_item.stock) this.cart_detail.qty += 1
        },
        down_qty() {
            if (this.cart_detail.qty !== 1) this.cart_detail.qty -= 1
        },
        add_to_cart() {
            if (this.cart_detail.qty <= 0) {

            }
            else {
                let V_TOKEN = localStorage.getItem('token')
                axios({
                    method: "PUT",
                    url: "http://localhost:3000/transactions/add_to_cart",
                    data: this.cart_detail,
                    headers: {
                        token: V_TOKEN
                    }
                })
                    .then((result) => {
                        this.$emit('get_cart')

                    }).catch((err) => {
                        console.log(err);

                    });
            }
        }


    },
    mounted() {
        this.get_detail_item()
    },
    template: `<div class="container" style="padding-top:40px">
        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-12">
                        <h6>Detail</h6>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                            <img class="card-img-top" :src="data_item.img_item"
                            alt="Card image cap">
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>{{this.data_item.title}}</h4>
                                <hr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h5>Rp{{this.data_item.price}}</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                    <label for="">Tersedia <span style="color:#00b33c;">{{this.data_item.stock}}</span> stok barang</label><br>
                                <label for="">Masukkan jumlah yang diinginkan</label>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <button type="button" class="btn btn-secondary" @click="down_qty()">-</button>
                                            </div>
                                            <div class="col-md-6 ">
                                                <form>
                                                    <div class="form-group ">
                                                        <input v-model="cart_detail.qty" class="form-control text-center" placeholder="0">
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="col-md-3" style="margin-left:-15px">
                                                <button type="button" class="btn btn-secondary" @click="up_qty()">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-success" style="width:100%" @click="add_to_cart()">add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-10">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>Description</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p>
                                {{this.data_item.description}}  
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <h5>Profile</h5>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                    <div class="row">
                            <div class="col-md-4" >
                                    <span class="fa fa-credit-card fa-2" style="font-size:2rem"></span>
                            </div>
                            <div class="col-md-8" >
                            <h6>Wallet</h6>
                           <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">{{cart_item.wallet}}</span></h6>
                         </div>
                    </div>
                    <hr>
                    <div class="row">
                            <div class="col-md-4" >
                                    <span class="cui-dollar mr-4" style="font-size:2rem"></span>
                            </div>
                            <div class="col-md-8" >
                            <h6>Point</h6>
                           <h6 style="font-size:11px"> <span style="color:#00b33c;">{{cart_item.point}}</span> Points</h6>
                         </div>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>`
})