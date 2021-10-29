<template>
  <div class="CrudTablaAdicional">
    <!-- A partir de aqui podria ponerlo en un Componente distinto? -->
    <div class="tablaAdicionales">
      <table>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Descripcion</th>
        </tr>
        <tr
          v-for="ocupacion in this.registrosProp"
          :key="ocupacion.id_ocupacion"
          v-on:click="metActualizarCampos(ocupacion)"
        >
          <td>{{ ocupacion.id_ocupacion }}</td>
          <td>{{ ocupacion.nombre }}</td>
          <td>{{ ocupacion.descripcion }}</td>
        </tr>
      </table>
    </div>

    <div class="InputsTablaAdicional">
      <input
        type="text"
        placeholder="id"
        v-model="ocupacionPrelim.id_ocupacion"
        disabled
      />
      <input
        type="text"
        placeholder="Nombre"
        v-model="ocupacionPrelim.nombre"
      />
      <input
        type="text"
        placeholder="Descripcion"
        v-model="ocupacionPrelim.descripcion"
      />
    </div>

    <div class="BotonesCrudTablaAd">
      <button v-on:click="metAgregarOcupacion">Agregar</button>
      <button v-on:click="metActualizarOcupacion" v-if="is_auth" :key="is_auth">
        Actualizar
      </button>
      <button v-on:click="metEliminarOcupacion" v-if="is_auth" :key="is_auth" class="botonDelete">
        Eliminar
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Para procesar HTTP requests
import appData from "../App.vue"; // Data de App.vue

export default {
  name: "OcupacionesComp",

  props: ["registrosProp"],

  data: function () {
    return {
      ocupacion: {
        // Hace referencia a la Ocupacion de la tabla de la DB seleccionada
        id_ocupacion: "",
        nombre: "",
        descripcion: "",
      },

      ocupacionPrelim: {
        // Hace referencia a la Ocupacion cuyos datos son los especificados en los campos
        id_ocupacion: "",
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
      this.ocupacionPrelim = { ...ocup }; // Clonando shallow, no pasando referencia al objeto
    },

    metAgregarOcupacion: function () {
      /*alert(
        "Se intentara registrar una ocupacion con los siguientes datos:" +
          Object.entries(this.ocupacionPrelim)
      );*/
      axios
        .post(
          appData["direccionBack"] + "ocupaciones/agregar/",
          this.ocupacionPrelim
        )
        .then((respuesta) => {
          alert(
            "Ocupacion agregada exitosamente!: " +
              "\n\n" +
              "Ocupacion: " +
              respuesta.data.registro.nombre +
              "\n" +
              "Descripcion: " +
              respuesta.data.registro.descripcion
          );

          // Borrar campos
          this.ocupacionPrelim = {
            id_ocupacion: "",
            nombre: "",
            descripcion: "",
          };

          // Actualizar Variable y Lista de ocupaciones en todos los componentes
          this.metActualizarListaOcupaciones();
        })
        .catch((error) => {
          alert("Error agregando ocupacion: " + error);
        });
    },

    metActualizarOcupacion: function () {
      /*alert(
        "Se intentara registrar una ocupacion con los siguientes datos:" +
          Object.entries(this.ocupacionPrelim)
      );*/

      if (!this.metVerificarAutenticado) {
        alert("Error: no está autenticado.");
        return;
      }

      let token = localStorage.getItem("token_access");

      axios
        .put(
          appData["direccionBack"] + "ocupaciones/" +
            this.ocupacionPrelim.id_ocupacion,
          this.ocupacionPrelim,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((respuesta) => {
          alert(
            "Ocupacion actualizada exitosamente!: \n\n" +
              "id: " +
              respuesta.data.registro.id_ocupacion +
              "\n" +
              "Ocupacion: " +
              this.ocupacionPrelim.nombre +
              "\n" +
              "Descripcion: " +
              this.ocupacionPrelim.descripcion
            //JSON.stringify(respuesta.data.registro, null, 2)
          );

          // Borrar campos
          this.ocupacionPrelim = {
            id_ocupacion: "",
            nombre: "",
            descripcion: "",
          };

          // Actualizar Variable y Lista de ocupaciones en todos los componentes
          this.metActualizarListaOcupaciones();
        })
        .catch((error) => {
          alert("Error actualizando ocupacion. " + error);
        });
    },

    metEliminarOcupacion: function () {
      if (!this.metVerificarAutenticado) {
        alert("Error: no está autenticado.");
        return;
      }

      let token = localStorage.getItem("token_access");

      axios
        .delete(
          appData["direccionBack"] + "ocupaciones/" +
            this.ocupacionPrelim.id_ocupacion,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((respuesta) => {
          alert(
            "Ocupacion eliminada exitosamente!"
          );

          // Borrar campos
          this.ocupacionPrelim = {
            id_ocupacion: "",
            nombre: "",
            descripcion: "",
          };

          // Actualizar Variable y Lista de ocupaciones en todos los componentes
          this.metActualizarListaOcupaciones();
        })
        .catch((error) => {
          alert("Error eliminando ocupacion: " + error);
        });
    },

    metActualizarListaOcupaciones: function () {
      // Actualizar lista de Ocupaciones
      axios
        .get(appData["direccionBack"] + "ocupaciones/")
        .then((respuesta) => {
          /*alert(
            "Exito GET respuesta.data " +
              Object.values(respuesta.data) +
              typeof respuesta.data
          );*/
          this.$emit("MsjActualizadasOcupaciones");
        })
        .catch((error) => {
          alert("Error actualizando lista de Ocupaciones: " + error);
        });
    },
  },
};
</script>




