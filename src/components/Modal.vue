<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="modaltoPar" @click="hidetheModal"></div>
  </transition>

  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="appData.modalStatus">
      <img v-if="imgtoPar" src="../assets/loadingimg.png" />
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

  setup(props, ctx) {
    const { appData } = useLoader();
    let load = ref(true);
    function loadComplete() {
      appData.imgStatus = false;
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
.userInfo {
  padding: 1.5rem 1.7rem;
  .infoName {
    font-size: 1.2rem;
    color: $m-overlay-bg-color;
    font-weight: 700;
    color: $m-primary-black;
  }
  .location {
    margin-top: 0.5rem;
    font-size: 0.6rem;
    font-weight: 600;
    opacity: 0.7;
    color: $secondary-black;
  }
}
.modal img {
  @include imageModal;
}

.modal {
  @include modalStyle($m-bg-color, $m-max-width, $m-bg-color);
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  @include modalOverlay($m-overlay-bg-color);
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: $main-transit-opacity;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: $animation-pop-enter-act;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: $animation-pop-enter;
}
</style>
