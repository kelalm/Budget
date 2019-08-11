// Automatic Startup Functionality

// When button is clicked JS

function addTransaction() {
  // Create an object and gather the information for the transaction.

  typeEntered = "income";
  descriptionEntered = document.getElementById("note").value;
  valueEntered = document.getElementById("value").value;

  var transaction = {
    type: typeEntered,
    description: descriptionEntered,
    value: valueEntered
  };

  console.log("Transaction added");
  console.log(transaction);
}
