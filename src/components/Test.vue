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
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

export default {
  name: "App",
  methods: {
    listUser: async function () {
      await axios.get('http://127.0.0.1:8000/api/users')
          .then(function (response) {
            //console.log(response);
            $('#index_table').DataTable({
              "data": response.data,
              responsive: true,
              "scrollX": true,
              "columns": [
                {"title": "ID", "data": "id", "className": "dt-center", "targets": "_all"},
                {"title": "First Name", "data": "first_name", "className": "dt-center", "targets": "_all"},
                {"title": "Last Name", "data": "last_name", "className": "dt-center", "targets": "_all"},
                {"title": "Gender", "data": "gender", "className": "dt-center", "targets": "_all"},
                {"title": "Date of Birth", "data": "dob", "className": "dt-center", "targets": "_all"},
                {"title": "Country", "data": "country", "className": "dt-center", "targets": "_all"},
                {"title": "Phone", "data": "phone", "className": "dt-center", "targets": "_all"},
                {"title": "Email", "data": "email", "className": "dt-center", "targets": "_all"},
                {
                  "title": "Title",
                  "data": "titles",
                  "className": "dt-center",
                  "targets": "_all",
                  render: function (dataField) {
                    var result = ''
                    for (var key in dataField) {
                      result +=
                          '  <button  type="button" >' + dataField[key].title_name + '</button>'
                    }
                    return result
                  }
                },
                {
                  "title": "Edit",
                  "data": "",
                  "className": "dt-center",
                  "targets": "_all",
                  render: function (dataField) {
                    return '<a href="' + dataField + '" style="text-align: center">&#9998</a>';
                  }
                },
                {
                  "title": "Delete",
                  "data": "", "className": "dt-center",
                  "targets": "_all",
                  render: function (dataField) {
                    return '<a href="' + dataField + '">&#128465</a>';
                  }
                }
              ]
            });
          })
    }
  }
}

</script>


