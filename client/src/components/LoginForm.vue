<template >
  <div id="landingpage">
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
            v-model="form.password"
            autocomplete="off"
          />
        </div>
        <button class="ui yellow button" type="submit" @click.prevent="login()">Login</button>
        <button class="ui google plus button" @click.prevent="googleLogin()">
          <i class="google icon"></i>
          Google Sign In
        </button>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn(googleUser)"></div> -->
        <!-- <a href="#" v-on:click="signOut();">Sign out</a> -->
        <div class="ui active inline loader" v-if="isLoading"></div>
      </form>
      <p>
        new to Sanswrite? click to
        <a style="cursor: pointer;" @click.prevent="toLogin()">register!</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GAuth from "vue-google-oauth2";
import Vue from "vue";

const gauthOption = {
  clientId:
    "225250596819-d8fouqrm1au96ue9nhru7acoal914rtg.apps.googleusercontent.com"
};

Vue.use(GAuth, gauthOption);

export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      form: {
        email: "",
        password: "",
        err: []
      }
    };
  },
  methods: {
    toLogin() {
      this.$emit("toggleForm", false);
    },
    login() {
      this.isLoading = true;
      axios({
        method: "post",
        url: "http://34.87.84.2/user/login",
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(response => {
          let token = response.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("peradaban" , response.data._id )
          this.form.password = "";
          this.form.email = "";
          setTimeout(() => {
            this.isLoading = false;
            this.$emit("login", {
              payload: response.data.id
            });
          }, 1000);
        })
        .catch(err => {
          setTimeout(() => {
            this.isLoading = false;
            this.form.err.push(err.response.data.message);
          }, 1000);
        });
    },

    googleLogin() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          let profile = GoogleUser.getBasicProfile();
          return axios({
            method : 'post',
            url : 'http://34.87.84.2/user/google',
            data : {
              username : profile.getName(),
              email : profile.getEmail(),
              password : 'google'
            }
          })
        })
        .then( response => {
          let token = response.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("peradaban" , response.data._id )
          this.form.password = "";
          this.form.email = "";
          setTimeout(() => {
            this.isLoading = false;
            this.$emit("login", {
              payload: response.data.id
            });
          }, 1000)
        })
        .catch(error => {
          // on fail do something
          setTimeout(() => {
            this.isLoading = false;
            this.form.err.push(err.response.data.message);
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
}
#landingpage #registerform {
  height: 70vh;
}
.ui.error.message {
  margin-bottom: 2vh;
}
</style>