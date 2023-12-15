import {initTabs} from './init-tabs.js';
import {initialPageCondition} from './initial-page-condition.js';
import {addPhoneMask} from './masks.js';
import {pickUpBlock} from './elements.js';

initialPageCondition();
initTabs();
addPhoneMask();

// input-wrapper--error adds error

//pick-up block elements.
const pickUpSubmit = pickUpBlock.querySelector('.form__submit-btn');
const pickUpPhone = pickUpBlock.querySelector('[name="phone"]');
const pickUpSubmitContainer = pickUpBlock.querySelector('.form__submit-state');
const pickUpSubmitHelp = pickUpSubmitContainer.querySelector('.form__submit-help');

//input phone error
const checkPhoneInput = (inputField) => {
  const inputFieldLength = inputField.value.length;
  const isPhoneFieldFilledIn = inputField.minLength === inputFieldLength && inputField.maxLength === inputFieldLength;
  if (isPhoneFieldFilledIn) {
    inputField.closest('.input-wrapper').classList.remove('input-wrapper--error');
    return;
  }
  inputField.closest('.input-wrapper').classList.add('input-wrapper--error');
};

//submit button conditions for unblocking
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

//pick-up submit
pickUpSubmit.disabled = false;
pickUpSubmitContainer.style.display = 'none';
pickUpSubmitHelp.innerHTML = '';
const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  checkPhoneInput(pickUpPhone);
  updateSubmitHelp(pickUpBlock);
};
pickUpSubmit.addEventListener('click', onSubmitButtonClick);
