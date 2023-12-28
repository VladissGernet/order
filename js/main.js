import {initTabs} from './init-tabs.js';
import {initialPageCondition} from './initial-page-condition.js';
import {addPhoneMask} from './masks.js';
import {
  pickUpBlock,
  pickUpSubmitHelp,
  pickUpSubmitContainer,
  pickUpPhone,
  pickUpSubmit,
  citiesContainer,
  addressContainer
} from './elements.js';
import {getData} from './load-data.js';

initialPageCondition();
initTabs();
addPhoneMask();

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

//pick-up phone oninput
const onPhoneFieldInput = () => {
  checkPhoneInput(pickUpPhone);
  updateSubmitHelp(pickUpBlock);
};
pickUpPhone.addEventListener('input', onPhoneFieldInput);

//pick-up submit
const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  checkPhoneInput(pickUpPhone);
  updateSubmitHelp(pickUpBlock);
};
pickUpSubmit.addEventListener('click', onSubmitButtonClick);

//removes all elements in container
const clearCitiesContainer = (...elements) => {
  const elementsToRemove = Array.from(elements.reduce((acc, currentValue) =>
    Array.from(acc).concat(Array.from(currentValue))));
  elementsToRemove.forEach((element) => element.remove());
};

const initialCitiesInputs = citiesContainer.querySelectorAll('input');
const initialCitiesLabels = citiesContainer.querySelectorAll('label');
clearCitiesContainer(initialCitiesInputs, initialCitiesLabels);

//removes initial addresses
const initialAddressInputs = addressContainer.querySelectorAll('input');
const initialAddressLabels = addressContainer.querySelectorAll('label');
clearCitiesContainer(initialAddressInputs, initialAddressLabels);

//constant
const defaultCitySelection = 'Санкт-Петербург';
const defaultAddressSelection = 1;

//cities inter
getData().then((data) => {
  const {cities} = data;
  cities.forEach((cityElement) => {
    const {city, 'city-id': cityId} = cityElement;
    const isChecked = (city === defaultCitySelection) ? ' checked' : '';
    citiesContainer.insertAdjacentHTML('beforeend', `
      <input id="pick-up-${cityId}" type="radio" name="city" value="${cityId}" ${isChecked}>
      <label for="pick-up-${cityId}">${city}</label>
    `);
  });
  const defaultCityAddresses = cities.find((cityElement) => cityElement.city === defaultCitySelection);
  const {'delivery-points': deliveryPoints} = defaultCityAddresses;
  let cityAddressId = 0;
  deliveryPoints.forEach((cityPoint) => {
    const {address} = cityPoint;
    cityAddressId++;
    const isChecked = (cityAddressId === defaultAddressSelection) ? ' checked' : '';
    addressContainer.insertAdjacentHTML('beforeend', `
    <input id="pick-up-led-address-${cityAddressId}" type="radio" name="led-address" value="${address}" ${isChecked}>
    <label for="pick-up-led-address-${cityAddressId}">${address}</label>
  `);
  });
});

