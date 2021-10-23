<template>
  <center>
    <div v-if="is_auth" id="divtable">
      <table class="default" id="tablereg">
        <div>
          <div id="idthead">
            <thead>
              <tr>
                <th>nombre</th>
                <th>documento</th>
                <th>fecha de nacimiento</th>
                <th>departamento</th>
                <th>ocupacion</th>
                <th>etnia</th>
                <th>resguardo</th>
              </tr>
            </thead>
          </div>

          <div id="idtbody">
            <tbody>
              <tr
                v-for="persona in personas"
                :key="persona.id"
                :value="persona.id"
              >
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
            </tbody>
          </div>
        </div>
      </table>
    </div>

    <div id="idbuttons" v-if="is_auth">
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
        .get("https://censoindigena.herokuapp.com/censoIndigena/personas/", {
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
* {
  /*border: 1px solid;*/
}
#tablereg {
  margin-top: 0px;

  height: 700px;
  width: 1100px;
}
th {
  padding: 0px;
  height: 30px;
  background-color: rgb(127, 157, 255);
  width: 151px;
  margin-inline: 5px;
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
  padding: 0px;
  width: 151px;
  text-align: center;
  height: 10px;
  background-color: rgb(205, 227, 247);
}

tbody {
  height: 600px;
  width: 1100px;
}
#idtbody {
  height: 600px;
  width: 1100px;
  overflow: scroll;
}

#idthead {
  width: 1100px;
  height: 38px;
}

#divtable {
  margin-top: 50px;
  height: 600px;
  width: 1220px;
}
#idbuttons {
  margin-top: 40px;
}
</style>
