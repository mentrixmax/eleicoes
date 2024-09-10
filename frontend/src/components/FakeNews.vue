<template>
    <div class="card" style="width: 100%; max-width: 320px;">
      <b-skeleton class="card-img-top"></b-skeleton>
      <div class="card-body">
        <b-skeleton class="w-100"></b-skeleton>
        <b-skeleton class="pull-right w-50 mt-3"></b-skeleton>
      </div>
    </div>
</template>
<script>
export default {
  name: "FakeNews"
};
</script>
<style scoped>
.card-img-top {
  height: 240px;
  width: 100%;
}
</style>