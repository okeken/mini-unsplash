<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="modaltoPar"></div>
  </transition>

  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="appData.modalStatus">
      <span class="close" @click="hidetheModal"> </span>
      <img v-if="imgtoPar" src="../assets/img/loadingimg.png" />
      <img :src="imgSrc" alt="modal info" @load="loadComplete" />
      <div class="userInfo">
        <div class="infoName">
          {{ infoName }}
        </div>
        <div class="location">
          {{ infoLocation }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
import { useLoader } from "../../store";
export default {
  name: "Modal",
  props: {
    infoName: String,
    infoLocation: String,
    imgSrc: String,
    modaltoPar: Boolean,
    imgtoPar: Boolean,
    loadingUrl: String,
  },
  emits: ["hideplaceholder"],

  setup(p, { emit }) {
    const { appData } = useLoader();
    let load = ref(true);
    function loadComplete() {
      emit("hideplaceholder");
    }
    function hidetheModal() {
      appData.imgStatus = true;
      let modalStatus = (appData.modalStatus = false);
      return modalStatus;
    }
    function showtheModal() {
      let modalStatus = (appData.modalStatus = true);
      return modalStatus;
    }

    return {
      showtheModal,
      hidetheModal,
      appData,
      loadComplete,
      load,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_modal.scss";
</style>
