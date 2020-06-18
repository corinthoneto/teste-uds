import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import $ from 'jquery';
window.jQuery = window.$ = $;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { makeServer } from "./server"

if (process.env.NODE_ENV === "development") {
  makeServer()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
