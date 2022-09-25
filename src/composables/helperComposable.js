// import { useGameStore } from "@/stores";

export function useHelperComposable() {
  function getCurrentBlock() {
    return document.querySelector(".next .block");
  }
  function blockDefault(event) {
    event.preventDefault();
  }
  function updateBlock(store) {
    store.updateCurrentBlockValue();
    updateCurrentBlockBackground(store);
  }
  function updateCurrentBlockBackground(store) {
    const block = getCurrentBlock();
    const value = store.currentBlockValue;
    updateBlockBackground(store, block, value);
  }
  function updateLastMoveBlockBackground(store) {
    const block = store.lastMove[2];
    const value = Number.parseInt(block.innerHTML);
    updateBlockBackground(store, block, value);
  }
  function updateBlockBackground(store, block, value) {
    var hsl;
    if (store.blocksBackgroundColor[value] != undefined) {
      hsl = store.blocksBackgroundColor[value];
    } else {
      const factor = Math.round(Math.log(value) / Math.log(2));
      const saturation = factor * 10;
      const hue = 30 + Math.round(factor * 2.5);
      const lightness = 75 - Math.round(factor * 2.5);
      hsl = `hsl(${hue},${saturation}%,${lightness}%)`;
      store.updateBlocksBackgroundColor(value, hsl);
    }
    block.style.background = hsl;
  }

  return {
    getCurrentBlock,
    blockDefault,
    updateBlock,
    updateLastMoveBlockBackground,
  };
}
