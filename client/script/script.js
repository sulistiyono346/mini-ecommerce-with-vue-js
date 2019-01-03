var app = new Vue({
    el: '#app',
    data: {
        pages: "home",
        login_status: false,
        item_id: "",
        cart_item: ""

    },
    methods: {
        get_cart() {
            let V_TOKEN = localStorage.getItem("token");
            axios({
                method: "GET",
                url: "http://localhost:3000/transactions/cart",
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    this.cart_item = result.data.data
                }).catch((err) => {
                    console.log(err);
                });
        },
        isLogin() {
            let V_TOKEN = localStorage.getItem("token");
            axios({
                method: "GET",
                url: "http://localhost:3000/validate",
                headers: {
                    token: V_TOKEN
                }
            })
                .then((result) => {
                    if (result.data.user.role == "customer") {
                        this.pages = "home"
                    }
                    else {
                        this.pages = "admin"
                    }

                    this.login_status = true
                }).catch((err) => {
                    this.login_status = false
                });
        },
        logout() {
            localStorage.removeItem('token')
            this.login_status = false
            this.pages = "home"
        },

        change_pages(params) {
            if (params.data === undefined) {
                this.pages = params
            }
            else {
                this.pages = params.link
                this.item_id = params.data._id
            }
        },

    },
    mounted() {
        this.get_cart()
    },
    created() {
        this.isLogin()

    }
})