import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faShareAlt,
  faThList,
  faEnvelope,
  faUser,
  faSignInAlt,
  faEdit,
  faTrash,
  faUserCog
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//Install Inputmask
import VueInputMask from 'vue-inputmask';
Vue.use(VueInputMask.default);

//Install FontAwesome
library.add(
  faHome,
  faShareAlt,
  faThList,
  faEnvelope,
  faUser,
  faSignInAlt,
  faEdit,
  faTrash,
  faUserCog
);
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install Vue GTAG.JS
import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
  config: {
    id: "UA-182085661-1"
  },
  pageTrackerTemplate(to) {
    return {
      page_title: to.meta.name,
      page_path: to.path
    }
  }
}, router);

// Install BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo);

Vue.config.productionTip = false

import './styles/main.scss';

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
