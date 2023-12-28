import {initTabs} from './init-tabs.js';
import {initialPageCondition} from './initial-page-condition.js';
import {addPhoneMask} from './masks.js';
import {checkPhoneInput} from './check-phone-input.js';
import {clearInputsWithLabels} from './util.js';
import {fillCitiesContainer} from './fill-cities.js';
import {defaultCitySelection} from './constants.js';
import {fillCityAddresses} from './fill-city-addresses.js';
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

///////////////////////////////////////////////////////////////////////////////////////
//clear initial city and points containers
clearInputsWithLabels(citiesContainer);
clearInputsWithLabels(addressContainer);

//init default points
const initDefaultPoints = (data) => {
  fillCitiesContainer(data);
  const defaultCityAddresses = data.find((cityElement) => cityElement.city === defaultCitySelection);
  const {'delivery-points': deliveryPoints} = defaultCityAddresses;
  fillCityAddresses(deliveryPoints);
};

//get cities data
let citiesData = {};
const initDefaultCityPoints = () => {
  getData().then((data) => {
    const {cities} = data;
    citiesData = Object.assign({}, cities);
    initDefaultPoints(cities);
  });
};
initDefaultCityPoints();

//init city click handler
let previousButtonValue = '';
const onCityClick = (evt)=> {
  const cityButton = evt.target.closest('[name="city"]');
  if (cityButton === null) {
    return;
  }
  if (cityButton.value === previousButtonValue) {
    return;
  }
  previousButtonValue = cityButton.value;
  clearInputsWithLabels(addressContainer);
  const selectedCityButtonId = cityButton.value;
  const selectedCity = Object.values(citiesData).find((city) => city['city-id'] === selectedCityButtonId);
  fillCityAddresses(selectedCity['delivery-points']);
};
citiesContainer.addEventListener('click', onCityClick);


//constants
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 13;
const startCoordinates = {
  lat: 35.68172,
  lng: 139.75392,
};

//map
const map = L.map('order-map', {
  center: startCoordinates,
  zoom: ZOOM
});
L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);
