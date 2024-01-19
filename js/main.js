import { initTabs } from './init-tabs.js';
import { initialPageCondition } from './initial-page-condition.js';
import { addPhoneMask } from './masks.js';
import { checkPhoneInput } from './check-phone-input.js';
import { clearInputsWithLabels, validateCardNumberViaLunah } from './util.js';
import { fillCitiesContainer } from './fill-cities.js';
import {
  defaultCitySelection,
} from './constants.js';
import { fillCityAddresses } from './fill-city-addresses.js';
import {
  pickUpBlock,
  pickUpSubmitHelp,
  pickUpSubmitContainer,
  pickUpPhone,
  pickUpCitiesContainer,
  addressContainer,
  pickUpForm,
  pickUpSubmitButton
} from './elements.js';
import { getData } from './load-data.js';
import { initMap } from './map.js';
import { initPayment } from './init-payment.js';

initialPageCondition();
initTabs();
addPhoneMask();

///////////////////////////////////////////////////////////////////////////////////////
//clear initial city and points containers
clearInputsWithLabels(pickUpCitiesContainer);
clearInputsWithLabels(addressContainer);
//when cities data are received
let selectedCityAddresses = [];
const updateSelectedCityAddresses = (newAddresses) => {
  selectedCityAddresses = [];
  Object.assign(selectedCityAddresses, newAddresses);
};
getData().then((data) => {
  const { cities } = data;
  fillCitiesContainer(cities);
  const defaultCityAddresses = cities.find((cityElement) => cityElement.city === defaultCitySelection);
  const { 'delivery-points': deliveryPoints } = defaultCityAddresses;
  updateSelectedCityAddresses(deliveryPoints);
  fillCityAddresses(deliveryPoints);
  const mapElement = document.querySelector('#order-map');
  initMap(mapElement, deliveryPoints, cities, addressContainer);
});
initPayment(pickUpBlock);

//payment validation
const checkCardInputFields = () => {
  const cardNumberField = pickUpBlock.querySelector('.js-input--card-number');
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
  const isErrorOnForm = [checkPhoneInput(pickUpPhone), checkCardInputFields()].includes(false);
  let checkAndUpdate = {};
  checkAndUpdate = () => {
    const isNoErrors = [checkPhoneInput(pickUpPhone), checkCardInputFields()].includes(false) === false;
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
    return;
  }
  updateSubmitHelp(pickUpBlock);
};
pickUpForm.addEventListener('submit', onFormSubmit);
// остановился на валидации полей телефона и карты.
// добавлять ошибку и лисенер, чтобы он блокировал повторное нажатие кнопки и удался после успешной валидации
export { selectedCityAddresses, updateSelectedCityAddresses };
