<template>
  <div id="nav">
    <router-link to="/" id="linknav">Registros</router-link> |
    <router-link to="/about" id="linknav">Agregar</router-link>|
    <router-link to="" id="linknav">Estadisticas</router-link>

    <div class="registrarbutton">
      <a id="buttonreg" href="#" class="button">Ingresar</a>
    </div>

    <div class="title">
      <h2>Censo Indigena</h2>
    </div>
  </div>

  <!-- <router-view />-->
</template>

<style>
* {
  /*border: 1px solid;*/
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 15px;
  background-color: rgb(127, 157, 255);
  width: 100%;
}

#nav {
  font-weight: bold;
  color: #2c3e50;
  height: 30px;
}

#nav #linknav {
  position: relative;
  color: #f4f7fa;
  padding: 28px;
  letter-spacing: 1px;
  text-decoration: none;
}

#nav #linknav:after {
  content: "";
  position: absolute;
  background-color: #f1e53c;
  height: 3px;
  width: 0%;
  left: 0;
  bottom: 8px;
  transition: 0.5s;
}

#nav #linknav:hover:after {
  width: 100%;
}

#buttonreg {
  color: #f4f7fa;
  background-color: rgb(127, 157, 255);
  border: 2px solid;
  border-radius: 15px;
  border-color: #f1e53c;
  width: 80px;
  padding: 10px;
  margin: 0px;
  height: 16px;
  text-align: center;
  text-decoration: none;
}

.registrarbutton {
  width: 10%;
  margin-left: 1500px;
  margin-top: -8px;
}

.title {
  width: 500px;
  margin-top: -45px;
  padding-top: 0px;
  color: #f4f7fa;
}
</style>
