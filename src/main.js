import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Camera from './components/Camera.vue';
import Home from './components/Home.vue';
import { registerGlobals } from './helpers/globals';

Vue.use(VueRouter);
Vue.use(ElementUI);

const routes = [
  { path: '/home', component: Home },
  { path: '/camera', component: Camera }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes,
  mode: 'history'
});

// Vue $prototype
Vue.use(registerGlobals);

Vue.config.productionTip = false;

// Hold App element DOM
const el = document.getElementById('app');

// Runing Vue Instance
(() =>
  new Vue({
    el,
    router,
    render: h => h(App)
  }))();
