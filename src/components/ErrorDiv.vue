<template>
  <h3 class="err">
    {{ err }}
  </h3>
</template>

<script>
export default {
  name: "ErrorDiv",
  props: {
    err: String,
  },
};
</script>

<style lang="scss" scoped>
.err {
  text-align: center;
}
</style>
