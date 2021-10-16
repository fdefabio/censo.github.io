<template>
  <div id="nav">
    <router-link to="/" id="linknav">Registros</router-link> |
    <router-link to="/about" id="linknav">Agregar</router-link>|
    <router-link to="" id="linknav">Estadisticas</router-link>|
    <a id="buttonreg" href="#" class="button">registrarse</a>
  </div>

  <!-- <router-view />-->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: rgb(127, 157, 255);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav #linknav {
  position: relative;
  color: #f4f7fa;
  padding: 10px;
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
  bottom: -2px;
  transition: 0.5s;
}

#nav #linknav:hover:after {
  width: 100%;
}

#buttonreg {
  display: inline-block;
  color: #f4f7fa;
  background-color: rgb(127, 157, 255);
  border: 2px solid;
  border-radius: 15px;
  border-color: #f1e53c;
  width: 80px;
  padding: 10px;
  margin: 0px;
  height: 20px;
  text-align: center;
  text-decoration: none;
}
</style>
