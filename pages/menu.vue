<template>
  <div>
    <section class="w3l-about-breadcrum">
      <div class="breadcrum-bg">
        <div class="container py-5">
          <p class="py-3"><!--<a href="index.html">Home</a> &nbsp; / &nbsp; About--></p>
        </div>
      </div>
    </section>
    <section class="w3l-features-4">
      <div class="heading text-center mx-auto pt-3">
        <h3 class="head">Меню</h3>
      </div>
      <client-only>
        <LightGallery
          :images="dishes"
          :index="index"
          :disable-scroll="true"
          @close="index = null"
        />
        <ul>
          <li class="d-flex justify-content-center py-3"
              v-for="(thumb, thumbIndex) in dishes"
              :key="thumbIndex"

          >
            <img
              @click="index = thumbIndex"
              class="img-responsive"
              style="cursor: pointer"
              :src="thumb.images.thumbnail">
          </li>
        </ul>
      </client-only>
      <div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dishes: [],
        index: null,
      }
    },
    async asyncData({store}) {
      try {
        const {dishes} = await store.dispatch('front/menu');
        return {
          dishes
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },
  }
</script>

<style scoped>

</style>
