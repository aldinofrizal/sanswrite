<template>
  <div id="main-body">
    <div class="ui secondary pointing menu" id="post">
      <a class="active item">Post</a>
      <div class="right menu">
        <div class="item">
          <div class="ui transparent icon input">
            <input type="text" placeholder="Search..." v-model="search" />
            <i class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="ui segment" id="post-content">
      <div class="ui active centered inline loader" id="loader" v-if="loading"></div>
      <div class="ui unstackable items">
        <List :article="article" v-for="article in articles" :key="article._id" @triggerReadDetail="toRead" @triggerSearch="changeSearch"></List>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./ExploreList";
import axios from "axios";

export default {
  name: "explore",
  props : ['fetch'],
  components: {
    List
  },
  data() {
    return {
      search: "",
      loading: false,
      articles: []
    };
  },
  methods: {
    fetchArticle() {
      this.loading = true;
      axios({
        method: "get",
        url: `http://34.87.84.2/article`,
        headers : {
            search : this.search
        }
      })
        .then(({ data }) => {
          setTimeout(() => {
            this.articles = data;
            this.loading = false;
          }, 1000);
        })
        .catch(err => {
          setTimeout(() => {
            swal("Sorry our server is under allien atack!");
            this.loading = false;
          }, 1000);
        });
    },
    toRead(payload){
        this.$emit('triggerReadDetail', payload)
    },
    changeSearch(payload){
        this.search = payload
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.fetchArticle();
    }
  },
  watch: {
    search: function() {
      this.articles = [];
      this.fetchArticle();
    },
    fetch: function() {
      this.articles = [];
      this.fetchArticle();
    }
  }
};
</script>

<style scoped>
.article {
  width: 100%;
}
#mian-body {
  overflow: hidden;
}
#post,
#post-content {
  width: auto;
  max-width: 80%;
  margin: auto;
}
#post-content {
  height: 100vh !important;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start !important;
  justify-content: flex-start;
  height: 75vh;
  overflow: scroll;
  overflow-x: hidden;
  padding: 1vh auto;
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  background: rgb(140, 189, 218);
}
::-webkit-scrollbar-thumb {
  background: #2274a5;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(15, 76, 112);
}
#loader {
  margin-top: 200px;
}
</style>