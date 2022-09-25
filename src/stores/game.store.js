import { defineStore } from "pinia";
export const useGameStore = defineStore("game", {
  state: () => ({
    board: [],
    lastMove: [],
    score: 0,
    level: 1,
    currentBlockValue: 2,
    blocksBackgroundColor: {},
  }),
  getters: {
    // blockValue: (state) => {
    //   return (
    //     2 **
    //     (Math.floor(Math.random() * (state.level * 6 - state.level + 1)) +
    //       state.level +
    //       1)
    //   );
    // },
  },
  actions: {
    updateScore(newValue) {
      this.score += newValue;
    },
    updateLastMove(newMove) {
      this.lastMove = newMove;
    },
    updateBoard(newValue, rowPos) {
      this.board[rowPos]
        ? this.board[rowPos].push(newValue)
        : (this.board[rowPos] = [newValue]);
    },
    isRowFull(rowPos) {
      if (!this.board[rowPos] || !this.board[rowPos][5]) return false;
      return true;
    },
    isLastBlockSameValue(rowPos, blockValue) {
      const lastBlockValue = this.board[rowPos][5];
      if (this.board[rowPos][5] === undefined) return false;
      if (lastBlockValue !== blockValue) return false;
      return true;
    },
    updateCurrentBlockValue() {
      this.currentBlockValue =
        2 ** (Math.floor(Math.random() * 5) + this.level);
    },
    removeValueFromBoard(rowPos, blockPos) {
      this.board[rowPos].splice(blockPos, 1);
    },
    incrementLevel() {
      this.level++;
    },
    updateBlocksBackgroundColor(value, hsl) {
      this.blocksBackgroundColor = {
        ...this.blocksBackgroundColor,
        [value]: hsl,
      };
    },
  },
});
