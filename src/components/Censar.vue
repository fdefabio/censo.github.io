<!-- Parte HTML de mi componente -->
<template>
  <div id="cajaFormularioPersona">
    <h1>Agregar Persona</h1>

    <form v-on:submit.prevent="metAgregarPersona" class="formagregar">
      <!-- Tipo de Documento -->
      <select
        name="Nombre Combobox Tipo de Doc"
        id="inpTipoDoc"
        v-model="persona.tipo_doc"
      >
        <option value="">Tipo de Documento</option>
        <!-- Generación de múltiples Options usando un for:
        El uso de `:` antes del nombre de un atributo hace que Vue intervenga
        Por ejemplo: :value="nombre" permite que el atribute value de la etiquet  option tenga el valor variable nombre
        -->
        <option
          v-for="(valor, nombre) in tipoDocumentos"
          :key="nombre"
          :value="nombre"
        >
          {{ valor }}
        </option>
      </select>

      <br />

      <!-- Número de Documento -->
      <!--label for="inpNDoc">Numero de Documento:</label-->
      <input
        type="number"
        placeholder="Número de Documento"
        id="inpNDoc"
        v-model="persona.doc_id"
      />
      <br />

      <!-- Nombre -->
      <input
        type="text"
        placeholder="Nombre Completo"
        v-model="persona.nombre"
      />
      <br />

      <!-- Fecha de Nacimiento -->
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        v-model="persona.fechadenacimiento"
      />
      <br />

      <!-- Departamento de Residencia -->
      <select
        id="inpDepartamento"
        v-model="persona.departamento"
        placeholder="Departamento de Residencia"
      >
        <option value="">Departamento de Residencia</option>
        <option
          v-for="departamento of departamentos"
          :key="departamento"
          :value="departamento"
        >
          {{ departamento }}
        </option>
      </select>
      <br />

      <!-- Ocupación -->
      <select
        id="inpOcupacion"
        v-model="persona.id_ocupacion"
        :key="this.ocupaciones"
      >
        <option value="null">Ocupación</option>
        <option
          v-for="ocupacion in ocupaciones"
          :key="ocupacion.id_ocupacion"
          :value="ocupacion.id_ocupacion"
        >
          {{ ocupacion.nombre }}
        </option>
      </select>
      <br />

      <!-- Etnia -->
      <select id="inpEtnia" v-model="persona.id_etnia">
        <option value="null">Etnia</option>
        <option
          v-for="etnia in etnias"
          :key="etnia.id_etnia"
          :value="etnia.id_etnia"
        >
          {{ etnia.nombre }}
        </option>
      </select>
      <br />

      <!-- Resguardo -->
      <select id="inpResguardo" v-model="persona.id_resguardo">
        <option value="null">Resguardo</option>
        <option
          v-for="resguardo in resguardos"
          :key="resguardo.id_resguardo"
          :value="resguardo.id_resguardo"
        >
          {{ resguardo.nombre }}
        </option>
      </select>
      <br />

      <!-- Enviar Formulario -->
      <button type="submit" class="botonCrud">Agregar</button>

      <br />
    </form>

    <!-- Botones para abrir Modal (Popup) con CRUD de las tablas adicionales -->
    <div id="BtnsActualizarTablas">
      <button v-on:click="metAbrirMOcupaciones" class="botonCrud">
        Agregar Ocupación
      </button>
      <button v-on:click="metAbrirMEtnias" class="botonCrud">
        Agregar Etnias
      </button>
      <br/>
      <button v-on:click="metAbrirMResguardos" class="botonCrud">
        Agregar Resguardos
      </button>
    <div/>

      <ModalTablaAdComp
        v-show="modalEsVisible"
        v-on:msjCerrarModal="metCerrarModal"
        v-on:MsjActualizadasOcupaciones="metTraerOcupaciones"
        v-on:MsjActualizadasEtnias="metTraerEtnias"
        v-on:MsjActualizadosResguardos="metTraerResguardos"
        v-on:msjLogOutSuaveReenv="metReReenviarMsjLogOutSuave"
        :registrosProp="this.registrosTA"
        :tablaModificandoProp="this.tablaEnModal"
        :key="this.registrosTA[this.registrosTA.length - 1]"
      />
    </div>
  </div>
</template>






<!-- Parte JavaScript de mi componente -->
<script>
import axios from "axios"; // Para procesar HTTP requests
import ModalTablaAdComp from "./TablaAdModal.vue"; // Importar el componente de Ocupaciones
import appData from "../App.vue";

export default {
  //Nombre del componente?
  name: "Censo",

  components: {
    ModalTablaAdComp,
  },

  // Valores de variables que al ser actualizados, inmediatamnete actualizaran el HTML
  data: function () {
    return {
      // Estos valores aparecerán en el formularion en cuanto se cargue la página

      // Define el v-modelo?
      persona: {
        tipo_doc: "",
        doc_id: null,
        nombre: "",
        fechadenacimiento: "1900-01-01",
        departamento: "",
        id_ocupacion: null,
        id_etnia: null,
        id_resguardo: null,
      },

      personaImprimir: {
        tipo_doc: "Tipo de Documento",
        doc_id: "Numero de Documento",
        nombre: "Nombre",
        fechadenacimiento: "Fecha de Nacimiento",
        departamento: "Departamento de Residencia",
        ocupacion: "Ocupacion",
        etnia: "Etnia",
        resguardo: "Resguardo"
      },

      // JSON de tipos de documentos: la llave es el valor que se envía, el valor es lo que el usuario lee
      tipoDocumentos: {
        CC: "Cédula de Ciudadanía",
        TI: "Tarjeta de Identidad",
        Otro: "Otro",
      },

      // Lista de Departamentos
      departamentos: ["Amazonas", "Boyacá", "Guajira", "Cundinamarca"],

      // Lista de Ocupaciones
      ocupaciones: [],

      // Lista de Etnias
      etnias: [],

      // Lista de Resguardos
      resguardos: [],

      registrosTA: [],

      modalEsVisible: false,
    };
  },

  // Funcion a ejecutar al cargar la pagina
  created: function () {
    //alert("Direccion = " + JSON.stringify(appData["direccionBack"], 2));
    this.metTraerOcupaciones();
    this.metTraerEtnias();
    this.metTraerResguardos();
    this.registrosTA = [];
  },

  // Métodos auxiliares a ejecutar dadas ciertas acciones en este componente
  methods: {
    // Metodo para enviar formulario de Registro de Persona
    metAgregarPersona: function () {
      /*alert(
        "Se intentara registrar una persona con los siguientes datos:" +
          Object.entries(this.persona)
      );*/

      axios
        .post(appData["direccionBack"] + "censoIndigena/censar/", this.persona)
        .then((respuesta) => {
          // Alerta con datos registrados
          let personaString = "";

          for (const [llave, valor] of Object.entries(this.personaImprimir)) {
            personaString += valor + ": " + respuesta.data.registro[llave] +  "\n";
          }

          alert(
            "Persona agregada exitosamente!\n\n" + personaString
              //JSON.stringify(respuesta.data.registro, null, 2)
          );
          
          // Borrar campos
          this.persona = {
            tipo_doc: "",
            doc_id: null,
            nombre: "",
            fechadenacimiento: "1900-01-01",
            departamento: "",
            id_ocupacion: null,
            id_etnia: null,
            id_resguardo: null,
          };
        })
        .catch((error) => {
          alert("Errores: " + error);
        });
    },

    metTraerOcupaciones: async function () {
      axios
        .get(appData["direccionBack"] + "ocupaciones/")
        .then((respuesta) => {
          this.ocupaciones = respuesta.data;
          //alert("ID ultima ocupacion (en Censar.vue): " + this.ocupaciones[this.ocupaciones.length -1].id_ocupacion)
          this.registrosTA = this.ocupaciones;
        })
        .catch((error) => {
          alert("Error trayendo Ocupaciones de " + appData["direccionBack"] + error);
        });
    },

    metTraerEtnias: async function () {
      axios
        .get(appData["direccionBack"] + "etnias/")
        .then((respuesta) => {
          this.etnias = respuesta.data;

          this.registrosTA = this.etnias;
        })
        .catch((error) => {
          alert("Error trayendo Etnias " + appData["direccionBack"] + error);
        });
    },

    metTraerResguardos: async function () {
      axios
        .get(appData["direccionBack"] + "resguardos/")
        .then((respuesta) => {
          this.resguardos = respuesta.data;

          this.registrosTA = this.resguardos;
        })
        .catch((error) => {
          alert("Error trayendo Resguardos " + appData["direccionBack"] + error);
        });
    },

    metCerrarModal: function () {
      this.modalEsVisible = false;
    },

    metAbrirMOcupaciones: function () {
      //alert("Se esta tratando de mostrar el modal");
      this.registrosTA = this.ocupaciones;
      this.modalEsVisible = true;
      this.tablaEnModal = "ocupaciones";
    },

    metAbrirMEtnias: function () {
      this.registrosTA = this.etnias;
      this.modalEsVisible = true;
      this.tablaEnModal = "etnias";
    },

    metAbrirMResguardos: function () {
      this.registrosTA = this.resguardos;
      this.modalEsVisible = true;
      this.tablaEnModal = "resguardos";
    },

    metReReenviarMsjLogOutSuave: function() {
      this.$emit("msjLogOutSuaveReReenv");
    }
  },
};
</script>


<!-- Parte CSS de mi componente -->
<style>
#cajaFormularioPersona {
  padding-top: 50px;
  align-items: center;
}

.formagregar {
  padding-top: 20px;
  padding-bottom: 5px;
  margin: auto;
  margin-top: 20px;
  min-width: 200px;
  width: 50%;
  max-width: 600px;
  height: 420px;
}

#BtnsActualizarTablas {
  padding-top: 0px;
  justify-items: top;
  justify-content: top;
}

.botonCrud {
  transform-origin: center center;
  width: 130px;
  height: 35px;
  /*align-self: center;*/
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

#formagregar {
  width: 600px;
  height: 600px;
}

input {
  margin-top: 25px;
}

#buttonregistrar {
  width: 130px;
  height: 35px;
  margin-left: 5px;
  margin-top: 10px;
}

#inpResguardo {
  margin-top: 10px;
}

#inpEtnia {
  margin-top: 10px;
}

#inpOcupacion {
  margin-top: 10px;
}

#inpDepartamento {
  margin-top: 10px;
}

select {
  border: 2px solid;
  width: 200px;
  height: 30px;
  border-color: rgb(100, 133, 224);
}
</style>