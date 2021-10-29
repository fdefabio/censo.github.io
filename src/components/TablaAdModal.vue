<template>
  <!-- Llena toda la pantalla -->
  <div class="ModalBack">
    <!-- El cuadro donde está la información -->
    <div class="ModalCuadro">
      <!-- Header -->
      <header class="modal-header">
        <button
          type="button"
          class="btn-close-X"
          @click="metCerrarModal"
          aria-label="Close modal"
        >
          X
        </button>
        <slot name="header">
          <h2> {{ this.tablaModificandoProp == undefined? undefined : this.tablaModificandoProp.substring(0, 1).toUpperCase() + this.tablaModificandoProp.substring(1) }} </h2>
        </slot>
      </header>


      <section class="modal-body">
      <!-- El Componente con el CRUD de Ocupaciones -->
      <OcupacionesComp v-if="tablaModificandoProp == 'ocupaciones'"
        :registrosProp="this.registrosProp"
        v-on:MsjActualizadasOcupaciones="metReenviarMsjOcupaciones"
        v-on:msjLogOutSuave="metReenviarMsjLogOutSuave"
        :key="this.registrosProp[this.registrosProp.length -1]"
      />

      <EtniasComp v-if="tablaModificandoProp == 'etnias'"
        :registrosProp="this.registrosProp"
        v-on:MsjActualizadasEtnias="metReenviarMsjEtnias"
        :key="this.registrosProp[this.registrosProp.length -1]"
      />

      <ResguardosComp v-if="tablaModificandoProp == 'resguardos'"
        :registrosProp="this.registrosProp"
        v-on:MsjActualizadosResguardos="metReenviarMsjResguardos"
        :key="this.registrosProp[this.registrosProp.length -1]"
      />

      </section>

      <!--footer>
        <button v-on:click="metCerrarModal" id="btnCerrarModal">
          Cerrar
        </button>
      </footer-->
    </div>
  </div>
</template>





<script>
import OcupacionesComp from "./OcupacionesComp.vue";
import EtniasComp from "./EtniasComp.vue";
import ResguardosComp from "./ResguardosComp.vue";

export default {
  name: "ModalTablaAdComp",
  
  methods: {
    metCerrarModal() {
      this.$emit("msjCerrarModal");
    },

    metReenviarMsjOcupaciones() {
      /*alert(
        "Se esta reenviando el mensaje de actualizacion en OcupacionesModal"
      );*/
      this.$emit("MsjActualizadasOcupaciones");
    },

    metReenviarMsjEtnias() {
      /*alert(
        "Se esta reenviando el mensaje de actualizacion en OcupacionesModal"
      );*/
      this.$emit("MsjActualizadasEtnias");
    },

    metReenviarMsjResguardos() {
      /*alert(
        "Se esta reenviando el mensaje de actualizacion en OcupacionesModal"
      );*/
      this.$emit("MsjActualizadosResguardos");
    },

    metReenviarMsjLogOutSuave: function() {
      this.$emit("msjLogOutSuaveReenv");
    }
  },

  components: {
    OcupacionesComp,
    EtniasComp,
    ResguardosComp
  },

  props: ["registrosProp", "tablaModificandoProp"],
};
</script>





<style>
.ModalBack {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ModalCuadro {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.tablaAdicionales {
  overflow:scroll;
  height:50vh;
}

.btn-close-X{
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: rgb(127, 157, 255);
  background: transparent;
}

footer {
  text-align: center;
  margin: 10px;
}

/* Estilos para botones CRUD Tablas Adicionales */

.BotonesCrudTablaAd{
  text-align: center;
}

.BotonesCrudTablaAd button {
  margin: 10px;
}

</style>