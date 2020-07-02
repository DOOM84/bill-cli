<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Общая информация</h1>
    </div>
    <div v-if="info" class="container">
      <div class="form-group">
        <label for="general">Общая информация</label>
        <input type="text" v-model="info.general" class="form-control" id="general">
      </div>
      <div class="form-group">
        <label for="rus">Русский бильярд (кол-во столов)</label>
        <input type="text" v-model="info.rus" class="form-control" id="rus">
      </div>
      <div class="form-group">
        <label for="pool">Pool (кол-во столов)</label>
        <input type="text" v-model="info.pool" class="form-control" id="pool">
      </div>
      <div class="form-group">
        <label for="halls">Всего залов</label>
        <input type="text" v-model="info.halls" class="form-control" id="halls">
      </div>
      <div class="form-group">
        <label for="other">Другое</label>
        <input type="text" v-model="info.other" class="form-control" id="other">
      </div>
      <button v-if="mode === 'edit'" @click.prevent="updateItem" type="button" class="btn btn-primary">Сохранить</button>
      <button v-else @click.prevent="createItem" type="button" class="btn btn-primary">Сохранить</button>
    </div>

  </div>
</template>

<script>
  export default {
    layout: 'admin',
    data() {
      return {
        info: {
          general: '',
          rus: '',
          pool: '',
          halls: '',
          other: '',
        },
        mode: '',
      }
    },

    async asyncData({store}) {
      try {
        const {info} = await store.dispatch('adminInfo/index');
        return {
          info
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    created() {
      this.mode = !this.info.rus ? 'add' : 'edit';
    },

    methods: {
      async createItem() {
        try {
          const {success} = await this.$store.dispatch('adminInfo/create', this.info);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          const message = e.response.data.errors;
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'error',
            group: 'foo',
            text: 'Ошибка'
          });
        }
      },

      async updateItem(){
        try {
          //console.log({id: this.id, hall: this.hall, status: this.status})

          const {success, info} = await this.$store.dispatch('adminInfo/update', this.info);
          this.info = info;
          //this.$set(this.pictures, this.pictures.findIndex(item => item.id === this.id), picture);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          console.log(e);
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .mod-but {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;

    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
</style>
