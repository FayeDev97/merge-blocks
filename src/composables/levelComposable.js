export function useLevelComposable() {

  // TO-DO

  // [v] 0 - Raise level to unlock next block
  // [v] 0.0 - Requirements :
  // reach next score checkpoint
  // lowest number not on board ?
  // [v] 0.1 - Implement
  // [v] 0.2 - Fix shit

  // []  1 - trigger message if new block is unlocked

  function raiseLevel(store) {
    const lowestNumber = getlowestNumber(store.level);
    if (!isLowestNumberInBoard(store, lowestNumber)) store.incrementLevel();
  }
  function hasReachedCheckpoint(store) {
    if (store.score >= getCheckpoint(store.level)) return true;
    return false;
  }
  function isLowestNumberInBoard(store, lowestNumber) {
    let row = 0;
    while (store.board[row] && row < 5) {
      if (store.board[row])
        if (store.board[row].indexOf(lowestNumber) >= 0) return true;
      row++;
    }
    return false;
  }
  function unlockBlock() {
    return;
  }
  function getlowestNumber(level) {
    return 2 ** level;
  }
  function getCheckpoint(level) {
    return 2 ** (10 + (level - 1) * 2);
  }
  return {
    hasReachedCheckpoint,
    raiseLevel,
    unlockBlock,
  };
}
