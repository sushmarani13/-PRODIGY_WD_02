let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');

const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');

const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    hours.innerHTML = '00';
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
    milliseconds.innerHTML = '00';
    laps.innerHTML = '';
    lapCounter = 1;
}

function lapTimer() {
    if (running) {
        const lapTime = `${hours.innerHTML}:${minutes.innerHTML}:${seconds.innerHTML}.${milliseconds.innerHTML}`;
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapCounter++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hoursCalc = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesCalc = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsCalc = Math.floor((difference % (1000 * 60)) / 1000);
    const millisecondsCalc = Math.floor((difference % 1000) / 10);

    hours.innerHTML = (hoursCalc < 10 ? '0' : '') + hoursCalc;
    minutes.innerHTML = (minutesCalc < 10 ? '0' : '') + minutesCalc;
    seconds.innerHTML = (secondsCalc < 10 ? '0' : '') + secondsCalc;
    milliseconds.innerHTML = (millisecondsCalc < 10 ? '0' : '') + millisecondsCalc;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
