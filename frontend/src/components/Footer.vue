<template>
  <div class="footer-container">
    <div class="footer">
      <div class="footer-content">
        <div class="footer-column">
          <span class="footer-column-title">Fale com o candidato</span>
          <ul class="footer-column-social">
            <li v-if="social.whatsapp">
              <b-link
                target="_blank"
                :href="`https://api.whatsapp.com/send?1=pt_br&phone=55${social.whatsapp}&text=${message}`"
                class="text-decoration-none"
              >
                <img src="../assets/img/whatsapp.png" />
                <span>Whatsapp</span>
              </b-link>
            </li>
            <li v-if="social.email">
              <b-link :href="`mailto:${social.email}`" class="text-decoration-none">
                <img src="../assets/img/email.png" />
                <span>Email</span>
              </b-link>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <span class="footer-column-title">Redes Sociais</span>
          <ul class="footer-column-social">
            <li v-if="social.facebook">
              <b-link :href="social.facebook" class="text-decoration-none">
                <img src="../assets/img/facebook.png" />
                <span>Facebook</span>
              </b-link>
            </li>
            <li v-if="social.youtube">
              <b-link :href="social.youtube" class="text-decoration-none">
                <img src="../assets/img/youtube.png" />
                <span>Youtube</span>
              </b-link>
            </li>
            <li v-if="social.instagram" class="text-decoration-none">
              <b-link :href="social.instagram" class="text-decoration-none">
                <img src="../assets/img/instagram.png" />
                <span>Instagram</span>
              </b-link>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <span class="footer-column-title">Sobre</span>
          <p>
            Portal oficial do candidato Wilton Bezerra de Fraga a função de
            diretor geral do IFCE - <i>Campus</i> Sobral.
          </p>
        </div>
      </div>
    </div>
    <div class="footer-company">
      <p>Copyright © Todos os direitos reservados - Geocomp Systems - 2020</p>
    </div>
  </div>
</template>
<script>
import { page } from "../service";
export default {
  name: "Footer",
  data() {
    return {
      social: {},
    };
  },
  methods: {
    fetchSocila() {
      page.findByName("social").then((response) => {
        this.social = JSON.parse(response.content);
      });
    },
  },
  computed: {
    message(){
      return window.encodeURIComponent('Olá! Professor Wilton, gostaria de contribuir com o plano de trabalho com a proposta abaixo:');
    }
  },
  mounted() {
    this.fetchSocila();
  },
};
</script>