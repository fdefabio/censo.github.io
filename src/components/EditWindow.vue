<template>
  <div class="window">
    <div>
      <button id="buttoncerrar" v-on:click="cerrar">
        <h1 id="xcerrar">X</h1>
      </button>
    </div>
    <div>
      <input type="text" v-model="user.id" id="idedit" />
      <br />
      <input type="text" v-model="user.name" />
      <br />
      <input type="text" />
      <br />
      <button v-on:click="mostrar">aqui</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditWnidow",
  data: function() {
    return {
      user: {
        id: localStorage.getItem("id"),
        name: localStorage.getItem("name"),
      },
    };
  },
  methods: {
    mostrar: function() {
      alert(this.user.id);
    },
    cerrar: function() {
      document.getElementById("window").style.display = "none";
    },
  },
};
</script>
<style>
.window {
  display: flex;
  box-sizing: border-box;
  border: 1px solid;
  border-color: black;
  width: 35%;
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
