const validateCardNumber = (cardNumber) => {
  cardNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cardNumber)) {
    return false;
  }
  const reversedCardNumber = cardNumber.split('').reverse().join('');
  let sum = 0;
  for (let i = 0; i < reversedCardNumber.length; i++) {
    let digit = parseInt(reversedCardNumber.charAt(i), 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
};
const maxCardNumberPartLength = 4;
const initPayment = (block) => {
  const paymentRadioInputs = block.querySelector('.input-wrapper--payment-method');
  const cardNumberField = block.querySelector('.js-input--card-number');
  const cardFullNumberField = cardNumberField.querySelector('#card-full-number');
  const cardFieldOne = cardNumberField.querySelector('#card-fields-1');
  const cardFieldTwo = cardNumberField.querySelector('#card-fields-2');
  const cardFieldThree = cardNumberField.querySelector('#card-fields-3');
  const cardFieldFour = cardNumberField.querySelector('#card-fields-4');
  const onPaymentChange = (evt) => {
    switch (evt.target.value) {
      case 'cash':
        cardNumberField.style.display = 'none';
        break;
      default:
        cardNumberField.style.display = 'flex';
        break;
    }
  };
  paymentRadioInputs.addEventListener('change', onPaymentChange);
  cardNumberField.addEventListener('keydown', (evt) => {
    const elementLength = evt.target.value.length;
    const elementId = evt.target.id;
    const isNumber = /\d/.test(evt.key);
    const isBackspace = evt.key === 'Backspace';
    const isArrowLeft = evt.key === 'ArrowLeft';
    const isArrowRight = evt.key === 'ArrowRight';
    const focusToTheNextField = () => {
      switch (elementId) {
        case 'card-fields-1':
          evt.preventDefault();
          cardFieldTwo.focus();
          break;
        case 'card-fields-2':
          evt.preventDefault();
          cardFieldThree.focus();
          break;
        case 'card-fields-3':
          evt.preventDefault();
          cardFieldFour.focus();
          break;
        case 'card-fields-4':
          if (isNumber === true) {
            evt.preventDefault();
          }
          break;
      }
    };
    if (isNumber && elementLength >= maxCardNumberPartLength) {
      focusToTheNextField();
    }
    const focusToThePreviousField = () => {
      switch (elementId) {
        case 'card-fields-4':
          evt.preventDefault();
          cardFieldThree.focus();
          break;
        case 'card-fields-3':
          evt.preventDefault();
          cardFieldTwo.focus();
          break;
        case 'card-fields-2':
          evt.preventDefault();
          cardFieldOne.focus();
          break;
      }
    };
    const isFieldEmpty = evt.target.value.length === 0;
    const selectionPosition = evt.target.selectionStart;
    const isSelectionAtTheStart = selectionPosition === 0;
    if (isArrowLeft === true) {
      if (isFieldEmpty || isSelectionAtTheStart) {
        focusToThePreviousField();
      }
    }
    if (isBackspace === true) {
      if (isFieldEmpty || isSelectionAtTheStart) {
        focusToThePreviousField();
        if (document.activeElement.id !== 'card-fields-1') {
          const previousFieldValue = document.activeElement.value;
          document.activeElement.value = previousFieldValue.slice(0, -1);
        }
      }
    }
    if (isNumber === false && isBackspace === false && isArrowLeft === false && isArrowRight === false) {
      evt.preventDefault();
    }
  });
  cardNumberField.addEventListener('keyup', () => {
    cardFullNumberField.value = `${cardFieldOne.value}${cardFieldTwo.value}${cardFieldThree.value}${cardFieldFour.value}`;
    const isLunahAlgorithmCheckDone = validateCardNumber(cardFullNumberField.value);
    if (isLunahAlgorithmCheckDone) {
      cardNumberField.classList.remove('input-wrapper--error');
    }
    if (isLunahAlgorithmCheckDone === false) {
      cardNumberField.classList.add('input-wrapper--error');
    }
  });
};

export { initPayment };
