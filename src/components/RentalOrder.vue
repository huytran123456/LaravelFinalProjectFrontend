<template>
  <div class="container-xl">
    <h1><strong id="error_message"></strong></h1>
  </div>
  <div class="container-xl">
    <div class="d-flex justify-content-center align-items-center">
      <form class="p-5" style="width: 80%;text-align: center" @submit.prevent="makeOrder">
        <p class="h2 mb-4 text-center"><strong>Order detail</strong></p>
        <p class="h6 mb-4" style="text-align: left"><strong>Customer name</strong></p>
        <input
            type="text"
            id="customer_name"
            class="form-control mb-4"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>Customer email</strong></p>
        <input
            type="text"
            id="customer_email"
            class="form-control mb-4"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>Title</strong></p>
        <input
            type="text"
            id="title"
            class="form-control mb-4"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>Duration date</strong></p>
        <input
            type="text"
            id="duration"
            class="form-control mb-4"
        />
        <p class="h6 mb-4" style="text-align: left"><strong>Price</strong></p>
        <input
            type="text"
            id="price"
            class="form-control mb-4"
        />
        <button
            class="btn btn-dark-green btn-lg my-4"
            style="background-color: green"
            id="order_button"
            v-bind:class="{ disabled: loading }"
        >
          ORDER
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
  created: async function () {
    console.log(this.$route.params.id)
    axios.get('http://127.0.0.1:8000/api/order/getDetail/' + this.$route.params.id)
        .then(function (response) {
          //console.log(response);
          document.getElementById('title').value = response.data.title
          document.getElementById('title').readOnly = true
          document.getElementById('duration').value = response.data.duration
          document.getElementById('duration').readOnly = true
          document.getElementById('price').value = response.data.price
          document.getElementById('price').readOnly = true
          document.getElementById('customer_name').value = response.data.customer_name
          document.getElementById('customer_name').readOnly = true
          document.getElementById('customer_email').value = response.data.customer_email
          document.getElementById('customer_email').readOnly = true
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  mounted() {

  },
  methods: {
    makeOrder: async function () {
      this.loading = true
      await axios.post("http://127.0.0.1:8000/api/order/makeOrder", {
        price: document.getElementById('price').value,
        duration: document.getElementById('duration').value,
        film_id: this.$route.params.id
      })
          .then((response) => {
            if (response.data.code) {
              document.getElementById("error_message").innerHTML = "Order completed" + '<br>'
            } else {
              document.getElementById("message").innerHTML += "Something wrong." + '<br>'
            }
          })
          .catch(function (error) {
            //   return
            console.log(error.response)
            // for (let i in error.response.data.errors) {
            //   document.getElementById("error_message").innerHTML += error.response.data.errors[i] + '<br>'
            // }
          })
    }
  },
}
</script>