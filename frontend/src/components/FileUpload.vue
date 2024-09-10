<template>
  <b-modal
    ref="filemodal"
    scrollable
    centered
    size="lg"
    title="Gerenciador de Imagens"
    ok-only
    ok-variant="gray"
    ok-title="Fechar"
  >
    <b>Suas Imagens (Clique para inserir na mídia)</b>
    <div
      v-if="loading"
      class="d-flex w-100 loader-container justify-content-center align-items-center"
    >
      <b-spinner variant="primary" />
    </div>
    <div v-else class="d-flex justify-content-center">
      <input
        type="file"
        accept="image/png, image/jpeg"
        @change="uploadFile"
        hidden
        ref="uploader"
      />
      <div class="image-container">
        <div class="image-item new" @click="$refs.uploader.click()">
          <div v-if="progress <= 0" class="new">+</div>
          <span v-if="progress <= 0">Nova Imagem</span>
          <span v-else>Subindo Imagem...</span>
          <b-progress
            v-if="progress > 0"
            :value="progress"
            class="w-75 mt-3"
            :max="100"
            show-progress
            animated
          ></b-progress>
        </div>
        <div
          class="image-item"
          @click="clickImage(image)"
          v-for="(image, index) in images"
          :key="`image_${index}`"
        >
          <img :src="image.url" alt="" srcset="" />
          <span>{{ image.title }}</span>
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
import { page } from "../service";

const base_url = process.env.VUE_APP_API_URL;

export default {
  name: "file-upload",
  data() {
    return {
      images: [],
      progress: 0,
      loading: true,
    };
  },
  methods: {
    list() {
      this.loading = true;
      page
        .listImages()
        .then((res) => {
          this.images = Object.values(res).map((url) => ({
            url: `${base_url}/${url}`,
            title: url.split("/")[3],
          }));
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    show() {
      this.$refs.filemodal.show();
      this.list();
    },
    onUploadProgress(progressEvent) {
      this.progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
    },
    close() {
      this.$refs.filemodal.hide();
    },
    clickImage(image) {
      this.$emit("select", image.url);
      this.close();
    },
    uploadFile(e) {
      if (e.srcElement.files) {
        page
          .uploadImage(e.srcElement.files, this.onUploadProgress)
          .then(() => {
            this.progress = 0;
            this.$bvToast.toast("Imagem enviada!", {
              title: `Sucesso!`,
              variant: "success",
              solid: true,
            });
            this.$refs.uploader.value = "";
            this.list();
          })
          .catch((err) => {
            this.progress = 0;
            this.$refs.uploader.value = "";
            this.$bvToast.toast("Não foi possível enviar a imagem!", {
              title: `Erro!`,
              variant: "danger",
              solid: true,
            });
            console.log(err.response);
          });
      }
    },
  },
};
</script>
<style scoped>
.loader-container {
  min-height: 464px;
}
.image-container {
  margin: 1.3rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-row: auto;
  gap: 0.3rem 0.4rem;
  background: #fefefe;
  max-width: 100%;
  min-height: 464px;
}
.image-item {
  background: #fff;
  padding: 8px;
  border: solid 1px #dedede;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
}

.image-item.new .new {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 4rem;
  border: 2px solid #444;
  color: #444;
  font-weight: bold;
}

.image-item img {
  width: 10rem;
  height: 10rem;
}

.image-item.new {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
}

.image-item.new span {
  margin-top: 0.4rem;
  font-size: 0.8rem;
}

.image-item:hover {
  background: #ddd;
  border: solid 1px var(--secondary);
}

.image-item img {
  width: 100%;
}

.image-item span {
  font-size: 10px;
  word-wrap: break-word;
}
</style>