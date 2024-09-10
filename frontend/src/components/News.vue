<template>
  <div class="card" style="width: 100%; max-width: 320px; height: 100%">
    <div v-if="editable" class="editcontainer">
      <b-button
        title="Clique para editar a notícia"
        variant="primary"
        size="sm"
        pill
        @click="$emit('edit')"
      >
        <font-awesome-icon icon="edit" />
        Editar
      </b-button>
      <b-button
        title="Clique para deletar a notícia"
        variant="gray"
        size="sm"
        pill
        @click="$emit('delete')"
      >
        <font-awesome-icon icon="trash" />
      </b-button>
    </div>
    <img
      v-if="content.is_video == 0"
      class="card-img-top"
      :src="content.img_url"
      alt="Imagem da notícia"
    />
    <iframe
      v-else
      width="100%"
      height="280"
      :src="`https://www.youtube.com/embed/${videoId}?controls=0`"
    ></iframe>
    <div class="card-body">
      <div class="card-content">
        <a :href="content.link || '#'" target="_blank">
          <h5 class="card-title">
            {{ content.title }}
          </h5>
        </a>
        <div class="news-time">
          <span
            >Data da publicação:
            {{ (content || {}).created_at | formatTime }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from "date-fns";
import ptbr from "date-fns/locale/pt-BR";

export default {
  name: "News",
  data() {
    return {};
  },
  filters: {
    formatTime(value) {
      if (value) {
        try {
          return format(new Date(value), "PPPp", { locale: ptbr });
        } catch (e) {
          console.log("Erro - Data inválida:", value);
          return "";
        }
      }
    },
  },
  computed: {
    videoId() {
      if (this.content.is_video) {
        try {
          return this.content.link.match(
            /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^&"'>]+)/
          )[5];
        } catch (e) {
          return "";
        }
      }
      return "";
    },
  },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Object,
      default: () => ({
        title: "",
        img_url: "",
        link: "",
        is_video: 0,
      }),
    },
  },
};
</script>
<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.editcontainer {
  position: absolute;
  width: 320px;
  z-index: 10;
  padding: 8px;
  display: flex;
  justify-content: space-between;
}
.btn-edit {
  background-color: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
}
.btn-edit:hover,
.btn-edit:not(:disabled):not(.disabled):active {
  background-color: var(--primary);
  border: none;
}
.news {
  width: 100%;
  border: 1px solid #dedede;
}

.news-title:hover {
  text-decoration: underline;
}

.news .news-image {
  width: 100%;
  height: 12rem;
  background-color: #ddd;
  background-size: cover;
  background-position: center;
}

.news-info {
  padding: 8px;
}

.news-title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  width: 100%;
  height: 70px;
  margin: 8px;
}

.news-time {
  font-family: "Roboto", sans-serif;
  font-size: 10px;
  color: #686868;
  text-align: right;
  margin-right: 8px;
}

.card-img-top {
  height: 280px;
}
</style>