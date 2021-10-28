<template>
  <div class="windowclose">
    <div>
      <button id="buttoncerrar2" v-on:click="closedeletewindow">
        <h1 id="xcerrar">X</h1>
      </button>
    </div>
    <div id="textconfirm">
      <h1>seguro de que desea eliminar este registro?</h1>
    </div>
    <div id="buttonseliminar">
      <button to="/tabla" id="yes" v-on:click="deleteReg">
        si
      </button>
      <button id="no" v-on:click="closedeletewindow">no</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditWnidow",
  data: function() {
    return {};
  },
  methods: {
    deleteReg: function() {
      let token = localStorage.getItem("token_access");
      let idReg = localStorage.getItem("id");

      axios
        .delete(
          `https://censoindigena.herokuapp.com/censoIndigena/personas/${idReg}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          alert("registro eliminado");
          document.getElementById("delete-window").style.display = "none";
          location.reload();
          this.$router.go(0);
          this.message = result.data;
        })
        .catch((error) => alert("hubo un error al eliminar registro"));
    },

    closedeletewindow: function() {
      document.getElementById("delete-window").style.display = "none";
    },
  },
};
</script>
<style>
.windowclose {
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  box-sizing: border-box;
  border: 1px solid;
  border-color: black;
  width: 35%;
  height: 200px;
  background-color: rgb(248, 248, 248);
  border-radius: 10px;
  position: absolute;
  left: 32%;
  top: 65%;
}
#buttoncerrar2 {
  color: black;
  background-color: white;
  margin-left: 93%;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  align-items: center;
  position: absolute;
}
#xcerrar {
  color: black;
}

#buttonseliminar {
  margin-left: 20%;
  position: absolute;
  display: flex;
  margin-top: 20%;
}
</style>
