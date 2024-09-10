<template>
  <div class="home">
    <h2 class="home-title">Envie sua proposta</h2>
    <div class="container">
      <form @submit.prevent="sendProposal">
        <label for="lname">Contato</label>
        <input
          type="text"
          id="lname"
          name="telefone"
          v-model="form.contato"
          placeholder="Informe seu telefone ou email"
        />

        <label for="subject">Proposta</label>
        <textarea
          id="subject"
          name="subject"
          v-model="form.proposta"
          placeholder="Sua proposta..."
          style="height: 200px"
        ></textarea>

        <input :disabled="operating" type="submit" value="ENVIAR" />
      </form>
    </div>
  </div>
</template>
<script>
import { page, contact } from "../service";
export default {
  name: "Home",
  data() {
    return {
      form: {
        contato: "",
        proposta: "",
      },
      whatsapp: "",
      operating: false,
    };
  },

  methods: {
    fetchZap() {
      page.findByName("social").then((response) => {
        const data = JSON.parse(response.content);
        this.whatsapp = data.whatsapp;
      });
    },
    sendProposal() {
      // const mensage = window.encodeURIComponent(`Olá! Professor Wilton, gostaria de contribuir com o plano de trabalho com a proposta abaixo:\n${this.form.proposta}\nMeus Contatos:\n${this.form.contato}`);

      // window.open(
      //   `https://api.whatsapp.com/send?1=pt_br&phone=+55${this.whatsapp}&text=${mensage}`
      // );
      if (this.operating) return;
      this.operating = true;
      contact
        .create(this.form)
        .then(() => {
          this.form = {
            contato: "",
            proposta: "",
          };
          this.$bvToast.toast("Sua proposta foi enviada!", {
            title: `Obrigado!`,
            variant: "success",
            solid: true,
          });
          this.operating = false;
        })
        .catch(() => {
          this.$bvToast.toast("Não foi possível enviar sua proposta.", {
            title: `Ops...`,
            variant: "danger",
            solid: true,
          });
          this.operating = false;
        });
    },
  },
  mounted() {
    this.fetchZap();
  },
};
</script>
<style scoped>
.home {
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.home-title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-align: center;
  font-size: 34px;
}

/* Style inputs with type="text", select elements and textareas */
input[type="text"],
input[type="email"],
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

/* Add a background color and some padding around the form */
.container {
  width: min(900px, max(350px, 70%));
  border-radius: 5px;
  padding: 20px;
  font-family: "Roboto", sans-serif;
}
</style>