<template>
  <div>
    <section class="w3l-about-breadcrum">
      <div class="breadcrum-bg">
        <div class="container py-5">
          <p class="py-3"><!--<a href="index.html">Home</a> &nbsp; / &nbsp; About--></p>
        </div>
      </div>
    </section>
    <!-- contact -->
    <section class="w3l-contacts-12" id="contact">
      <div class="contact-top pt-2">
        <div class="container py-md-3">

          <div class="row cont-main-top">
            <!-- contact form -->
            <!-- //contact form -->
            <!-- contact address -->
            <div class="contact col-lg-12 mt-lg-0 mt-1">
              <div class="cont-subs">
                <div class="cont-add">
                  <div class="cont-add-lft">
                    <span class="fa fa-map-marker" aria-hidden="true"></span>
                  </div>
                  <div class="cont-add-rgt">
                    <p class="contact-text-sub">{{contacts.address}}</p>
                  </div>

                </div>
                <div class="cont-add add-2">
                  <div class="cont-add-lft">
                    <span class="fa fa-clock-o" aria-hidden="true"></span>
                  </div>
                  <div class="cont-add-rgt">
                    <p class="contact-text-sub">{{contacts.terms}}</p>
                  </div>

                </div>
                <div v-if="contacts.email" class="cont-add add-2">
                  <div class="cont-add-lft">
                    <span class="fa fa-envelope" aria-hidden="true"></span>
                  </div>
                  <div class="cont-add-rgt">
                    <a :href="'mailto:'+contacts.email">
                      <p class="contact-text-sub">{{contacts.email}}</p>
                    </a>
                  </div>

                </div>
                <div class="cont-add ">
                  <div class="cont-add-lft">
                    <span class="fa fa-phone" aria-hidden="true"></span>
                  </div>
                  <div class="cont-add-rgt">
                    <a href="tel:+7-800-999-800">
                      <p class="contact-text-sub">{{contacts.phone}}</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <!-- //contact address -->

          </div>
        </div>
        <!-- map -->
        <div class="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.927876172222!2d30.595628951683352!3d50.423815397063265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c579188ddf63%3A0xbd4fd9f3e07630ce!2z0JTQvtC9!5e0!3m2!1sru!2sua!4v1592127644425!5m2!1sru!2sua" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
        <!-- //map -->
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contacts: {}
      }
    },
    async asyncData({store}) {
      try {
        const {contacts} = await store.dispatch('front/contacts');
        return {
          contacts
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
