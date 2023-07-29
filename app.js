"use strict";

// select elements
const billInput = document.querySelector(".bill_input");
const peopleInput = document.querySelector(".people_input");
const tipBtns = document.querySelectorAll(".tip_btn");
const resetBtn = document.querySelector(".reset_btn");
const customInput = document.querySelector(".custom_input");
const tipElement = document.querySelector(".price_tip_amount");
const totalElement = document.querySelector(".price_total_amount");
const peopleError = document.querySelector(".people_error");
const billError = document.querySelector(".bill_error");

/* create variables for bill, tip percentage, number of people, 
total tip per person and total amount per person*/
let bill = 0;
let tipPercentage = 0;
let numPeople = 0;
let totalTipPerPerson = 0;
let totalAmountPerPerson = 0;

// update prices functionality
function updatePrices() {
  // check if bills, tipPercentage and numPeople are not 0 or empty
  if (bill && tipPercentage && numPeople) {
    // calculate tip from tip percentage
    let tip = (tipPercentage / 100) * bill;
    // calculate total amount using bill and tip
    let totalAmount = bill + tip;
    // update total tip to be paid per person
    totalTipPerPerson = tip / numPeople;
    // update total amount to be paid per person
    totalAmountPerPerson = totalAmount / numPeople;
  }
  //   if any of bills, tipPercentage, numPeople are empty or 0
  else {
    // set totalTipPerson and totalAmountPerPerson to 0
    totalTipPerPerson = 0;
    totalAmountPerPerson = 0;
  }
  //   update text content displayed to user
  totalElement.textContent = `$${totalAmountPerPerson.toFixed(2)}`;
  tipElement.textContent = `$${totalTipPerPerson.toFixed(2)}`;
}

// ////////////////////////////////////////
// helper function to remove disabled from reset button and updatePrices
function removeDisabledAndUpdatePrices() {
  resetBtn.disabled = false;
  updatePrices();
}

// ////////////////////////////////////////
// helper function to add success / danger border to inputs
function successDangerBorder(input) {
  // check if there is input
  if (input.value.length > 0) {
    // if input is not equal to "0"
    if (input.value !== "0") {
      // add success and remove danger class
      input.classList.add("success");
      input.classList.remove("danger");
    }
    // if input is 0
    else {
      // add danger and remove success class
      input.classList.add("danger");
      input.classList.remove("success");
    }
  }
  //   if there is no input
  else {
    // remove danger and success class
    input.classList.remove("danger", "success");
  }
}

// /////////////////////////////////////////
// bill input functionality
billInput.addEventListener("input", () => {
  // update bill with user input
  bill = Number(billInput.value);

  // display error message if input is 0
  if (billInput.value.length > 0) {
    if (billInput.value === "0") {
      billError.textContent = `Can't be zero`;
    }
  } else {
    billError.textContent = ``;
  }

  // add success or danger border to billInput
  successDangerBorder(billInput);

  // call removeDisabledAndUpdatePrices function
  removeDisabledAndUpdatePrices();
});

// ////////////////////////////////////////
//number of people functionality
peopleInput.addEventListener("input", () => {
  // update numPeople with user input
  numPeople = Number(peopleInput.value);

  //   add success or danger border to peopleInput
  successDangerBorder(peopleInput);

  // display error message if input is 0
  if (peopleInput.value.length > 0) {
    if (peopleInput.value === "0") {
      peopleError.textContent = `Can't be zero`;
    }
  } else {
    peopleError.textContent = ``;
  }

  // call removeDisabledAndUpdatePrices function
  removeDisabledAndUpdatePrices();
});

// /////////////////////////////////////////
// active button functionality
tipBtns.forEach((btn) => {
  // listen to an individual button click
  btn.addEventListener("click", () => {
    // ensure there is no custom input
    if (customInput.value.length === 0) {
      // loop over all buttons
      for (let i = 0; i < tipBtns.length; i++) {
        // check if current button matches clicked button
        if (tipBtns[i] === btn) {
          // if current button matches clicked button, add active class
          tipBtns[i].classList.add("active");
          // set tip percentage to text content in current button
          // the text content contains % at the end eg 5%, 10% etc.
          //we can remove the % by using string slice method
          tipPercentage = Number(btn.textContent.slice(0, -1));
        } else {
          // if current button does not match clicked button, remove active class
          tipBtns[i].classList.remove("active");
        }
        //   end loop
      }
      //end check for custom input
    } else {
      alert(
        "Kindly clear the custom tip input to choose one of our default percentages!!"
      );
      btn.classList.add("");
    }
    // call removeDisabledAndUpdatePrices function
    removeDisabledAndUpdatePrices();
  });
});

////////////////////////////////////////////////
// custom tip functionality
customInput.addEventListener("input", () => {
  // remove active class from all buttons
  tipBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  // set tip percentage to customInput value
  tipPercentage = customInput.value;
  // call removeDisabledAndUpdatePrices function
  removeDisabledAndUpdatePrices();
});

// /////////////////////////////////////////
// reset functionality
resetBtn.addEventListener("click", () => {
  // remove active class from all buttons
  tipBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  // reset bill, tipPercentage and numPeople
  bill = 0;
  tipPercentage = 0;
  numPeople = 0;

  //reset billInput, peopleInput and customInput
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";

  //   reset input borders
  successDangerBorder(billInput);
  successDangerBorder(peopleInput);

  // update prices
  updatePrices();
  //   disable button
  resetBtn.disabled = true;
});
