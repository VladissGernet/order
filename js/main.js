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
  pickUpSubmit,
  citiesContainer,
  addressContainer
} from './elements.js';
import { getData } from './load-data.js';
import { initMap } from './map.js';
import { initPayment } from './init-payment.js';

initialPageCondition();
initTabs();
addPhoneMask();

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

//pick-up phone oninput
const onPhoneFieldInput = () => {
  checkPhoneInput(pickUpPhone);
  updateSubmitHelp(pickUpBlock);
};
pickUpPhone.addEventListener('input', onPhoneFieldInput);

//pick-up submit
// change to 'submit' instead of 'click' <------------------!
const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  checkPhoneInput(pickUpPhone);
  updateSubmitHelp(pickUpBlock);
};
pickUpSubmit.addEventListener('click', onSubmitButtonClick);

///////////////////////////////////////////////////////////////////////////////////////
//clear initial city and points containers
clearInputsWithLabels(citiesContainer);
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
const cardNumberField = pickUpBlock.querySelector('.js-input--card-number');
const cardFullNumberField = cardNumberField.querySelector('#card-full-number');
const cardFieldOne = cardNumberField.querySelector('#card-fields-1');
const cardFieldTwo = cardNumberField.querySelector('#card-fields-2');
const cardFieldThree = cardNumberField.querySelector('#card-fields-3');
const cardFieldFour = cardNumberField.querySelector('#card-fields-4');
cardNumberField.addEventListener('input', () => {
  cardFullNumberField.value = `${cardFieldOne.value}${cardFieldTwo.value}${cardFieldThree.value}${cardFieldFour.value}`;
  const isLunahAlgorithmCheckDone = validateCardNumberViaLunah(cardFullNumberField.value);
  if (isLunahAlgorithmCheckDone) {
    cardNumberField.classList.remove('input-wrapper--error');
  }
  if (isLunahAlgorithmCheckDone === false) {
    cardNumberField.classList.add('input-wrapper--error');
  }
});
export { selectedCityAddresses, updateSelectedCityAddresses };
