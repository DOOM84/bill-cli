<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Отзывы</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="btn btn-outline-secondary">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="reviews" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Род деятельности</th>
            <th scope="col">Сообщение</th>
            <th scope="col">Аватар</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(review, i) in reviews" :key="review.id">
            <th scope="row">{{i+1}}</th>
            <td>{{review.name}}</td>
            <td>{{review.prof}}</td>
            <td>{{review.message}}</td>
            <td>
              <img @click="showImage(review.images.original)" width="120px" style="cursor: pointer" :src="review.images.thumbnail" alt="">
            </td>
            <td>
              <button @click.prevent="editItem(review)" type="button" class="btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(review.id)" type="button" class="btn btn-danger"><i
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
        <div class="p-2" v-if="mode === 'edit'">
          <div class="text-center">
            <img :src="image" alt="">
          </div>
        </div>

        <div class="form-group">
          <label for="name">Имя</label>
          <input type="text" v-model="review.name" class="form-control" id="name">
        </div>
        <div class="form-group">
          <label for="prof">Род деятельности</label>
          <input type="text" v-model="review.prof" class="form-control" id="prof">
        </div>

        <div class="form-group">
          <label for="message">Сообщение</label>
          <input type="text" v-model="review.message" class="form-control" id="message">
        </div>

        <div class="input-group p-2">
          <div class="custom-file">
            <input ref="file" type="file" class="custom-file-input" id="customFile" >
            <label class="custom-file-label" for="customFile">Выберите файл автара</label>
          </div>
        </div>

        <div class="float-right m-3">
          <button v-if="mode === 'add'"
                  type="button"
                  class="mod-but btn btn-success"
                  @click.prevent="uploadImgs">
            Загрузить
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
        reviews: [],
        review: {
          id: '',
          name: '',
          prof: '',
          message: '',
          //avatar: '',
        },
        mode: '',
        image: '',
        id: '',
      }
    },

    async asyncData({store}) {
      try {
        const {reviews} = await store.dispatch('adminReview/index');
        return {
          reviews
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
      editItem(review) {
        this.review.id = review.id;
        this.review.name = review.name;
        this.review.prof = review.prof;
        this.review.message = review.message;
        this.image = review.images.thumbnail;
        this.showModal('edit');
      },

      async uploadImgs() {
        let formData = new FormData();
          let file = this.$refs.file.files[0];
          formData.append('image', file,);
          formData.append('name', this.review.name);
          formData.append('prof', this.review.prof);
          formData.append('message', this.review.message);

        try {
          const {success} = await this.$store.dispatch('adminReview/create', formData);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
          await this.loadReviews();

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
          //console.log({id: this.id, hall: this.hall, status: this.status})
          let formData = new FormData();
          let file = this.$refs.file.files[0];
          if(file){formData.append('image', file)}

          formData.append('name', this.review.name);
          formData.append('prof', this.review.prof);
          formData.append('message', this.review.message);
          formData.append('_method', 'PATCH');

          const {success, review} = await this.$store.dispatch('adminReview/update', {data: formData, id: this.review.id});
          this.$set(this.reviews, this.reviews.findIndex(item => item.id === review.id), review);
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

      async loadReviews() {
        const {reviews} = await this.$store.dispatch('adminReview/index');
        this.reviews = reviews;
        this.$modal.hide('conditional-modal')
      },

      beforeClose(event) {
        this.review = {
            id: '',
            name: '',
            prof: '',
            message: '',
            avatar: '',
        }
        this.image = '';
        if (this.mode === 'add') {
          this.$refs.file.value = '';
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminReview/delete', id);
          this.reviews.splice(this.reviews.findIndex(item => item.id === id), 1);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        }
      },

      showImage(pic) {
        this.$modal.show({
          template: `<img :src="pic" alt="">`,
          props: ['pic']
        }, {
          pic
        }, {
          style: 'z-index: 1000000;',
          responsive: true,
          height:"120",
          width:"120"
        })
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
