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
$m-max-width: 22em;
$m-box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
$m-bg-color: #fff;
$m-overlay-bg-color: #2c3e50;
$primary-black: #333232d4;
$secondary-black: #333232d4;
.userInfo {
  padding: 1.5rem 1.7rem;
  .infoName {
    font-size: 1.2rem;
    color: $m-overlay-bg-color;
    font-weight: 700;
    color: $primary-black;
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
  object-fit: cover;
  max-height: 20rem;
  width: 100%;
  margin: 0;
  padding: 0;
  border: transparent;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  outline: 0;
}

@mixin modalStyle($bg-color, $max-width, $box-shadow) {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  max-width: $m-max-width;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  border-radius: 8px;
  box-shadow: $m-box-shadow;
  background: $m-bg-color;
  z-index: 999;
  transform: none;
}
@mixin modalOverlay($bg-color) {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: $bg-color;
  opacity: 0.6;
  cursor: pointer;
}

html {
  height: 100%;
  background: #fff;
  color: #000;
  font-size: 62.5%;
}

body {
  min-height: 100%;
  margin: 0;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
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
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
