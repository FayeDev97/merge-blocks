<template>
  <span
    draggable="true"
    class="block border shadow rounded fw-bold text-dark d-inline-flex justify-content-center align-items-center m-0 p-0"
    >{{ value }}</span
  >
</template>

<script>
export default {
  name: "SingleBlock",
  props: ["value"],
};
</script>

<style>
* {
  box-sizing: border-box;
}
.block {
  min-width: 70px !important;
  min-height: 70px !important;
}
.block[draggable="true"]:hover {
  cursor: pointer;
}
</style>
