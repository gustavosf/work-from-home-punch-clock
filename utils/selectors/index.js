import useSelector from "./useSelector";
import { format } from "date-fns";

export { useSelector };

export const getTime = ({ punchClock }, time) =>
  (punchClock.times || {})[format(time, "yyyy-MM-dd")] || [];
