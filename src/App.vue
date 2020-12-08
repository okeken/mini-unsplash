<template>
  <Modal
    :infoName="
      `${modalfromStore?.user?.first_name} ${modalfromStore?.user?.last_name}`
    "
    :infoLocation="modalfromStore?.user?.location"
    :modaltoPar="appData.modalStatus"
    :imgtoPar="appData.imgStatus"
    :imgSrc="modalfromStore?.urls?.small"
  />

  <div class="inputDiv">
    <QueryState :currentState="feedBack()" />
    <Input
      v-if="!state.firstLoaded || state.error"
      :class="state.loading ?? 'disabledInput'"
    />
  </div>
  <div class="placeholder">
    <HolderText v-show="state.loading" />
  </div>

  <div class="data">
    <PhotoLoaded v-show="!state.error" @getData="emitModal" />
  </div>
  <ErrorDiv v-if="state.error" err="Oh no! Something went wrong." />
</template>

<script>
import { useLoader, appData } from "../store.js";
import HolderText from "./components/HolderText";
import PhotoLoaded from "./components/PhotoLoaded.vue";
import Input from "./components/Input";
import Modal from "./components/Modal";
import QueryState from "./components/QueryState.vue";
import ErrorDiv from "./components/ErrorDiv";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    PhotoLoaded,
    HolderText,
    Input,
    Modal,
    QueryState,
    ErrorDiv,
  },

  setup() {
    const { state, appData } = useLoader();
    const modalfromStore = ref("");

    function emitModal(l) {
      appData.modalStatus = true;
      modalfromStore.value = l;
    }

    function feedBack() {
      if (state.loading) return "Searching";
      if (state.loadingComplete) return "Search Results";
    }
    return {
      state,
      emitModal,
      appData,
      modalfromStore,
      feedBack,
    };
  },
};
</script>

<style lang="scss">
$primary-black: #cccbcb8e;
$primary-max-width: 47rem;
@mixin translate {
  transform: translateY(-3rem);
}

.data,
.placeholder {
  @include translate();
}
.inputDiv {
  background: $primary-black;
  max-width: $primary-max-width;
  margin: 0 auto;
  padding: 3rem 4rem;
}

.disabledInput {
  pointer-events: none;
  opacity: 0.7;
}
.errorDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  margin: 0rem;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 30px;
}
</style>
