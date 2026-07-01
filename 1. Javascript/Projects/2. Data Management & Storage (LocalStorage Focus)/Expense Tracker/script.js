const form = document.getElementById('transactionForm');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');


const totalIncome = document.getElementById('totalIncome');

const totalExpense = document.getElementById('totalExpense');

const balance = document.getElementById('balance');

const typeInput = document.getElementById('type');

let income = [];
let expense = [];
let idCounter = 1;
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const type = typeInput.value;

    if(!title || isNan(amount) || amount <= 0 ){
        alert('Please enter valid title and amount');
    }

    const transaction = {
        id: idCounter++,
        title,
        amount,
    


    }

    if(type === 'income') {
        income.push(transaction);
    }else{
        expense.push(transaction);
    }







    
});


function updateTotals() {
  

}