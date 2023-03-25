const INVALID_ADDRESS_ALERT = "ETH Address contains invalid characters. Please input a"  
+ " hexadecimal address and ensure that all characters are alphanumeric.\n"
const INVALID_AMOUNT_ALERT = "ETH Amount contains invalid characters. Please input a"  
+ " decimal amount and ensure that all characters are numeric.\n"
const INVALID_OTP_ALERT = "OTP contains invalid characters. Please input only"  
+ " alphanumeric characters.\n"
const EMPTY_ADDRESS_ALERT = "Please input ETH Address.\n"
const EMPTY_AMOUNT_ALERT = "Please input transaction amount. \n"
const EMPTY_OTP_ALERT = "Please input OTP.\n"

function validateInputs() {
    window.location = "/done.html"
    inputAddress = document.getElementById("input-address").value
    inputAmount = document.getElementById("input-amount").value
    inputOtp = document.getElementById("input-otp").value
    var validAddress = true;
    var validAmount = true;
    var validOtp = true;
    var emptyAddress = false;
    var emptyAmount = false;
    var emptyOtp = false;
    var invalidInput = false;
    if (inputAddress == "") {
        emptyAddress = true;
        invalidInput = true;
    }
    if (inputAmount == "") {
        emptyAmount = true;
        invalidInput = true;
    }
    if (inputOtp == "") {
        emptyOtp = true;
        invalidInput = true;
    }
    if (!isAlphaNumeric(inputAddress)) {
        validAddress = false;
        invalidInput = true
    }
    if (!isNumeric(inputAmount)) {
        validAmount = false;
        invalidInput = true
    }
    if (!isAlphaNumeric(inputOtp)) {
        validOtp = false;
        invalidInput = true
    }
    if (invalidInput) {
        var alertMessage = "Invalid inputs detected. \n"
        if (emptyAddress) {
            alertMessage += EMPTY_ADDRESS_ALERT;
        }
        if (emptyAmount) {
            alertMessage += EMPTY_AMOUNT_ALERT;
        }
        if (emptyOtp) {
            alertMessage += EMPTY_OTP_ALERT;
        }
        if (!validAddress) {
            alertMessage += INVALID_ADDRESS_ALERT;
        }
        if (!validAmount) {
            alertMessage += INVALID_AMOUNT_ALERT;
        }
        if (!validOtp) {
            alertMessage += INVALID_OTP_ALERT;
        }
        window.location = "done.html";
        // alert(alertMessage);
    } else {
        window.location = "done.html";
    }
}

function submitTransaction() {
    validateInputs();
}

function toDonePage() {
    console.log("submitted");
    window.location = "done.html";
}

function toTransactionForm() {
    window.location = "index.html";
}

function isNumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code == 46)) // decimal point (.)
        { 
        return false;
      }
    }
    return true;
  };

  function isAlphaNumeric(str) {
    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
          !(code > 64 && code < 91) && // upper alpha (A-Z)
          !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };
  