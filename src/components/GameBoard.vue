<template>
  <div class="container-fluid m-0 p-0 row">
    <div class="col display-none display-lg-block"></div>
    <div
      class="d-flex flex-column align-items-center vh-100 col-12 col-md-7 p-5"
    >
      <div class="header row col-12">
        <span class="col-3 fw-bolder">Back</span>
        <span class="col-1"></span>
        <div class="score col-4 bg-light text-dark fs-3 fw-bold rounded py-3">
          {{ store.score }}
        </div>
      </div>
      <div class="game-board row rounded mt-4">
        <SingleRow v-for="pos in 5" :key="pos" :rowPos="pos" />
      </div>
      <div class="next mt-5">
        <single-block :value="store.currentBlockValue"></single-block>
      </div>
    </div>
    <div class="col display-none display-lg-block"></div>
  </div>
</template>

<script>
import SingleBlock from "./SingleBlock.vue";
import SingleRow from "./SingleRow.vue";
import { useGameStore } from "./../stores/game.store";
export default {
  name: "GameBoard",
  components: { SingleBlock, SingleRow },
  setup() {
    const store = useGameStore();

    return { store };
  },

  mounted() {
    // this.createDigit();
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Raleway";
  src: url("./../assets/fonts/Raleway-VariableFont_wght.ttf");
}

.game-board {
  width: 396px !important;
  height: 452px !important;
  // max-height: 452px !important;
  // box-shadow: 0px 0px 35px 10px black;
  padding: 15px;
  box-shadow: inset 10px 10px 15px rgba(70, 70, 70, 0.8);
  background: rgba(210, 227, 243, 0.5);
}
.score {
  font-family: "Raleway" !important;
  font-weight: bolder !important;
}
</style>
