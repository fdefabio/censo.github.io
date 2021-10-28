<!-- Parte HTML de mi componente -->
<template>
  <div class="cajaFormulario">
    <center>
      <br />
      <br />
      <form v-on:submit.prevent="metAgregarPersona" id="formagregar">
        <h1>Agregar Persona</h1>
        <!-- Tipo de Documento -->
        <select
          name="Nombre Combobox Tipo de Doc"
          id="inpTipoDoc"
          v-model="persona.tipo_doc"
          required
        >
          <option value="" required>Tipo Documento</option>
          <!-- Generación de múltiples Options usando un for:
        El uso de `:` antes del nombre de un atributo hace que Vue intervenga
        Por ejemplo: :value="nombre" permite que el atribute value de la etiquet  option tenga el valor variable nombre
        -->
          <option
            v-for="(valor, nombre) in tipoDocumentos"
            :key="nombre"
            :value="nombre"
            required
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
          required
        />
        <br />

        <!-- Nombre -->
        <input
          type="text"
          placeholder="Nombre Completo"
          v-model="persona.nombre"
          required
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
          required
        >
          <option value="">Dapartamento de Residencia</option>
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
          placeholder="Ocupacion"
          required
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
        <select id="inpEtnia" v-model="persona.id_etnia" required>
          <option value="null" required>Etnia</option>
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
        <select id="inpResguardo" v-model="persona.id_resguardo" required>
          <option value="null" required>Resguardo</option>
          <option
            v-for="resguardo in resguardos"
            :key="resguardo.id_resguardo"
            :value="resguardo.id_resguardo"
          >
            {{ resguardo.nombre }}
          </option>
        </select>
        <br />

        <div id="buttonsreg">
          <!-- Enviar Formulario -->

          <button type="submit" id="buttonregistrar">Agregar</button>
          <br />

          <button v-on:click="metTraerOcupaciones" id="buttonregistrar">
            Actualizar Ocupaciones
          </button>

          <button v-on:click="metAbrirMOcupaciones" id="buttonregistrar">
            CRUD Ocupaciones
          </button>
          <Modal
            v-show="modalOcupacionesEsVisible"
            v-on:mensCerrarMOcupaciones="metCerrarMOcupaciones"
          />
        </div>
      </form>
    </center>
  </div>
</template>

<!-- Parte JavaScript de mi componente -->
<script>
import axios from "axios"; // Para procesar HTTP requests
import CompOcupaciones from "./Ocupaciones.vue"; // Importar el componente de Ocupaciones
export default {
  //Nombre del componente?
  name: "Censo",
  components: {
    CompOcupaciones,
  },
  // Valores iniciales de variables
  data: function() {
    return {
      // Estos valores aparecerán en el formularion en cuanto se cargue la página
      // Define el v-modelo?
      persona: {
        tipo_doc: "",
        doc_id: null,
        nombre: "",
        fechadenacimiento: "2000-01-01",
        departamento: "",
        id_ocupacion: null,
        id_etnia: null,
        id_resguardo: null,
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
      modalOcupacionesEsVisible: false,
    };
  },
  // Funcion a ejecutar al cargar la pagina
  created: async function() {
    this.metTraerOcupaciones();
    this.metTraerEtnias();
    this.metTraerResguardos();
  },
  // Métodos auxiliares a ejecutar dadas ciertas acciones en este componente
  methods: {
    // Metodo para enviar formulario de Registro de Persona
    metAgregarPersona: function() {
      alert(
        "Se intentara registrar una persona con los siguientes datos:" +
          Object.entries(this.persona)
      );
      axios
        .post("http://localhost:8000/censoIndigena/censar/", this.persona)
        .then((respuesta) => {
          alert("Persona agregada exitosamente!: ");
          this.$router.go(0);
          this.message = result.data;
        })
        .catch((error) => {
          alert("Errores: " + error);
        });
    },
    metTraerOcupaciones: async function() {
      axios
        .get("http://localhost:8000/ocupaciones/")
        .then((respuesta) => {
          this.ocupaciones = respuesta.data;
        })
        .catch((error) => {
          alert("Errores: ", error);
        });
    },
    metTraerEtnias: async function() {
      axios
        .get("http://localhost:8000/etnias/")
        .then((respuesta) => {
          this.etnias = respuesta.data;
        })
        .catch((error) => {
          alert("Errores: ", error);
        });
    },
    metTraerResguardos: async function() {
      axios
        .get("http://localhost:8000/resguardos/")
        .then((respuesta) => {
          this.resguardos = respuesta.data;
        })
        .catch((error) => {
          alert("Errores: ", error);
        });
    },
    metAbrirMOcupaciones: function() {
      this.modalOcupacionesEsVisible = false;
    },
    metAbrirMOcupaciones: function() {
      this.modalOcupacionesEsVisible = true;
    },
  },
  // Modelos adicionales?
};
</script>

<!-- Parte CSS de mi componente -->
<style>
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
