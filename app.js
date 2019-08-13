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

// Automatic Startup Functionality

var startup = (function() {
  console.log("Startup Function");

  // Retrieve Transactions from Local Storage, Populate List

  var retrieved = getStorage();

  if (retrieved !== undefined) {
    console.log(typeof retrieved);
    updateUI(retrieved);
  } else {
    addStorage(transactions);
  }
})();

// Update User Interface With Updated Info

function updateUI(retrieved) {
  console.log("Updating UI");
  populateTransactions(retrieved);
  // updateHeaderInfo();
}

// TRANSACTION FUNCTIONALITY

function createTransaction() {
  // Create an object and gather the information for the transaction.

  // To generate a unique id, get all the transactions and add one to the id of the last one.

  var allTransactions = getStorage();

  var generatedId =
    allTransactions.logs.incomes.length +
    allTransactions.logs.expenses.length +
    1;
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
  console.log("Current storage - " + JSON.stringify(currentStorage.logs));

  if (enteredTransaction.type === "income") {
    currentStorage.logs.incomes.unshift(enteredTransaction);
  } else if (enteredTransaction.type === "expense") {
    currentStorage.logs.expenses.unshift(enteredTransaction);
  }

  // Add entire data structure to local storage
  addStorage(currentStorage);

  updateUI(currentStorage);

  console.log("Transaction added");
  console.log(enteredTransaction);
}

function populateTransactions(transactions) {
  document.getElementById("transactions").innerHTML = "";

  // Parse Transactions and retrieve each one.
  console.log("transactions -- " + JSON.stringify(transactions.logs.incomes));

  console.log("transaction length -- " + transactions.logs.incomes.length);

  // Display this on the transaction list

  if (transactions.logs.incomes.length === 0) {
    console.log("Ignore the Income array");
  } else {
    transactions.logs.incomes.forEach(transaction => {
      const div = document.createElement("div");
      div.className = "row";

      div.innerHTML =
        '<div class="transaction_item transaction_item-income" id="income-' +
        transaction.id +
        '"><div class="transaction_item_note"><div class="transaction_item_note-info">' +
        transaction.description +
        '</div></div><div class="transaction_item_value"><div class="transaction_item_value-number">$' +
        transaction.value +
        '</div></div><button class="item__delete--btn"></button></div>';

      document.getElementById("transactions").appendChild(div);
    });

    transactions.logs.expenses.forEach(transaction => {
      const div = document.createElement("div");
      div.className = "row";

      div.innerHTML =
        '<div class="transaction_item transaction_item-income" id="income-' +
        transaction.id +
        '"><div class="transaction_item_note"><div class="transaction_item_note-info">' +
        transaction.description +
        '</div></div><div class="transaction_item_value"><div class="transaction_item_value-number">$' +
        transaction.value +
        '</div></div><button class="item__delete--btn"></button></div>';

      document.getElementById("transactions").appendChild(div);
    });
  }
}

function deleteTransaction() {}

// ======== *** ======== //

// LOCAL STORAGE FUNCTIONALITY

function addStorage(transactions) {
  console.log("Add storage");
  var key = "data";

  var allData = getStorage();

  console.log("All data " + allData);

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

function removeStorage() {
  //localStorage removeItem
  if ("localStorage" in window) {
    if (localStorage.length > 0) {
      localStorage.removeItem("data");
      location.reload();
    }
  } else {
    alert("Error - no local storage in current window.");
  }
}

// ======== *** ======== //
