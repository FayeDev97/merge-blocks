<template>
  <div
    class="single-row col bg-darkgray border border-dark rounded m-0 p-0"
    @dragover="blockDefault"
    @drop="moveBlockEvent"
    @click="moveBlockEvent"
  ></div>
</template>

<script>
import { useGameStore } from "./../stores/game.store";
import { useHelperComposable } from "../composables/helperComposable";
import { useMergeBlocksComposable } from "../composables/mergeBlocksComposable";

export default {
  name: "SingleRow",
  setup() {
    const store = useGameStore();
    const { getCurrentBlock, blockDefault } = useHelperComposable();
    const { mergeSimilarBlocks } = useMergeBlocksComposable();

    function moveBlockEvent(event) {
      const blockClone = getCurrentBlock().cloneNode(true);
      const row = event.currentTarget;
      const rowPos = Number.parseInt(row.getAttribute("rowPos")) - 1;
      addBlockToRow(row, blockClone);

      store.updateBoard(store.currentBlockValue, rowPos);
      store.updateCurrentBlockValue();
      store.updateLastMove([rowPos, row]);
      setTimeout(() => {
        mergeSimilarBlocks(store);
      }, 300);
    }
    function addBlockToRow(row, blockClone) {
      const rowPos = Number.parseInt(row.getAttribute("rowPos")) - 1;
      const blockValue = Number.parseInt(blockClone.innerHTML);

      // Dont move if not draggable
      if (blockClone.getAttribute("draggable") === "false") return;
      //Don't move block if row is saturated
      if (
        store.isRowFull(rowPos) &&
        !store.isLastBlockSameValue(rowPos, blockValue)
      ) {
        return;
      }
      blockClone.setAttribute("draggable", false);
      row.appendChild(blockClone);
    }

    return { store, moveBlockEvent, blockDefault };
  },
};
</script>

<style scoped>
.single-row:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.945) !important;
  max-height: 420px !important;
}
</style>
