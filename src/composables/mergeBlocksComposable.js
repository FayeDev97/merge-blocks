export function useMergeBlocksComposable() {
  function mergeSimilarBlocks(store) {
    const [rowPos, row] = store.lastMove;
    const blockPos = row.children.length - 1;
    //multi-direction
    //add bottom, left and right blocks
    if (
      store.board[rowPos].length > 1 &&
      store.board[rowPos - 1] &&
      store.board[rowPos + 1]
    ) {
      if (
        store.board[rowPos][blockPos] === store.board[rowPos][blockPos - 1] &&
        store.board[rowPos][blockPos] === store.board[rowPos - 1][blockPos] &&
        store.board[rowPos][blockPos] === store.board[rowPos + 1][blockPos]
      ) {
        removeLeft(store, row, rowPos, blockPos);
        removeRight(store, row, rowPos, blockPos);
        removeBottom(store, row, rowPos, blockPos);
        setNewBlockValue(store, row, rowPos, blockPos - 1, 8);
        return;
      }
    }
    //bottom and left blocks
    if (store.board[rowPos].length > 1 && store.board[rowPos - 1]) {
      if (
        store.board[rowPos][blockPos] === store.board[rowPos][blockPos - 1] &&
        store.board[rowPos][blockPos] === store.board[rowPos - 1][blockPos]
      ) {
        removeLeft(store, row, rowPos, blockPos);
        removeBottom(store, row, rowPos, blockPos);
        setNewBlockValue(store, row, rowPos, blockPos - 1, 4);
        return;
      }
    }
    //add bottom and right blocks
    if (store.board[rowPos].length > 1 && store.board[rowPos + 1]) {
      if (
        store.board[rowPos][blockPos] === store.board[rowPos][blockPos - 1] &&
        store.board[rowPos][blockPos] === store.board[rowPos + 1][blockPos]
      ) {
        removeRight(store, row, rowPos, blockPos);
        removeBottom(store, row, rowPos, blockPos);
        setNewBlockValue(store, row, rowPos, blockPos - 1, 4);
        return;
      }
    }
    //horizontal
    //add left and right blocks
    if (store.board[rowPos - 1] && store.board[rowPos + 1]) {
      if (
        store.board[rowPos][blockPos] === store.board[rowPos + 1][blockPos] &&
        store.board[rowPos][blockPos] === store.board[rowPos - 1][blockPos]
      ) {
        removeLeft(store, row, rowPos, blockPos);
        removeRight(store, row, rowPos, blockPos);
        setNewBlockValue(store, row, rowPos, blockPos, 4);
        return;
      }
    }
    //add to left block
    if (store.board[rowPos + 1]) {
      if (store.board[rowPos][blockPos] == store.board[rowPos + 1][blockPos]) {
        removeRight(store, row, rowPos, blockPos);
        setNewBlockValue(store, row, rowPos, blockPos, 2);
        return;
      }
    }
    //add to right block
    if (store.board[rowPos - 1]) {
      if (store.board[rowPos][blockPos] == store.board[rowPos - 1][blockPos]) {
        removeLeft(store, row, rowPos, blockPos);
        setNewBlockValue(store, row, rowPos, blockPos, 2);
        return;
      }
    }
    //vertical
    //add bottom block
    if (store.board[rowPos].length > 1) {
      if (store.board[rowPos][blockPos] === store.board[rowPos][blockPos - 1]) {
        removeBottom(store, row, rowPos, blockPos);
        setNewBlockValue(store, row, rowPos, blockPos - 1, 2);
        return;
      }
    }
  }
  function removeLeft(store, row, rowPos, blockPos) {
    const leftRow = row.previousSibling;
    const block = leftRow.children[blockPos];
    store.removeValueFromBoard(rowPos - 1, blockPos);
    block.classList.add("fading-to-right");
    setTimeout(() => {
      leftRow.removeChild(block);
    }, 200);
  }
  function removeRight(store, row, rowPos, blockPos) {
    const rightRow = row.nextSibling;
    const block = rightRow.children[blockPos];
    block.classList.add("fading-to-left");
    store.removeValueFromBoard(rowPos + 1, blockPos);
    setTimeout(() => {
      rightRow.removeChild(block);
    }, 200);
  }
  function removeBottom(store, row, rowPos, blockPos) {
    const block = row.children[blockPos];
    block.classList.add("fading-to-bottom");
    store.removeValueFromBoard(rowPos, -1);
    setTimeout(() => {
      row.removeChild(row.children[blockPos]);
    }, 200);
  }
  function setNewBlockValue(store, row, rowPos, blockPos, multiplier) {
    const newValue = store.board[rowPos][blockPos] * multiplier;
    store.board[rowPos][blockPos] = newValue;
    row.children[blockPos].textContent = newValue;
    store.updateScore(newValue);
    store.updateLastMove([rowPos, row]);
    setTimeout(() => {
      mergeSimilarBlocks(store);
    }, 300);
  }
  return { mergeSimilarBlocks };
}
