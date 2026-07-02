// ─── STATE ───────────────────────────────────────────────
let monthlyBudget = 0;
let categories = [];   // [{ id, name, limit }]
let expenses = [];     // [{ id, title, amount, categoryId }]
let expIdCounter = 1;
let catIdCounter = 1;

// ─── MONTH SELECT POPULATE ───────────────────────────────
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const monthSelect = document.getElementById('monthSelect');
months.forEach((m, i) => {
  const opt = document.createElement('option');
  opt.value = i + 1;
  opt.textContent = m;
  monthSelect.appendChild(opt);
});
monthSelect.value = new Date().getMonth() + 1;

// ─── DOM REFS ─────────────────────────────────────────────
const budgetInput    = document.getElementById('budgetInput');
const setBudgetBtn   = document.getElementById('setBudgetBtn');
const yearInput      = document.getElementById('yearInput');

const totalBudgetEl  = document.getElementById('totalBudget');
const totalSpentEl   = document.getElementById('totalSpent');
const remainingEl    = document.getElementById('remaining');
const remainingCard  = document.querySelector('.remaining-card');

const progressFill   = document.getElementById('progressFill');
const progressLabel  = document.getElementById('progressLabel');

const catNameInput   = document.getElementById('catName');
const catLimitInput  = document.getElementById('catLimit');
const addCatBtn      = document.getElementById('addCatBtn');
const categoryList   = document.getElementById('categoryList');

const expTitleInput  = document.getElementById('expTitle');
const expAmountInput = document.getElementById('expAmount');
const expCatSelect   = document.getElementById('expCategory');
const addExpBtn      = document.getElementById('addExpBtn');
const expenseList    = document.getElementById('expenseList');
const noExpMsg       = document.getElementById('noExpMsg');

// ─── SET BUDGET ───────────────────────────────────────────
setBudgetBtn.addEventListener('click', () => {
  const val = parseFloat(budgetInput.value);
  if (isNaN(val) || val <= 0) {
    alert('Valid budget amount halnuhos!');
    return;
  }
  monthlyBudget = val;
  syncAll();
  budgetInput.value = '';
});

// ─── ADD CATEGORY ─────────────────────────────────────────
addCatBtn.addEventListener('click', () => {
  const name  = catNameInput.value.trim();
  const limit = parseFloat(catLimitInput.value);

  if (!name) { alert('Category name halnuhos!'); return; }
  if (isNaN(limit) || limit <= 0) { alert('Category limit halnuhos!'); return; }

  // Strict check: total category limits <= monthly budget
  const usedLimits = categories.reduce((sum, c) => sum + c.limit, 0);
  if (monthlyBudget > 0 && usedLimits + limit > monthlyBudget) {
    alert(`Category limit add garna mildaina! Remaining budget: Rs. ${(monthlyBudget - usedLimits).toFixed(2)}`);
    return;
  }

  categories.push({ id: catIdCounter++, name, limit });
  catNameInput.value = '';
  catLimitInput.value = '';
  syncAll();
});

// ─── ADD EXPENSE ──────────────────────────────────────────
addExpBtn.addEventListener('click', () => {
  const title    = expTitleInput.value.trim();
  const amount   = parseFloat(expAmountInput.value);
  const catId    = parseInt(expCatSelect.value);

  if (!title)              { alert('Expense title halnuhos!'); return; }
  if (isNaN(amount) || amount <= 0) { alert('Amount halnuhos!'); return; }
  if (!catId)              { alert('Category select garnuhos!'); return; }

  // Strict: check category limit
  const cat = categories.find(c => c.id === catId);
  const catSpent = expenses
    .filter(e => e.categoryId === catId)
    .reduce((sum, e) => sum + e.amount, 0);

  if (catSpent + amount > cat.limit) {
    alert(`"${cat.name}" category ko limit exceed huncha!\nCategory Limit: Rs. ${cat.limit}\nAlready Spent: Rs. ${catSpent}\nAvailable: Rs. ${(cat.limit - catSpent).toFixed(2)}`);
    return;
  }

  // Strict: check overall budget
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  if (monthlyBudget > 0 && totalSpent + amount > monthlyBudget) {
    alert(`Monthly budget exceed huncha!\nRemaining Budget: Rs. ${(monthlyBudget - totalSpent).toFixed(2)}`);
    return;
  }

  expenses.push({ id: expIdCounter++, title, amount, categoryId: catId });
  expTitleInput.value  = '';
  expAmountInput.value = '';
  expCatSelect.value   = '';
  syncAll();
});

// ─── DELETE CATEGORY ──────────────────────────────────────
function deleteCategory(id) {
  categories = categories.filter(c => c.id !== id);
  expenses   = expenses.filter(e => e.categoryId !== id);
  syncAll();
}

// ─── DELETE EXPENSE ───────────────────────────────────────
function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  syncAll();
}

// ─── CALCULATE using reduce() ─────────────────────────────
function calcTotals() {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining  = monthlyBudget - totalSpent;
  return { totalSpent, remaining };
}

function calcCategorySpent(catId) {
  return expenses
    .filter(e => e.categoryId === catId)
    .reduce((sum, e) => sum + e.amount, 0);
}

// ─── SYNC ALL ─────────────────────────────────────────────
function syncAll() {
  syncSummary();
  syncProgress();
  syncCategoryList();
  syncExpenseList();
  syncCategoryDropdown();
}

function syncSummary() {
  const { totalSpent, remaining } = calcTotals();

  totalBudgetEl.textContent = `Rs. ${monthlyBudget.toFixed(2)}`;
  totalSpentEl.textContent  = `Rs. ${totalSpent.toFixed(2)}`;
  remainingEl.textContent   = `Rs. ${remaining.toFixed(2)}`;

  // Danger color when remaining < 0
  if (remaining < 0) {
    remainingCard.classList.add('danger');
  } else {
    remainingCard.classList.remove('danger');
  }
}

function syncProgress() {
  if (monthlyBudget <= 0) {
    progressFill.style.width = '0%';
    progressLabel.textContent = '0% used';
    progressFill.className = 'progress-bar-fill';
    return;
  }

  const { totalSpent } = calcTotals();
  const pct = Math.min((totalSpent / monthlyBudget) * 100, 100);

  progressFill.style.width = pct + '%';
  progressLabel.textContent = `${pct.toFixed(1)}% used`;

  progressFill.className = 'progress-bar-fill';
  if (pct >= 100)     progressFill.classList.add('danger');
  else if (pct >= 75) progressFill.classList.add('warning');
}

function syncCategoryList() {
  categoryList.innerHTML = '';

  if (categories.length === 0) {
    categoryList.innerHTML = '<p class="empty-msg">No categories added yet.</p>';
    return;
  }

  categories.forEach(cat => {
    const spent = calcCategorySpent(cat.id);
    const pct   = cat.limit > 0 ? Math.min((spent / cat.limit) * 100, 100) : 0;

    let barClass = 'cat-mini-bar-fill';
    if (pct >= 100)     barClass += ' danger';
    else if (pct >= 75) barClass += ' warning';

    const li = document.createElement('li');
    li.className = 'cat-item';
    li.innerHTML = `
      <div class="cat-top">
        <span class="cat-name">${cat.name}</span>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="cat-amounts">Rs. ${spent.toFixed(2)} / Rs. ${cat.limit.toFixed(2)}</span>
          <button class="cat-del" onclick="deleteCategory(${cat.id})">✖</button>
        </div>
      </div>
      <div class="cat-mini-bar-bg">
        <div class="${barClass}" style="width:${pct}%"></div>
      </div>
    `;
    categoryList.appendChild(li);
  });
}

function syncExpenseList() {
  expenseList.innerHTML = '';

  if (expenses.length === 0) {
    noExpMsg.style.display = 'block';
    return;
  }
  noExpMsg.style.display = 'none';

  // Latest first
  [...expenses].reverse().forEach(exp => {
    const cat = categories.find(c => c.id === exp.categoryId);
    const catName = cat ? cat.name : 'Unknown';

    const li = document.createElement('li');
    li.className = 'exp-item';
    li.innerHTML = `
      <div class="exp-info">
        <span class="exp-title">${exp.title}</span>
        <span class="exp-cat">📁 ${catName}</span>
      </div>
      <div class="exp-right">
        <span class="exp-amount">- Rs. ${exp.amount.toFixed(2)}</span>
        <button class="exp-del" onclick="deleteExpense(${exp.id})">✖</button>
      </div>
    `;
    expenseList.appendChild(li);
  });
}

function syncCategoryDropdown() {
  const prev = expCatSelect.value;
  expCatSelect.innerHTML = '<option value="">Select Category</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    expCatSelect.appendChild(opt);
  });
  expCatSelect.value = prev;
}

// ─── INIT ─────────────────────────────────────────────────
syncAll();