export default  function ({$axios, store, app, redirect}) {

    $axios.onError(error => {
        if (error.response.status === 401) {
            app.$auth.reset();
            return redirect('/login');
        }

        return Promise.reject(error);
    });
}
