import {initTabs} from './init-tabs.js';
import {initialPageCondition} from './initial-page-condition.js';
import {addPhoneMask} from './masks.js';
import {checkPhoneInput} from './check-phone-input.js';
import {clearInputsWithLabels} from './util.js';
import {fillCitiesContainer} from './fill-cities.js';
import {getTheFirstAddressCoordinates, addMainPinMarker} from './util.js';
import {
  defaultCitySelection,
  COPYRIGHT,
  TILE_LAYER,
  ZOOM,
} from './constants.js';
import {fillCityAddresses} from './fill-city-addresses.js';
import {initButtonCityClickHandler} from './init-button-city-click-handler.js';
import {createMarkers} from './create-markers.js';
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
//when cities data are received
let citiesData = {};
getData().then((data) => {
  const {cities} = data;
  citiesData = Object.assign({}, cities);
  fillCitiesContainer(cities);
  const defaultCityAddresses = cities.find((cityElement) => cityElement.city === defaultCitySelection);
  const {'delivery-points': deliveryPoints} = defaultCityAddresses;
  fillCityAddresses(deliveryPoints);
  //map
  const map = L.map('order-map', {
    center: getTheFirstAddressCoordinates(deliveryPoints),
    zoom: ZOOM
  });
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
  const markerGroup = L.layerGroup().addTo(map);
  createMarkers(deliveryPoints, markerGroup);
  addMainPinMarker(getTheFirstAddressCoordinates(deliveryPoints), markerGroup);
  initButtonCityClickHandler(citiesData, markerGroup, map);
  let previousButtonValue = '';
  addressContainer.addEventListener('click', (evt) => {
    const addressButton = evt.target.closest('[name="led-address"]');
    if (addressButton === null) {
      return;
    }
    if (addressButton.value === previousButtonValue) {
      return;
    }
    previousButtonValue = addressButton.value;
  });
});
