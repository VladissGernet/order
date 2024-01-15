const maxCardNumberPartLength = 4;
const initPayment = (block) => {
  const paymentRadioInputs = block.querySelector('.input-wrapper--payment-method');
  const cardNumberField = block.querySelector('.js-input--card-number');
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
    if (isNumber && elementLength >= maxCardNumberPartLength) {
      switch (elementId) {
        case 'card-fields-1':
          evt.preventDefault();
          cardNumberField.querySelector('#card-fields-2').focus();
          break;
        case 'card-fields-2':
          evt.preventDefault();
          cardNumberField.querySelector('#card-fields-3').focus();
          break;
        case 'card-fields-3':
          evt.preventDefault();
          cardNumberField.querySelector('#card-fields-4').focus();
          break;
        case 'card-fields-4':
          if (isNumber === true) {
            evt.preventDefault();
          }
          break;
      }
    }
    if (isBackspace === true || isArrowLeft === true) {
      const isFieldEmpty = evt.target.value.length === 0;
      const selectionPosition = evt.target.selectionStart;
      const isSelectionAtTheStart = selectionPosition === 0;
      if (isFieldEmpty || isSelectionAtTheStart) {
        switch (elementId) {
          case 'card-fields-4':
            evt.preventDefault();
            cardNumberField.querySelector('#card-fields-3').focus();
            break;
          case 'card-fields-3':
            evt.preventDefault();
            cardNumberField.querySelector('#card-fields-2').focus();
            break;
          case 'card-fields-2':
            evt.preventDefault();
            cardNumberField.querySelector('#card-fields-1').focus();
            break;
        }
      }
    }
    if (isNumber === false && isBackspace === false && isArrowLeft === false && isArrowRight === false) {
      evt.preventDefault();
    }
  });
};

export { initPayment };
