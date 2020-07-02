<template>
  <div>
    <!--<section class="w3l-bootstrap-header">
      &lt;!&ndash;<nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Navbar w/ text</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <span class="navbar-text">
      Navbar text with an inline element
    </span>
        </div>
      </nav>&ndash;&gt;
      <nav class="navbar navbar-expand-lg navbar-light py-lg-3 py-2">
        <div class="container">
          <nuxt-link class="navbar-brand" to="/"> Бильярдный клуб &lt;!&ndash;Дон&ndash;&gt;</nuxt-link>
          &lt;!&ndash; if logo is image enable this
        <a class="navbar-brand" href="#index.html">
            <img src="image-path" alt="Your logo" title="Your logo" style="height:35px;" />
        </a> &ndash;&gt;
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon fa fa-bars"></span>
          </button>

          <div ref="navContent" class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <nuxt-link to="/" class="nav-link">
                  Главная
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/menu" class="nav-link">
                  Меню
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/tournaments" class="nav-link">
                  Турниры
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/contacts" class="nav-link">
                  Контакты
                </nuxt-link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </section>-->
    <app-nav />
      <nuxt/>
    <app-footer />

  </div>
</template>


<script>
  import AppNav from '@/components/nav'
  import AppFooter from '@/components/footer'
  export default {
    components: {AppFooter, AppNav},

  }
</script>


<style>

</style>
