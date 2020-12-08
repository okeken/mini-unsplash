<template>
  <form @submit.prevent="searchQuery(query)">
    <div class="searchDiv">
      <img class="search" alt="search icon" src="../assets/search.png" />
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
$primary-gray: gray;
.searchInput {
  outline: none;
  border: 0;
  border-radius: 3px;
  padding: 1rem;
  color: $primary-gray;
  margin: 1rem;
  flex: 1;
  padding-left: 4rem;
}

.search {
  width: 0.8rem;
  height: 0.8rem;
  opacity: 0.44;
}
.searchDiv {
  position: relative;
  display: flex;
  flex-direction: row;
  .search {
    position: absolute;
    left: 7%;
    bottom: 41%;
  }
}
</style>
