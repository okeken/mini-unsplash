<template>
  <div>
    <div class="wrapper">
      <main>
        <div class="item">
          <div class="name"></div>
          <div class="location"></div>
        </div>
        <div class="item">
          <div class="name"></div>
          <div class="location"></div>
        </div>
        <div class="item">
          <div class="name"></div>
          <div class="location"></div>
        </div>
        <div class="item">
          <div class="name"></div>
          <div class="location"></div>
        </div>
        <div class="item">
          <div class="name"></div>
          <div class="location"></div>
        </div>
        <div class="item">
          <div class="name"></div>
          <div class="location"></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "HolderText",
};
</script>

<style lang="scss" scoped>
main {
  @include mainMixin;
}

.item {
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

.name,
.location {
  position: absolute;
  bottom: 8%;
  left: 5%;
  height: 5%;
  background: $prim-bg-color;
  border-radius: 3px;
}
.name {
  width: 40%;
  margin-bottom: 1rem;
}
.location {
  bottom: 7%;
  width: 20%;
}

@media screen and (max-width: 767px) {
  .item {
    height: 15rem;
    width: 20rem;
    margin: auto;
  }
}

@media screen and (min-width: 768px) {
  //works for bigger screen
  main {
    @include mainLargerScreen;
  }

  @include masonryGrid;

  .animateImg-enter-active {
    transition: $secondary-animation;
  }
}
</style>
