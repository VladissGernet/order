const checkPhoneInput = (inputField) => {
  const inputFieldLength = inputField.value.length;
  const isPhoneFieldFilledIn = inputField.minLength === inputFieldLength && inputField.maxLength === inputFieldLength;
  if (isPhoneFieldFilledIn) {
    inputField.closest('.input-wrapper').classList.remove('input-wrapper--error');
    return;
  }
  inputField.closest('.input-wrapper').classList.add('input-wrapper--error');
};

export {checkPhoneInput};
