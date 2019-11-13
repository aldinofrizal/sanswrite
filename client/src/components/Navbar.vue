<template>
  <nav class="ui blue menu" id="navbar">
    <a class="item" id="sidebar-trigger">
      <i class="american sign language interpreting large white icon"></i>Sanswrite
    </a>

    <a class="item" @click="toHome">Dashboard</a>
    <a class="item" @click="toExplore">Explore</a>
    <div class="right menu">
      <div class="item" v-if="!isWrite" @click="toggleMain()">
        <div class="ui button" id="write-trigger">
          <i class="pencil alternate icon"></i>Write
        </div>
      </div>
      <div class="item" v-if="isWrite" @click="toggleMain()">
        <div class="ui button" id="write-trigger">
          <i class="pencil alternate icon"></i>Article
        </div>
      </div>
      <a class="item" @click="swalQuote">
        <i class="user circle icon large white"></i>
        Quote
      </a>
      <a class="item" @click="logout()">Log out</a>
    </div>
  </nav>
</template>

<script>
import Axios from 'axios'
import Swal from 'sweetalert'

export default {
  name: "Navbar",
  props : [ 'writeStatus' ],
  data(){
      return {
        isWrite : false
      }
  },
  methods : {
    toggleMain(){
      this.isWrite = !this.isWrite
      this.$emit('mainChild' , this.isWrite)
    },
    logout(){
      console.log('helloWorld')
      this.$emit('trigerLogout', true)
    },
    toHome(){
      this.$emit('toHome', true)
    },
    toExplore(){
      this.$emit('triggerExplore', true)
    },
    swalQuote(){
      Axios({
        method : 'get',
        url : 'https://favqs.com/api/qotd'
      })
      .then( quote => {
        Swal(quote.data.quote.body)
      })
      .catch(err => {
        console.log(err.response)
        console.log(err.data)
      })
    }
  },
  watch: {
    writeStatus: function(){
      if(!this.writeStatus)this.isWrite = false
      else this.isWrite = true
    }
  }
};
</script>

<style scoped>
    #navbar{
        background-color: #2274A5;
        width: 100% !important;
        border-radius: 0;
    }
    #navbar a{
        color: white;
        font-weight: 600;
    }
</style>