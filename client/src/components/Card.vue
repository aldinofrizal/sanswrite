<template>
  <div class="card">
    <div class="image">
      <img :src="article.image"/>
    </div>
    <div class="content">
      <div class="header article-title" @click="read">{{ article.title }}</div>
      <div class="tags">
        <div class="meta" v-for="(tag,index) in article.tags" :key="index">
          <a class="item" @click.prevent="triggerSearch(tag)">
            <div class="ui red horizontal label">{{ tag }}</div>
          </a>
        </div>
      </div>
      <div class="description" v-html="article.content.slice(0,150) + '....'"></div>
    </div>
    <div class="extra content">
      <span class="right floated">{{ momentJs(article.updatedAt) }}</span>
      <span>
        <i class="user icon"></i>
         Sanswrite!
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "card",
  props: ["article"],
  methods: {
    momentJs(date) {
      moment().format();
      let format = moment(new Date(date));
      return format.from(new Date());
    },
    read(){
        this.$emit('triggerReadDetail' , this.article)
    },
    triggerSearch(tag){
      this.$emit('searchTag' , tag)
    }
  }
};
</script>

<style scoped>
.card{
  cursor: default !important;
}
.article-title:hover{
  text-decoration: underline;
  cursor: pointer;
}
img {
  height: 200px !important;
  object-fit: cover;
}
.item {
    margin: .4vh;
}
.item:hover{
  opacity: .7;
}
.tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start; 
  flex-wrap: wrap;
  margin: 1vh 0;
}
</style>