<template>
  <center>
    <div v-if="is_auth">
      <table class="default">
        <tr>
          <th>nombre</th>
          <th>documento</th>
          <th>fecha de nacimiento</th>
          <th>departamento</th>
          <th>ocupacion</th>
          <th>etnia</th>
          <th>resguardo</th>
        </tr>
        <tr v-for="persona in personas" :key="persona.id" :value="persona.id">
          <td>
            {{ persona.nombre }}
          </td>
          <td>
            {{ persona.doc_id }}
          </td>
          <td>
            {{ persona.fechadenacimiento }}
          </td>
          <td>
            {{ persona.departamento }}
          </td>
          <td>
            {{ persona.ocupacion }}
          </td>
          <td>
            {{ persona.etnia }}
          </td>
          <td>
            {{ persona.resguardo }}
          </td>
        </tr>
      </table>
    </div>

    <div v-if="is_auth">
      <button>Editar</button>
      <button id="buttondelete">Eliminar</button>
    </div>
  </center>
</template>

<script>
import axios from "axios";
export default {
  name: "Tabla",

  data: function() {
    return {
      is_auth: localStorage.getItem("is_auth"),
      personas: [],
    };
  },

  created: async function() {
    this.getRegister();
  },

  methods: {
    getRegister: function() {
      let token = localStorage.getItem("token_access");

      axios
        .get("http://127.0.0.1:8000/censoIndigena/personas/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          this.personas = result.data;
        })
        .catch((error) => alert("hubo un error"));
    },
  },
};
</script>

<style>
table {
  padding: 0px;
  margin-top: 50px;
  border: 1px solid;
  border-color: rgb(219, 216, 216);
  height: 100%;
}

th {
  height: 30px;
  background-color: rgb(127, 157, 255);
  width: 200px;
}

button {
  margin-left: 70px;
}

#buttondelete {
  background-color: rgb(250, 124, 124);
}

#buttondelete:hover {
  background-color: rgb(248, 46, 46);
}
td {
  padding: 15px;
  height: 15px;
  background-color: rgb(205, 227, 247);
}
</style>
