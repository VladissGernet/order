import { MAX_CARD_NUMBER_PART_LENGTH } from './constants.js';
const initPayment = (block) => {
  const paymentRadioInputs = block.querySelector('.js-radio--payment-method');
  const cardNumberField = block.querySelector('.js-input--card-number');
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
    if (isNumber && elementLength >= MAX_CARD_NUMBER_PART_LENGTH) {
      focusToTheNextField();
    }
    if (isArrowRight && document.activeElement.selectionStart === MAX_CARD_NUMBER_PART_LENGTH) {
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
};

export { initPayment };
