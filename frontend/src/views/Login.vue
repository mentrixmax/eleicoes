<template>
  <div class="home">
    <div v-if="!user" class="login-container">
      <form @submit.prevent="doLogin" id="login-form">
        <h2>LOGIN</h2>
        <div v-if="error" id="login-alert">
          <h2>Credenciais inválidas!</h2>
        </div>
        <label for="input-email">Email:</label>
        <input
          type="email"
          v-model="form.email"
          maxlength="45"
          required
          placeholder="Informe o seu email"
          name="email"
          id="input-email"
        />
        <label for="input-password">Senha:</label>
        <input
          type="password"
          v-model="form.password"
          maxlength="32"
          required
          placeholder="Informe a sua senha"
          name="password"
          id="input-password"
          autocomplete
        />

        <button type="submit" :disabled="loading">
          <b-spinner v-if="loading" variant="light" small />
          <span v-else> Entrar </span>
        </button>
      </form>
    </div>
    <div v-else>
      <b-modal
        ref="extra"
        ok-only
        ok-title="Fechar"
        ok-variant="gray"
        scrollable
        size="lg"
        centered
        :title="title"
      >
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Acessos por dia" active no-body>
              <b-list-group flush class="mt-3">
                <b-list-group-item
                  v-for="([day, value], index) in extraAnalytics.days"
                  :key="index"
                >
                  <span
                    ><b class="text-primary">{{ value }}</b> acesso{{
                      value != 1 ? "s" : ""
                    }}
                    em {{ day | toDate }}</span
                  >
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="Acessos por página">
              <b-list-group flush class="mt-3">
                <b-list-group-item
                  v-for="([page, value], index) in extraAnalytics.pages"
                  :key="index"
                >
                  <span
                    >Página {{ page }} foi acessada
                    <b class="text-primary">{{ value }}</b> vez{{
                      value != 1 ? "es" : ""
                    }}.</span
                  >
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="Acessos por eixos">
              <b-list-group flush class="mt-3">
                <b-list-group-item
                  v-for="([plan, value], index) in extraAnalytics.plans"
                  :key="index"
                >
                  <span
                    >O eixo {{ plan }} foi acessado
                    <b class="text-primary">{{ Number(value).toFixed(0) }}</b>
                    vez{{ value != 1 ? "es" : "" }}.</span
                  >
                </b-list-group-item>
              </b-list-group>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-modal>
      <div class="user-info d-flex align-items-center flex-column">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <b>Olá seja bem vindo(a), {{ user.name }}!</b>
            <a
              href="#"
              title="Clique para realizar logoff"
              class="ml-2"
              @click.prevent="doLogoff"
              >Sair da conta</a
            >
          </div>
          <div class="my-5">
            <b-row class="mt-1">
              <b-col sm="12" md="3" class="mb-2">
                <b-overlay
                  :show="!loadedAnalytics"
                  rounded="sm"
                  spinner-variant="primary"
                >
                  <b-card>
                    <template #header> Todos os acessos</template>
                    <h2>{{ analytics.byYear[1] }}</h2>
                    <template #footer>
                      <div class="d-flex justify-content-end">
                        <b-button-l
                          :loading="loadedAnalytics2"
                          @click="showDetails(365)"
                          size="sm"
                          variant="link"
                          >Ver detalhes</b-button-l
                        >
                      </div>
                    </template>
                  </b-card>
                </b-overlay>
              </b-col>
              <b-col sm="12" class="h-100" md="3">
                <b-overlay
                  :show="!loadedAnalytics"
                  rounded="sm"
                  spinner-variant="primary"
                  class="h-100"
                >
                  <b-card class="h-100">
                    <template #header> Acessos nos últimos 7 dias</template>
                    <h2>{{ analytics.byWeek }}</h2>
                    <template #footer>
                      <div class="d-flex justify-content-end">
                        <b-button-l
                          :loading="loadedAnalytics2"
                          @click="showDetails(7)"
                          size="sm"
                          variant="link"
                          >Ver detalhes</b-button-l
                        >
                      </div>
                    </template>
                  </b-card>
                </b-overlay>
              </b-col>
            </b-row>
          </div>
          <b-card class="mt-4">
            <template #header>
              <div class="d-flex justify-content-between align-items-center">
                <span>Informações para contato</span>
                <b-button-l
                  :loading="operating"
                  @click="updateSocial"
                  variant="link"
                  >Salvar</b-button-l
                >
              </div>
            </template>
            <label for="iemail">Email:</label>
            <b-input
              class="mb-2"
              v-model="social.email"
              id="iemail"
              value=""
              placeholder="email@email.com"
            />
          </b-card>
          <b-card class="mt-4">
            <template #header>
              <div class="d-flex justify-content-between align-items-center">
                <span>Redes sociais</span>
                <b-button-l
                  :loading="operating"
                  @click="updateSocial"
                  variant="link"
                  >Salvar</b-button-l
                >
              </div>
            </template>
            <label for="iwhats">Whatsapp:</label>
            <b-input
              class="mb-2"
              v-model="social.whatsapp"
              id="iwhats"
              value=""
              v-mask="{ mask: '+55 (99) 9 9999-9999', autoUnmask: true }"
              placeholder="+55 (00) 9 0000-0000"
            />
            <label for="iface">Facebook:</label>
            <b-input
              class="mb-2"
              v-model="social.facebook"
              id="iface"
              value=""
              placeholder="link do facebook"
            />
            <label for="iyoutube">Youtube:</label>
            <b-input
              class="mb-2"
              v-model="social.youtube"
              id="iyoutube"
              value=""
              placeholder="link do canal do youtube"
            />
            <label for="iinsta">Instagram:</label>
            <b-input
              class="mb-2"
              v-model="social.instagram"
              id="iinsta"
              value=""
              placeholder="link do instagram"
            />
          </b-card>
          <b-card class="mt-4">
            <template #header>
              <div class="d-flex justify-content-between align-items-center">
                <span>Links</span>
                <b-button-l
                  :loading="operating"
                  @click="updateSocial"
                  variant="link"
                  >Salvar</b-button-l
                >
              </div>
            </template>
            <label for="iplan">Link pdf plano de gestão:</label>
            <b-input
              class="mb-2"
              v-model="social.link_plano"
              id="iplan"
              value=""
              placeholder="link do pdf do plano"
            />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Auth, page, analytics } from "../service";
import BButtonL from "../components/BButtonL";
export default {
  name: "Login",
  components: {
    BButtonL,
  },
  data() {
    return {
      operating: false,
      form: {
        email: "",
        password: "",
      },
      error: false,
      loading: false,
      social: {},
      page_id: -1,
      loadedAnalytics: false,
      loadedAnalytics2: false,
      analytics: {
        byYear: [2020, "-"],
        byWeek: "-",
      },
      extraAnalytics: {
        days: [],
        pages: [],
        plans: [],
      },
      title: "Detalhamento de acessos",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["login"]),
    async doLogin() {
      this.error = false;
      this.loading = true;

      Auth.login(this.form.email, this.form.password)
        .then(({ data }) => {
          this.login(data);
          this.loading = false;
          this.fetchAnalytics();
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    },
    doLogoff() {
      this.login(null);
    },
    fetchSocial() {
      page.findByName("social").then((response) => {
        this.page_id = response.id;
        this.social = JSON.parse(response.content);
      });
    },
    fetchAnalytics() {
      this.loadedAnalytics = false;
      analytics.findAll().then((data) => {
        this.analytics = data;
        this.loadedAnalytics = true;
      });
    },
    showDetails(mode) {
      this.loadedAnalytics2 = true;
      analytics
        .extra(mode)
        .then((res) => {
          this.loadedAnalytics2 = false;
          this.extraAnalytics = res;
          this.title = "Detalhamento de acessos (" + mode + "dias)";
          this.$refs.extra.show();
        })
        .catch(() => {
          this.loadedAnalytics2 = false;
        });
    },
    updateSocial() {
      this.operating = true;
      const result = JSON.stringify(this.social);
      page
        .update({ id: this.page_id, content: result })
        .then(() => {
          this.operating = false;
          this.$bvToast.toast("Dados atualizados!", {
            title: `Sucesso!`,
            variant: "success",
            solid: true,
          });
          this.fetchSocial();
        })
        .catch(() => {
          this.operating = false;
          this.$bvToast.toast("Não foi possível atualizar os dados!", {
            title: `Erro!`,
            variant: "danger",
            solid: true,
          });
        });
    },
  },
  mounted() {
    this.fetchSocial();
    this.fetchAnalytics();
  },
  filters: {
    toDate(value) {
      let asString = `${value}`;
      return `${asString.substr(6, 2)}/${asString.substr(
        4,
        2
      )}/${asString.substr(0, 4)}`;
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 1100px;
}
.login-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}

#login-form {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 540px;
  padding: 20px;
  border: solid 1px var(--dark-line-white);
  border-radius: 12px;
  margin: 90px 0px;
}

#login-form h2 {
  font-size: 32px;
  margin-bottom: 26px;
  text-align: center;
}

#login-form input {
  border: solid 1px var(--dark-line-white);
  font: 300 16px "Roboto", sans-serif;
  border-radius: 4px;
  padding: 0px 12px;
  margin: 8px 0;
  height: 42px;
  color: #333;
  outline-color: var(--primary);
}

#login-form .remember {
  display: flex;
  align-items: center;
}

#login-form .remember input {
  width: 18px;
  margin-right: 12px;
}

#login-form button {
  width: 100%;
  background: var(--primary);
  color: white;
  padding: 12px 0;
  border-radius: 4px;
  margin: 24px 0px;
  font: 500 16px "Roboto", sans-serif;
  cursor: pointer;
  transition: background-color 0.2s;
}

#login-form button:hover {
  background: var(--secondary);
}

#login-alert {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff000022;
  border-radius: 4px;
  border: 1px solid #faa;
  height: 4rem;
  margin-bottom: 1.1rem;
}

#login-alert h2 {
  font-size: 16px;
  color: #ff3333;
  line-height: 20px;
  margin-top: 1.5rem;
}

.user-info {
  min-height: 20rem;
  padding-top: 40px;
  padding-bottom: 80px;
}
</style>