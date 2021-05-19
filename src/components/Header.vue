<template>
  <div class="container-fluid" id="container_header">
    <nav class="navbar navbar-expand-lg navbar-light text-dark" id="navbar_header" style="background-color: wheat">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><img src="unicorn.svg" alt="" width="50" height="50"></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav nav-pills nav-fill w-100 me-auto mb-2 mb-lg-0">
            <li class="nav-item px-1 py-1">
              <router-link tag="li" active-class="active" class="nav-link"
                           aria-current="page" to="/">
                <h4 style="margin-bottom: 0"><strong>Home</strong></h4>
              </router-link>
            </li>
            <li class="nav-item px-1 py-1">
              <router-link tag="li" active-class="active" class="nav-link" to="/about">
                <h4 style="margin-bottom: 0"><strong>About</strong></h4>
              </router-link>
            </li>
            <li class="nav-item px-1 py-1">
              <router-link tag="li" active-class="active" class="nav-link" to="/rentalFilmList">
                <h4 style="margin-bottom: 0"><strong>Films</strong></h4>
              </router-link>
            </li>
            <li class="nav-item px-1 py-1">
              <router-link tag="li" active-class="active" class="nav-link" aria-current="page" to="/login">
                <h4 style="margin-bottom: 0"><strong>Login</strong></h4>
              </router-link>
            </li>
            <li class="nav-item px-1 py-1">
              <router-link tag="li" active-class="active" class="nav-link" to="/signup">
                <h4 style="margin-bottom: 0"><strong>Signup</strong></h4>
              </router-link>
            </li>
            <li class="nav-item px-1 py-1">
              <router-link :class="{ disabled: someBoolean }" tag="li" active-class="active" class="nav-link"
                           to="/editUser">
                <h4 style="margin-bottom: 0"><strong>Edit User</strong></h4>
              </router-link>
            </li>
            <li class="nav-item px-1 py-1">
              <button @click="logout()" class="nav-link active" style="background-color:darkturquoise"
                      name="login_feature" id="logout_button" disabled>
                <h4 class="bi-arrow-right-square" style="margin-bottom: 0"><strong> Logout</strong></h4>
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



export default {
  name: "App",
  data() {
    return {
      someBoolean: true
    }
  },
  mounted() {
    if (Cookies.get('token')) {
      document.getElementById('logout_button').disabled = false
      this.someBoolean = false
    }
    axios.defaults.headers.common = {
      'X-Requested-With': 'XMLHttpRequest',
      //'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get('token'),
    };
  },
  methods: {
    logout: async function () {
      Cookies.remove('token')
      if (Cookies.get('social_token')) {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          Cookies.remove('social_token')
          console.log('Social user signed out.');
        });
      }
      await this.$router.push('/')
      this.$router.go()
    },
    goEditUser: function () {
      this.$router.push('/editUser')
    }
  },
}

</script>

<style>
#navbar_header {
  padding-bottom: 0;
  padding-top: 0;
  background-image: url("header.jpg");
}

#container_header {
  padding-left: 0;
  padding-right: 0;
}

nav ul {
  list-style: none;
  margin: 0 2px;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

#logout_button:disabled {
  opacity: 0.65;
}

nav li {
  width: 100%
}

.nav.navbar-nav > li {
  border-right: 0px solid white;
}

/*nav li:hover,*/
/*nav li.router-link-active,*/
/*nav li.router-link-exact-active {*/
/*  background-color: cadetblue;*/
/*  cursor: pointer;*/
/*}*/
.disabled {
  opacity: 0.8;
  pointer-events: none;
}
</style>
