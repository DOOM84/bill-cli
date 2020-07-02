export const state = () => ({
});

export const mutations = {

};


export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/user')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/user', data)
        } catch (error) {
            throw error;
        }
    },

  async restore({}, data) {
    try {
      return await this.$axios.$post('getPass', data)
    } catch (error) {
      throw error;
    }
  },

    async update({}, params){
      try {
            return await this.$axios.$patch(`admin/user/${params.id}`, params)
        } catch (error) {
            throw error;
        }
    },
  async delete({}, id){

        try {
           return await this.$axios.$delete(`admin/user/${id}`);
        } catch (error) {
            throw error;
        }
    }

};

export const getters = {

  };
