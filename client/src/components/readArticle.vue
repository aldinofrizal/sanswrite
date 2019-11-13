<template>
<div>
  <div class="ui segment" id="wrap">
    <h2>jsdlkajkld</h2>
    <h2 class="ui right floated header">{{article.title}}</h2>
    <div class="ui clearing divider"></div>

    <div class="tags">
      <div class="tag" v-for="(tag,index) in article.tags" :key="index">
        <a class="ui label">{{ tag }}</a>
      </div>
    </div>

    <img :src="article.image" alt class="ui medium rounded left floated image" />
    <p v-html="article.content"></p>
    <br />
    <div class="ui clearing divider"></div>
    <p>last updated : {{ momentJs(article.updatedAt) }}</p>
    <div class="button-action" v-if="article.UserId === this.loggedUser">
      <button class="ui primary button" @click="toEdit">Edit</button>
      <button class="ui button" v-on:click="deleteArticle">Delete</button>
    </div>
  </div>
  
</div>

</template>

<script>
import moment from "moment";
import axios from 'axios'
import swal from "sweetalert"



export default {
  name: "readArticle",
  props: ["article"],
  data(){
    return{
      loggedUser : localStorage.getItem('peradaban')
    }
  },
  methods: {
    momentJs(date) {
      moment().format();
      let format = moment(new Date(date));
      return format.from(new Date());
    },
    deleteArticle() {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this article file!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios({
            method: 'delete',
            url : 'http://34.87.84.2/article',
            data : {
              _id : this.article._id
            },
            headers : {
              token : localStorage.getItem('token')
            }
          })
          .then( deletedData => {
            swal('successfylly delete article!')
            this.$emit('deleteTrigger', false)
          })
          .catch( err => {
            swal("we are really sorry, something bad happen in our server. We'll fix it soon!")
          })  
        }
      });
    },
    toEdit(){
      console.log('ini dari read article')
      this.$emit('editTrigger' , 'ready to edit')
    }

  }
};
</script>

<style scoped>
#wrap {
  width: 70%;
  padding: 5vh 15vh;
  margin: 2vh auto 2vh auto;
  height: 87vh;
  overflow: scroll;
  overflow-x: hidden;
}
.tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 2vh 0;
}
.tag {
  margin: auto 1vh;
}
.button-action {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 2vh 0;
}
</style>