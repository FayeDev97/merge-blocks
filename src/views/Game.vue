<template>
  <div class="game m-0 p-0">
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from "../components/GameBoard.vue";
import { useGameStore } from "../stores/game.store";
// import { useMainComposable } from "../composables/mainComposable";

export default {
  name: "Game",
  components: { GameBoard },
  setup() {
    const store = useGameStore();
    // const {main} = useMainComposable();

    init();

    function init() {
      // store.empty ? loadSave()  : newGame
      store.updateCurrentBlockValue();
    }
  },
  watch: {
    
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
.game {
  background-color: #dde1e7;
}
.bg-darkgray {
  background-color: rgba(119, 111, 111, 0.753);
}

/* Animation & transition */
.fading-to-right {
  background: rgb(221, 14, 14) !important;
  transform: translateX(70px);
  transition: ease-out 0.2s;
}
.fading-to-left {
  background: rgb(221, 14, 14) !important;
  transform: translateX(-70px);
  transition: ease-out 0.2s;
}
.fading-to-bottom {
  background: rgb(221, 14, 14) !important;
  transform: translateY(-70px);
  transition: ease-out 0.2s;
}
</style>
