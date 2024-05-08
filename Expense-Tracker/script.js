document.addEventListener("DOMContentLoaded", function () {
  const expenseInput = document.getElementById("expenseInput");
  const amountInput = document.getElementById("amountInput");
  const addExpenseBtn = document.getElementById("addExpenseBtn");
  const expenseList = document.getElementById("expenseList");
  const totalExpenses = document.getElementById("totalExpenses");

  let expenses = [];

  addExpenseBtn.addEventListener("click", addExpense);

  function addExpense() {
    const description = expenseInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid expense description and amount.");
      return;
    }

    const expense = {
      description: description,
      amount: amount,
    };

    expenses.push(expense);

    renderExpenses();
    updateTotalExpenses();

    expenseInput.value = "";
    amountInput.value = "";
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.textContent = `${expense.description}: $${expense.amount.toFixed(2)}`;
      expenseList.appendChild(li);
    });
  }

  function updateTotalExpenses() {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    totalExpenses.textContent = total.toFixed(2);
  }
});
