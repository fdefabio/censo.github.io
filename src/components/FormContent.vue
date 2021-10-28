<template>
  <center>
    <br />
    <form v-on:submit.prevent="processLogin">
      <h1>Censo Indigena</h1>
      <h2>Registrese</h2>
      <input
        type="email"
        id="email"
        placeholder="email"
        v-model="user.email"
        required
      />
      <br />
      <br />
      <input
        type="password"
        id="password"
        placeholder="password"
        v-model="user.password"
        required
      />
      <br />
      <br />
      <button type="submit" id="buttonlogin">Ingresar</button>
    </form>
  </center>
</template>

<script>
import axios from "axios";
export default {
  name: "FormContent",
  data: function() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    processLogin: function() {
      axios
        .post("https://censoindigena.herokuapp.com/login/", this.user, {
          headers: {},
        })
        .then((result) => {
          let dataLogin = {
            username: this.user.username,
            token_access: result.data.access,
            token_refresh: result.data.refresh,
          };
          this.$emit("completedLogin", dataLogin);
        })
        .catch((error) => {
          if (error.response.status == "401") {
            alert("Fallo en la autenticacion");
          }
        });
    },
  },
};
</script>

<style>
form {
  margin-top: 80px;
  border: 1px solid;
  border-color: rgb(212, 210, 210);
  border-radius: 8px;
  height: 400px;
  width: 350px;
  background-color: #ffffff;
}

input {
  width: 200px;
  height: 30px;
}

#password {
  margin-top: 30px;
}

#email {
  margin-top: 30px;
}

button {
  border: 1px solid;
  color: #ffffff;
  background-color: rgb(127, 157, 255);
  border-color: #ffffff;
  width: 100px;
  height: 40px;
  border-radius: 10px;
}
button:hover {
  background-color: #f1e53c;
  color: rgb(127, 157, 255);
}

h1 {
  color: rgb(127, 157, 255);
}

#buttonlogin {
  margin-left: 0px;
}
</style>
