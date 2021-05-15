<template>
  <div class="container-xl">
    <h1><strong id="error_message"></strong></h1>
  </div>
  <div class="container">
    <div id="avatar">
    </div>
    <div class="d-flex justify-content-center align-items-center container-xl">

      <form class="p-5" style="width: 80%;text-align: center" name="edit_form">
        <input type="file" class="form-control-file mb-4" id="avatar_img" :disabled=loading name="edit_avatar">
        <p class="h6 mb-4" style="text-align: left"><strong>EMAIL</strong></p>
        <input
            type="text"
            id="email"
            class="form-control mb-4"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>FIRST NAME</strong></p>
        <input
            type="text"
            id="first_name"
            class="form-control mb-4"
            :disabled=loading
        />
        <p class="h6 mb-4" style="text-align: left"><strong>LAST NAME</strong></p>
        <input
            type="text"
            id="last_name"
            class="form-control mb-4"
            :disabled=loading
        />
        <p class="h6 mb-4" style="text-align: left"><strong>PHONE</strong></p>
        <input
            type="text"
            id="phone"
            class="form-control mb-4"
            :disabled=loading
        />
        <button
            class="btn btn-dark-green btn-block my-4 mx-4"
            style="background-color: green;width: 20%"
            v-bind:class="{ disabled: !loading }"
            id="edit_button"
            type="button"
            @click="enable_edit()"
        >
          Edit user
        </button>
        <qr></qr>
        <button
            class="btn btn-dark-green btn-block my-4 mx-4"
            style="background-color: green;width: 20%"
            v-bind:class="{ disabled: loading+loading2 }"
            type="button"
            id="save_button"
            @click="save_edit()"
        >
          Save user
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import MD5 from 'crypto-js/MD5'
import axios from 'axios';
import Cookies from 'js-cookie'
import $ from "jquery";

export default {
  name: "App",
  mounted() {
    let rawResponse
    axios.get('http://127.0.0.1:8000/api/users/getInfoUser')
        .then(function (response) {
          //console.log(response);
          rawResponse = response.data.img
          let encodedResponse = btoa(rawResponse);

          let img = new Image();
          let container = document.getElementById('avatar');
          img.src = 'data:image/gif;base64,' + encodedResponse;
          img.className = "img-fluid"
          container.appendChild(img);
          document.getElementById('email').value = response.data.email
          document.getElementById('email').readOnly = true
          document.getElementById('first_name').value = response.data.first_name
          document.getElementById('last_name').value = response.data.last_name
          document.getElementById('phone').value = response.data.phone
        })
        .catch(function (error) {
          console.log(error)
        })

    //
  },
  data() {
    return {
      loading: true,
      loading2: false
    }
  },
  methods: {
    enable_edit() {
      this.loading = false

    },
    save_edit: async function () {
      this.loading = false
      this.loading2 = true
      let formData = new FormData();
      formData.append("avatar", document.forms['edit_form']['edit_avatar'].files[0]);
      formData.append("first_name", document.getElementById('first_name').value);
      formData.append("last_name", document.getElementById('last_name').value);
      formData.append("phone", document.getElementById('phone').value);
      formData.append("email", document.getElementById('email').value);
      await axios
          .post('http://127.0.0.1:8000/api/users/editInfoUser', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log(response)
            this.$router.go()
          })
          .catch(function (error) {

            // let k;
            console.log(error)
            let response_message = ""
            for (let k in error.response.data.errors) {
              response_message += error.response.data.errors[k] + "</br>"
            }
            document.getElementById("error_message").innerHTML = response_message
          })

    }
  },
}

</script>

