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
    <div class="heading mx-auto pt-3">
      <h3 class="head text-center py-3">Вход</h3>
      <div class="form-group px-3">
        <label for="email">E-mail</label>
        <input type="email" v-model="email" class="form-control" id="email">
      </div>
      <div class="form-group px-3">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" class="form-control" id="password">
      </div>
      <div class="form-group px-3 text-right">
        <button
                type="button"
                class="mod-but btn btn-success"
                @click.prevent="login">
          Войти
        </button>
        <button
          type="button"
          class="mod-but btn btn-outline-dark"
          @click.prevent="showRestore = !showRestore">
          Забыл пароль
        </button>
      </div>
      <template v-if="showRestore">
        <div class="form-group px-3">
          <label for="restoreEmail">E-mail</label>
          <input type="email" v-model="restoreEmail" class="form-control" id="restoreEmail">
        </div>
        <div class="form-group px-3 text-right">
          <button
            type="button"
            class="mod-but btn btn-info"
            @click.prevent="restore">
            Восстановить
          </button>
        </div>
      </template>

    </div>
    <div>
    </div>
  </section>
</div>
</template>

<script>
    export default {
      middleware: 'guest',
      data(){
        return {
          restoreEmail: '',
          showRestore: false,
          email:'',
          password: '',
        }
      },
      methods: {
        async login(){
          try {
            const formData = {
              email: this.email,
              password: this.password
            };
            await this.$auth.loginWith('local', {data: formData});

          }catch (e) {
            const message = e.response.data.errors;
            this.$modal.hide('conditional-modal');
            this.$notify({
              type: 'error',
              group: 'foo',
              text: message.email ? message.email[0] : 'Ошибка входа'
            });
          }
        },
        async restore(){
          try {
            const {success} = await this.$store.dispatch('adminUser/restore', {email: this.restoreEmail});
            this.showRestore = false;
            this.restoreEmail= '';
            this.$notify({
              type: 'success',
              group: 'foo',
              text: success
            });
          } catch (e) {
            const message = e.response.data.errors;
            for (const key of Object.keys(message)) {
              this.$notify({
                type: 'error',
                group: 'foo',
                text: message[key][0]
              });
              break;
            }
          }
        }
      }
    }

</script>

<style>

</style>
