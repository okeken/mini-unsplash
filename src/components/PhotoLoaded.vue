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
$primary-bg-color: rgb(248, 245, 245);
$primary-animation: pulse-bg 5s infinite;
$primary-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
$font-size-small: 0.95rem;
$main-white: whitesmoke;
$max-width: 40rem;

.loadingInfo {
  background: rgb(187, 185, 185);
  border-radius: 3px;
  color: transparent;
}
@mixin imageCss($border-radius) {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: $border-radius;
}

main {
  max-width: $max-width;
  height: 100vh;
  padding: 1rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
}

.item {
  filter: brightness(0.8);
}

img {
  @include imageCss(5px);
}

.beforeShow {
  position: relative;
  background: $primary-bg-color;
  animation: $primary-animation;
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
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(20, 1fr);
  }

  .item:nth-child(1) {
    grid-column: 1 / 5;
    grid-row: 1 /8;
  }
  .item:nth-child(2) {
    grid-column: 5/9;
    grid-row: 1 /10;
  }

  .item:nth-child(3) {
    grid-column: 9 / 13;
    grid-row: 1 /9;
  }

  .item:nth-child(4) {
    grid-column: 1/5;
    grid-row: 8 /16;
  }

  .item:nth-child(5) {
    grid-column: 5/9;
    grid-row: 10 /17;
  }

  .item:nth-child(6) {
    grid-column: 9/13;
    grid-row: 9/17;
  }

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
