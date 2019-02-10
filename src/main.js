// #Todo:
// - import vuetify
// - debug imports to get site working
// - swap log in over to using google
// - redirect if user account not on allowed list
// - on page 1 call it 'lights', show column for light in lights and let them be set
// - add taskbar to bottom of lights to allow all lights to be controlled (setTheme / allOn / allOff )
// - add page to create new theme
// - change colourscheme of site

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';
import storeConfig from './vuex/store';
import theme from './styles/theme';


Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Vuetify, { theme });

const store = new Vuex.Store(storeConfig);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
