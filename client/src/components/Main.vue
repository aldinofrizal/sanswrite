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

    <div class="ui segment articles" id="post-content">
      <div class="ui active centered inline loader" id="loader" v-if="loading"></div>
      <div class="ui link cards">
        <Card :article="article" v-for="article in articles" :key="article._id" @triggerReadDetail="showDetail" @searchTag="triggerSearchTag" class="card"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import axios from "axios";


export default {
  name: "Main",
  components: {
    Card
  },
  props : ['fetch', 'logoutStat'],
  data() {
    return {
      search: "",
      loading: false,
      articles: []
    };
  },
  methods: {
    fetchArticle() {
      this.loading = true
      axios({
        method: "get",
        url: `http://34.87.84.2/article/search`,
        headers: {
          search: this.search,
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          setTimeout(() => {
            this.articles = data;
            this.loading = false
          }, 1000);
        })
        .catch(err => {
          setTimeout(() => {
            swal("Sorry our server is under allien atack!");
            this.loading = false
          }, 1000);
        });
    },
    showDetail(payload){
      this.$emit('triggerReadDetail', payload)
    },
    triggerSearchTag(payload){
      this.search = payload
    }
    
  },
  created() {
    // this.fetchArticle();
    
  },
  mounted(){
    this.$parent.$on('emptyArticles', () =>{
      this.articles = []
    })
    if(localStorage.getItem('token')){
      this.articles = []
      this.fetchArticle();
    }else {
      this.articles = []
    }
  },
  watch :{
    search : function(){
      this.articles = []
      this.fetchArticle()
    },
    fetch : function() {
      this.articles = []
      if(localStorage.getItem('token')){
        this.articles = []
        this.fetchArticle()
      }
    },
    logoutStat : function(){
      if(this.logoutStat == 'LOGOUT'){
        this.articles = []
      } else if (this.logoutStat == 'LOGIN'){
        this.articles = []
        this.fetchArticle()
      }
    }
  }
};
</script>

<style scoped>
.card{
  width: 18.5vw !important;
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
.articles {
  border: 1px solid red;
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