import { useState, useEffect } from "react";
import { getTime, useSelector } from "~/utils/selectors";
import styles from "./TimeSheetTotals.module.scss";

const TimeSheetTotals = ({ date }) => {
  const times = useSelector(getTime, date).sort();
  const [, setTime] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      time.setTime(0, 0);
      setTime(time.getTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (duration) =>
    new Date(duration).toISOString().substr(11, 5);

  const formatBalance = (duration, dailyAmount) =>
    duration > dailyAmount
      ? "+" + new Date(duration - dailyAmount).toISOString().substr(11, 5)
      : "-" + new Date(dailyAmount - duration).toISOString().substr(11, 5);

  const list = [...times].sort();
  if (list.length % 2) list.push(new Date().getTime());

  const duration = list.reduce(
    (prev, time, i) => prev + (i % 2 ? 1 : -1) * time,
    60000
  );

  return (
    <div className={styles.timeSheetTotals}>
      <div>Trabalhado no dia: {formatTime(duration)}</div>
      <div>Saldo do dia: {formatBalance(duration, 30600000)}</div>
    </div>
  );
};

export default TimeSheetTotals;
