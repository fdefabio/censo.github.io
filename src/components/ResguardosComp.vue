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
        v-for="resguardo in this.registrosProp"
        :key="resguardo.id_resguardo"
        v-on:click="metActualizarCampos(resguardo)"
      >
        <td>{{ resguardo.id_resguardo }}</td>
        <td>{{ resguardo.nombre }}</td>
        <td>{{ resguardo.descripcion }}</td>
      </tr>
    </table>
    </div>

    <div class="InputsTablaAdicional">
      <input
        type="text"
        placeholder="id"
        v-model="resguardoPrelim.id_resguardo"
        disabled
      />
      <input
        type="text"
        placeholder="Nombre"
        v-model="resguardoPrelim.nombre"
      />
      <input
        type="text"
        placeholder="Descripcion"
        v-model="resguardoPrelim.descripcion"
      />
    </div>

    <div class="BotonesCrudTablaAd">
      <button v-on:click="metAgregarResguardo">Agregar</button>
      <button v-on:click="metActualizarResguardo">Actualizar</button>
      <button v-on:click="metEliminarResguardo" class="botonDelete">Eliminar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Para procesar HTTP requests
import appData from "../App.vue"; // Data de App.vue

export default {
  name: "ResguardosComp",

  props: ["registrosProp"],

  data: function () {
    return {
      resguardo: {
        // Hace referencia a la Resguardo de la tabla de la DB seleccionada
        id_resguardo: "",
        nombre: "",
        descripcion: "",
      },

      resguardoPrelim: {
        // Hace referencia a la Resguardo cuyos datos son los especificados en los campos
        id_resguardo: "",
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
      this.resguardoPrelim = { ...ocup }; // Clonando shallow, no pasando referencia al objeto
    },

    metAgregarResguardo: function () {
      /*alert(
        "Se intentara registrar una resguardo con los siguientes datos:" +
          Object.entries(this.resguardoPrelim)
      );*/
      axios
        .post(
          appData["direccionBack"] + "resguardos/agregar/",
          this.resguardoPrelim
        )
        .then((respuesta) => {
          alert(
            "Resguardo agregada exitosamente!: " +
              "\n\n" +
              "Ocupacion: " +
              respuesta.data.registro.nombre +
              "\n" +
              "Descripcion: " +
              respuesta.data.registro.descripcion
          );

          // Borrar campos
          this.resguardoPrelim = {
            id_resguardo: "",
            nombre: "",
            descripcion: "",
          };
          
          // Actualizar Variable y Lista de resguardos en todos los componentes
          this.metActualizarListaResguardos();
        })
        .catch((error) => {
          alert("Error agregando resguardo: " + error);
        });
    },

    metActualizarResguardo: function () {
      /*alert(
        "Se intentara registrar una resguardo con los siguientes datos:" +
          Object.entries(this.resguardoPrelim)
      );*/

      if (!this.metVerificarAutenticado) {
        alert("Error: no está autenticado.");
        return;
      }

      let token = localStorage.getItem("token_access");

      axios
        .put(
          appData["direccionBack"] + "resguardos/" +
            this.resguardoPrelim.id_resguardo,
          this.resguardoPrelim,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((respuesta) => {
          alert(
            "Resguardo actualizada exitosamente!: \n\n" +
              "id: " +
              respuesta.data.registro.id_resguardo +
              "\n" +
              "Resguardo: " +
              this.resguardoPrelim.nombre +
              "\n" +
              "Descripcion: " +
              this.resguardoPrelim.descripcion
            //JSON.stringify(respuesta.data.registro, null, 2)
          );

          // Borrar campos
          this.resguardoPrelim = {
            id_resguardo: "",
            nombre: "",
            descripcion: "",
          };

          // Actualizar Variable y Lista de resguardos en todos los componentes
          this.metActualizarListaResguardos();
        })
        .catch((error) => {
          alert("Error actualizando resguardo. " + error);
        });
    },

    metEliminarResguardo: function () {
      if (!this.metVerificarAutenticado) {
        alert("Error: no está autenticado.");
        return;
      }

      let token = localStorage.getItem("token_access");

      axios
        .delete(
          appData["direccionBack"] + "resguardos/" +
            this.resguardoPrelim.id_resguardo,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((respuesta) => {
          alert(
            "Resguardo eliminada exitosamente!: "
          );

          // Borrar campos
          this.resguardoPrelim = {
            id_resguardo: "",
            nombre: "",
            descripcion: "",
          };

          // Actualizar Variable y Lista de resguardos en todos los componentes
          this.metActualizarListaResguardos();
        })
        .catch((error) => {
          alert("Error eliminando resguardo: " + error);
        });
    },

    metActualizarListaResguardos: function () {
      // Actualizar lista de Resguardos
      axios
        .get(appData["direccionBack"] + "resguardos/")
        .then((respuesta) => {
          /*alert(
            "Exito GET respuesta.data " +
              Object.values(respuesta.data) +
              typeof respuesta.data
          );*/
          this.$emit("MsjActualizadosResguardos");
        })
        .catch((error) => {
          alert("Error actualizando lista de Resguardos: " + error);
        });
    },
  },
};
</script>




