// ─── STATE ───────────────────────────────────────────────────────────────────
// habits: [{ id, name, color, checks: { "YYYY-MM-DD": true } }]
let habits = JSON.parse(localStorage.getItem('habits') || '[]');
let idCounter = habits.length
  ? Math.max(...habits.map(h => h.id)) + 1
  : 1;

const today = new Date();
let viewYear  = today.getFullYear();
let viewMonth = today.getMonth(); // 0-indexed

// ─── DOM REFS ────────────────────────────────────────────────────────────────
const habitInput  = document.getElementById('habitInput');
const habitColor  = document.getElementById('habitColor');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitGrid   = document.getElementById('habitGrid');
const emptyMsg    = document.getElementById('emptyMsg');
const monthLabel  = document.getElementById('monthLabel');
const prevMonth   = document.getElementById('prevMonth');
const nextMonth   = document.getElementById('nextMonth');

// ─── MONTH NAV ───────────────────────────────────────────────────────────────
prevMonth.addEventListener('click', () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  render();
});

nextMonth.addEventListener('click', () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  render();
});

// ─── ADD HABIT ───────────────────────────────────────────────────────────────
addHabitBtn.addEventListener('click', addHabit);
habitInput.addEventListener('keydown', e => { if (e.key === 'Enter') addHabit(); });

function addHabit() {
  const name  = habitInput.value.trim();
  const color = habitColor.value;
  if (!name) { habitInput.focus(); return; }

  habits.push({ id: idCounter++, name, color, checks: {} });
  habitInput.value = '';
  save();
  render();
}

// ─── DELETE HABIT ────────────────────────────────────────────────────────────
function deleteHabit(id) {
  if (!confirm('Yo habit delete garnu cha?')) return;
  habits = habits.filter(h => h.id !== id);
  save();
  render();
}

// ─── TOGGLE DAY CHECK ────────────────────────────────────────────────────────
function toggleDay(habitId, dateKey) {
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;

  // Safe state: checks object maa toggle
  if (habit.checks[dateKey]) {
    delete habit.checks[dateKey];
  } else {
    habit.checks[dateKey] = true;
  }
  save();
  render();
}

// ─── STREAK CALCULATION ──────────────────────────────────────────────────────
function calcStreaks(habit) {
  // Sabai checked dates sort garko
  const checkedDates = Object.keys(habit.checks)
    .filter(k => habit.checks[k])
    .sort();

  if (checkedDates.length === 0) {
    return { current: 0, longest: 0, total: 0 };
  }

  const total = checkedDates.length;

  // Longest streak
  let longest = 1, tempLen = 1;
  for (let i = 1; i < checkedDates.length; i++) {
    const prev = new Date(checkedDates[i - 1]);
    const curr = new Date(checkedDates[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      tempLen++;
      if (tempLen > longest) longest = tempLen;
    } else {
      tempLen = 1;
    }
  }

  // Current streak: aajako din bata pachi farkera consecutive count
  let current = 0;
  const todayStr = dateKey(today);
  let checkDate  = new Date(today);

  while (true) {
    const key = dateKey(checkDate);
    if (habit.checks[key]) {
      current++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { current, longest, total };
}

// ─── DATE KEY HELPER ─────────────────────────────────────────────────────────
function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ─── DAYS IN MONTH ───────────────────────────────────────────────────────────
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay(); // 0=Sun
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function render() {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  monthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

  habitGrid.innerHTML = '';
  emptyMsg.style.display = habits.length === 0 ? 'block' : 'none';

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWk = getFirstDayOfWeek(viewYear, viewMonth);
  const todayStr     = dateKey(today);

  habits.forEach(habit => {
    const { current, longest, total } = calcStreaks(habit);

    // Completion % for this month
    const checkedThisMonth = Object.keys(habit.checks).filter(k => {
      return habit.checks[k] && k.startsWith(`${viewYear}-${String(viewMonth+1).padStart(2,'0')}`);
    }).length;

    // Days passed so far in viewed month
    let daysPassed = daysInMonth;
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
      daysPassed = today.getDate();
    } else if (
      viewYear > today.getFullYear() ||
      (viewYear === today.getFullYear() && viewMonth > today.getMonth())
    ) {
      daysPassed = 0;
    }

    const compPct = daysPassed > 0
      ? Math.round((checkedThisMonth / daysPassed) * 100)
      : 0;

    // ── Build card ──
    const card = document.createElement('div');
    card.className = 'habit-card';
    card.innerHTML = `
      <div class="habit-header">
        <div class="habit-left">
          <div class="habit-dot" style="background:${habit.color}"></div>
          <span class="habit-name">${habit.name}</span>
        </div>
        <div class="habit-right">
          <div class="streak-badges">
            <span class="badge current">🔥 ${current} day streak</span>
            <span class="badge longest">🏆 Best: ${longest}</span>
            <span class="badge total">✅ Total: ${total}</span>
          </div>
          <button class="del-btn" onclick="deleteHabit(${habit.id})">✖</button>
        </div>
      </div>

      <div class="day-labels">
        ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
          .map(d => `<div class="day-label">${d}</div>`).join('')}
      </div>

      <div class="day-grid" id="grid-${habit.id}"></div>

      <div class="completion-row">
        <div class="comp-bar-bg">
          <div class="comp-bar-fill"
            style="width:${compPct}%; background:${habit.color}"></div>
        </div>
        <span class="comp-label">${compPct}%</span>
      </div>
    `;
    habitGrid.appendChild(card);

    // ── Fill day grid ──
    const grid = document.getElementById(`grid-${habit.id}`);

    // Empty cells before day 1
    for (let i = 0; i < firstDayOfWk; i++) {
      const blank = document.createElement('div');
      blank.style.aspectRatio = '1';
      grid.appendChild(blank);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const isFuture  = dStr > todayStr;
      const isToday   = dStr === todayStr;
      const isChecked = !!habit.checks[dStr];

      const cell = document.createElement('div');
      cell.className = 'day-cell'
        + (isChecked ? ' checked' : '')
        + (isFuture  ? ' future'  : '')
        + (isToday   ? ' today'   : '');

      if (isChecked) {
        cell.style.background = habit.color;
        cell.style.borderColor = habit.color;
      }

      cell.innerHTML = `
        <span class="day-num">${d}</span>
        <span class="check-icon">✓</span>
      `;

      if (!isFuture) {
        cell.addEventListener('click', () => toggleDay(habit.id, dStr));
      }

      grid.appendChild(cell);
    }
  });
}

// ─── SAVE ────────────────────────────────────────────────────────────────────
function save() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

// ─── INIT ────────────────────────────────────────────────────────────────────
render();