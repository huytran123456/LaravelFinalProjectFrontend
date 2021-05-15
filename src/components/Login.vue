<template>
  <div class="container-xl">
    <h1><strong id="error_message"></strong></h1>
  </div>
  <div class="container-xl">
    <div class="d-flex justify-content-center align-items-center">
      <form class="p-5" style="width: 80%;text-align: center" @submit.prevent="login">
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
            <router-link to="/sendMailChP">Forgot your password?</router-link>
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
      let res
      await axios
          .post("http://127.0.0.1:8000/api/auth/login", {
            email: document.getElementById("email").value.toString(),
            password: pass,
            remember_me: document.getElementById('remember_me').checked
          })
          .then((response) => {
            //Use res for redirect/reload page later
            res = response.data.code
            if (response.data.code === 1) {
              Cookies.set('token', response.data.access_token, {expires: 10, path: "/"})
              //Sign out social login since it is not necessary
              if (gapi.auth2) {
                let auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                  console.log('Social user signed out.');
                });
              }
            } else {
              document.getElementById("error_message").innerHTML = response.data.message
            }
          })
          .catch(function (error) {
            //Display the error
            console.log(error)
            let response_message = ""
            for (let k in error.response.data.errors) {
              response_message += error.response.data.errors[k] + "</br>"
            }
            document.getElementById("error_message").innerHTML = response_message
          })
      this.loading = false
      //Go to home page if login successful
      if (res === 1) {
        await this.$router.push({path: '/'})
        this.$router.go()
      }
    },
    onSignIn(googleUser) {
      const profile = googleUser.getBasicProfile()
      document.getElementById("error_message").innerHTML = ''
      let social_token = MD5(profile.getId()).toString()
      axios
          .post("http://127.0.0.1:8000/api/social_users", {
            first_name: profile.getGivenName(),
            last_name: profile.getFamilyName(),
            email: profile.getEmail(),
            phone: 'None',
            password: 'password',
            social_platform: 'GOOGLE',
          })
          .then(response => {
            console.log(response.data)
            if (response.data.new_user) {
              this.$router.push({
                name: 'changeSocialPassword',
                query: {email: profile.getEmail()}
              })
            } else {
              document.getElementById("email").value = profile.getEmail()
            }
          })
          .catch(function (error) {
            console.log(error.response)
          })
      return
    }
  },
}

</script>

