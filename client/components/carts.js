
Vue.component('carts', {
    data: function () {
        return {

        }
    },
    props: ['cart_item'],
    methods: {
        remove_list_item(params) {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "PUT",
                url: `http://localhost:3000/transactions/delete_cart/${params}`,
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.$emit('get_cart')
                }).catch((err) => {
                    console.log(err);

                });
        },
        up_qty(params) {

            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "PUT",
                url: `http://localhost:3000/transactions/up_qty/${params}`,
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.$emit('get_cart')
                }).catch((err) => {
                    console.log(err);
                });

        },
        down_qty(params) {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "PUT",
                url: `http://localhost:3000/transactions/down_qty/${params}`,
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
    },
    mounted() {

    },
    template: `
    <div id="carts_page" style="padding-top:80px">
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-12">
                            <h6>Carts</h6>
                            <hr>
                        </div>
                    </div>
                      <!-- batas -->
                <ul class="list-group" v-for="data in cart_item.carts" >
                        <li class="list-group-item">
                    <div class="row">
                        <div class="col-md-1">
                                <img class="card-img-top" :src="data.item.img_item"
                                alt="Card image cap">
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-12">
                                    <h6>{{data.item.title}}</h6>
                                    <hr>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <h5>Rp. {{data.item.price}}</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                        <label for="">Tersedia <span style="color:#00b33c;">{{data.item.stock}}</span> stok barang</label><br>
                                    <label for="">Masukkan jumlah yang diinginkan</label>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <button type="button" class="btn btn-secondary" @click="down_qty(data.item._id)">-</button>
                                                </div>
                                                <div class="col-md-6 ">
                                                    <form>
                                                        <div class="form-group ">
                                                            <input  class="form-control text-center"  :placeholder="data.qty">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="col-md-3" style="margin-left:-15px">
                                                    <button type="button" class="btn btn-secondary" @click="up_qty(data.item._id)">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="row">
                                <div class="col-md-12">
                                    <h5>Rp. {{data.sub_total}}</h5>
                                   
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="row">
                                <div class="col-md-12">
                                    <a  class="cui-trash" aria-hidden="true" @click="remove_list_item(data.item._id)"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    </li>
                </ul>
                    <!-- batas -->
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
            <!-- batas -->
            <div class="row" style="margin:2rem">
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-10">
                                   <h6>Subtotal: Rp {{this.cart_item.total}}</h6> 
                                    <p>Belum termasuk ongkos kirim</p>
                            </div>
                            <div class="col-md-2">
                                    <button type="button" class="btn btn-success" style="width:100%" @click="$emit('pages','shipping')">pay</button>
                                </div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    `
})