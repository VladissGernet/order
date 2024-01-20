import { PHONE_FILED_LENGTH, paymentMethod } from './constants.js';
import { validateCardNumberViaLunah } from './util.js';
import {
  pickUpBlock,
  pickUpSubmitHelp,
  pickUpSubmitContainer,
  pickUpPhone,
  pickUpForm,
  pickUpSubmitButton
} from './elements.js';
import { sendData } from './load-data.js';

const checkPhoneInput = (inputField) => {
  const inputFieldLength = inputField.value.length;
  const isPhoneFieldFilledIn = inputFieldLength === PHONE_FILED_LENGTH;
  if (isPhoneFieldFilledIn) {
    inputField.closest('.input-wrapper').classList.remove('input-wrapper--error');
    return true;
  }
  inputField.closest('.input-wrapper').classList.add('input-wrapper--error');
  return false;
};
const checkCardInputFields = (form) => {
  const cardNumberField = form.querySelector('.js-input--card-number');
  const cardFullNumberField = cardNumberField.querySelector('#card-full-number');
  const cardInputFields = cardNumberField.querySelectorAll('[id^="card-fields-"]');
  cardFullNumberField.value = `${cardInputFields[0].value}${cardInputFields[1].value}${cardInputFields[2].value}${cardInputFields[3].value}`;
  const isLunahAlgorithmCheckDone = validateCardNumberViaLunah(cardFullNumberField.value);
  if (isLunahAlgorithmCheckDone) {
    cardNumberField.classList.remove('input-wrapper--error');
    return true;
  }
  cardNumberField.classList.add('input-wrapper--error');
  return false;
};
const updateSubmitHelp = (blockContainer) => {
  const fieldsWithError = blockContainer.querySelectorAll('.input-wrapper--error');
  const isThereNoErrors = fieldsWithError.length === 0;
  pickUpSubmitHelp.innerHTML = '';
  if (isThereNoErrors) {
    pickUpSubmitContainer.style.display = 'none';
    return;
  }
  pickUpSubmitContainer.style.display = 'block';
  fieldsWithError.forEach((errorField, index) => {
    const newSpan = document.createElement('span');
    newSpan.textContent = errorField.querySelector('h4').textContent.toLowerCase();
    if (index > 0) {
      pickUpSubmitHelp.innerHTML += ' и ';
    }
    pickUpSubmitHelp.appendChild(newSpan);
  });
};
const onFormSubmit = (evt) => {
  evt.preventDefault();
  const selectedPaymentMethod = evt.target.querySelector('.input-wrapper--payment-method').querySelector(':checked').value;
  const isErrorOnForm = [checkPhoneInput(pickUpPhone), checkCardInputFields(pickUpForm)].includes(false);
  let checkAndUpdate = {};
  checkAndUpdate = () => {
    const isNoErrors = [checkPhoneInput(pickUpPhone), checkCardInputFields(pickUpForm)].includes(false) === false;
    if (isNoErrors) {
      const allInputs = pickUpForm.querySelectorAll('.js-input-validation');
      allInputs.forEach((element) => {
        element.removeEventListener('input', checkAndUpdate);
      });
      pickUpSubmitButton.disabled = false;
    }
    updateSubmitHelp(pickUpBlock);
  };
  if (isErrorOnForm === true) {
    pickUpSubmitButton.disabled = true;
    const containersToCheck = pickUpForm.querySelectorAll('.js-input-validation');
    containersToCheck.forEach((element) => {
      element.addEventListener('input', checkAndUpdate);
    });
    updateSubmitHelp(pickUpBlock);
    return;
  }
  const formData = new FormData(evt.target);
  if (selectedPaymentMethod === paymentMethod.cash) {
    formData.delete('card-number');
  }
  sendData(formData);
};

const initFormValidation = () => {
  pickUpForm.addEventListener('submit', onFormSubmit);
};

export { initFormValidation };

