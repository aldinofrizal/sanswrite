<template>
  <div id="landingpage">
    <div id="registerform">
      <div id="loginform">
        <h2>Welcome to Sanswrite!!</h2>

        <div>
          <div class="ui error message" v-if="form.err.length">
            <i class="close icon" @click="form.err = []"></i>
            <div class="header">There were some errors with your submission</div>
            <ul class="list" v-for="(err,i) in form.err" :key="i">
              <li>{{ err }}</li>
            </ul>
          </div>
        </div>

        <form class="ui form">
          <div class="field">
            <label>Username</label>
            <input
              type="text"
              name="first-name"
              placeholder="username"
              autocomplete="off"
              v-model="form.username"
            />
          </div>
          <div class="field">
            <label>Email</label>
            <input
              type="email"
              name="first-name"
              placeholder="email"
              autocomplete="off"
              v-model="form.email"
            />
          </div>
          <div class="field">
            <label>Password</label>
            <input
              type="password"
              name="first-name"
              placeholder="password"
              autocomplete="off"
              v-model="form.password"
            />
          </div>
          <button class="ui orange button" type="submit" @click.prevent="register()">register</button>
          <div class="ui active inline loader" v-if="isLoading"></div>
        </form>
        <p>
          member of Sanswrite? click to
          <a style="cursor: pointer;" @click.prevent="toLogin()">login!</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert"

export default {
  name: "Register",
  data() {
    return {
      isLoading: false,
      form: {
        username: "",
        email: "",
        password: "",
        err: []
      }
    };
  },
  methods: {
    toLogin() {
      this.$emit("toggleForm", true);
    },
    register() {
      this.isLoading = true;
      axios({
        method: "post",
        url: "http://34.87.84.2/user/register",
        data: {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          err: []
        }
      })
        .then(userCreated => {
          setTimeout(() => {
            this.isLoading = false;
            swal("Successfully register! please login to join the party!");
            this.toLogin();
          }, 1000);
        })
        .catch(err => {
          setTimeout(() => {
            this.isLoading = false;
            this.form.err = err.response.data.msg;
          }, 1000);
        });
    }
  }
};
</script>

<style scoped>
#landingpage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#landingpage p {
  margin-top: 3vh;
}
#landingpage a:hover {
  font-size: 15px;
}
#loginform {
  width: 100vh;
  height: 70vh;
  padding: 9vh 15vh;
  border-radius: 5px;
  /* background-color: #2274A5; */
}
#landingpage #registerform {
  height: 70vh;
}
.ui.error.message {
  margin-bottom: 2vh;
}
</style>