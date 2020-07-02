<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Цены</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="btn btn-outline-secondary">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="prices" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Время</th>
            <th scope="col">Русский бильярд</th>
            <th scope="col">Pool</th>
            <th scope="col">Зал</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(price, i) in prices" :key="price.id">
            <th scope="row">{{i+1}}</th>
            <td>{{price.term}}</td>
            <td>{{price.rus}}</td>
            <td>{{price.pool}}</td>
            <td>{{price.hall}}</td>
            <td>
              <button @click.prevent="editItem(price)" type="button" class="btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(price.id)" type="button" class="btn btn-danger"><i
                class="fa fa-remove"></i></button>

            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <client-only>
      <modal
        style="z-index: 1000000"
        name="conditional-modal"
        :adaptive="true"
        :max-width="1000"
        width="80%"
        height="auto"
        @before-close="beforeClose"
      >
        <div class="container">
        <div class="form-group">
          <label for="term">Время</label>
          <input type="text" v-model="priceToUpdate.term" class="form-control" id="term">
        </div>
        <div class="form-group">
          <label for="rus">Русский</label>
          <input type="text" v-model="priceToUpdate.rus" class="form-control" id="rus">
        </div>
        <div class="form-group">
          <label for="pool">Pool</label>
          <input type="text" v-model="priceToUpdate.pool" class="form-control" id="pool">
        </div>
        <div class="form-group">
          <label class="form-check-label" for="chooseHall">Зал</label>
          <select id="chooseHall" v-model="priceToUpdate.hall" class="custom-select">
            <option value="Зал 1">Зал 1</option>
            <option value="Зал 2">Зал 2</option>
            <option value="VIP зал">VIP зал</option>
          </select>
        </div>
        <div class="float-right m-3">
          <button v-if="mode === 'add'"
                  type="button"
                  class="mod-but btn btn-success"
                  @click.prevent="createItem">
            Добавить
          </button>
          <button v-else
                  type="button"
                  class="mod-but btn btn-success"
                  @click.prevent="updateItem">
            Сохранить
          </button>
        </div>
        </div>


      </modal>
    </client-only>

  </div>
</template>

<script>
  export default {
    layout: 'admin',
    data() {

      return {
        mode: '',
        prices: [],
        priceToUpdate: {
          term: '',
          rus: '',
          pool: '',
          hall: '',
        }
      }
    },

    async asyncData({store}) {
      try {
        const {prices} = await store.dispatch('adminPrice/index');
        return {
          prices
        }
      } catch (error) {
        /*if (error.response.status === 401) {
            return $nuxt.$router.replace('/login');
        }*/
      }
    },

    methods: {
      showModal(mode) {
        this.mode = mode;
        this.$modal.show('conditional-modal')
      },
      editItem(price) {
        this.priceToUpdate = Object.assign(this.priceToUpdate, price);
        this.showModal('edit');
      },

      async createItem() {
        try {
          const {success, price} = await this.$store.dispatch('adminPrice/create', this.priceToUpdate);
          this.prices.push(price);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          this.$modal.hide('conditional-modal');
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
      },

      async updateItem(){
        try {
          const {success, price} = await this.$store.dispatch('adminPrice/update', this.priceToUpdate);
          this.$set(this.prices, this.prices.findIndex(item => item.id === price.id), price);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          this.$modal.hide('conditional-modal');
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
      },

      beforeClose(event) {
        this.priceToUpdate = {
            term: '',
            rus: '',
            pool: '',
            hall: '',
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminPrice/delete', id);
          this.prices.splice(this.prices.findIndex(item => item.id === id), 1);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
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
