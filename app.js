// Transactons Data Structure
var transactions = {
  logs: {
    incomes: [],
    expenses: []
  },
  totals: {
    incomes: 0,
    expenses: 0
  },
  budget: 0
};

// Startup Functionality

var startup = (function() {
  // Retrieve Transactions from Local Storage, Populate List

  var retrieved = getStorage();

  if (retrieved !== undefined) {
    updateUI(retrieved);
  } else {
    addStorage(transactions);
    updateUI(transactions);
  }
})();

// ======== *** ======== //

// USER INTERFACE FUNCTIONALITY

function updateUI(retrieved) {
  populateTransactions(retrieved);
  updateHeaderInfo();
}

function updateColor() {
  if (document.getElementById("checkbox").checked === true) {
    document.getElementsByClassName("form_input")[0].style.color =
      "var(--color-red)";
    document.getElementsByClassName("form_input")[1].style.color =
      "var(--color-red)";
    document.getElementsByClassName("form_input")[0].style.borderBottom =
      "2px solid rgba(214, 85, 85, 0.6)";
    document.getElementsByClassName("form_input")[1].style.borderBottom =
      "2px solid rgba(214, 85, 85, 0.6)";
    document.getElementsByClassName("add_button")[0].style.color =
      "var(--color-red)";
    document.getElementsByClassName("add_button")[0].style.border =
      "3px solid var(--color-red)";
  } else {
    document.getElementsByClassName("form_input")[0].style.color =
      "var(--color-green)";
    document.getElementsByClassName("form_input")[1].style.color =
      "var(--color-green)";
    document.getElementsByClassName("form_input")[0].style.borderBottom =
      "2px solid rgba(98, 193, 93, 0.6)";
    document.getElementsByClassName("form_input")[1].style.borderBottom =
      "2px solid rgba(98, 193, 93, 0.6)";
    document.getElementsByClassName("add_button")[0].style.color =
      "var(--color-green)";
    document.getElementsByClassName("add_button")[0].style.border =
      "3px solid var(--color-green)";
  }
}
// ======== *** ======== //

function updateHeaderInfo() {
  // reset non-static info
  document.getElementsByClassName("income_amount")[0].innerHTML = "$";
  document.getElementsByClassName("expenses_amount")[0].innerHTML = "$";
  document.getElementsByClassName("net_money")[0].innerHTML = "$";

  // Update the date at the top
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  document.getElementsByClassName("month_year")[0].innerHTML =
    months[new Date().getMonth()] + " " + new Date().getFullYear();

  var transactions = getStorage();

  // Update Income Label
  var inc = 0;
  transactions.logs.incomes.forEach(transaction => {
    inc += parseInt(transaction.value);
  });

  document.getElementsByClassName("income_amount")[0].innerHTML += inc;

  // Update Expenses Label
  var exp = 0;
  transactions.logs.expenses.forEach(transaction => {
    exp += parseInt(transaction.value);
  });
  document.getElementsByClassName("expenses_amount")[0].innerHTML += exp;

  // Update Net Label

  document.getElementsByClassName("net_money")[0].innerHTML += inc - exp;
}

// ======== *** ======== //

// TRANSACTION FUNCTIONALITY

function createTransaction() {
  // Create an object and gather the information for the transaction.

  // To generate a unique id, get all the transactions and add one to the id of the last one.

  var allTransactions = getStorage();

  // Read the first ID in each array and get highest ID.

  var first =
    allTransactions.logs.incomes[0] !== undefined
      ? allTransactions.logs.incomes[0].id
      : 0;

  var second =
    allTransactions.logs.expenses[0] !== undefined
      ? allTransactions.logs.expenses[0].id
      : 0;

  var highest = Math.max(first, second);

  var generatedId = highest + 1;
  if (document.getElementById("checkbox").checked === false) {
    typeEntered = "income";
  } else {
    typeEntered = "expense";
  }
  descriptionEntered = document.getElementById("note").value;
  valueEntered = document.getElementById("value").value;

  var transaction = {
    id: generatedId,
    type: typeEntered,
    description: descriptionEntered,
    value: valueEntered
  };

  return transaction;
}

function addTransaction() {
  // Add entered transaction to income or expenses array of current storage

  var enteredTransaction = createTransaction();

  var currentStorage = getStorage();

  if (enteredTransaction.type === "income") {
    currentStorage.logs.incomes.unshift(enteredTransaction);
  } else if (enteredTransaction.type === "expense") {
    currentStorage.logs.expenses.unshift(enteredTransaction);
  }

  // Add entire data structure to local storage
  addStorage(currentStorage);

  updateUI(currentStorage);

  document.getElementsByClassName("form_input")[0].value = "";
  document.getElementsByClassName("form_input")[1].value = "";
}

function populateTransactions(transactions) {
  document.getElementById("transactions").innerHTML = "";

  // Parse Transactions and retrieve each one.
  // Display this on the transaction list

  if (transactions.logs.incomes.length === 0) {
    // Ignore the income array
  } else {
    transactions.logs.incomes.forEach(transaction => {
      const div = document.createElement("div");
      div.className = "row";

      div.innerHTML =
        '<div class="transaction_item transaction_item-income" id="income-' +
        transaction.id +
        '"><div class="transaction_item_note"><div class="transaction_item_note-info">' +
        transaction.description +
        '</div></div><div class="transaction_item_value"><div class="transaction_item_value-number" style="color: var(--color-green)">+ $' +
        transaction.value +
        '</div></div><button class="delete_button" id="' +
        transaction.id +
        '"onclick="deleteTransaction(this.id)">-</button></div>';

      document.getElementById("transactions").appendChild(div);
    });
  }

  if (transactions.logs.expenses.length === 0) {
    // Ignore the expense array
  } else {
    transactions.logs.expenses.forEach(transaction => {
      const div = document.createElement("div");
      div.className = "row";

      div.innerHTML =
        '<div class="transaction_item transaction_item-income" id="expense-' +
        transaction.id +
        '"><div class="transaction_item_note"><div class="transaction_item_note-info">' +
        transaction.description +
        '</div></div><div class="transaction_item_value"><div class="transaction_item_value-number" style="color: var(--color-red)">- $' +
        transaction.value +
        '</div></div><button class="delete_button" id="' +
        transaction.id +
        '"onclick="deleteTransaction(this.id)">-</button></div>';

      document.getElementById("transactions").appendChild(div);
    });
  }
}

function deleteTransaction(id) {
  var allTransactions = getStorage();

  for (var i = allTransactions.logs.incomes.length - 1; i >= 0; i--) {
    if (allTransactions.logs.incomes[i].id == id) {
      allTransactions.logs.incomes.splice(i, 1);
    }
  }

  for (var i = allTransactions.logs.expenses.length - 1; i >= 0; i--) {
    if (allTransactions.logs.expenses[i].id == id) {
      allTransactions.logs.expenses.splice(i, 1);
    }
  }

  addStorage(allTransactions);
  updateUI(allTransactions);
}

// ======== *** ======== //

// ======== *** ======== //

// LOCAL STORAGE FUNCTIONALITY

function addStorage(transactions) {
  var key = "data";

  var allData = getStorage();

  //localStorage setItem
  if ("localStorage" in window) {
    localStorage.setItem(key, JSON.stringify(transactions));
  } else {
    alert("Error - no local storage in current window.");
  }
}

function getStorage() {
  //localStorage removeItem
  if ("localStorage" in window) {
    if (localStorage.length > 0) {
      return JSON.parse(localStorage.getItem("data"));
    }
  } else {
    alert("Error - no local storage in current window.");
  }
}

// ======== *** ======== //
