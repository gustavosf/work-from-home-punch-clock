import { Grid, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import React, { useState } from "react";
import { TimeSheet, TimeSheetTotals, TimeSheetControls } from "~/components";

export default function Index() {
  const [picker, setPicker] = useState(false);
  const [date, setDate] = useState(new Date());

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
      <TimeSheetTotals date={date} />
      <TimeSheetControls date={date} />
    </Grid>
  );
}
