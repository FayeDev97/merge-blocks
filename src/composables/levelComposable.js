export function useLevelComposable() {
  const checkpoints = [1024, 4096, 8192];

  // TO-DO

  // [] 0 - Raise level to unlock next block
    // [v] 0.0 - Requirements :
    // reach next score checkpoint
    // lowest number not on board ?
    // [] 0.1 - Implement
    // [] 0.2 - Fix shit
  
  
  // []  1 - trigger message if new block is unlocked

  function raiseLevel(store) {
    if (hasReachedCheckpoint() && isLowestNumberInBoard())
      store.incrementLevel();
  }
  function hasReachedCheckpoint(store) {
    if (store.score >= checkpoints[store.level]) return true;
    return false;
  }
  function isLowestNumberInBoard(store, lowestNumber) {
    let row = 0;
    while (!store.board[row] || row < 5) {
      if (store.board[row])
        if (store.board[row].indexOf(lowestNumber)) return true;
      row++;
    }
    return false;
  }
  function unlockBlock() {
    return;
  }
  return { raiseLevel, unlockBlock };
}
