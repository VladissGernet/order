import { createMarkers } from './create-markers.js';
import { selectedCityAddresses } from './init-cities-points.js';
import { addMainPinMarker, getAddressCoordinates, updateMapView } from './util.js';

const initAddressClickHandler = (container, initialLayer, map) => {
  let previousButtonValue = '';
  container.addEventListener('click', (evt) => {
    const addressButton = evt.target.closest('[name="led-address"]');
    if (addressButton === null) {
      return;
    }
    if (addressButton.value === previousButtonValue) {
      return;
    }
    previousButtonValue = addressButton.value;
    const selectedAddressCoordinates = selectedCityAddresses.find(
      (point) => point.address === addressButton.value);
    initialLayer.clearLayers();
    createMarkers(selectedCityAddresses, initialLayer);
    addMainPinMarker(getAddressCoordinates(selectedAddressCoordinates), initialLayer);
    updateMapView(map, selectedAddressCoordinates.coordinates);
  });
};

export { initAddressClickHandler };
