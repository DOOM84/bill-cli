export const state = () => ({
});

export const mutations = {

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/dish')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/dish', data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
            })
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
        return await this.$axios.$patch(`admin/dish/${params.id}`, params)
        } catch (error) {
            throw error;
        }
    },

  async delete({}, id){
        try {
           return await this.$axios.$delete(`admin/dish/${id}`);
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {

  };
