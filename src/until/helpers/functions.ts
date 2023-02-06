import moment from "moment";

export function formatDateDetail(value: moment.MomentInput) {
  if (!value) {
    return "";
  }
  return moment(value).format("h:mm:ss a");
}

export function formatTime(time: number) {
  if (time >= 10) return time;
  return "0" + time;
}

export function convertingMilliseconds(milliseconds: number) {
  const milliSecond = Math.floor(milliseconds % 60);
  const seconds = Math.floor(milliseconds / 100) % 60; // 1s second -> milliSecond * 1000
  const minutes = Math.floor(milliseconds / 6000) % 60;
  const hours = Math.floor(milliseconds / 360000) % 24;
  return {
    minutes: minutes,
    seconds: seconds,
    hours: hours,
    milliSecond: milliSecond,
  };
}

export function convertingMillisecondsToTime(milliseconds: number) {
  const { minutes, seconds, hours, milliSecond } =
    convertingMilliseconds(milliseconds);
  return (
    formatTime(hours) +
    ":" +
    formatTime(minutes) +
    ":" +
    formatTime(seconds) +
    "." +
    formatTime(milliSecond)
  );
}
