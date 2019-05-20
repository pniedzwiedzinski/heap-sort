<template>
  <a class="link" :href="link" target="_blank">
    <img class="gh" src="@/assets/gh.png" alt="github">
    <p style="margin: 10px">heap-sort</p>
  </a>
</template>

<script>
export default {
  props: {
    link: {
      type: String
    }
  }
};
</script>

<style scoped>
.gh {
  width: 50px;
}

.link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  margin-bottom: 100px;
}
</style>




