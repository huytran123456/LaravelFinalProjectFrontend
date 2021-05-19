<template>
  <Header/>
  <p>{{ $t("hello") }}</p>
  <router-view/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'

export default {
  name: "App",
  components: {
    Header
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (this.$route.name) {
          document.title = this.$t("title."+this.$route.name)
        }
      }
    }
  }
};
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0px;
}

body {
  background: url("background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
