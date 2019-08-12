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
    populateTransactions(retrieved);
  } else {
    addStorage(transactions);
  }
})();

// TRANSACTION FUNCTIONALITY

function createTransaction() {
  // Create an object and gather the information for the transaction.

  // To generate a unique id, get all the transactions and add one to the id of the last one.

  //   generatedId = data.allItems[type][data.allItems[type].length - 1].id + 1;
  generatedId = 1;
  typeEntered = "income";
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
  var enteredTransaction = createTransaction();

  // Add transaction to data structure

  transactions.logs.incomes.unshift(enteredTransaction);

  // Add to local storage
  addStorage(transactions);

  console.log("Transaction added");
  console.log(enteredTransaction);
}

function populateTransactions(transactions) {
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
        '</div></div><div class="transaction_item_value"><div class="transaction_item_value-number">' +
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
