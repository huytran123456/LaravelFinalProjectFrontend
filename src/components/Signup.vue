<template>
  <div class="container-xl">
    <h1><strong id="error_message"></strong></h1>
  </div>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center container-xl">
      <form class="p-5" style="width: 80%;text-align: center" @submit.prevent="signup">
        <p class="h2 mb-4 text-center"><strong>SIGNUP</strong></p>
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
        <p class="h6 mb-4" style="text-align: left"><strong>FIRST NAME</strong></p>
        <input
            type="text"
            id="first_name"
            class="form-control mb-4"
            placeholder="First name"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>LAST NAME</strong></p>
        <input
            type="text"
            id="last_name"
            class="form-control mb-4"
            placeholder="Last name"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>PHONE</strong></p>
        <input
            type="text"
            id="phone"
            class="form-control mb-4"
            placeholder="Phone"
        />
        <button
            class="btn btn-dark-green btn-block my-4"
            style="background-color: green"
            v-bind:class="{ disabled: loading }"
            id="signup_button"
        >
          Signup
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import MD5 from 'crypto-js/MD5'
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
      loading: false
    }
  },
  methods: {
    signup: async function () {
      if (this.loading) {
        return
      }
      this.loading = true
      var pass = ""
      if (document.getElementById('password').value != "") {
        //MD5 hash empty string will cause validation error
        pass = MD5(document.getElementById('password').value).toString()
      }
      await axios
          .post('http://127.0.0.1:8000/api/users', {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            // password: MD5(document.getElementById('password').value).toString(),
            password: pass
          })
          .then(response => {
            console.log(response)
          })
          .catch(function (error) {

            // let k;
            let response_message = ""
            for (let k in error.response.data.errors) {
              response_message += error.response.data.errors[k] + "</br>"
            }
            document.getElementById("error_message").innerHTML=response_message
          })
      this.loading = false
    }
  },
}

</script>

