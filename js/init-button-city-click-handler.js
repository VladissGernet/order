import { addMainPinMarker, clearInputsWithLabels, getAddressCoordinates } from './util.js';
import { pickUpAddressContainer, pickUpCitiesContainer } from './elements.js';
import { fillCityAddresses } from './fill-city-addresses.js';
import { createMarkers } from './create-markers.js';
import { updateMapView } from './util.js';
import { updateSelectedCityAddresses } from './init-map-cities-points.js';

const initButtonCityClickHandler = (citiesData, initialLayer, map) => {
  let previousButtonValue = '';
  const onCityClick = (evt) => {
    const cityButton = evt.target.closest('[name="city"]');
    if (cityButton === null) {
      return;
    }
    if (cityButton.value === previousButtonValue) {
      return;
    }
    previousButtonValue = cityButton.value;
    clearInputsWithLabels(pickUpAddressContainer);
    const selectedCityButtonId = cityButton.value;
    const selectedCity = Object.values(citiesData).find((city) => city['city-id'] === selectedCityButtonId);
    fillCityAddresses(selectedCity['delivery-points']);
    const selectedCityPoints = selectedCity['delivery-points'];
    initialLayer.clearLayers();
    createMarkers(selectedCityPoints, initialLayer);
    addMainPinMarker(getAddressCoordinates(selectedCityPoints[0]), initialLayer);
    updateMapView(map, selectedCityPoints[0].coordinates);
    updateSelectedCityAddresses(selectedCityPoints);
  };
  pickUpCitiesContainer.addEventListener('click', onCityClick);
};

export { initButtonCityClickHandler };
