<template>
  <div class="container-xl">
    <h1><strong id="error_message"></strong></h1>
  </div>
  <div class="container-fluid">
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

dt(window, $)
export default {
  name: "App",
  mounted: async function() {
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
                        '  <button  type="button" >' + dataField[key].actor_first_name +" "+ dataField[key].actor_last_name + '</button>'
                  }
                  return result
                }
              },
            ]
          });
        })
        .catch(function (error) {
          console.log(error)
          // let k;
          document.getElementById("error_message").innerHTML = error.response.data.errors + "</br>"

        })
  },
}

</script>


