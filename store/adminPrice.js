export const state = () => ({
});

export const mutations = {

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/price')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/price', data)
        } catch (error) {
            throw error;
        }
    },

    async update({}, params){
      try {
        return await this.$axios.$patch(`admin/price/${params.id}`, params)
        } catch (error) {
            throw error;
        }
    },

  async delete({}, id){
        try {
           return await this.$axios.$delete(`admin/price/${id}`);
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {

  };
