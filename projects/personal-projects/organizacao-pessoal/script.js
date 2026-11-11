// Estado Global da Aplicação
let appData = {
    habits: JSON.parse(localStorage.getItem('lifeos_habits')) || [
        { id: '1', name: 'Estudar Programação', icon: 'fa-code', completions: {} },
        { id: '2', name: 'Treinar na Academia', icon: 'fa-dumbbell', completions: {} },
        { id: '3', name: 'Beber 3L de Água', icon: 'fa-glass-water', completions: {} }
    ],
    transactions: JSON.parse(localStorage.getItem('lifeos_transactions')) || [
        { id: '1', desc: 'Salário Mensal', amount: 4500.00, type: 'income', category: 'Trabalho', date: new Date().toISOString().split('T')[0] },
        { id: '2', desc: 'Supermercado', amount: 350.50, type: 'expense', category: 'Alimentação', date: new Date().toISOString().split('T')[0] }
    ]
};

let currentTransType = 'income';

// Salvar dados no localStorage
function saveData() {
    localStorage.setItem('lifeos_habits', JSON.stringify(appData.habits));
    localStorage.setItem('lifeos_transactions', JSON.stringify(appData.transactions));
}

// Alternar entre abas
function switchTab(tab) {
    const habitsSection = document.getElementById('tab-habits');
    const financeSection = document.getElementById('tab-finance');
    const btnHabits = document.getElementById('btn-habits');
    const btnFinance = document.getElementById('btn-finance');

    if (tab === 'habits') {
        habitsSection.classList.remove('hidden');
        financeSection.classList.add('hidden');
        btnHabits.className = "px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-emerald-500 text-slate-950 shadow";
        btnFinance.className = "px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 text-slate-400 hover:text-slate-200";
    } else {
        financeSection.classList.remove('hidden');
        habitsSection.classList.add('hidden');
        btnFinance.className = "px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-emerald-500 text-slate-950 shadow";
        btnHabits.className = "px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 text-slate-400 hover:text-slate-200";
    }
}

// Controle de Modais
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Formato de Data YYYY-MM-DD local
function getLocalDateString(dateObj = new Date()) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// --- MÓDULO DE HÁBITOS ---
function addHabit(e) {
    e.preventDefault();
    const name = document.getElementById('habit-name').value;
    const icon = document.getElementById('habit-icon').value;

    const newHabit = {
        id: Date.now().toString(),
        name,
        icon,
        completions: {}
    };

    appData.habits.push(newHabit);
    saveData();
    closeModal('habit-modal');
    document.getElementById('habit-form').reset();
    renderHabits();
    renderHeatmap();
}

function deleteHabit(id) {
    if (confirm("Tem certeza que deseja excluir este hábito?")) {
        appData.habits = appData.habits.filter(h => h.id !== id);
        saveData();
        renderHabits();
        renderHeatmap();
    }
}

function toggleHabitToday(id) {
    const todayStr = getLocalDateString();
    const habit = appData.habits.find(h => h.id === id);
    if (habit) {
        if (habit.completions[todayStr]) {
            delete habit.completions[todayStr];
        } else {
            habit.completions[todayStr] = true;
        }
        saveData();
        renderHabits();
        renderHeatmap();
    }
}

// Calcular Streaks
function calculateStreak(completions) {
    let currentStreak = 0;
    let d = new Date();
    
    // Verificar hoje
    let todayStr = getLocalDateString(d);
    if (!completions[todayStr]) {
        d.setDate(d.getDate() - 1);
        let yesterdayStr = getLocalDateString(d);
        if (!completions[yesterdayStr]) {
            return 0;
        }
    }

    // Conta dias retroativos consecutivos
    while (true) {
        let dateStr = getLocalDateString(d);
        if (completions[dateStr]) {
            currentStreak++;
            d.setDate(d.getDate() - 1);
        } else {
            break;
        }
    }
    return currentStreak;
}

function renderHabits() {
    const listEl = document.getElementById('habits-list');
    listEl.innerHTML = '';
    const todayStr = getLocalDateString();

    if (appData.habits.length === 0) {
        listEl.innerHTML = `<div class="col-span-full text-center py-8 text-slate-500 text-sm bg-cardBg border border-cardBorder rounded-2xl">Nenhum hábito cadastrado. Clique em "Novo Hábito" para começar!</div>`;
        return;
    }

    appData.habits.forEach(habit => {
        const isCompletedToday = !!habit.completions[todayStr];
        const streak = calculateStreak(habit.completions);

        const card = document.createElement('div');
        card.className = `bg-cardBg border p-4 rounded-2xl flex items-center justify-between transition-all ${isCompletedToday ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-cardBorder'}`;
        
        card.innerHTML = `
            <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl ${isCompletedToday ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-400 border border-cardBorder'} flex items-center justify-center text-lg transition-all">
                    <i class="fa-solid ${habit.icon}"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-sm text-slate-200">${habit.name}</h4>
                    <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-xs text-amber-400 font-medium flex items-center gap-1"><i class="fa-solid fa-fire"></i> ${streak} dias seguidos</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="toggleHabitToday('${habit.id}')" class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${isCompletedToday ? 'bg-emerald-500 text-slate-950 shadow' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}">
                    <i class="fa-solid ${isCompletedToday ? 'fa-check' : 'fa-circle'}"></i> ${isCompletedToday ? 'Concluído' : 'Marcar'}
                </button>
                <button onclick="deleteHabit('${habit.id}')" class="text-slate-500 hover:text-rose-400 p-2 transition-colors" title="Excluir Hábito">
                    <i class="fa-solid fa-trash-can text-sm"></i>
                </button>
            </div>
        `;
        listEl.appendChild(card);
    });
}

// Renderizar Heatmap (Estilo GitHub de 90 dias organizados por semanas)
function renderHeatmap() {
    const container = document.getElementById('github-heatmap');
    container.innerHTML = '';

    const numDays = 91; 
    const today = new Date();
    let startDate = new Date();
    startDate.setDate(today.getDate() - numDays + 1);

    let weeks = [];
    let currentWeek = [];
    let loopDate = new Date(startDate);
    let totalCompletionsCount = 0;

    for (let i = 0; i < numDays; i++) {
        let dateStr = getLocalDateString(loopDate);
        let completedCount = 0;
        
        appData.habits.forEach(h => {
            if (h.completions[dateStr]) {
                completedCount++;
                totalCompletionsCount++;
            }
        });

        currentWeek.push({
            dateStr,
            count: completedCount,
            dateObj: new Date(loopDate)
        });

        if (currentWeek.length === 7 || i === numDays - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }

        loopDate.setDate(loopDate.getDate() + 1);
    }

    document.getElementById('total-completions-badge').innerText = `${totalCompletionsCount} conclusões nos últimos 3 meses`;

    const gridWrapper = document.createElement('div');
    gridWrapper.className = 'flex gap-1.5 items-center justify-start';

    weeks.forEach(week => {
        const col = document.createElement('div');
        col.className = 'flex flex-col gap-1.5';
        week.forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'w-3.5 h-3.5 rounded-sm transition-all cursor-pointer border';
            
            if (day.count === 0) {
                cell.className += ' bg-slate-900 border-slate-800';
            } else if (day.count === 1) {
                cell.className += ' bg-emerald-950 border-emerald-900/60';
            } else if (day.count === 2) {
                cell.className += ' bg-emerald-700 border-emerald-600';
            } else {
                cell.className += ' bg-emerald-500 border-emerald-400 shadow-sm shadow-emerald-500/30';
            }

            cell.title = `${day.dateStr}: ${day.count} hábitos concluídos`;
            col.appendChild(cell);
        });
        gridWrapper.appendChild(col);
    });

    container.appendChild(gridWrapper);
}

// --- MÓDULO FINANCEIRO ---
function setTransType(type) {
    currentTransType = type;
    const btnInc = document.getElementById('type-income');
    const btnExp = document.getElementById('type-expense');

    if (type === 'income') {
        btnInc.className = "flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all bg-emerald-500 text-slate-950 shadow";
        btnExp.className = "flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all text-slate-400 hover:text-slate-200";
    } else {
        btnExp.className = "flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all bg-rose-500 text-slate-950 shadow";
        btnInc.className = "flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all text-slate-400 hover:text-slate-200";
    }
}

function addTransaction(e) {
    e.preventDefault();
    const desc = document.getElementById('trans-desc').value;
    const amount = parseFloat(document.getElementById('trans-amount').value);
    const category = document.getElementById('trans-category').value;

    const newTx = {
        id: Date.now().toString(),
        desc,
        amount,
        type: currentTransType,
        category,
        date: getLocalDateString()
    };

    appData.transactions.unshift(newTx);
    saveData();
    closeModal('finance-modal');
    document.getElementById('finance-form').reset();
    setTransType('income');
    renderFinance();
}

function deleteTransaction(id) {
    appData.transactions = appData.transactions.filter(t => t.id !== id);
    saveData();
    renderFinance();
}

function renderFinance() {
    let totalIncome = 0;
    let totalExpense = 0;

    const listEl = document.getElementById('transactions-list');
    listEl.innerHTML = '';

    if (appData.transactions.length === 0) {
        listEl.innerHTML = `<div class="text-center py-8 text-slate-500 text-sm">Nenhuma transação registrada.</div>`;
        document.getElementById('fin-total').innerText = 'R$ 0,00';
        document.getElementById('fin-income').innerText = 'R$ 0,00';
        document.getElementById('fin-expense').innerText = 'R$ 0,00';
        return;
    }

    appData.transactions.forEach(tx => {
        if (tx.type === 'income') {
            totalIncome += tx.amount;
        } else {
            totalExpense += tx.amount;
        }

        const item = document.createElement('div');
        item.className = 'py-3 flex items-center justify-between text-sm';
        item.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'} flex items-center justify-center">
                    <i class="fa-solid ${tx.type === 'income' ? 'fa-arrow-down-long' : 'fa-arrow-up-long'}"></i>
                </div>
                <div>
                    <p class="font-semibold text-slate-200">${tx.desc}</p>
                    <div class="flex items-center gap-2 text-xs text-slate-400">
                        <span class="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">${tx.category}</span>
                        <span>${tx.date}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}">
                    ${tx.type === 'income' ? '+' : '-'} R$ ${tx.amount.toFixed(2).replace('.', ',')}
                </span>
                <button onclick="deleteTransaction('${tx.id}')" class="text-slate-500 hover:text-rose-400 p-1"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
        listEl.appendChild(item);
    });

    const totalBalance = totalIncome - totalExpense;
    
    document.getElementById('fin-income').innerText = `R$ ${totalIncome.toFixed(2).replace('.', ',')}`;
    document.getElementById('fin-expense').innerText = `R$ ${totalExpense.toFixed(2).replace('.', ',')}`;
    
    const totalEl = document.getElementById('fin-total');
    totalEl.innerText = `R$ ${totalBalance.toFixed(2).replace('.', ',')}`;
    totalEl.className = `text-2xl font-bold mt-1 ${totalBalance >= 0 ? 'text-slate-100' : 'text-rose-400'}`;
}

// Inicialização ao carregar a página
window.onload = function() {
    renderHabits();
    renderHeatmap();
    renderFinance();
};