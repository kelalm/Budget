// Automatic Startup Functionality

var startup = (function() {
  console.log("BUDGET APP STARTUP");

  // Retrieve Transactions from Local Storage, Populate List
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

  // Add to local storage
  addStorage(enteredTransaction);

  // Display this on the transaction list
  const div = document.createElement("div");

  div.className = "row";

  div.innerHTML =
    '<div class="transaction_item transaction_item-income" id="income-' +
    enteredTransaction.id +
    '"><div class="transaction_item_note"><div class="transaction_item_note-info">' +
    enteredTransaction.description +
    '</div></div><div class="transaction_item_value"><div class="transaction_item_value-number">' +
    enteredTransaction.value +
    '</div></div><button class="item__delete--btn"></button></div>';

  document.getElementById("transactions").appendChild(div);

  console.log("Transaction added");
  console.log(enteredTransaction);
}

function deleteTransaction() {}

// LOCAL STORAGE FUNCTIONALITY

function addStorage(transaction) {
  console.log("Add storage");
  var key = "data";

  var data = transaction;

  //localStorage setItem
  if ("localStorage" in window) {
    console.log(
      "Setting item " +
        key.value +
        " to " +
        JSON.stringify(data) +
        " in localStorage"
    );
    localStorage.setItem(key, JSON.stringify(data));
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
