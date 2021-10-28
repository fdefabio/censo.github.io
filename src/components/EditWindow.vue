<template>
  <form v-on:submit.prevent="save" class="form">
    <div>
      <button id="buttoncerrar" v-on:click="cerrar">
        <h1 id="xcerrar">X</h1>
      </button>
    </div>
    <div>
      <select
        name="Nombre Combobox Tipo de Doc"
        id="inpTipoDoc"
        v-model="user.tipo_doc"
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
      <div>
        <input type="text" v-model="user.nombre" id="nameedit" />
        <br />
        <input type="date" v-model="user.fechadenacimiento" id="fechanac" />
        <br />
        <input type="text" v-model="user.departamento" id="departamento" />
      </div>

      <div>
        <select
          v-model="user.id_ocupacion"
          id="ocupaciones"
          placeholder="ocupacion"
          required
        >
          <option value="null">Ocupaciones</option>
          <option
            v-for="ocupacion in ocupaciones"
            :key="ocupacion.id_ocupacion"
            :value="ocupacion.id_ocupacion"
          >
            {{ ocupacion.nombre }}
          </option>
        </select>
      </div>

      <div>
        <select
          type="text"
          v-model="user.id_resguardo"
          id="resguardos"
          required
        >
          <option value="null">Resguardos</option>
          <option
            v-for="resguardo in resguardos"
            :key="resguardo.id_resguardo"
            :value="resguardo.id_resguardo"
            >{{ resguardo.nombre }}</option
          >
        </select>
      </div>

      <div>
        <select type="text" v-model="user.id_etnia" id="etnias" required>
          <option value="null">Etnias</option>
          <option
            v-for="etnia in etnias"
            :key="etnia.id_etnia"
            :value="etnia.id_etnia"
            >{{ etnia.nombre }}</option
          >
        </select>
      </div>
      <div><button type="submit">guardar</button></div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "EditWnidow",

  data: function() {
    return {
      user: {
        tipo_doc: "",
        id_ocupacion: null,
        nombre: "",
        fechadenacimiento: "",
        id_resguardo: null,
        id_etnia: null,
        departamento: "",
      },
      tipoDocumentos: {
        CC: "Cédula de Ciudadanía",
        TI: "Tarjeta de Identidad",
        Otro: "Otro",
      },
      ocupaciones: [],
      etnias: [],
      resguardos: [],
    };
  },

  created: async function() {
    this.metTraerOcupaciones();
    this.metTraerEtnias();
    this.metTraerResguardos();
  },
  methods: {
    save: function() {
      let token = localStorage.getItem("token_access");
      let id = localStorage.getItem("id");
      axios
        .put(
          `https://censoindigena.herokuapp.com/censoIndigena/personas/${id}`,
          this.user,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          alert("cambios realizados con exito!: ");
        })
        .catch((error) => {
          alert("no se pudieron hacer los cambios!: ");
        });
      this.$router.go(0);
      this.message = result.data;
    },

    metTraerOcupaciones: async function() {
      axios
        .get("https://censoindigena.herokuapp.com/ocupaciones/")
        .then((respuesta) => {
          this.ocupaciones = respuesta.data;
        })
        .catch((error) => {
          alert("Errores: ", error);
        });
    },

    metTraerEtnias: async function() {
      axios
        .get("https://censoindigena.herokuapp.com:8000/etnias/")
        .then((respuesta) => {
          this.etnias = respuesta.data;
        })
        .catch((error) => {
          alert("Errores: ", error);
        });
    },
    metTraerResguardos: async function() {
      axios
        .get("https://censoindigena.herokuapp.com/resguardos/")
        .then((respuesta) => {
          this.resguardos = respuesta.data;
        })
        .catch((error) => {
          alert("Errores: ", error);
        });
    },
    cerrar: function() {
      document.getElementById("window").style.display = "none";
    },
  },
};
</script>
<style>
.form {
  display: flex;
  box-sizing: border-box;
  border: 1px solid;
  border-color: black;
  width: 30%;
  height: 600px;
  background-color: rgb(255, 253, 253);
  border-radius: 10px;
  position: absolute;
  left: 32%;
  top: 22%;
}
#buttoncerrar {
  color: black;
  background-color: white;
  margin-top: 2%;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  align-items: center;
  margin-left: 85%;
  position: relative;
}
#xcerrar {
  color: black;
}
</style>
