Vue.component('register', {
    data: function () {
        return {
            user_register: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",

            }
        }
    },
    methods: {
        register() {
            axios({
                method: "post",
                url: "http://localhost:3000/register",
                data: this.user_register
            })
                .then((result) => {

                }).catch((err) => {

                });
        },
    },
    template: `
    <div>
    <div class="container my-3">
        <div class="row">
            <div class="col-12 p-0 text-center">
                <h1> watch <span style="color:#00b33c;">Market </span> </h1>
                <img src="../images/signup-image.jpg" alt="" style="height:40%;" />
                <h5 class="font-weight-light mb-3">Please input your data</h5>
                <div class="row">
                    <div class="col-md-4 mx-auto">
                        <form v-on:submit.prevent="register">
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-left">First Name</label>
                                <input v-model="user_register.first_name" type="text" class="form-control"
                                    aria-describedby="emailHelp" placeholder="first name" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-left">Last Name</label>
                                <input v-model="user_register.last_name" type="text" class="form-control"
                                    aria-describedby="emailHelp" placeholder="last name" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="text-left">Email address</label>
                                <input v-model="user_register.email" type="email" class="form-control"
                                    aria-describedby="emailHelp" placeholder="enter email" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input v-model="user_register.password" type="password" class="form-control"
                                    aria-describedby="emailHelp" placeholder="enter password" />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                        </form>
                        <br>
                        <h6><a @click="$emit('pages', 'home')"> <hr>Back home <hr></a></h6>
                        <p>Sudah punya akun? <a @click="$emit('pages','login')">Silakan login</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
})