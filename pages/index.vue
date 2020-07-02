<template>
  <div>
    <!--  Main banner section -->
    <section class="w3l-main-banner" id="home">
      <div class="companies20-content">
        <div class="companies-wrapper">
          <div class="item">

            <div class="slider-info banner-view text-center">
              <div class="banner-info container">
                <img src="/images/c1.jpg" alt="about image" class="img-fluid">
                <h3 class="banner-text mt-5">Добро пожаловать
                </h3>
                <!--<p class="my-4 mb-5">Photographer</p><br>-->

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    <section class="w3l-about ">
      <div class="skills-bars py-5">
        <div class="container py-md-3">
          <div class="heading text-center mx-auto">
            <!--<h3 class="head">Welcome To My Site</h3>-->
            <p class="my-3 head"> {{info.general}}</p>

          </div>
          <div class="row mt-5 pt-3">
            <div class="container py-md-3">

              <div class="main-cont-wthree-fea row ">
                <div class="grids-speci1 col-lg-3 col-6">
                  <div class="spec-2 text-center">

                    <h3 class="title-spe">{{info.rus}}</h3>
                    <p>Русских столов</p>
                  </div>
                </div>
                <div class="grids-speci1 midd-eff-spe col-lg-3 col-6">
                  <div class="spec-2 text-center">

                    <h3 class="title-spe">{{info.pool}}</h3>
                    <p>Pool</p>
                  </div>
                </div>
                <div class="grids-speci1 las-but col-lg-3 col-6  mt-lg-0 mt-4">
                  <div class="spec-2 text-center">

                    <h3 class="title-spe">{{info.halls}}</h3>
                    <p>Зала</p>
                  </div>
                </div>
                <div class="grids-speci1 las-t col-lg-3 col-6  mt-lg-0 mt-4">
                  <div class="spec-2 text-center">

                    <h3 class="title-spe">{{info.other}} </h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="w3l-feature-3" id="features">
      <div class="grid top-bottom">
        <div class="container">
          <div class="heading text-center mx-auto">
            <h3 class="head text-white">Бильярд</h3>
            <!--<p class="my-3 head text-white"> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Nulla mollis dapibus nunc, ut rhoncus
              turpis sodales quis. Integer sit amet mattis quam.</p>-->
          </div>
          <div class="middle-section grid-column text-center mt-5 pt-3">
            <div v-for="(halls, hallName) in prices" :key="hallName" class="three-grids-columns">
              <div class="w3l-pricing-7  pric-7-1">
              <h6 class="active">{{hallName}}</h6>
              </div>
              <div v-for="(hall, i) in halls" :key="'hall-'+i" class="w3l-pricing-7  pric-7-1">
                <div class="w3l-pricing-7-bottom">
                  <div class="w3l-pricing-7-bottom-bottom">
                    <ul class="links">
                      <li class="tick-info text-white">
                        {{hall.term}}
                      </li>
                    </ul>
                    <h3 class="title-head mt-4 text-white">
                      Русский - {{hall.rus}} грн</h3>
                    <h3 class="title-head mt-4 text-white">
                      Pool - {{hall.pool}} грн</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="products-4" id="portfolio">
      <div id="products4-block" class="text-center">
        <div class="container">
          <div class="heading text-center mx-auto mb-5">
            <h3 class="head">Галерея</h3>
            <p class="my-3 head"> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              Curae;
              Nulla mollis dapibus nunc, ut rhoncus
              turpis sodales quis. Integer sit amet mattis quam.</p>
          </div>

          <button type="button" ref="all" class="btn btn-success m-1 active"
                  @click.prevent="filterByClick($event, null)">
            Все фото
          </button>
          <!--<button type="button" ref="1" class="btn btn-success m-1" @click.prevent="filterByClick($event, 'Зал 1')">Зал 1
          </button>
          <button type="button" ref="2" class="btn btn-success m-1" @click.prevent="filterByClick($event, 'Зал 2')">Зал 2
          </button>
          <button type="button" ref="3" class="btn btn-success m-1" @click.prevent="filterByClick($event,'VIP зал')">VIP зал
          </button>-->


          <button v-for="(img, name) in grImgs" :ref="name" type="button" class="btn btn-success m-1" @click.prevent="filterByClick($event, name)">
            {{name}}
          </button>


          <section id="content1">

            <client-only>

              <LightGallery
                :images="filterImgs(null)"
                :index="index"
                :disable-scroll="true"
                @close="index = null"
              />

              <ul>
                <transition-group name="slide-fade">
                <li class="thumb"
                    v-for="(thumb, thumbIndex) in filterImgs(null)"
                    :key="`key-${thumbIndex}`"
                    @click="index = thumbIndex"
                >
                  <img :src="thumb.images.thumbnail">
                </li>
                </transition-group>
              </ul>

            </client-only>
          </section>
        </div>
      </div>
    </div>
    <section class="w3l-testimonials" id="testimonials">
      <div class="customers-6-content py-5">
        <div class="container py-lg-3">
          <div class="heading text-center mx-auto">
            <h3 class="head text-white">Отзывы</h3>
            <p class="my-3 head text-white">наших гостей</p>
          </div>

          <client-only>
            <agile
              :nav-buttons="false"
              :autoplay-speed="5000"
              :speed="2500"
              fade="fade"
              pause-on-hover="pause-on-hover"
              pause-on-dots-hover="pause-on-dots-hover"
              autoplay="autoplay"
            >
              <div v-for="review in reviews" :key="review.id" class="slide card backTransp">
                <div class="card-body text-center">
                  <img class="card-img-top img-responsive mx-auto" :src="review.images.thumbnail" alt="">
                  <h3 class="card-title mt-2 text-white">{{review.name}}</h3>
                  <p class="sub-title mb-3 text-white">{{review.prof}}</p>
                  <p class="card-text text-white">{{review.message}}</p>
                </div>
              </div>

              <template slot="prevButton"><i class=" fa-chevron-left"></i></template>
              <template slot="nextButton"><i class=" fa-chevron-right"></i></template>
            </agile>
          </client-only>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        prices: [],
        info: {},
        pictures: [],
        reviews: [],
        myOptions: {
          navButtons: true,
          responsive: [
            {
              breakpoint: 900,
              settings: {
                navButtons: true,
                dots: true,
                infinite: true
              }
            }
          ]
        },
        hall: null,
        index: null,
      };
    },
    async asyncData({store}) {
      try {
        const {prices, info, pictures, reviews} = await store.dispatch('front/index');
        return {
          prices,
          info,
          pictures,
          reviews
        }
      } catch (err) {
        console.log(err.response);
        if(err.response.status === 404){
          //error({statusCode: 404, message: "Design not found"})
        }
      }
    },

    methods: {
      filterImgs() {
        if (this.hall) {
          return this.pictures.filter(image => image.hall === this.hall);
        }
        return this.pictures;
      },

      filterByClick(event, hall) {
        Object.keys(this.$refs).forEach(key =>
          this.$refs[key][0] ? this.$refs[key][0].classList.remove('active') :
            this.$refs[key].classList.remove('active')) ;
        event.target.classList.add('active')
        this.hall = hall
      }
    },
    computed: {
      grImgs(){
         let group = this.pictures.reduce((r, a) => {
          r[a.hall] = [...r[a.hall] || [], a];
          return r;
        }, {});
        return group;
      }
    }

  }
</script>

<style lang="scss">
  .agile {
    width: 100%;
  }

  .agile__actions {
    margin-top: 20px;
  }
  .agile__nav-button {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 24px;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }
  .agile__nav-button:hover {
    color: #888;
  }
  .agile__dot {
    margin: 0 10px;
  }
  .agile__dot button {
    background-color: #eee;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 10px;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    width: 10px;
  }
  .agile__dot--current button, .agile__dot:hover button {
    background-color: #888;
  }

  .slide {
    -webkit-box-align: center;
    align-items: center;
    color: #fff;
    display: -webkit-box;
    display: flex;
    height: auto;
    -webkit-box-pack: center;
    justify-content: center;
  }
  .slide h3 {
    font-size: 32px;
    font-weight: 300;
  }
  .backTransp{
    background: transparent !important;
  }

</style>
