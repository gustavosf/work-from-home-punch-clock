import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Typography,
  Fab,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { ArrowDownward, ArrowUpward, MoreVert, Add } from "@material-ui/icons";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { StoreContext } from "../utils/contexts";
import useSelector from "../utils/useSelector";

export const getStaticProps = ({ params }) => ({
  props: {
    dailyPunch: [1586952000000, 1586964300000, 1586968200000, 1586987100000],
  },
});

const getTime = ({ punchClock }, time) =>
  (punchClock.times || {})[format(time, "yyyy-MM-dd")] || [];

export default function Index({ dailyPunch }) {
  const { action } = useContext(StoreContext);
  const [anchor, setAnchor] = useState();
  const [picker, setPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const times = useSelector(getTime, date);
  console.log(times);

  const handleClick = (e, i) => setAnchor([e.currentTarget, i]);
  const handleClose = () => setAnchor();
  const handleDelete = () => {
    const [, i] = anchor;
    times.splice(i, 1);
    action("setTimes", { date, times });
    handleClose();
  };
  const handleDateChange = (date, i) => {
    const newTimes = [...times];
    newTimes[i] = date.getTime();
    newTimes.sort();
    action("setTimes", { date, times: newTimes });
  };
  const handleAdd = () => {
    const newTimes = [...times, new Date().getTime()].sort();
    action("setTimes", { date: date, times: newTimes });
  };
  const presentPicker = () => {
    setPicker(true);
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h2">
        Dia <span onClick={presentPicker}>{format(date, "dd")}</span>
      </Typography>
      <DatePicker
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
      <List>
        {times.map((time, i) => (
          <ListItem key={`time-${time}`}>
            <ListItemIcon>
              {i % 2 ? (
                <ArrowUpward style={{ color: red[500] }} />
              ) : (
                <ArrowDownward style={{ color: green[500] }} />
              )}
            </ListItemIcon>
            <TimePicker
              value={new Date(time)}
              autoOk
              onChange={(date) => handleDateChange(date, i)}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="more"
                onClick={(e) => handleClick(e, i)}
              >
                <MoreVert />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Menu
        id="simple-menu"
        anchorEl={anchor && anchor[0]}
        open={!!anchor}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAdd}
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
