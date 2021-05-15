<template>
  <div class="container-xl">
    <h1><strong id="message"></strong></h1>
  </div>
  <div class="container-xl">
    <h2>First you need confirm your email.After that we will send an mail that contain a QR code.
      Please generate passcode from that QR code and submit to continue the process</h2>
    <div class="d-flex justify-content-center align-items-center">
      <form class="p-5" style="width: 80%;text-align: center" @submit.prevent="sendMail">
        <p class="h6 mb-4" style="text-align: left"><strong>NEW PASSWORD</strong></p>
        <input
            type="text"
            id="new_pass"
            class="form-control mb-4"
            placeholder=""
        />
        <p class="h6 mb-4" style="text-align: left"><strong>CONFIRM NEW PASSWORD</strong></p>
        <input
            type="text"
            id="conf_new_pass"
            class="form-control mb-4"
            placeholder=""
        />
        <p class="h6 mb-4" style="text-align: left"><strong>Passcode</strong></p>
        <input
            type="text"
            id="qr_code"
            class="form-control mb-4"
            placeholder="QR code"
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
    //Check if your current changing password process for specify email is correct
    if (this.$route.params.id != Cookies.get('email')) {
      this.$router.replace({name: 'home'})
    }
  },
  mounted() {

  },
  methods: {
    sendMail: async function () {
      if (this.loading) {
        return
      }
      this.loading = true
      if (document.getElementById('new_pass').value !== document.getElementById('conf_new_pass').value) {
        document.getElementById("message").innerHTML += "Passwords does not match." + '<br>'
        this.loading = false
        return
      }
      let new_pass = MD5(document.getElementById('new_pass').value).toString()
      await axios.post("http://127.0.0.1:8000/api/changePass", {
        new_pass: new_pass,
        qr_code: document.getElementById('qr_code').value,
        hash_mail: Cookies.get('email'),
      })
          .then((response) => {
            if (response.data.code === 1) {
               Cookies.remove('email')
               this.$router.push({path:'/'})
            } else {
              document.getElementById("message").innerHTML += "Change password failed." + '<br>'
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
  },
}
</script>