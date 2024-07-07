<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import 'vue3-toastify/dist/index.css';

export default {
  components: {
    Header
  },
}
</script>
