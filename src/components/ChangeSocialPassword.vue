<template>
  <div class="container-xl">
    <h1><strong id="error_message"></strong></h1>
  </div>
  <div class="container-xl">
    <h2>Please reset your social password before continue(this is not your manual social password).</h2>
    <div class="d-flex justify-content-center align-items-center">
      <form class="p-5" style="width: 80%;text-align: center" @submit.prevent="resetSocialPassword">
        <p class="h6 mb-4" style="text-align: left"><strong>EMAIL</strong></p>
        <input
            type="text"
            id="email"
            class="form-control mb-4"
            placeholder=""
            disabled
        />
        <p class="h6 mb-4" style="text-align: left"><strong>PASSWORD</strong></p>
        <input
            type="text"
            id="password"
            class="form-control mb-4"
            placeholder="Password"
        />
        <button
            class="btn btn-dark-green btn-lg my-4"
            style="background-color: green"
            id="reset_button"
            v-bind:class="{ disabled: loading }"
        >
          Change password
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import MD5 from 'crypto-js/MD5'
import Cookies from "js-cookie";

export default {
  name: "App",
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    document.getElementById('email').value = this.$route.query.email
  },
  methods: {
    resetSocialPassword: async function () {
      if (this.loading) {
        return
      }
      this.loading = true
      let pass = ""
      if (document.getElementById('password').value !== "") {
        //MD5 hash empty string will cause validation error
        pass = MD5(document.getElementById('password').value).toString()
      }
      await axios
          .post("http://127.0.0.1:8000/api/resetSocialPassword", {
            email: document.getElementById("email").value.toString(),
            password: pass,
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
              //Sign out social login since it is not necessary
              let auth2 = gapi.auth2.getAuthInstance();
              auth2.signOut().then(function () {
                console.log('Social user signed out.');
              });
              this.$router.push('/')
            } else {
              document.getElementById("error_message").innerHTML = response.data.message
            }
          })
          .catch(function (error) {
            //   return
            console.log(error.response)
            // for (let i in error.response.data.errors) {
            //   document.getElementById("error_message").innerHTML += error.response.data.errors[i] + '<br>'
            // }
          })
      this.loading = false
    }
  },
}
</script>