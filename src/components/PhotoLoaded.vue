<template>
  <div class="wrapper">
    <main>
      <div class="item beforeShow" v-for="info in state.data" :key="info.id">
        <transition name="animateImg">
          <img
            @click="displayModal(info.id)"
            class="imgFromAPi"
            v-show="
              info.id == state.currentItem || loadedItems.includes(info.id)
            "
            @load="loadComplete(info.id)"
            :src="info.urls.regular"
          />
        </transition>
        <div class="otherInfo">
          <div>
            {{ `${info.user.first_name} ${info.user.last_name}` }}
          </div>

          <div class="location">
            {{ info.user.location }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useLoader, appData } from "../../store.js";
import { computed, ref, watch, onMounted } from "vue";
export default {
  name: "PhotoLoaded",
  emits: ["getData"],
  setup(p, { emit }) {
    const { state, appData } = useLoader();
    let singleData = ref("");
    function displayModal(val) {
      let filtered = state.data.filter(i => i.id == val);
      appData.modalData = filtered[0];
      let nw = appData.modalData;
      let res = (singleData.value = filtered[0]);
      emit("getData", res);
      return res;
    }

    let loadedItems = [];
    function loadComplete(id) {
      state.currentItem = id;
      loadedItems.push(id);
    }

    return {
      state,
      loadComplete,
      loadedItems,
      displayModal,
      singleData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_photoloaded.scss";
</style>
