import {addMainPinMarker, clearInputsWithLabels, getTheFirstAddressCoordinates} from './util.js';
import {addressContainer, citiesContainer} from './elements.js';
import {fillCityAddresses} from './fill-city-addresses.js';
import {createMarkers} from './create-markers.js';
import {ZOOM} from './constants.js';

const initButtonCityClickHandler = (citiesData, initialLayer, map) => {
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
    const selectedCityPoints = selectedCity['delivery-points'];
    const {lat, lng} = getTheFirstAddressCoordinates(selectedCityPoints);
    initialLayer.clearLayers();
    map.setView([lat, lng], ZOOM, {animate: true, duration: 2.0});
    createMarkers(selectedCityPoints, initialLayer);
    addMainPinMarker(getTheFirstAddressCoordinates(selectedCityPoints) ,initialLayer);
  };
  citiesContainer.addEventListener('click', onCityClick);
};

export {initButtonCityClickHandler};
