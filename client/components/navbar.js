Vue.component('navbar', {
    data: function () {
        return {
            qty_navbar: this.cart_item.carts
        }
    },
    props: ['login_status', 'cart_item'],
    methods: {
        total() {

        }
    },

    template: `
    <div>
    <nav class="navbar navbar-expand-md  navbar-light  fixed-top bg-light">
    <a class="navbar-brand" @click="$emit('pages', 'home')">
        <h4> watch<span style="color:#00b33c;">Market </span> </h4>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
 
        <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    Kategory
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Analog</a>
                    <a class="dropdown-item" href="#">Digital</a>
                    <a class="dropdown-item" href="#">Quartz</a>
                </div>
            </li>
        </ul>
    </div>
    <form class="form-inline my-1 my-lg-1" id="search-nav">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="search-nav-b">
        <button class="btn btn-outline-success my-2 my-sm-0 " type="submit">Search</button>
    </form>
    <!-- chart -->

    <a class="cui-list" data-toggle="tooltip" data-placement="top" title="all items"  aria-hidden="true" @click="$emit('pages', 'cart_items')" style="margin-right:10px" ></a>
    <a style="margin-right:5px; font-size:1.3rem;" class="cui-cart" aria-hidden="true" title ="Shopping cart"
       data-toggle="popover" data-placement="bottom" ></a>

     <span class="badge badge-pill badge-success" style="margin-right:20px;margin-left:5px">{{this.cart_item.total_item}}</span>

    <div id="button-logout" v-if="login_status==true">
    <a  @click="$emit('logout')" class="btn btn-sm btn-outline-secondary"  style="margin-right:10px;">logout</a>
    </div>
    <div id="button-login" v-if="login_status==false">
    <a  @click="$emit('pages', 'login')" class="btn btn-sm btn-outline-secondary"  style="margin-right:10px">Sign in</a>

    <a  @click="$emit('pages','register')" class="btn btn-sm btn-outline-secondary"  style="margin-right:20px">Sign up</a>
    </div>

    <div id="popover-content" style="display:none">
            <ul class="list-group custom-popover" v-for="data in cart_item.carts">
              <li class="list-group-item">
                 <div class="row">
                     <div class="col-md-4">
                            <img class="card-img-top" :src="data.item.img_item"
                            alt="Card image cap">
                     </div>
                     <div class="col-md-8">
                         <h6 style="font-size:10px">{{data.item.title}}</h6>
                         <div class="row" style="font-size:15px">
                             <div class="col-md-12">
                                 {{data.qty}} <span style="color:#00b33c;">item</span> 
                             </div>
                         </div>
                     </div>
                 </div>
                </li>

            </ul>
            <div class="row">
                <div class="col md-12">
                        <button type="button" class="btn btn-success" style="width:100%"   >cart</button>
                     
                </div>
            </div>
    </div>
    
</nav>
</div>

    `

})