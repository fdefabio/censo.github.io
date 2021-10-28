<template>
  <center>
    <div>
      <EditWindow class="edit-window" id="window" />
    </div>
    <div id="delete-window"><Deletewind /></div>

    <div v-if="is_auth" id="divtable">
      <table class="default" id="tablereg">
        <div>
          <div id="idthead">
            <thead>
              <tr>
                <th>id</th>
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
                id="trbody"
                v-on:click="selectRow"
                v-for="persona in personas"
                :key="persona.id"
                :value="persona.id"
              >
                <td class="personaid">
                  {{ persona.id }}
                </td>
                <td class="name">
                  {{ persona.nombre }}
                </td>
                <td class="personid">
                  {{ persona.doc_id }}
                </td>
                <td class="fechanacimiento">
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
      <button id="buttoneditar" v-on:click="mostraredit">Editar</button>
      <button id="buttondelete" v-on:click="mostrardelete">Eliminar</button>
      <button id="pbuttoneditar" v-on:click="alertselected">Editar</button>
      <button id="pbuttondelete" v-on:click="alertselected">Eliminar</button>
    </div>
  </center>
</template>

<script>
const $ = require("jquery");
import axios from "axios";
import Deletewind from "./DeleteWindow.vue";
import EditWindow from "./EditWindow.vue";

export default {
  name: "Tabla",

  components: {
    EditWindow,
    Deletewind,
  },
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
    alertselected: function() {
      alert("debe seleccionar un registro para editar o eliminar");
    },
    selectRow: function(e) {
      window.$ = $;
      var table = document.getElementById("tablereg"),
        selected = table.getElementsByClassName("selected");
      if (selected[0]) selected[0].className = "";
      e.target.parentNode.className = "selected";
      document.getElementById("buttondelete").style.display = "block";
      document.getElementById("buttoneditar").style.display = "block";
      document.getElementById("pbuttondelete").style.display = "none";
      document.getElementById("pbuttoneditar").style.display = "none";
      localStorage.setItem("id", $("tr.selected td.personaid").html());
      localStorage.setItem("name", $("tr.selected td.name").html());
    },

    mostraredit: function() {
      document.getElementById("window").style.display = "block";
    },

    mostrardelete: function() {
      document.getElementById("delete-window").style.display = "block";
    },

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
#trbody {
}

#trbody:hover {
  background-color: rgb(107, 151, 201);
}

#tablereg {
  margin-top: 0px;
  height: 600px;
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
  display: none;
  background-color: rgb(250, 124, 124);
}

#buttondelete:hover {
  color: white;
  background-color: rgb(253, 55, 55);
}

#buttoneditar {
  display: none;
}

#buttoneditar:hover {
  color: white;
  background-color: rgb(55, 99, 245);
}

#pbuttondelete {
  border: 2px solid;
  border-color: rgb(182, 178, 178);
  color: rgb(173, 170, 170);
  background-color: white;
}

#pbuttoneditar {
  border: 2px solid;
  border-color: rgb(182, 178, 178);
  color: rgb(173, 170, 170);
  background-color: white;
}

td {
  cursor: pointer;
  padding: 0px;
  width: 151px;
  text-align: center;
  height: 30px;
}

tbody {
  height: 100px;
  width: 1100px;
}
#idtbody {
  height: 600px;
  width: 1216px;
  overflow: scroll;
}

#idthead {
  width: 1200px;
  height: 38px;
}

#divtable {
  margin-top: 50px;
  height: 600px;
  width: 1100px;
}
#idbuttons {
  width: 400px;
  display: flex;
  margin-top: 60px;
}

#window {
  display: none;
}

#delete-window {
  display: none;
}

.selected {
  background-color: rgb(8, 112, 231);
  color: rgb(245, 243, 243);
}
</style>
