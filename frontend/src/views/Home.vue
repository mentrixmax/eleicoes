<template>
  <div class="home">
    <h2 class="home-title">Últimas Notícias</h2>
    <div class="news-content">
      <div v-if="loading" class="news-row">
        <div v-for="news in [1, 2, 3]" :key="news">
          <FakeNews />
        </div>
      </div>
      <div v-else class="news-row">
        <News :content="item" v-for="item in allNews" :key="item.id" />
      </div>
    </div>
  </div>
</template>
<script>
import News from "../components/News";
import FakeNews from "../components/FakeNews";
import { news } from "../service";

export default {
  name: "Home",
  components: {
    News,
    FakeNews,
  },
  data() {
    return {
      loading: true,
      allNews: [],
    };
  },
  methods: {
    fetchNews() {
      news.findAll().then((res) => {
        this.allNews = res.splice(0, 3);
        setTimeout(() => {
          this.loading = false;
        }, 250);
      });
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>
<style lang="scss" scoped>
.home {
  margin-top: 40px;
  min-height: 420px;
}

.home-title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-align: center;
  font-size: 34px;
  margin-bottom: 20px;
}

.news-row {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 320px);
  grid-gap: 1rem 1rem;
  margin-bottom: 40px;
  justify-content: center;
}

@media (max-width: 425px) {
  .news-row {
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    align-items: center;
  }
}

@media (max-width: 1100px) {
  .news-row {
    grid-template-columns: repeat(auto-fit, 320px);
  }
}

.news-content {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}
</style>