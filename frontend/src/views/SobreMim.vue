<template>
  <div class="home d-flex flex-column align-items-center">
    <b-row class="container mb-5 mt-5">
      <b-col md="4" class="d-flex justify-content-center">
        <b-img
          :src="require('../assets/img/foto-candidato-2.png')"
          alt="Wilton Fraga"
          class="photo"
        />
      </b-col>
      <b-col md="8" class="d-flex flex-column align-items-end">
        <b-skeleton width="100%" class="mb-3" v-if="loading" type="input"></b-skeleton>
        <h4
          v-else
          id="title"
          :contentEditable="editable"
          class="title-content w-100 mb-3"
          :class="{ editable }"
          v-html="contentPage.title"
        ></h4>
        <b-skeleton width="100%" class="mb-3" v-if="loading" type="input"></b-skeleton>
        <p
          v-else
          id="subtitle"
          :contentEditable="editable"
          class="subtitle-content w-100"
          :class="{ editable }"
          v-html="contentPage.subtitle"
          style="font-family: Tahoma;"
        ></p>
        <b-skeleton width="100%" class="mb-3" v-if="loading" type="input"></b-skeleton>
        <p
          v-else
          id="content"
          :contentEditable="editable"
          class="text-justify text-content"
          style="font-family: Times New Roman;"
          :class="{ editable }"
          v-html="contentPage.content"
        ></p>
        <b-button
          v-if="editable"
          class="px-5"
          @click="saveSobre"
          variant="outline-gray"
          >Salvar</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { page } from "../service";
export default {
  name: "SobreMim",
  data() {
    return {
      loading: true,
      contentPage: {},
      page_id: -1,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    editable() {
      return !!this.user;
    },
  },
  methods: {
    saveSobre() {
      let titleSobre = document.getElementById("title").innerHTML;
      let subtitleSobre = document.getElementById("subtitle").innerHTML;
      let contentSobre = document.getElementById("content").innerHTML;
      let content = {
        title: titleSobre,
        subtitle: subtitleSobre,
        content: contentSobre,
      };
      const result = JSON.stringify(content);
      page.update({ id: this.page_id, content: result }).then(() => {
        this.$bvToast.toast("Conteúdo atualizado!", {
          title: `Sucesso!`,
          variant: "success",
          solid: true,
        });
      });
    },
    getSobre() {
      page.findByName("sobremi").then((response) => {
        this.page_id = response.id;
        this.contentPage = JSON.parse(response.content);
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getSobre();
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
}

.title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-align: center;
  font-size: 34px;
  margin-bottom: 20px;
}
.home {
  min-height: 200px;
  margin-top: 20px;
}
.text-content {
  text-indent: 50px;
  width: 100%;
}
.editable {
  border-radius: 10px;
  border: dashed 1px #999;
  padding: 4px 12px;
}
.photo {
  max-width: 450px;
  max-height: 200px;
  width: auto;
  height: auto;
}
@media (max-width: 770px) {
  .text-content {
    width: 100%;
  }
  .title-content,
  .subtitle-content {
    text-align: center;
  }
}
</style>