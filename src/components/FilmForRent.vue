<template>
  <div class="container">
    <button class="btn btn btn-success btn-block my-4" id='button_search'
            @click="listUser()">Search
    </button>
    <table class="display responsive nowrap" id="index_table">
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery';
import * as dt from 'datatables.net-dt'

dt(window,$)
export default {
  name: "App",
  methods: {
    listUser: async function () {
      await axios.get('http://127.0.0.1:8000/api/film/getList')
          .then(function (response) {
            //console.log(response);
            $('#index_table').DataTable({
              "data": response.data,
              responsive: true,
              "scrollX": true,
              "columns": [
                {"title": "ID", "data": "film_id", "className": "dt-center", "targets": "_all"},
                {"title": "Title", "data": "title", "className": "dt-center", "targets": "_all"},
                {"title": "Description", "data": "description", "className": "dt-center", "targets": "_all"},
                {"title": "Release year", "data": "release_year", "className": "dt-center", "targets": "_all"},
                {"title": "Length", "data": "length", "className": "dt-center", "targets": "_all"},
                {"title": "Rating", "data": "rating", "className": "dt-center", "targets": "_all"},
                {"title": "Language", "data": "language_name", "className": "dt-center", "targets": "_all"},
                {"title": "Rental duration", "data": "rental_duration", "className": "dt-center", "targets": "_all"},
                {"title": "Rental rate", "data": "rental_rate", "className": "dt-center", "targets": "_all"},
                {"title": "Replacement cost", "data": "replacement_cost", "className": "dt-center", "targets": "_all"},
                {"title": "Special features", "data": "special_features", "className": "dt-center", "targets": "_all"},
              ]
            });
          })
    }
  }
}

</script>


