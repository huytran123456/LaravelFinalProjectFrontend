<template>
  <div class="container-xl">
    <p class="h3 mb-4" style="text-align: left"><strong>Product id</strong></p>
    <input
        type="text"
        id="order_id"
        class="form-control mb-4"
        placeholder="Product id"
    />
    <button
        class="btn btn-dark-green btn-lg my-4"
        style="background-color: green;display: block"
        id="login_button"
        v-bind:class="{ disabled: loading }"
        @click="orderProduct"
    >
      Order specify product from id bar
    </button>
    <p class="h3 mb-4" style="text-align: left" id="login_message"></p>
  </div>
  <router-link to=""></router-link>
  <div class="container-fluid">
    <h1><strong id="error_message">PLEASE WAIT...</strong></h1>
    <img id='loading_gif' alt="Vue about" :src="'loading1.gif'" class="img-fluid">
    <table class="display responsive nowrap" id="index_table">

    </table>
  </div>
</template>

<script>
import 'jquery/dist/jquery.min.js';
import axios from 'axios'
import $ from 'jquery';
import * as dt from 'datatables.net-dt'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Cookies from 'js-cookie'
import {createApp, nextTick} from 'vue'


dt(window, $)
export default {
  name: "App",
  data() {
    return {
      loading: false,
      count_page: 1,
    }
  },
  methods: {
    orderProduct() {
      this.loading = true
      let idd
      idd = 1
      if (document.getElementById("order_id").value) {
        idd = document.getElementById("order_id").value
      }
      this.$router.push({name: 'rentalOrder', params: {id: idd}})
    }
  },
  created: async function () {
    if (!Cookies.get('token')) {
      this.loading = true

    }
    await axios.get('http://127.0.0.1:8000/api/film/getList')
        .then((response) => {
          document.getElementById("error_message").innerHTML = ''
          document.getElementById('loading_gif').remove()
          $('#index_table').DataTable({
            "data": response.data,
            responsive: true,
            "scrollX": true,
            "columns": [
              {"title": "ID", "data": "film_id", "className": "dt-center", "targets": "_all"},
              {"title": "Title", "data": "title", "className": "dt-center", "targets": "_all"},
              {"title": "Category", "data": "category_id", "className": "dt-center", "targets": "_all"},
              {"title": "Release year", "data": "release_year", "className": "dt-center", "targets": "_all"},
              {"title": "Length", "data": "length", "className": "dt-center", "targets": "_all"},
              {"title": "Rating", "data": "rating", "className": "dt-center", "targets": "_all"},
              {"title": "Language", "data": "language_name", "className": "dt-center", "targets": "_all"},
              {"title": "Special features", "data": "special_features", "className": "dt-center", "targets": "_all"},
              {"title": "Description", "data": "description", "className": "dt-center", "targets": "_all"},
              {"title": "Rental duration", "data": "rental_duration", "className": "dt-center", "targets": "_all"},
              {"title": "Rental rate", "data": "rental_rate", "className": "dt-center", "targets": "_all"},
              {"title": "Replacement cost", "data": "replacement_cost", "className": "dt-center", "targets": "_all"},
              {
                "title": "Actors",
                "data": "actors",
                "className": "dt-center",
                "targets": "_all",
                render: function (dataField) {
                  var result = ''
                  for (var key in dataField) {
                    result +=
                        '  <button  type="button" >' + dataField[key].actor_first_name + " " + dataField[key].actor_last_name + '</button>'
                  }
                  return result
                }
              },
            ]
          });

          nextTick()
        })
        .catch(function (error) {
          console.log(error)
          document.getElementById("error_message").innerHTML = 'Something wrong'

        })
  },
  mounted() {
    if (this.loading) {
      document.getElementById('login_message').innerHTML = '<strong>' + "You must login to order" + '</strong>'
    }
  },
}

</script>


