<template>
  <div id="form-container">
    <div class="ui secondary pointing menu" id="form2">
      <a class="active item">write your article...</a>
    </div>

    <div class="ui segment" id="form-content">
      <form action>
        <!-- error message -->
        <div>
          <div class="ui error message" v-if="form.err.length">
            <i class="close icon" @click="this.form.err = []"></i>
            <div class="header">There were some errors with your submission</div>
            <ul class="list" v-for="(err,i) in form.err" :key="i">
              <li>{{ err }}</li>
            </ul>
          </div>
        </div>

        <div class="ui form">
          <div class="field">
            <label>Article Title</label>
            <input type="text" v-model="form.title" />
          </div>
        </div>

        <div class="ui form">
          <div class="field">
            <label>Featured Image</label>
            <input type="file" @change="postImage($event)" accept="image/*" />
          </div>
        </div>

        <br />

        <div class="ui form">
          <div class="field">
            <label>Article Content</label>
            <textarea height="200px;" id="editor2" name="editor" v-model="form.content"></textarea>
          </div>
        </div>

        <br />

        <div class="ui form">
          <div class="field">
            <label>Tags</label>
            <input type="text" v-model="form.tag" @keyup.space="addTags" />
          </div>
        </div>
        <br />

        <a class="ui teal label" v-for="(tag,i) in form.tags" :key="i">
          {{ tag }}
          <i class="delete icon" @click="deleteTag(i)"></i>
        </a>

        <br />
        <br />

        <div class="button-links">
          <button
            class="ui primary button"
            :class="{ loading : isLoading }"
            @click.prevent="patchArticle()"
          >Update</button>
          <button class="ui button" @click.prevent="discard()">Discard</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert";

export default {
  name: "EditForm",
  props: ["articleToEdit"],
  data() {
    return {
      isLoading: false,
      form: {
        content: "",
        title: "",
        image: "",
        tag: "",
        tags: [],
        err: []
      }
    };
  },
  methods: {
    addTags() {
      if (this.form.tag.length > 2) {
        this.form.tags.push(this.form.tag);
        this.form.tag = "";
      } else {
        this.form.tag = "";
      }
    },
    deleteTag(index) {
      let array = [];
      this.form.tags.forEach((tag, i) => {
        if (i !== index) array.push(tag);
      });
      this.form.tags = array;
    },
    postImage(event) {
      this.form.image = event.target.files[0];
    },
    discard() {
      swal({
        title: "Are you sure?",
        text: "Once discarded, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.form = {
            content: "",
            title: "",
            image: "",
            tag: "",
            tags: [],
            err: []
          };
          this.form.content = CKEDITOR.instances["editor2"].setData("");
        }
      });
    },
    patchArticle() {
      this.isLoading = true;
      this.form.content = CKEDITOR.instances["editor2"].getData();
      let bodyFromData = new FormData();
      bodyFromData.append("image", this.form.image);
      bodyFromData.append("title", this.form.title);
      bodyFromData.append("content", this.form.content);
      bodyFromData.append("tags", this.form.tags);
      bodyFromData.append("_id", this.articleToEdit._id);
      Axios({
        method: "patch",
        url: "http://34.87.84.2/article",
        data: bodyFromData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.$emit("editform", false);
          Swal("Successfully updated an article! Cheers!!");
          this.isLoading = false;
          this.form = {
            title: "",
            image: "",
            tag: "",
            tags: [],
            err: []
          };
          this.form.content = CKEDITOR.instances["editor2"].setData("");
        })
        .catch(err => {
          this.isLoading = false;
          this.form.err = err.response.message;
          Swal(
            "Sorry server is under attack, please debug my server now!",
            err.response.message
          );
        });
    }
  },
  watch: {
    articleToEdit: function() {
      this.form.title = this.articleToEdit.title;
      this.form.tags = this.articleToEdit.tags;
      this.form.content = CKEDITOR.instances["editor2"].setData(
        this.articleToEdit.content
      );
    }
  }
};
</script>

<style scoped>
#form2 {
  width: 80%;
  margin: auto;
}
#form-content {
  width: 80%;
  margin: auto;
  height: 85vh;
  overflow: scroll;
  overflow-x: hidden;
}
#form2 input {
  border: none !important;
}
.button-links {
  margin: 2vh 2vh !important;
}
::-webkit-scrollbar {
  width: 8px;
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