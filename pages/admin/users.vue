<template>
  <div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Пользователи (администраторы)</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button @click.prevent="showModal('add')" type="button" class="btn btn-outline-secondary">
            Добавить
          </button>
        </div>
      </div>
    </div>
    <div v-if="users" class="container">
      <div class="table-responsive mb-5">
        <table class="table table-striped ">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">E-mail</th>
            <th scope="col">Статус</th>
            <th scope="col">Операции</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, i) in users" :key="user.id">
            <th scope="row">{{i+1}}</th>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.status ? 'Активен' : 'Заблокирован'}}</td>
            <td>
              <button @click.prevent="editItem(user)" type="button" class="btn btn-info"><i class="fa fa-edit"></i>
              </button>
              <button @click.prevent="deleteItem(user.id)" type="button" class="btn btn-danger"><i
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
        scrollable
      >
        <div class="container">
        <div class="form-group">
          <label for="name">Имя</label>
          <input type="text" v-model="userToUpdate.name" class="form-control" id="name">
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" v-model="userToUpdate.email" class="form-control" id="email">
        </div>
            <div class="form-group">
              <label for="password">Пароль</label>
              <input type="password" v-model="userToUpdate.password" class="form-control" id="password">
            </div>
            <div class="form-group">
              <label for="password_confirmation">Повторите пароль</label>
              <input type="password" v-model="userToUpdate.password_confirmation" class="form-control" id="password_confirmation">
            </div>
          <div class="custom-control custom-checkbox m-2 float-left">
            <input v-model="userToUpdate.status" type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">Активен</label>
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
        users: [],
        userToUpdate: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          status: false,
        }
      }
    },

    async asyncData({store}) {
      try {
        const {users} = await store.dispatch('adminUser/index');
        return {
          users
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
      editItem(user) {
        this.userToUpdate = Object.assign(this.userToUpdate, user);
        this.showModal('edit');
      },

      async createItem() {
        try {
          const {success, user} = await this.$store.dispatch('adminUser/create', this.userToUpdate);
          this.users.push(user);
          this.$notify({
            type: 'success',
            group: 'foo',
            text: success
          });
        } catch (e) {
          const message = e.response.data.errors;
          this.$modal.hide('conditional-modal');
          for (const key of Object.keys(message)) {
            this.$notify({
              type: 'error',
              group: 'foo',
              text: message[key][0]
            });
            break;
          }
          //this.$modal.hide('conditional-modal');
        }
      },

      async updateItem(){
        try {
          const {success, user} = await this.$store.dispatch('adminUser/update', this.userToUpdate);
          this.$set(this.users, this.users.findIndex(item => item.id === user.id), user);
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
        this.userToUpdate = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          status: false,
        }
      },

      async deleteItem(id) {
        if (confirm('Are You Sure?')) {
          const {success} = await this.$store.dispatch('adminUser/delete', id);
          this.users.splice(this.users.findIndex(item => item.id === id), 1);
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
