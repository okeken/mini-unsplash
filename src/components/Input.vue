<template>
  <form @submit.prevent="searchQuery(query)">
    <div class="inputBx">
      <img class="search" src="../assets/img/search.png" />
      <input
        type="text"
        v-model="query"
        class="searchInput"
        placeholder="Search for photo"
      />
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useLoader } from "../../store.js";
export default {
  name: "Input",
  setup() {
    const query = ref("");
    const { state } = useLoader();
    function searchQuery(query) {
      state.firstLoaded = true;
      useLoader(query);
    }
    return {
      query,
      searchQuery,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_input.scss";
</style>
