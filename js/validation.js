import { PHONE_FILED_LENGTH, paymentMethod } from './constants.js';
import { validateCardNumberViaLunah } from './util.js';
import {
  pickUpBlock,
  pickUpSubmitHelp,
  pickUpSubmitContainer,
  pickUpForm,
  pickUpSubmitButton
} from './elements.js';
import { sendData } from './load-data.js';

const checkPhoneInput = (form) => {
  const phoneContainer = form.querySelector('.js-input--phone');
  const phoneField = phoneContainer.querySelector('[name="phone"]');
  const inputFieldLength = phoneField.value.length;
  const isPhoneFieldFilledIn = inputFieldLength === PHONE_FILED_LENGTH;
  if (isPhoneFieldFilledIn) {
    phoneField.closest('.input-wrapper').classList.remove('input-wrapper--error');
    return true;
  }
  phoneField.closest('.input-wrapper').classList.add('input-wrapper--error');
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
const validateForm = (form, ...validationFunctions) => {
  const paymentMethodBlock = form.querySelector('.js-radio--payment-method');
  const initialValidationResult = validationFunctions.map((validate) => validate(form));
  const isErrorOnForm = initialValidationResult.includes(false);
  const checkAndUpdate = () => {
    const validationResult = validationFunctions.map((validate) => validate(form));
    const isNoErrors = validationResult.includes(false) === false;
    updateSubmitHelp(pickUpBlock);
    if (isNoErrors) {
      const allInputs = pickUpForm.querySelectorAll('.js-input--validation');
      allInputs.forEach((element) => {
        element.removeEventListener('input', checkAndUpdate);
      });
      pickUpSubmitButton.disabled = false;
    }
  };
  let onPaymentMethodChangeResetValidation = {};
  paymentMethodBlock.removeEventListener('change', onPaymentMethodChangeResetValidation);
  onPaymentMethodChangeResetValidation = () => {
    const allInputs = pickUpForm.querySelectorAll('.js-input--validation');
    allInputs.forEach((element) => {
      element.removeEventListener('input', checkAndUpdate);
      element.classList.remove('input-wrapper--error');
    });
    pickUpSubmitButton.disabled = false;
    updateSubmitHelp(pickUpBlock);
  };
  paymentMethodBlock.addEventListener('change', onPaymentMethodChangeResetValidation);
  if (isErrorOnForm === true) {
    pickUpSubmitButton.disabled = true;
    const containersToCheck = pickUpForm.querySelectorAll('.js-input--validation');
    containersToCheck.forEach((element) => {
      element.addEventListener('input', checkAndUpdate);
    });
    updateSubmitHelp(pickUpBlock);
    return false;
  }
  return true;
};
const onFormSubmit = (evt) => {
  evt.preventDefault();
  const paymentMethodBlock = pickUpForm.querySelector('.js-radio--payment-method');
  const selectedPaymentMethod = paymentMethodBlock.querySelector(':checked').value;
  const formData = new FormData(evt.target);
  let validationResult = false;
  if (selectedPaymentMethod === paymentMethod.card) {
    validationResult = validateForm(pickUpForm, checkCardInputFields, checkPhoneInput);
  }
  if (selectedPaymentMethod === paymentMethod.cash) {
    validationResult = validateForm(pickUpForm, checkPhoneInput);
    formData.delete('card-number');
  }
  if (validationResult) {
    sendData(formData);
  }
};
const initFormValidation = () => {
  pickUpForm.addEventListener('submit', onFormSubmit);
};

export { initFormValidation };
