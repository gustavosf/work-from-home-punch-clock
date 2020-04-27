import { Fab, Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import React, { useCallback, useContext, useState } from "react";
import { TimeSheet } from "~/components";
import { StoreContext } from "~/utils/contexts";

export default function Index() {
  const { action } = useContext(StoreContext);
  const [picker, setPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const addTime = useCallback(() => {
    action("addTime", { date: date, time: new Date().getTime() });
  }, [date]);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h2">
        Dia <span onClick={() => setPicker(true)}>{format(date, "dd")}</span>
      </Typography>
      <DatePicker
        style={{ display: "none" }}
        className="hidden"
        autoOk
        open={picker}
        onClose={() => setPicker(false)}
        openTo="date"
        variant="dialog"
        value={date}
        onChange={(d) => {
          setDate(d);
          setPicker(false);
        }}
      />
      <TimeSheet date={date} />
      <Fab
        color="primary"
        aria-label="add"
        onClick={addTime}
        style={{
          position: "fixed",
          right: 15,
          bottom: 15,
        }}
      >
        <Add />
      </Fab>
    </Grid>
  );
}
