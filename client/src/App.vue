<template>
  <div id="body">
    <div v-show="!isAuth">
      <Login @toggleForm="toggleAuth" v-show="isLoginForm" @login="login"></Login>
      <Register @toggleForm="toggleAuth" v-show="!isLoginForm"></Register>
    </div>
    <div v-show="isAuth">
      <Navbar
        :user="activeUser"
        :writeStatus="mainStatus"
        @mainChild="toggleMain"
        @trigerLogout="logout"
        @toHome="home"
        @triggerExplore="toExplore"
      ></Navbar>
      <div v-show="!readStatus && !exploreStatus">
        <Main
          v-show="!mainStatus"
          @triggerReadDetail="toggleRead"
          :fetch="mainStatus"
          :logoutStat="logoutState"
        ></Main>
        <AddForm v-show="mainStatus && !editStatus" @form="toggleMain"></AddForm>
        <EditForm v-show="editStatus" :articleToEdit="activeRead" @editform="toggleMain"></EditForm>
      </div>
      <readArticle
        v-show="readStatus && !exploreStatus"
        :article="activeRead"
        @deleteTrigger="toggleMain"
        @editTrigger="toEdit"
      ></readArticle>
      <Explore v-show="exploreStatus" :fetch="mainStatus" @triggerReadDetail="toggleRead"></Explore>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import AddForm from "./components/AddForm";
import ReadArticle from "./components/readArticle";
import Swal from "sweetalert";
import EditForm from "./components/EditForm";
import Explore from "./components/Explore";

export default {
  components: {
    Navbar,
    Main,
    Login,
    Register,
    AddForm,
    ReadArticle,
    EditForm,
    Explore
  },
  data() {
    return {
      isAuth: false,
      isLoginForm: true,
      activeUser: {},
      mainStatus: undefined,
      readStatus: false,
      activeRead: {},
      editStatus: false,
      exploreStatus: false,
      logoutState: ""
    };
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    },
    toggleAuth(payload) {
      if (!payload) this.isLoginForm = false;
      else this.isLoginForm = true;
    },
    login(payload) {
      this.mainStatus = !this.mainStatus;
      this.isAuth = true;
      this.mainStatus = false;
      this.logoutState = "LOGIN";
    },
    toggleMain(payload) {
      this.readStatus = false;
      this.editStatus = false;
      this.exploreStatus = false;
      this.activeRead = {};
      if (payload) this.mainStatus = true;
      else this.mainStatus = false;
    },
    logout(payload) {
      if (payload) {
        localStorage.removeItem("token");
        this.isAuth = false;
        this.logoutState = "LOGOUT";
        this.$emit('emtpyArticles')
        Swal("thank you, see you next time!");
      }
    },
    toggleRead(payload) {
      this.exploreStatus = false;
      this.readStatus = true;
      this.activeRead = payload;
      this.mainStatus = !this.mainStatus;
    },
    home(payload) {
      this.readStatus = false;
      this.mainStatus = false;
      this.editStatus = false;
      this.exploreStatus = false;
    },
    toEdit(payload) {
      this.editStatus = true;
      this.readStatus = false;
      this.exploreStatus = false;
      this.mainStatus = true;
    },
    toExplore(payload) {
      this.exploreStatus = true;
    }
  },
  watch: {
    isAuth: function() {
      this.checkLogin();
    }
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    CKEDITOR.replace("editor");
    CKEDITOR.replace("editor2");
  }
};
</script>

<style scoped>
#body {
  background-color: whitesmoke;
}
</style>