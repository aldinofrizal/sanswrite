<template>
  <div class="ui unstackable items articleBox">
    <div class="item">
      <div class="image">
        <img :src="article.image"/>
      </div>
      <div class="content">
        <a class="header" @click="read">{{article.title}}</a>
        <div class="meta">author :  {{ article.UserId.username }}</div>
        <div class="description" v-html="article.content.slice(0,350)"></div>
        <div class="meta">last updated :  {{ momentDate(article.updatedAt) }}</div>
        <div class="tags">
          <div class="meta" v-for="(tag,index) in article.tags" :key="index">
            <a class="item" @click.prevent="triggerSearch(tag)">
              <div class="ui tag label">{{ tag }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "list",
  props: ["article"],
  methods: {
      read(){
          this.$emit('triggerReadDetail' , this.article)
      },
      triggerSearch(tag){
          this.$emit('triggerSearch' , tag)
      },
      momentDate(date){
          moment().format()
          return moment(date).format('DD-MM-YYYY')
      }
  }
};
</script>

<style scoped>
.articleBox {
  padding: 2vh;
  border-radius: 2px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.16), 2px 2px 3px rgba(0, 0, 0, 0.23);
  background: rgb(251, 251, 251);
}
.tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 1vh 0;
}
</style>