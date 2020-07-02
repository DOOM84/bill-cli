export const state = () => ({
});

export const mutations = {

};

export const actions = {

    async index() {
        try {
            return await this.$axios.$get('index')
        } catch (error) {
            throw error;
        }
    },

   async menu() {
        try {
            return await this.$axios.$get('menu')
        } catch (error) {
            throw error;
        }
    },

  async contacts() {
        try {
            return await this.$axios.$get('contacts')
        } catch (error) {
            throw error;
        }
    },
};

export const getters = {

  };
