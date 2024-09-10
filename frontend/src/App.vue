<template>
  <div id="app">
    <Header />
    <Links />
    <transition name="moveUp">
      <router-view></router-view>
    </transition>
    <Footer />
		<VLibras />
  </div>
</template>

<script>
import Header from "./components/Header";
import Links from "./components/Links";
import Footer from "./components/Footer";
import { VLibras } from '@vue-a11y/vlibras'

export default {
  name: "App",
  components: {
    Header,
    Links,
    Footer,
    VLibras
  }
};
</script>
<style>
.moveUp-enter-active {
  animation: fadeIn .5s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>