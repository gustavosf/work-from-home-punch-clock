import { shallowEqualArrays, shallowEqualObjects } from "shallow-equal";

export default (a, b) => {
  if (shallowEqualArrays(a, b)) return true;
  if (typeof a !== "object" && typeof b !== "object") return a === b;
  return shallowEqualObjects(a, b);
};
