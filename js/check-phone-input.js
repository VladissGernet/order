import { PHONE_FILED_LENGTH } from './constants.js';

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

export { checkPhoneInput };
