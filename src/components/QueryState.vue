<template>
  <div v-show="state.firstLoaded">
    <h2>
      {{ currentState }} for <span class="query">"{{ state.query }}" </span>
    </h2>
  </div>
</template>

<script>
import { useLoader, appData } from "../../store.js";
export default {
  name: "QueryState",

  props: {
    currentState: String,
  },

  setup() {
    const { state } = useLoader();

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
.query {
  color: $primary-gray;
}
</style>
