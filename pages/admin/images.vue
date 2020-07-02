<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Галерея</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="btn btn-outline-secondary">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="pictures" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Изображение</th>
            <th scope="col">Зал</th>
            <th scope="col">Опубликовано</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pic, i) in pictures" :key="pic.id">
            <th scope="row">{{i+1}}</th>
            <td>
              <img @click="showImage(pic.images.original)" style="cursor: pointer" :src="pic.images.thumbnail" alt="">
            </td>
            <td>{{pic.hall}}</td>
            <td>{{pic.status ? 'ДА' : 'Нет'}}</td>
            <td>
              <button @click.prevent="editItem(pic)" type="button" class="btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(pic.id)" type="button" class="btn btn-danger"><i
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
        <div class="p-2">
          <div class="text-center" v-if="mode === 'edit'">
            <img :src="image" alt="">
          </div>

          <label class="form-check-label" for="chooseHall">Выберите зал</label>
          <select id="chooseHall" v-model="hall" class="custom-select">
            <option value="Зал 1">Зал 1</option>
            <option value="Зал 2">Зал 2</option>
            <option value="VIP зал">VIP зал</option>
          </select>
        </div>

        <div v-if="mode === 'add'" class="input-group p-2">
          <div class="custom-file">
            <input ref="file" type="file" class="custom-file-input" id="customFile" multiple>
            <label class="custom-file-label" for="customFile">Выберите файл(ы)</label>
          </div>
        </div>

          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="status" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Опубликовано</label>
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
                @click.prevent="updateItem()">
          Сохранить
        </button>
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
        hall: '',
        status: 0,
        pictures: [],
        mode: '',
        image: '',
        id: '',
      }
    },

    async asyncData({store}) {
      try {
        const {pictures} = await store.dispatch('adminGallery/index');
        return {
          pictures
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
      editItem(pic) {
        this.id = pic.id;
        this.hall = pic.hall;
        this.status = pic.status;
        this.image = pic.images.thumbnail;
        this.showModal('edit');
      },

      async uploadImgs() {
        let formData = new FormData();

        for (let i = 0; i < this.$refs.file.files.length; i++) {
          let file = this.$refs.file.files[i];
          formData.append('images[' + i + ']', file,);
          formData.append('hall', this.hall);
          formData.append('status', this.status);
        }
        try {
          const {success} = await this.$store.dispatch('adminGallery/create', formData);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
          await this.loadGal();

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
          const {success, picture} = await this.$store.dispatch('adminGallery/update', {id: this.id, hall: this.hall, status: this.status});
          this.$set(this.pictures, this.pictures.findIndex(item => item.id === this.id), picture);
          this.$modal.hide('conditional-modal');
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          console.log(e);
        }
      },

      async loadGal() {
        const {pictures} = await this.$store.dispatch('adminGallery/index');
        this.pictures = pictures;
        this.$modal.hide('conditional-modal')
      },

      beforeClose(event) {
        this.hall = '';
        this.status = 0;
        this.image = '';
        if (this.mode === 'add') {
          this.$refs.file.value = '';
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminGallery/delete', id);
          this.pictures.splice(this.pictures.findIndex(item => item.id === id), 1);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        }
      },

      showImage(pic) {
        this.$modal.show({
          template: `<img width="100%" :src="pic" alt="">`,
          props: ['pic']
        }, {
          pic
        }, {
          style: 'z-index: 1000000;',
          scrollable: true,
          width: '70%',
          height: 'auto'
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
