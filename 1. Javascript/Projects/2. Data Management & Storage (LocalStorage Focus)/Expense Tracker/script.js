// Data arrays
let incomes = [];
let expenses = [];

const form = document.getElementById('transactionForm');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const list = document.getElementById('list');

const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const balanceEl = document.getElementById('balance');

let idCounter = 1;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (!title || isNaN(amount) || amount <= 0) return;

  const transaction = { id: idCounter++, title, amount };

  if (type === 'income') {
    incomes.push(transaction);
  } else {
    expenses.push(transaction);
  }

  render();
  form.reset();
  titleInput.focus();
});

function removeTransaction(id, type) {
  if (type === 'income') {
    incomes = incomes.filter(t => t.id !== id);
  } else {
    expenses = expenses.filter(t => t.id !== id);
  }
  render();
}

function calculateTotals() {
  // reduce() use gareko calculation ko lagi
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;
  return { totalIncome, totalExpense, balance };
}

function render() {
  const { totalIncome, totalExpense, balance } = calculateTotals();

  totalIncomeEl.textContent = 'Rs. ' + totalIncome.toFixed(2);
  totalExpenseEl.textContent = 'Rs. ' + totalExpense.toFixed(2);
  balanceEl.textContent = 'Rs. ' + balance.toFixed(2);

  const allTransactions = [
    ...incomes.map(t => ({ ...t, type: 'income' })),
    ...expenses.map(t => ({ ...t, type: 'expense' }))
  ].sort((a, b) => b.id - a.id);

  list.innerHTML = '';

  allTransactions.forEach(t => {
    const li = document.createElement('li');
    li.className = t.type;

    const sign = t.type === 'income' ? '+' : '-';
    const amtClass = t.type === 'income' ? 'income-amt' : 'expense-amt';

    li.innerHTML = `
      <span>${t.title}</span>
      <span class="amt ${amtClass}">${sign} Rs. ${t.amount.toFixed(2)}</span>
      <button onclick="removeTransaction(${t.id}, '${t.type}')">✖</button>
    `;

    list.appendChild(li);
  });
}

render();