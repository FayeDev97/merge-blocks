<template>
  <div class="game m-0 p-0">
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from "../components/GameBoard.vue";
import { useGameStore } from "../stores/game.store";
// import { useMainComposable } from "../composables/mainComposable";
import { useLevelComposable } from "../composables/levelComposable";
import { useMergeBlocksComposable } from "../composables/mergeBlocksComposable";
import { useHelperComposable } from "../composables/helperComposable";
import { onMounted, watch } from "vue";

export default {
  name: "Game",
  components: { GameBoard },
  setup() {
    const store = useGameStore();
    // const {main} = useMainComposable();
    const { mergeSimilarBlocks } = useMergeBlocksComposable();
    const { hasReachedCheckpoint, raiseLevel } = useLevelComposable();
    const { updateBlock, updateLastMoveBlockBackground } =
      useHelperComposable();

    onMounted(init);

    function init() {
      // store.empty ? loadSave()  : newGame
      updateBlock(store);
    }
    // watch board
    watch(
      () => store.lastMove,
      () => {
        updateLastMoveBlockBackground(store);

        setTimeout(() => {
          mergeSimilarBlocks(store);
        }, 300);
      }
    );
    // watch score
    watch(
      () => store.score,
      () => {
        if (hasReachedCheckpoint(store)) raiseLevel(store);
      }
    );
    return {};
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.game {
  background-image: linear-gradient(120deg, #380036, #0cbaba);
}
.bg-darkgray {
  background-color: rgba(119, 111, 111, 0.753);
}

/* Animation & transition */
.fading-to-right {
  transform: translateX(70px);
  transition: linear 0.2s;
}
.fading-to-left {
  transform: translateX(-70px);
  transition: linear 0.2s;
}
.fading-to-bottom {
  transform: translateY(-70px);
  transition: linear 0.2s;
}
</style>
