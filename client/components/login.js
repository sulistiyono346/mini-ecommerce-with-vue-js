Vue.component('login', {
    data: function () {
        return {
            user_login: {
                email: "",
                password: ""
            },
        }
    },

    methods: {
        login() {
            axios({
                method: "post",
                url: "http://localhost:3000/login",
                data: this.user_login
            })
                .then((result) => {
                    localStorage.setItem("token", result.data.data_token)
                    this.$emit('is_login')

                    this.$emit('pages', 'home')
                }).catch((err) => {
                    console.log(err);
                });
        }
        ,

        glogin() {
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                type: "POST",
                url: "http://localhost:3000/glogin",
                data: {
                    gtoken: id_token
                }
            })
                .then((result) => {
                    localStorage.setItem("token", result.data.data_token)
                })
                .catch(() => {

                })
        }
    },


    template: `
    <div>
        <div class="container my-3">
            <div class="row">
                <div class="col-12 p-0 text-center">
                    <h1> watch <span style="color:#00b33c;">Market </span> </h1>
                    <img src="../images/signin-image.jpg" alt="" style="height:40%;" />
                    <h5 class="font-weight-light mb-3">Please input your data</h5>
                    <h6>Belum punya akun ?<a @click="$emit('pages', 'register')">Daftar
                            di sini</a></h6>
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <form v-on:submit.prevent="login">
                                <div class="form-group">
                                    <label for="exampleInputEmail1" class="text-left">Email address</label>
                                    <input v-model="user_login.email" type="email" class="form-control"
                                        aria-describedby=" emailHelp" placeholder="Enter email" />
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">Password</label>
                                    <input v-model="user_login.password" type="password" class="form-control"
                                        aria-describedby="emailHelp" placeholder="Enter password" />
                                </div>

                                <button type="submit" class="btn btn-primary btn-block">Log
                                    In</button>
                            </form>
                            <br>
                            <h6><a @click="$emit('pages', 'home')"> <hr>Back home <hr></a></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})