<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light text-dark" style="background-color: wheat">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav nav-pills nav-fill w-100 me-auto mb-2 mb-lg-0">
            <li class="nav-item px-3 mt-2">
              <router-link tag="li" active-class="active" class="nav-link" aria-current="page" to="/">Home</router-link>
            </li>
            <li class="nav-item px-3 mt-2">
              <router-link tag="li" active-class="active" class="nav-link" aria-current="page" to="/login">Login
              </router-link>
            </li>
            <li class="nav-item px-4 mt-2">
              <router-link tag="li" active-class="active" class="nav-link" to="/rentalFilmList">Film Rental
              </router-link>
            </li>
            <li class="nav-item px-4 mt-2">
              <router-link tag="li" active-class="active" class="nav-link" to="/signup">Signup</router-link>
            </li>
            <li class="nav-item px-4 mt-2">
              <router-link tag="li" active-class="active" class="nav-link" to="/about">Anor Londo</router-link>
            </li>
            <li class="nav-item px-4 mt-2">
              <button @click="logout()" class="nav-link active" style="background-color:darkturquoise">
                <span class="bi-arrow-right-square"></span> Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from 'js-cookie'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  //'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + Cookies.get('token')
};
export default {
  name: "App",
  methods: {
    logout: async function () {
      Cookies.remove('token')
      await this.$router.push('/')
      this.$router.go()
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        Cookies.remove('social_token')
      });
    }
  },
}

</script>

<style>
li .nav-item {
  width: calc(100% / 5);
}

/*nav li:hover,*/
/*nav li.router-link-active,*/
/*nav li.router-link-exact-active {*/
/*  background-color: cadetblue;*/
/*  cursor: pointer;*/
/*}*/
</style>
