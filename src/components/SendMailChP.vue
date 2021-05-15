<template>
  <div class="container-xl">
    <h1><strong id="message"></strong></h1>
  </div>
  <div class="container-xl">
    <h2>First you need confirm your email.After that we will send an mail to you.
      Please follow the instruction in that email to continue the process</h2>
    <div class="d-flex justify-content-center align-items-center">
      <form class="p-5" style="width: 80%;text-align: center" @submit.prevent="sendMail">
        <p class="h6 mb-4" style="text-align: left"><strong>EMAIL</strong></p>
        <input
            type="text"
            id="email"
            class="form-control mb-4"
            placeholder=""
            :disabled=loading
        />
        <button
            class="btn btn-dark-green btn-lg my-4 mx-2"
            style="background-color: green"
            id="send_mail_button"
            v-bind:class="{ disabled: loading }"
        >
          Send mail
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
      loading: false,
    }
  },
  created() {
    // if (this.$route.params.id != Cookies.get('email_passcode')) {
    //   this.$router.replace({name: 'changePassword', params: {id: ''}})
    // }
  },
  mounted() {

  },
  methods: {
    sendMail: async function () {
      if (this.loading) {
        return
      }
      this.loading = true
      let mail = document.getElementById("email").value.toString()
      await axios.post("http://127.0.0.1:8000/api/sendMail", {
        email: mail,
        //password: document.getElementById("password").value,
      })
          .then((response) => {
            if (response.data.code === 1) {
              Cookies.set('email',MD5(document.getElementById('email').value).toString())
            } else {
              document.getElementById("message").innerHTML += "Email is not send." + '<br>'
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
    },
    confirmPasscode: async function () {
      await axios.post("http://127.0.0.1:8000/api/confirmPasscode")
    }
  },
}
</script>