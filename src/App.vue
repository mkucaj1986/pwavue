<template>
    <div id="app">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <router-link to="/home">Home</router-link>
            <router-link to="/camera">Camera</router-link>
        </el-menu>
        <img alt="Vue logo" src="./assets/logo.png">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <ServiceWorker></ServiceWorker>
    </div>
</template>

<script>
import ServiceWorker from './components/ServiceWorker.vue';
import IndexDB from './helpers/indexDb.js';

export default {
  name: 'app',
  components: {
    ServiceWorker
  },
  data () {
    return {
      db: new IndexDB(),
      activeIndex: '1'
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-menu a {
  color: #000;
  padding: 10px;
  text-decoration: none;
}
</style>
