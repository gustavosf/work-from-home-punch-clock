import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { ArrowDownward, ArrowUpward, MoreVert } from "@material-ui/icons";
import { TimePicker } from "@material-ui/pickers";
import React, { useContext, useState } from "react";
import { StoreContext } from "~/utils/contexts";
import styles from "./TimeSheet.module.scss";
import update from "immutability-helper";
import { getTime, useSelector } from "~/utils/selectors";

const TimeSheet = ({ date }) => {
  const { action } = useContext(StoreContext);
  const [anchor, setAnchor] = useState();
  const times = useSelector(getTime, date).sort();

  const handleClose = () => setAnchor();

  const handleDateChange = (date, i) => {
    console.log(date);
    date.setSeconds(0, 0); // zero seconds
    const newTimes = update(times, {
      $splice: [[i, 1]], // remove old
      $push: [date.getTime()], // add new
    });
    action("setTimes", { date, times: newTimes });
  };

  const handleDelete = () => {
    const [, i] = anchor;
    const newTimes = update(times, { $splice: [[i, 1]] });
    action("setTimes", { date, times: newTimes });
    handleClose();
  };

  const handleClick = (e, i) => setAnchor([e.currentTarget, i]);

  return (
    <div className={styles.timeSheet}>
      <List>
        {times.map((time, i) => (
          <React.Fragment key={`time-${i}-${time}`}>
            {i > 0 && <Divider />}
            <ListItem>
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
                ampm={false}
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
          </React.Fragment>
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
    </div>
  );
};

export default TimeSheet;
