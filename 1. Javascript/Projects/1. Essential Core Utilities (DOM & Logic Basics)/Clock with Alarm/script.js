// DOM Elements selection
const clockDisplay = document.getElementById('digital-clock');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmBtn = document.getElementById('set-alarm-btn');
const clearAlarmBtn = document.getElementById('clear-alarm-btn');
const alarmStatus = document.getElementById('alarm-status');

let alarmTime = null;
let alarmTimeout = null;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; 
    const formattedHours = String(hours).padStart(2, '0');

    clockDisplay.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

    const currentTime24hr = `${String(now.getHours()).padStart(2, '0')}:${minutes}`;
    if (alarmTime === currentTime24hr) {
        triggerAlarm();
    }
}

function triggerAlarm() {
    alert("⏰ Time's up! Your Alarm is ringing!"); 
    clearAlarm(); 
}

setAlarmBtn.addEventListener('click', () => {
    if (alarmTimeInput.value) {
        alarmTime = alarmTimeInput.value;
        alarmStatus.textContent = `Alarm set for ${alarmTime}`;
        alarmStatus.style.color = '#00ffcc';
        
        setAlarmBtn.classList.add('hidden');
        clearAlarmBtn.classList.remove('hidden');
    } else {
        alert("Please select a valid time first!");
    }
});

function clearAlarm() {
    alarmTime = null;
    alarmStatus.textContent = "Alarm Not Set";
    alarmStatus.style.color = '#aaa';
    alarmTimeInput.value = '';
    
    setAlarmBtn.classList.remove('hidden');
    clearAlarmBtn.classList.add('hidden');
}

clearAlarmBtn.addEventListener('click', clearAlarm);

setInterval(updateClock, 1000);

updateClock();