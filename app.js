
const cardNumber = document.querySelector("#card_number");
const errorMessage = document.querySelector(".error");
const dataError = document.querySelector(".date-error");
const nameValue = document.querySelector(".Name-value");
const cvcError = document.querySelector(".cvc-error");
const updatedCvc = document.querySelector(".updated-number");
const updatedName = document.querySelector(".update__name");
const monthEl = document.querySelector(".month");
const yearEl = document.querySelector(".year");
const errorNameEl = document.querySelector(".error-name");
const updateCvcValue = document.querySelector(".update-cvc__value");
const btnEl = document.querySelector(".ctn");
const CvcEl = document.querySelector(".cvc__number");
const validateMonth = document.querySelector(".validate-month");
const validateYear = document.querySelector(".validate-year");
const formEl = document.querySelector(".form");


const confrimEl = document.querySelector(".confirmation___message");

const currentDate = new Date();

function validateName(){
  const newName = nameValue.value.trim();
  const pattern = /^[a-zA-Z\s]+$/;
  if(newName === "" || !pattern.test(newName)){
    errorNameEl.textContent = "Invalid name";

  }
  else{
    updatedName.textContent = newName;
    errorNameEl.textContent = "";
  }
}

function validateCardNumber(){
  const newcardNumber = cardNumber.value.replace(/\s/g, "");

  if(newcardNumber.length > 16 || isNaN(newcardNumber)){
    errorMessage.textContent = "Wrong format, numbers only";
    cardNumber.style.border = "1px solid red";
  }
    else{
      errorMessage.textContent = "";
      cardNumber.style.border = "";
  
      updatedCvc.textContent = formatCardNumberWithSpaces(newcardNumber);
    }
}
function formatCardNumberWithSpaces(cvc) {
  const groups = cvc.match(/\d{1,4}/g); // Split into groups of four characters
  return groups.join(" "); // Join groups with a space in between
}
function validateExpirationDate(){
  const newValidateMonth = Number(validateMonth.value);
  const newValidateYear = Number(validateYear.value);
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  if (isNaN(newValidateMonth) || isNaN(newValidateYear) || newValidateMonth < 1 || newValidateMonth > 12 || newValidateYear < currentYear || (newValidateYear === currentYear && newValidateMonth < currentMonth)) {
    dataError.textContent = "Can't be blank";
    validateMonth.style.border = "1px solid red";
    validateYear.style.border = "1px solid red";
  } else {
    dataError.textContent = "";
    validateMonth.style.border = "";
    validateYear.style.border = "";
    monthEl.textContent = newValidateMonth;
    yearEl.textContent = `/${newValidateYear}`;
  }


}
function validateCvc(){
  const newCvcEl = Number(CvcEl.value);
  if(isNaN(newCvcEl)|| newCvcEl.toString().length < 3){
    cvcError.textContent = "Invalid CVC";
    CvcEl.style.border ="1px solid red"
  }
  else{
    cvcError.textContent="";
    CvcEl.style.border =""
    updateCvcValue.textContent = newCvcEl;
  }
}

cardNumber.addEventListener("input", validateCardNumber);
validateMonth.addEventListener("input", validateExpirationDate);
validateYear.addEventListener("input", validateExpirationDate);
CvcEl.addEventListener("input", validateCvc);
nameValue.addEventListener("input", validateName)

btnEl.addEventListener("click", () => {
  const newCvcEl = Number(CvcEl.value);
  const newName = nameValue.value.trim();
  const newcardNumber = cardNumber.value.replace(/\s/g, "");
  const newValidateMonth = Number(validateMonth.value);
  const newValidateYear = Number(validateYear.value);
// To prevent the btnEl from taking te user to another field in case of errors we can add a flag to track the  validation status
let isValid = true;
const pattern = /^[a-zA-Z\s]+$/;
if(newName === "" || !pattern.test(newName)){
  errorNameEl.textContent = "Invalid name";
  isValid = false

}
else{
  updatedName.textContent = newName;
  errorNameEl.textContent = "";
}
  // Validate card number
  if (newcardNumber.length > 16 || isNaN(newcardNumber)) {
    errorMessage.textContent = "Wrong format, numbers only";
    isValid = false; // Set flag to false
  } else {
    errorMessage.textContent = "";
    updatedCvc.textContent = formatCardNumberWithSpaces(newcardNumber);
  }
    // Validate expiration date
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
  
    if (
      isNaN(newValidateMonth) ||
      isNaN(newValidateYear) ||
      newValidateMonth < 1 ||
      newValidateMonth > 12 ||
      newValidateYear < currentYear ||
      (newValidateYear === currentYear && newValidateMonth < currentMonth)
    ) {
      dataError.textContent = "Can't be blank";
      isValid = false; // Set flag to false
    } else {
      dataError.textContent = "";
      monthEl.textContent = newValidateMonth;
      yearEl.textContent = `/${newValidateYear}`;
    }

      // Validate CVC
  if (isNaN(newCvcEl) || newCvcEl.toString().length < 3) {
    cvcError.textContent = "Invalid CVC";
    isValid = false; // Set flag to false
  } else {
    cvcError.textContent = "";
    updateCvcValue.textContent = newCvcEl;
  }
  if (!isValid) {
    alert("Fill all fields in the form correctly");
  } else {
    formEl.style.display = "none";
    confrimEl.style.display = "block";
  }
});

