import Vue from 'vue';
import Vuex from 'vuex';

// #Todo: remove vuetify once replaced with bootstrap-vue
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store/index';


Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(Vuetify);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
