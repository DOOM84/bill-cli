<template>
  <div>
  <section class="w3l-bootstrap-header">
    <nav class="navbar navbar-expand-lg navbar-light py-lg-3 py-2">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/"> Бильярдный клуб <!--Дон--></nuxt-link>

        <!-- if logo is image enable this
      <a class="navbar-brand" href="#index.html">
          <img src="image-path" alt="Your logo" title="Your logo" style="height:35px;" />
      </a> -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon fa fa-bars"></span>
        </button>
        <notifications group="foo" animation-name="v-fade-left" position="top center" />

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
  </section>

  </div>
</template>

<script>
    export default {
      watch: {
        '$route.path': function () {
          this.$refs.navContent.classList.remove('show');
          //console.log(this.$refs.navContent.classList.remove('show'))

        }
      }
    }
</script>

<style scoped>

</style>
