<template>
  <div class="link-container">
    <div class="links">
      <router-link
        class="link-item"
        to="/"
        active-class="link-item-active"
        v-scroll-to="{ element: '.home', duration: 500 }"
      >
        <font-awesome-icon icon="home" class="link-item-icon" />
        <span class="link-item-name">Início</span>
      </router-link>
      <router-link
        class="link-item"
        to="/quem-sou"
        active-class="link-item-active"
        v-scroll-to="{ element: '.home', duration: 500 }"
      >
        <font-awesome-icon icon="user" class="link-item-icon" />
        <span class="link-item-name">Quem Sou</span>
      </router-link>
      <router-link
        v-scroll-to="{ element: '.home', duration: 500 }"
        class="link-item"
        to="/plano-de-gestao"
        active-class="link-item-active"
      >
        <font-awesome-icon icon="th-list" class="link-item-icon" />
        <span class="link-item-name">Plano de Gestão</span>
      </router-link>
      <router-link
        class="link-item"
        to="/contato"
        active-class="link-item-active"
        v-scroll-to="{ element: '.home', duration: 500 }"
      >
        <font-awesome-icon icon="envelope" class="link-item-icon" />
        <span class="link-item-name">Envie sua proposta</span>
      </router-link>
      <router-link
        class="link-item"
        to="/na-midia"
        active-class="link-item-active"
        v-scroll-to="{ element: '.home', duration: 500 }"
      >
        <font-awesome-icon icon="share-alt" class="link-item-icon" />
        <span class="link-item-name">Na mídia</span>
      </router-link>
      <router-link
        class="link-item"
        to="/login"
        active-class="link-item-active"
        v-scroll-to="{ element: '.home', duration: 500 }"
      >
        <font-awesome-icon
          v-if="!!user"
          icon="user-cog"
          class="link-item-icon"
        />
        <font-awesome-icon v-else icon="sign-in-alt" class="link-item-icon" />
        <span class="link-item-name">{{
          !!user ? "Configurações" : "Login"
        }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Links",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
<style scoped>
</style>