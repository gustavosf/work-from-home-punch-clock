import update from "immutability-helper";
import { format } from "date-fns";

export const setTimes = (state, { payload }) => {
  return update(state, {
    times: {
      [format(payload.date, "yyyy-MM-dd")]: {
        $set: payload.times,
      },
    },
  });
};
