import Chance from "chance";

export function createChance() {
  const params = new URLSearchParams(window.location.search);
  const seed = params.get("seed");
  return seed ? new Chance(seed) : new Chance();
}
