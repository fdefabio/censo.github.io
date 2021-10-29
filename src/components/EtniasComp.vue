<template>
  <div class="CrudTablaAdicional">
    <!-- A partir de aqui podria ponerlo en un Componente distinto? -->
    <div  class="tablaAdicionales">
    <table>
      <tr>
        <th>id</th>
        <th>Nombre</th>
        <th>Descripcion</th>
      </tr>
      <tr
        v-for="etnia in this.registrosProp"
        :key="etnia.id_etnia"
        v-on:click="metActualizarCampos(etnia)"
      >
        <td>{{ etnia.id_etnia }}</td>
        <td>{{ etnia.nombre }}</td>
        <td>{{ etnia.descripcion }}</td>
      </tr>
    </table>
    </div>

    <div class="InputsTablaAdicional">
      <input
        type="text"
        placeholder="id"
        v-model="etniaPrelim.id_etnia"
        disabled
      />
      <input
        type="text"
        placeholder="Nombre"
        v-model="etniaPrelim.nombre"
      />
      <input
        type="text"
        placeholder="Descripcion"
        v-model="etniaPrelim.descripcion"
      />
    </div>

    <div class="BotonesCrudTablaAd">
      <button v-on:click="metAgregarEtnia">Agregar</button>
      <button v-on:click="metActualizarEtnia" v-if="is_auth" :key="is_auth">Actualizar</button>
      <button v-on:click="metEliminarEtnia" v-if="is_auth" :key="is_auth" class="botonDelete">Eliminar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Para procesar HTTP requests
import appData from "../App.vue"; // Data de App.vue

export default {
  name: "EtniasComp",

  props: ["registrosProp"],

  data: function () {
    return {
      etnia: {
        // Hace referencia a la Etnia de la tabla de la DB seleccionada
        id_etnia: "",
        nombre: "",
        descripcion: "",
      },

      etniaPrelim: {
        // Hace referencia a la Etnia cuyos datos son los especificados en los campos
        id_etnia: "",
        nombre: "",
        descripcion: "",
      },

      is_auth: localStorage.getItem("is_auth") || false,
    };
  },
  
  
  created: function () {
    this.metRectificarAutenticacion();
  },

  methods: {
    metVerificarAutenticado: function () {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.is_auth = false;
        localStorage.setItem("is_auth", false);
        this.$emit("msjLogOutSuave");
        return false;
      }

      return true;
    },

    metRectificarAutenticacion: function () {
      if (!this.metVerificarAutenticado) {
        return;
      }

      return axios
        .post(
          appData["direccionBack"] + "refresh/",
          { refresh: localStorage.getItem("token_refresh") },
          { headers: {} }
        )
        .then((respuesta) => {
          localStorage.setItem("token_access", respuesta.data.access);
          localStorage.setItem("is_auth", true);
          //alert("Se rectifico la autenticacion en OcupacionesComp");
        })
        .catch(() => {
          localStorage.setItem("is_auth", false);
          this.$emit("msjLogOutSuave");
        });
    },

    metActualizarCampos: function (ocup) {
      this.etniaPrelim = { ...ocup }; // Clonando shallow, no pasando referencia al objeto
    },

    metAgregarEtnia: function () {
      /*alert(
        "Se intentara registrar una etnia con los siguientes datos:" +
          Object.entries(this.etniaPrelim)
      );*/
      axios
        .post(
          appData["direccionBack"] + "etnias/agregar/",
          this.etniaPrelim
        )
        .then((respuesta) => {
          alert(
            "Etnia agregada exitosamente!: " +
              "\n\n" +
              "Etnia: " +
              respuesta.data.registro.nombre +
              "\n" +
              "Descripcion: " +
              respuesta.data.registro.descripcion
          );

          // Borrar campos
          this.etniaPrelim = {
            id_etnia: "",
            nombre: "",
            descripcion: "",
          };
          
          // Actualizar Variable y Lista de etnias en todos los componentes
          this.metActualizarListaEtnias();
        })
        .catch((error) => {
          alert("Error agregando etnia: " + error);
        });
    },

    metActualizarEtnia: function () {
      /*alert(
        "Se intentara registrar una etnia con los siguientes datos:" +
          Object.entries(this.etniaPrelim)
      );*/

      if (!this.metVerificarAutenticado) {
        alert("Error: no está autenticado.");
        return;
      }

      let token = localStorage.getItem("token_access");

      axios
        .put(
          appData["direccionBack"] + "etnias/" +
            this.etniaPrelim.id_etnia,
          this.etniaPrelim,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((respuesta) => {
          alert(
            "Etnia actualizada exitosamente!: \n\n" +
              "id: " +
              respuesta.data.registro.id_etnia +
              "\n" +
              "Etnia: " +
              this.etniaPrelim.nombre +
              "\n" +
              "Descripcion: " +
              this.etniaPrelim.descripcion
            //JSON.stringify(respuesta.data.registro, null, 2)
          );

          // Borrar campos
          this.etniaPrelim = {
            id_etnia: "",
            nombre: "",
            descripcion: "",
          };

          // Actualizar Variable y Lista de etnias en todos los componentes
          this.metActualizarListaEtnias();
        })
        .catch((error) => {
          alert("Error actualizando etnia. " + error);
        });
    },

    metEliminarEtnia: function () {
      if (!this.metVerificarAutenticado) {
        alert("Error: no está autenticado.");
        return;
      }

      let token = localStorage.getItem("token_access");

      axios
        .delete(
          appData["direccionBack"] + "etnias/" +
            this.etniaPrelim.id_etnia,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((respuesta) => {
          alert(
            "Etnia eliminada exitosamente!"
          );

          // Borrar campos
          this.etniaPrelim = {
            id_etnia: "",
            nombre: "",
            descripcion: "",
          };

          // Actualizar Variable y Lista de etnias en todos los componentes
          this.metActualizarListaEtnias();
        })
        .catch((error) => {
          alert("Error eliminando etnia: " + error);
        });
    },

    metActualizarListaEtnias: function () {
      // Actualizar lista de Etnias
      axios
        .get(appData["direccionBack"] + "etnias/")
        .then((respuesta) => {
          /*alert(
            "Exito GET respuesta.data " +
              Object.values(respuesta.data) +
              typeof respuesta.data
          );*/
          this.$emit("MsjActualizadasEtnias");
        })
        .catch((error) => {
          alert("Error actualizando lista de Etnias: " + error);
        });
    },
  },
};
</script>




