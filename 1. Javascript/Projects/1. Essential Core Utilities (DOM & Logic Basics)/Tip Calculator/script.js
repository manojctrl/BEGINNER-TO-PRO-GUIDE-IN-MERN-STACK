// Input variables element map
const billInput = document.getElementById('bill-amount');
const tipSlider = document.getElementById('tip-slider');
const splitSlider = document.getElementById('split-people');

// Dynamic Text updates text variable
const tipValText = document.getElementById('tip-val');
const splitValText = document.getElementById('split-val');

// Output elements mapping
const totalTipOutput = document.getElementById('total-tip');
const perPersonOutput = document.getElementById('per-person-total');

// Core Calculation Function
function calculateTip() {
    const billAmount = parseFloat(billInput.value) || 0;
    const tipPercentage = parseInt(tipSlider.value);
    const numberOfPeople = parseInt(splitSlider.value);

    // Dynamic label texts update
    tipValText.textContent = tipPercentage;
    splitValText.textContent = numberOfPeople;

    // Formulas & Percentage calculations
    const calculatedTip = billAmount * (tipPercentage / 100);
    const totalWithTip = billAmount + calculatedTip;
    const sharePerPerson = totalWithTip / numberOfPeople;

    // UI Updates (Decimal format .toFixed(2) use garera fix garne)
    totalTipOutput.textContent = calculatedTip.toFixed(2);
    perPersonOutput.textContent = sharePerPerson.toFixed(2);
}

// Event Listeners for Live tracking (Dynamic operations)
// 'input' listener le user le type garda ya range drag garda instant update dinchha
billInput.addEventListener('input', calculateTip);
tipSlider.addEventListener('input', calculateTip);
splitSlider.addEventListener('input', calculateTip);

// Initial call calculation run garna background set math mathi loading garda 
calculateTip();