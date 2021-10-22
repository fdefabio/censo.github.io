<template>
  <div class="OcupacionesBack">
    <div class="cajaFormOcupaciones">
      Hola
      <slot name="body">
        Hola
        <button v-on:click="metCerrar">Cerrar</button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompOcupaciones",
  methods: {
    metCerrar: function() {
      this.emit("mensCerrarMOcupaciones");
    },
  },
};
</script>

<style>
.OcupacionesBack {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.cajaFormOcupaciones {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
</style>
