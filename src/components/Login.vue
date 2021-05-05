<template>
  <div class="container-xl">
    <h1><strong id="error_message"></strong></h1>
    <div class="d-flex justify-content-center align-items-center">
      <form class="border border-light p-5" style="width: 80%;text-align: center" @submit.prevent="login">
        <p class="h2 mb-4 text-center"><strong>LOGIN</strong></p>
        <p class="h6 mb-4" style="text-align: left"><strong>EMAIL</strong></p>
        <input
            type="text"
            id="email"
            class="form-control mb-4"
            placeholder="Email"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>PASSWORD</strong></p>
        <input
            type="text"
            id="password"
            class="form-control mb-4"
            placeholder="Password"
        />
        <div class="d-flex justify-content-between">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="remember_me">
            <label class="form-check-label" for="remember_me">
              Remember me
            </label>
          </div>
          <div>
            <router-link to="#">Forgot your password?</router-link>
          </div>
        </div>
        <button
            class="btn btn-dark-green btn-lg my-4"
            style="background-color: green"
            id="login_button"
            v-bind:class="{ disabled: loading }"
        >
          Login
        </button>
        <div class="g-signin2" id="google-signin" data-onsuccess="onSignIn" data-theme="dark"></div>
      </form>
    </div>
  </div>
  <div class="container">
    <div class="justify-content-center links">
      <strong>Don't have an account?</strong>
      <p></p>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import MD5 from 'crypto-js/MD5'
import axios from 'axios';
import Cookies from 'js-cookie'

export default {
  name: "App",
  mounted() {
    gapi.signin2.render('google-signin', {
      onsuccess: this.onSignIn
    })
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    login: async function () {
      if (this.loading) {
        return
      }
      this.loading = true
      let pass = ""
      if (document.getElementById('password').value !== "") {
        //MD5 hash empty string will cause validation error
        pass = MD5(document.getElementById('password').value).toString()
      }
      console.log(pass)
      await axios
          .post("http://127.0.0.1:8000/api/auth/login", {
            email: document.getElementById("email").value.toString(),
            //password: document.getElementById("password").value,
            password: pass,
            remember_me: document.getElementById('remember_me').checked
          })
          .then((response) => {
            console.log(response.data)
            if (response.data.code === 1) {
              Cookies.set('token', response.data.access_token, {expires: 10, path: "/"})
              axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
              };
              // this.$router.replace('/')
              this.$router.push('/')
            } else {
              document.getElementById("error_message").innerHTML = response.data.message
            }
          })
          .catch(function (error) {
            //Display the error
            for (let k in error.response.data.errors) {
              document.getElementById("error_message").innerHTML += error.response.data.errors[k] + "</br>"
            }
          })
      this.loading = false
    },
    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      if (Cookies.get('social_token') !== googleUser.getAuthResponse().id_token) {
        axios
            .post("http://127.0.0.1:8000/api/social_users", {
              first_name: profile.getGivenName(),
              last_name: profile.getFamilyName(),
              email: profile.getEmail(),
              phone: 'None',
              password: 'password',
            })
            .then(response => {
            })
            .catch(function (error) {
              //   return
              console.log(error.response.data.errors)
              for (let i in error.response.data.errors) {
                document.getElementById("error_message").innerHTML += error.response.data.errors[i] + '<br>'
              }
            })
        Cookies.set('social_token', googleUser.getAuthResponse().id_token)
        return
      }
    }
  },
}

</script>

