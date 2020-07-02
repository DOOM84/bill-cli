<template>
<div>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <nuxt-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Бильярдный клуб</nuxt-link>
    <notifications group="foo" animation-name="v-fade-left" position="top center" />
    <button type="button" @click.prevent="showNav" id="toggle" class="btn btn-success">
      <i class="float-right fa fa-bars text-white"></i>
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a href="#" class="nav-link" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <nav id="nav" ref="nav" class="col-md-2 d-none d-md-block bg-light sidebar mt-5">
        <div class="sidebar-sticky " style="font-size: .875rem;">
          <ul class="nav flex-column">
            <li class="nav-item">
              <nuxt-link to="/admin" class="nav-link" href="#">
                <i class="fa fa-home pr-1"></i>
                Главная
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/info" class="nav-link" href="#">
                <i class="fa fa-info pr-1"></i>
                Информация
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/price" class="nav-link" href="#">
                <i class="fa fa-money pr-1"></i>
                Цены
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin/images">
                <i class="fa fa-image pr-1"></i>
                Изображения
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin/menu">
                <i class="fa fa-image pr-1"></i>
                Меню
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin/contacts">
                <i class="fa fa-at pr-1"></i>
                Контакты
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin/reviews">
                <i class="fa fa-users pr-1"></i>
                Отзывы
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin/users">
                <i class="fa fa-user pr-1"></i>
                Пользователи
              </nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
      <main id="main" role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 " style="font-size: .875rem;">
      <nuxt/>
      </main>
    </div>
  </div>

</div>
</template>

<script>
  export default {
      middleware: 'auth',
      head () {
        return {
          script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.9.0/feather.min.js', body: true }
          ],
          link: [
            { rel: 'stylesheet', href: '/css/dashboard.css' }
          ]
        }
      },
      methods: {
        showNav(){

          if(this.$refs['nav'].classList.contains('d-none')){
            this.$refs['nav'].classList.remove('d-none');
            this.$refs['nav'].classList.add('mt-5');
            scroll(0,0);
          }else{
            this.$refs['nav'].classList.add('d-none');

          }
        },
        logout(){
          this.$auth.logout()
        },

      },
      watch: {
        '$route.path': function() {
          this.$refs['nav'].classList.add('d-none');
        }
      },
    }
</script>

<style lang="scss">
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
    #toggle{
      display:none;
    }

  }

  @media(max-width:768px){
    #main {
      padding-top: 20px;
      margin-top: 20px;
    }

  }
  @media(max-width:575px){
    #main {
      padding-top: 35px;
      margin-top: 35px;
    }

  }

  @media(min-width:575px){
    #nav{
      padding-top: 0;
    }

  }
</style>
