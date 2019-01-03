Vue.component('carousel', {
    data: function () {
        return {

        }
    },
    methods: {

    },
    template: `
    <section>
    <div class="row" style="height:50px; margin-top:60px">
    <div class="col-md-6">
  
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style="margin-top:10px">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="./images/1.png" alt="First slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2> First slide label</h2>
                    <p> Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="./images/2.png" alt="Second slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2> Seconds slide label</h2>
                    <p> Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="./images/3.png" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2> Third slide label</h2>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>

    </div>
    <div class="col-md-6">
   
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" style="margin-top:10px">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="./images/1.png" alt="First slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2> First slide label</h2>
                    <p> Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="./images/2.png" alt="Second slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2> Seconds slide label</h2>
                    <p> Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="./images/3.png" alt="Third slide">
                <div class="carousel-caption d-none d-md-block">
                    <h2> Third slide label</h2>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>    
    </div>
    </div>
    </section>
   
    <!-- product -->
    `
})