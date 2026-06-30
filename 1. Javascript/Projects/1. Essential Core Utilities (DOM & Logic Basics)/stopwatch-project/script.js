let timer = null; 
let totalSeconds = 0;

const display = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn'); 
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTime(){
    totalSeconds++;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const formattedHrs = String(hrs).padStart(2, '0');
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');

    display.textContent = `${formattedHrs}:${formattedMins}:${formattedSecs}`;
}

startBtn.addEventListener('click', () => {
    if (timer !== null) return; 
    
    timer = setInterval(updateTime, 1000); 
});

stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null; 
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    totalSeconds = 0;
    display.textContent = "00:00:00";
});
