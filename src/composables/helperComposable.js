// import { useGameStore } from "@/stores";

export function useHelperComposable() {
  
  function getCurrentBlock() {
    return document.querySelector(".next .block");
  }
  function blockDefault(event) {
    event.preventDefault();
  }
  return { getCurrentBlock, blockDefault };
}
