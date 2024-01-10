const initPayment = (block) => {
  const paymentRadioInputs = block.querySelector('.input-wrapper--payment-method');
  const cardNumberField = block.querySelector('.js-input--card-number');
  const onPaymentClick = (evt) => {
    switch (evt.target.value) {
      case 'cash':
        cardNumberField.style.display = 'none';
        break;
      default:
        cardNumberField.style.display = 'flex';
        break;
    }
  };
  paymentRadioInputs.addEventListener('change', onPaymentClick);
};

export { initPayment };
