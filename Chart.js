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
            maintainAspectRatio: true, // Maintain the aspect ratio
            aspectRatio: 1, // Adjust this value for size (1 = 1:1 ratio, making it smaller)
        }
    });
}
