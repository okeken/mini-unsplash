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
  max-width: 40rem;
  height: 100vh;
  padding: 1rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  grid-gap: 1rem;
}

.item {
  position: relative;
  background: rgb(248, 245, 245);
  animation: pulse-bg 5s infinite;
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
  background: rgb(187, 185, 185);
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
</style>
