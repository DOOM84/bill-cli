export const state = () => ({
});

export const mutations = {

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('admin/gallery')
        } catch (error) {
            throw error;
        }
    },

    async create({}, data) {
        try {
            return await this.$axios.$post('admin/gallery', data, {
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
        return await this.$axios.$patch(`admin/gallery/${params.id}`, params)
        } catch (error) {
            throw error;
        }
    },

  async delete({}, id){

        try {
           return await this.$axios.$delete(`admin/gallery/${id}`);
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {

  };
