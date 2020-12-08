<template>
  <form @submit.prevent="searchQuery(query)">
    <div class="inputBx">
      <img class="search" src="../assets/search.png" />
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
.inputBx {
  background: white;
  border-radius: 3px;
  display: flex;
  max-width: 45rem;
  margin: auto;
  input {
    border: none;
    width: 100%;
    margin: 0;
    padding: 1rem 1rem;
    outline: none;
  }
}

.search {
  width: 0.8rem;
  height: 0.8rem;
  opacity: 0.44;
  margin: auto;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
