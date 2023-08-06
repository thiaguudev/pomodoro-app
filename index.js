const circularProgressBar = document.querySelector("#circular-progress-bar");
const circularProgressBarNumber = document.querySelector(
  "#circular-progress-bar .progress-value"
);

const buttonTypePomodoro = document.querySelector("#button-type-pomodoro");
const buttonTypeShortBreak = document.querySelector("#button-type-short-break");

const audio = new Audio("alarm.mp3");

const pomodoroTimerInSeconds = 1500; // 60 seconds * 25 minutes
const shortBreakTimerInSeconds = 300; // 60 seconds * 5 minutes

const TIMER_TYPE_POMODORO = "POMODORO";
const TIMER_TYPE_SHORT_BREAK = "SHORTBREAK";

let progressInterval;
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimerInSeconds;
let multiplierFactor = 360 / timerValue;

const formatNumberInStringMinute = (number) => {
  const minutes = Math.trunc(number / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.trunc(number % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}: ${seconds}`;
};

const startTimer = () => {
  progressInterval = setInterval(() => {
    timerValue--;
    setInfoCircularProgressBar();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(progressInterval);
};

const setInfoCircularProgressBar = () => {
  if (timerValue === 0) {
    stopTimer();
    audio.play();
  }

  circularProgressBarNumber.textContent = `${formatNumberInStringMinute(
    timerValue
  )}`;

  circularProgressBar.style.background = `conic-gradient(var(--blue) ${
    timerValue * multiplierFactor
  }deg, var(--purple) 0deg)`;
};

const resetTimer = () => {
  clearInterval(progressInterval);
  timerValue =
    pomodoroType === TIMER_TYPE_POMODORO
      ? pomodoroTimerInSeconds
      : shortBreakTimerInSeconds;
  multiplierFactor = 360 / timerValue;
  setInfoCircularProgressBar();
  audio.stop();
};

const setPomodoroType = (type) => {
  pomodoroType = type;
  if (type === TIMER_TYPE_POMODORO) {
    buttonTypeShortBreak.classList.remove("active");
    buttonTypePomodoro.classList.add("active");
  } else {
    buttonTypePomodoro.classList.remove("active");
    buttonTypeShortBreak.classList.add("active");
  }

  resetTimer();
};
