<template>
  <div class="home">
    <file-upload ref="fileupload" @select="setImgUrl" />
    <b-modal
      ref="showplan"
      title="Dimensões"
      centered
      size="lg"
      ok-only
      ok-title="Fechar"
      ok-variant="gray"
    >
      <div class="accordion" role="tablist">
        <b-card
          no-body
          class="mb-1"
          v-for="(section, index) in modal.sections"
          :key="`key_${index}`"
        >
          <b-card-header
            header-tag="header"
            class="p-1 px-2 d-flex justify-content-between align-items-center"
            role="tab"
          >
            <b>{{ section.label }}</b>
            <b-button
              class="text-left"
              @click="$root.$emit('bv::toggle::collapse', `accordion-${index}`)"
              variant="primary"
              >Ver estratégias</b-button
            >
          </b-card-header>
          <b-collapse
            :id="`accordion-${index}`"
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-textarea
              class="my-0"
              rows="10"
              :value="section.content"
              readonly
            />
          </b-collapse>
        </b-card>
      </div>
    </b-modal>

    <b-modal
      ref="newplan"
      title="Novo Eixo Estruturante"
      centered
      size="lg"
      cancel-variant="gray"
      @hidden="resetPlan"
    >
      <!-- @submit.prevent="!!plan.id ? updatePlan(plan.id) : savePlan()" -->
      <form>
        <label for="fname" class="is-required"
          >Título do eixo estruturante</label
        >
        <input
          type="text"
          id="fname"
          name="name"
          required
          v-model="plan.title"
          placeholder="Título do eixo..."
        />
        <div class="d-flex align-items-center justify-content-between">
          <label class="is-required" for="color">Cor da borda do plano</label>
          <!-- <b-button @click="$refs.fileupload.show()" variant="link">Escolher imagem</b-button> -->
        </div>
        <select id="color" name="color" required v-model="plan.color">
          <option hidden value="">Selecione uma cor</option>
          <option :value="1" style="color: #fcd905">Cor 1</option>
          <option :value="2" style="color: #cc4595">Cor 2</option>
          <option :value="3" style="color: #0ad5a2">Cor 3</option>
          <option :value="4" style="color: #fb7570">Cor 4</option>
          <option :value="5" style="color: #ba30d3">Cor 5</option>
          <option :value="6" style="color: #0ad5a2">Cor 6</option>
        </select>
        <label class="is-required" for="description"
          >Descrição simples do eixo</label
        >
        <textarea
          id="description"
          name="description"
          required
          v-model="plan.description"
          placeholder="Breve descrição do eixo estruturante..."
        />
        <div class="text-center w-100 mb-3">
          <b-button variant="link" @click="$refs.sections.show()"
            >Configurar dimensões</b-button
          >
        </div>
        <!-- <input hidden ref="submit" type="submit" value="ENVIAR" /> -->
      </form>
      <template v-slot:modal-footer="{ cancel }">
        <b-button variant="gray" @click="cancel()"> Cancelar </b-button>
        <b-button v-if="plan.id" variant="primary" @click="updatePlan">
          Salvar
        </b-button>
        <b-button v-else @click="savePlan" variant="primary"> Salvar </b-button>
      </template>
    </b-modal>

    <b-modal
      title="Configurar Dimensões"
      centered
      size="lg"
      ref="sections"
      scrollable
      ok-title="Fechar"
      ok-variant="gray"
      ok-only
      @hidden="cleanNullSecions"
    >
      <div v-for="(section, index) in plan.sections" :key="index" class="mb-2">
        <b-card>
          <template #header>
            <b-input
              v-model="section.label"
              :disabled="!user"
              type="text"
              :placeholder="`Título da dimensão ${index + 1}...`"
            />
          </template>
          <b-textarea
            v-model="section.content"
            :disabled="!user"
            placeholder="Descreva as estratégias da dimensão..."
          />
          <template #footer v-if="!!user && !!section.id">
            <div class="d-flex justify-content-end">
              <b-button
                class="mr-2"
                variant="outline-danger"
                size="sm"
                @click="removeSection(index)"
                >Excluir</b-button
              >
              <b-button
                variant="outline-primary"
                size="sm"
                @click="updateSection(section)"
                >Salvar</b-button
              >
            </div>
          </template>
        </b-card>
      </div>
      <div v-if="!!user" class="d-flex justify-content-center">
        <b-button class="mt-2" @click="addSub" variant="link"
          >+ Nova Dimensão</b-button
        >
      </div>
    </b-modal>

    <img
      class="home-image"
      src="https://wiltonfraga.com.br/assets/img/uploads/1604093055_819a24a0aee458a34067.jpeg"
      width="700"
      height="auto"
      srcset=""
    />
    <div v-if="!!user" class="d-flex w-100 justify-content-center">
      <div class="btn-container">
        <b-button class="btn-add" @click="newPlan()">+ Adicionar Novo</b-button>
      </div>
    </div>
    <div v-if="loading" class="plan-container">
      <FakeNews v-for="(plan, index) in [1, 2, 3]" :key="`plan-${index}`" />
    </div>
    <div v-else class="plan-container">
      <div
        class="plan-border-wrapper h-100"
        :style="{ background: `var(--${getColor(plan.color)})` }"
        v-for="(plan, index) in plans"
        :key="`plan-${index}`"
      >
        <b-card class="h-100 border-0">
          <div class="plan">
            <div class="info">
              <h2>{{ plan.title }}</h2>
              <span>{{ plan.description }}</span>
            </div>
            <button v-if="!!user" @click="getPlan(plan.id, true)">
              EDITAR
            </button>
            <button v-else @click="getPlan(plan.id, false)">VER EIXO</button>
          </div>
        </b-card>
      </div>
    </div>
    <div class="plan-download">
      <b-link :href="social.link_plano">Clique aqui</b-link> para realizar o
      download do plano de gestão
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { page, plan, section } from "../service";
import FileUpload from "../components/FileUpload";
import FakeNews from "../components/FakeNews";

export default {
  name: "Home",
  components: {
    FileUpload,
    FakeNews,
  },
  data() {
    return {
      loading: true,
      plan: {
        title: "",
        description: "",
        img_url: "no-url",
        sections: [],
        color: "",
      },
      social: {},
      plans: [],
      modal: {
        title: "Título do Plano A",
        sections: [],
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    getColor(id) {
      if (!id) return "gradient-1";
      return `gradient-${id}`;
    },
    setImgUrl(url) {
      this.plan.img_url = url;
    },
    savePlan() {
      plan
        .create(this.plan)
        .then(() => {
          this.plan = {
            title: "",
            img_url: "no-url",
            description: "",
            sections: [],
            color: "",
          };
          this.fetchPlans();
          this.$refs.sections.hide();
          this.$refs.newplan.hide();
          this.$bvToast.toast("Novo eixo cadastrado!", {
            title: `Sucesso!`,
            variant: "success",
            solid: true,
          });
        })
        .catch(() => {
          this.$bvToast.toast("Não foi possível cadastrar o eixo!", {
            title: `Erro!`,
            variant: "danger",
            solid: true,
          });
        });
    },
    updatePlan() {
      plan
        .update(this.plan)
        .then(() => {
          this.plan.sections.forEach((item) => {
            if (!item.id) {
              //Cria nova section
              section.create({
                plan_id: this.plan.id,
                ...item,
              });
            }
          });
          this.plan = {
            title: "",
            img_url: "no-url",
            description: "",
            sections: [],
            color: "",
          };
          this.fetchPlans();
          this.$refs.newplan.hide();
          this.$bvToast.toast("Eixo atualizado!", {
            title: `Sucesso!`,
            variant: "success",
            solid: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$bvToast.toast("Não foi possível atualizar o eixo!", {
            title: `Erro!`,
            variant: "danger",
            solid: true,
          });
        });
    },
    fetchPlans() {
      plan.findAll().then((request) => {
        this.plans = request;
        setTimeout(() => {
          this.loading = false;
        }, 250);
      });
    },
    getPlan(id, edit = false) {
      plan.findById(id).then((response) => {
        this.plan = response;
        this.modal.title = response.title;
        this.modal.sections = response.sections;
        if (edit) {
          this.$refs.newplan.show();
        } else {
          this.$gtag.event("see_plan", {
            event_category: "planos",
            action: "ver",
            event_label: response.title,
          });
          this.$refs.showplan.show();
        }
      });
    },
    newPlan() {
      this.$refs.newplan.show();
    },
    addSub() {
      this.plan.sections.push({
        label: "",
        content: "",
      });
    },
    cleanNullSecions() {
      this.plan.sections = this.plan.sections.filter(
        (section) =>
          section.id !== "" && section.title !== "" && section.content
      );
    },
    resetPlan() {
      this.plan = {
        title: "",
        description: "",
        img_url: "",
        sections: [{ label: "", content: "" }],
      };
    },
    seveSection(sect) {
      sect["plan_id"] = this.plan.id;
      section.create(sect).then(() => {
        this.$bvToast.toast("Seção Salva", {
          title: `Sucesso!`,
          variant: "success",
          solid: true,
        });
      });
    },
    updateSection(sect) {
      section
        .update(sect)
        .then(() => {
          this.$bvToast.toast("Dimensão atualizada!", {
            title: `Sucesso!`,
            variant: "success",
            solid: true,
          });
        })
        .catch(() => {
          this.$bvToast.toast("Não foi possível atualizar a dimensão!", {
            title: `Erro!`,
            variant: "danger",
            solid: true,
          });
        });
    },
    removeSection(index) {
      if (this.plan.sections[index].id) {
        section.delete(this.plan.sections[index].id).then(() => {
          this.$bvToast.toast("A Seção foi deletada", {
            title: `Sucesso!`,
            variant: "success",
            solid: true,
          });
          this.plan.sections.splice(index, 1);
        });
      } else {
        this.$bvToast.toast("A Seção foi deletada", {
          title: `Sucesso!`,
          variant: "success",
          solid: true,
        });
        this.plan.sections.splice(index, 1);
      }
    },
    fetchSocila() {
      page.findByName("social").then((response) => {
        this.social = JSON.parse(response.content);
      });
    },
  },
  mounted() {
    this.fetchPlans();
    this.fetchSocila();
  },
};
</script>
<style lang="scss" scoped>
.home {
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-align: center;
  font-size: 34px;
  margin-bottom: 20px;
}
.btn-container {
  width: 95%;
  max-width: 1100px;
  border: 1px dashed #dedede;
  padding: 0 10px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}

.btn-add {
  background-color: var(--primary);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

.plan {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plan h2 {
  font-size: 1rem;
  text-transform: uppercase;
  text-align: center;
  min-height: 2rem;
}

.plan-border-wrapper {
  height: 100%;
  padding: 4px;
  border-radius: 4px;
  margin-top: 12px;
  width: 95%;
}

.home-image {
  width: 100%;
  max-width: 1100px;
}

.no-label {
  font-size: 12px;
  margin-top: 2.4rem;
  height: 3rem;
}

.plan-save-buttons {
  display: flex;
  width: 100%;
}

.plan-save-buttons button + button {
  margin-left: 4px;
}

.plan-download {
  margin: 4rem 0;
  font-size: 12px;
}

.plan-download a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 0.03rem;
}

.plan-download a:hover {
  color: var(--secondary);
}

.plan-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f1f1;
}

.plan span {
  font: 300 1.1rem "Roboto", sans-serif;
  text-align: justify;
}

.plan button {
  border-radius: 4px;
  margin-top: 1rem;
  width: 9rem;
  height: 2.4rem;
  background-color: var(--primary);
  font: 500 0.9rem "Roboto", sans-serif;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-end;
}

.plan .plan-info button:hover {
  background-color: var(--secondary);
}

.active:after {
  content: "\2212";
}

.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #efefef;
}

.content.editable {
  padding: 0 18px;
  max-height: 100%;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}

.content p {
  padding: 12px 0px;
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

@media (min-width: 732px) {
  .plan-container {
    display: grid;
    grid-template-columns: repeat(2, 20rem);
    gap: 2rem 2.5rem;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    max-width: 1100px;
    padding: 40px 0;
    background: #f1f1f1;
  }

  .plan-border-wrapper {
    width: 100%;
    margin-top: 0;
  }
}

@media (min-width: 1100px) {
  .plan-container {
    display: grid;
    grid-template-columns: repeat(3, 18rem);
    gap: 2rem 2.5rem;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    max-width: 1100px;
    padding: 40px 0;
    background: #f1f1f1;
  }

  .plan {
    margin-bottom: 0;
  }

  .plan-download {
    margin: 4rem 0;
    font-size: 16px;
  }

  .modal-body {
    width: 60%;
  }
}
</style>