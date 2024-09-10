<template>
  <div>
    <file-upload ref="fileupload" @select="setUrlImg" />
    <b-modal
      ref="newmidia"
      title="Nova Mídia"
      centered
      size="lg"
      @ok.prevent="$refs.submit.click()"
      ok-title="Enviar"
      ok-variant="primary"
      :ok-disabled="operating"
      cancel-variant="gray"
      cancel-title="Cancelar"
    >
      <form @submit.prevent="!!news.id ? updateNews(news.id) : saveNews()">
        <label for="fname" class="is-required">Título</label>
        <input
          type="text"
          id="fname"
          name="name"
          required
          v-model="news.title"
          placeholder="Título da mídia..."
        />
        <b-row>
          <b-col sm="8">
            <div class="d-flex justify-content-between align-items-center">
              <label
                :class="{ 'is-required': news.is_video == 0 }"
                for="lname"
                >{{ news.is_video == 1 ? "ID do vídeo" : "Link Imagem" }}</label
              >
              <b-button variant="link" @click="$refs.fileupload.show()"
                >Escolher imagem</b-button
              >
            </div>
            <input
              type="url"
              id="lname"
              name="email"
              required
              v-model="news.img_url"
              :disabled="news.is_video == 1"
              placeholder="https://exemplo.com/imagem.png"
            />
          </b-col>
          <b-col sm="4">
            <b-form-group label-class="is-required" label="Tipo">
              <b-form-radio-group
                id="isvideo"
                v-model="news.is_video"
                name="isvideo"
              >
                <b-form-radio value="0" name="radio-size" size="sm"
                  >Imagem</b-form-radio
                >
                <b-form-radio value="1" name="radio-size" size="sm"
                  >Vídeo</b-form-radio
                >
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <label :class="{ 'is-required': news.is_video == 1 }" for="subject">{{
          news.is_video == 1 ? "URL Vídeo Youtube" : "URL da notícia"
        }}</label>
        <input
          id="subject"
          type="url"
          name="subject"
          v-model="news.link"
          placeholder="https://exemplo.com/noticia"
        />
        <input hidden ref="submit" type="submit" value="ENVIAR" />
      </form>
    </b-modal>

    <div class="home container">
      <h2 class="home-title">Na Mídia</h2>
      <div v-if="!!user" class="d-flex justify-content-center">
        <div class="btn-container">
          <b-button class="btn-add" @click="newNews()"
            >+ Adicionar Novo</b-button
          >
        </div>
      </div>

      <div class="news-content">
        <div v-if="loading" class="news-row">
          <div v-for="news in [1, 2, 3, 4, 5, 6]" :key="news">
            <FakeNews />
          </div>
        </div>
        <div v-else class="news-row">
          <div v-for="news in allNews" :key="news.id">
            <News
              :editable="!!user"
              @edit="getNews(news.id)"
              @delete="deleteNews(news.id)"
              :content="news"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import News from "../components/News";
import FakeNews from "../components/FakeNews";
import { news } from "../service";

import FileUpload from "../components/FileUpload";

export default {
  name: "Midia",
  components: {
    News,
    FakeNews,
    FileUpload,
  },
  data() {
    return {
      loading: true,
      operating: false,
      news: {
        title: "",
        img_url: "",
        link: "",
        is_video: 0,
      },
      allNews: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    setUrlImg(url) {
      this.news.is_video = 0;
      this.news.img_url = url;
    },
    newNews() {
      this.news = {
        title: "",
        img_url: "",
        link: "",
        is_video: 0,
      };
      this.$refs.newmidia.show();
    },
    fetchNews() {
      news.findAll().then((reponse) => {
        this.allNews = reponse;
        setTimeout(() => {
          this.loading = false;
        }, 250);
      });
    },
    saveNews() {
      news.create(this.news).then(() => {
        this.news = {
          title: "",
          img_url: "",
          link: "",
          is_video: false,
        };
        this.fetchNews();
        this.$refs.newmidia.hide();
      });
    },
    edit() {
      this.$refs.newmidia.show();
    },
    getNews(id) {
      news.findById(id).then((response) => {
        this.news = response;
        this.$refs.newmidia.show();
      });
    },
    deleteNews(id) {
      news
        .delete(id)
        .then(() => {
          this.$bvToast.toast("As informações foram deletadas", {
            title: `Sucesso!`,
            variant: "success",
            solid: true,
          });
          this.fetchNews();
        })
        .catch(() => {
          this.$bvToast.toast("Não foi possível deletar", {
            title: `Falha!`,
            variant: "danger",
            solid: true,
          });
        });
    },
    updateNews() {
      news.update(this.news).then(() => {
        this.news = {
          title: "",
          img_url: "",
          link: "",
          is_video: false,
        };
        this.fetchNews();
        this.$refs.newmidia.hide();
      });
    },
  },
  mounted() {
    this.fetchNews();
  },
  watch: {
    "news.is_video"(is_video) {
      if (is_video == 1) {
        this.news.img_url = this.news.link.match(
          /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^&"'>]+)/
        )[5];
      }
    },
    "news.link"(link) {
      if (this.news.is_video == 1) {
        this.news.img_url = link.match(
          /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^&"'>]+)/
        )[5];
      }
    },
  },
};
</script>
<style scoped>
.home {
  margin-top: 40px;
  min-height: 600px;
}

.home-title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-align: center;
  font-size: 34px;
}

.btn-container {
  width: clamp(1px, 95%, 900px);
  display: flex;
  flex-direction: row-reverse;
}

.btn-add {
  background-color: var(--primary);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 30px;
}
.btn-add:hover,
.btn-add:not(:disabled):not(.disabled):active {
  background-color: var(--primary);
}

.news-row {
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: repeat(3, 320px);
  grid-gap: 1rem 1rem;
  justify-content: center;
}

@media (max-width: 425px) {
  .news-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 12px;
  }
}

@media (max-width: 1300px) {
  .news-row {
    grid-template-columns: repeat(auto-fit, 320px);
    grid-gap: 1rem 2rem;
  }
}

.news-content {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}
/* Style inputs with type="text", select elements and textareas */
input[type="text"],
input[type="url"],
select,
textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */
  border: 1px solid var(--image-background); /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
input[type="submit"] {
  background-color: var(--primary);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 30px;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type="submit"]:hover {
  background-color: var(--primary);
}
</style>