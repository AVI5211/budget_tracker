document.getElementById('addExpenseForm').addEventListener('submit', addExpense);

let expenses = [];
let chart;

function addExpense(event) {
    event.preventDefault();

    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    const expenseCategory = document.getElementById('expenseCategory').value;

    const expense = { name: expenseName, amount: expenseAmount, category: expenseCategory };
    expenses.push(expense);
    updateExpenseList();
    updateChart();
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenses');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: Rs.${expense.amount.toFixed(2)} - ${expense.category}`;
        expenseList.appendChild(li);
    });
}

function updateChart() {
    const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Others'];
    const data = categories.map(category => {
        return expenses
            .filter(expense => expense.category === category)
            .reduce((total, expense) => total + expense.amount, 0);
    });

    const ctx = document.getElementById('expenseChart').getContext('2d');

    if (chart) {
        chart.destroy(); // Destroy the previous chart before creating a new one
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}
