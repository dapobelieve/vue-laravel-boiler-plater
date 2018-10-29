import router from './router'
import store from './store'
import localforage from 'localforage'

// configure localforage
localforage.config({
    driver: localforage.LOCALSTORAGE,
    storeName: 'Believe'
})

require('./bootstrap');





Vue.component('app', require('./components/App.vue'));
Vue.component('navigation', require('./components/Navigation.vue'));


store.dispatch('auth/setToken', '').then(() => {

    store.dispatch('auth/fetchUser').catch(() => {
        store.dispatch('auth/clearAuth');
        router.replace({
            name: 'login'
        })
    })
}).catch(() => {
    store.dispatch('auth/clearAuth');
})

const app = new Vue({
    el: '#app',
    store: store,
    router: router
});
