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
.loadingInfo {
  background: rgb(187, 185, 185);
  border-radius: 3px;
  color: transparent;
}

main {
  @include mainMixin;
}

.item {
  cursor: pointer;
  filter: brightness(0.8);
}

img {
  @include imageCss(5px);
}

.beforeShow {
  position: relative;
  background: $primary-bg-color;
  animation: $primary-animation;
  //min-height: 30rem;
  @keyframes pulse-bg {
    0% {
      background-color: #ddd;
    }
    50% {
      background-color: #d0d0d0;
    }
    100% {
      background-color: #ddd;
    }
  }
}

@media screen and (max-width: 767px) {
  //works for smaller screen
  .beforeShow {
    width: 20rem;
    margin: auto;
  }
  img {
    height: 20rem;
  }
}

@media screen and (min-width: 768px) {
  //works for bigger screen
  main {
    @include mainLargerScreen;
  }

  @include masonryGrid;

  .animateImg-enter-active {
    transition: all 2s;
  }
}

.animateImg-enter,
.animateImg-leave-to {
  transform: scale(0);
  opacity: 0;
}

.animateImg-enter-to {
  transform: scale(1.01);
  opacity: 1;
}

@for $i from 1 through 6 {
  .imgFromApi:nthchild(#{$i}) {
    transition-delay: ($i * 0.9)+0.4s;
  }
}

.imgFromAPi {
  z-index: 3;
}

.otherInfo {
  position: absolute;
  left: 6%;
  bottom: 7%;
  color: $main-white;

  display: inline-block;
  font-size: $font-size-small;
  font-family: $primary-font-family;
}
.location {
  margin-top: 0.4rem;
  font-size: 0.85rem;
}
</style>
