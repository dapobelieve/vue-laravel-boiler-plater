import router from './router'
import store from './store'

require('./bootstrap');





Vue.component('app', require('./components/App.vue'));
Vue.component('navigation', require('./components/Navigation.vue'));

const app = new Vue({
    el: '#app',
    store: store,
    router: router
});
