Vue.component('shipping', {
    data: function () {
        return {
            province: "",
            provinceid: "",
            city: "",
            cityid: "",
            courier: "",
            detail_shipping: {
                name: "",
                address: ""
            },
            services: "",
            cost: {
                value: 0
            }
        }
    },
    props: ['cart_item'],
    methods: {
        get_provinces() {
            axios({
                method: "GET",
                url: `http://localhost:3000/provinces`,
            })
                .then((result) => {
                    this.province = result.data

                }).catch((err) => {

                });
        },

        get_cities() {
            axios({
                method: "GET",
                url: `http://localhost:3000/city/${this.provinceid}`,
            })
                .then((result) => {
                    this.city = result.data
                }).catch((err) => {

                });

        },
        get_services() {
            axios({
                method: "POST",
                url: `http://localhost:3000/services`,
                data: {
                    destination: this.cityid,
                    courier: this.courier
                }
            })
                .then((result) => {
                    this.services = result.data
                }).catch((err) => {

                });
        },
        checkout() {
            let V_TOKEN = localStorage.getItem('token')
            axios({
                method: "POST",
                url: 'http://localhost:3000/transactions/checkout',
                data: {
                    receiver: {
                        name: this.detail_shipping.name,
                        province_id: this.provinceid,
                        city_id: this.cityid,
                        address: this.detail_shipping.address,
                        cost: this.cost,
                        courier: this.courier,
                        service: this.services,
                    }
                },
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {

                }).catch((err) => {

                });
        }


    },
    watch: {
        provinceid: function () {
            this.get_cities()

        },
        courier: function () {
            this.get_services()
        }
    },

    mounted() {
        this.get_provinces()
    },
    template: `
    <div id="carts_page" style="padding-top:80px">
    <div class="container">
        <div class="row">
            <!-- left -->
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-12">
                        <h6>Shipping</h6>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10">
                            <form>
                                    <div class="form-group">
                                      <label for="exampleFormControlInput1">Full name</label>
                                      <input v-model="detail_shipping.name" type="text" class="form-control" id="exampleFormControlInput1" placeholder="full name">
                                    </div>
                                    <div class="form-group">
                                      <label for="exampleFormControl"  >Province</label>
                                      <select class="form-control" v-model="provinceid" >
                                      <option disabled value="">Please select one</option>
                                      <option v-for="data in this.province" :value="data.province_id">{{data.province}}</option>
                                  </select>
                                    </div>
                                    <div class="form-group">
                                      <label for="exampleFormControlSelect2">City</label>
                                      <select class="form-control" v-model="cityid">
                                        <option disabled value="">Please select one</option>
                                         <option v-for="data in this.city" :value="data.city_id">{{data.city_name}}</option>
                                         </select>
                                    </div>
                                    <div class="form-group">
                                            <label for="exampleFormControlSelect2">Courier</label>
                                            <select class="form-control" id="exampleFormControlSelect2" v-model="courier">
                                            <option disabled value="">Please select one</option>
                                              <option>JNE</option>
                                              <option>POS</option>
                                              <option>TIKI</option>
                                              
                                            </select>
                                          </div>
                                          <div class="form-group">
                                            <label for="exampleFormControlSelect2">Services</label>
                                            <select class="form-control" id="exampleFormControlSelect2" v-model="cost">
                                            <option disabled value="">Please select one</option>
                                             <option v-for="data in this.services" :value="data.cost[0]">{{data.service}} <span style="color:#00b33c;">Rp.{{data.cost[0].value}}</span>***<span>{{data.cost[0].etd}}</span></option>
                                              
                                            </select>
                                          </div>
                                    
                                    <div class="form-group">
                                      <label for="exampleFormControlTextarea1">Detail Address</label>
                                      <textarea v-model="detail_shipping.address" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary mb-2" @click="checkout">Checkout</button>
                                  </form>
                    </div>
                </div>
            </div>
            <!-- right -->
            <div class="col-md-3">
                <h5>Profile</h5>
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-4">
                                <span class="fa fa-credit-card fa-2" style="font-size:2rem"></span>
                            </div>
                            <div class="col-md-8">
                                <h6>Wallet</h6>
                                <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">{{cart_item.wallet}}</span></h6>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-4">
                                <span class="cui-dollar mr-4" style="font-size:2rem"></span>
                            </div>
                            <div class="col-md-8">
                                <h6>Point</h6>
                                <h6 style="font-size:11px"> <span style="color:#00b33c;">{{cart_item.point}}</span> Points</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <br>
                <div class="row">
                        <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-4">
                                        <span class="cui-cart" aria-hidden="true" style="font-size:1.3rem"></span>
                                    </div>
                                    <div class="col-md-8">
                                        <h6>Item Price</h6>
                                        <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">{{cart_item.total}}</span></h6>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-4">
                                        <span class="fa fa-truck" style="font-size:1.3rem"></span>
                                    </div>
                                    <div class="col-md-8">
                                        <h6>Shipping Price</h6>
                                        <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;">{{cost.value}}</span></h6>
                                    </div>
                                </div>
                            </div>
                        <div class="col-md-4" > 
                            <div class="row">
                                <div class="col-md-4">
                                    <span class="cui-bookmark" aria-hidden="true" style="font-size:1.7rem"></span>
                                </div>
                                <div class="col-md-8">
                                    <h6>Total:</h6>
                                    <h6 style="font-size:11px"> Rp.<span style="color:#00b33c;"placeholder="0" >{{cart_item.total+cost.value}}</span></h6>
                                </div>
                            </div></div>
                </div>
            </div>

        </div>
    </div>
</div>
    `
})