import { Fab } from "@material-ui/core";
import { Add, Email } from "@material-ui/icons";
import { useCallback, useContext } from "react";
import { StoreContext } from "~/utils/contexts";
import { getTime, useSelector } from "~/utils/selectors";
import { format } from "date-fns";

const DIVIDER = "<br>";

const buildBody = (date, times) =>
  encodeURI(
    `Olá, seguem os horários do expediente do dia (${format(date, "dd/MM")}):${
      DIVIDER + DIVIDER
    }${times
      .map((t, i) => (i % 2 ? "Saída: " : "Entrada: ") + format(t, "HH:mm"))
      .join(DIVIDER)}${DIVIDER + DIVIDER}Atenciosamente`
  );

const buidSubject = (date) =>
  encodeURI(`Horários - Teletrabalho - ${format(date, "dd/MM")}`);

const TimeSheetControls = ({ date }) => {
  const { action } = useContext(StoreContext);
  const times = useSelector(getTime, date);
  console.log("times", times);

  const addTime = useCallback(() => {
    const time = new Date();
    time.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    time.setSeconds(0, 0); // zero seconds b4 adding
    action("addTime", { date, time: time.getTime() });
  }, [date]);

  const sendEmail = useCallback(() => {
    const mailTo = `mailto:rh-br@objectedge.com?subject=${buidSubject(
      date
    )}&body=${buildBody(date, times)}`;
    window.open(mailTo);
  }, [times]);

  return (
    <>
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
      <Fab
        color="secondary"
        aria-label="email"
        disabled={times.length === 0 || times.length % 2 !== 0}
        onClick={sendEmail}
        style={{
          position: "fixed",
          right: 90,
          bottom: 15,
        }}
      >
        <Email />
      </Fab>
    </>
  );
};

export default TimeSheetControls;
