import {mainPinIcon, ZOOM, MAP_SETTING_DURATION} from './constants.js';

const removeSelectedElements = (...elements) => {
  const elementsToRemove = Array.from(elements.reduce((acc, currentValue) =>
    Array.from(acc).concat(Array.from(currentValue))));
  elementsToRemove.forEach((element) => element.remove());
};
const clearInputsWithLabels = (container) => {
  const containerInputs = container.querySelectorAll('input');
  const containerLabels = container.querySelectorAll('label');
  removeSelectedElements(containerInputs, containerLabels);
};
const getAddressCoordinates = (point) => ({
  lat: point.coordinates[0],
  lng: point.coordinates[1]
});
const addMainPinMarker = (coordinates, layer) => L.marker(coordinates, {icon: mainPinIcon}).addTo(layer);
const updateMapView = (map, coordinates) => {
  map.setView(coordinates, ZOOM, {animate: true, duration: MAP_SETTING_DURATION});
};

export {removeSelectedElements, clearInputsWithLabels, getAddressCoordinates, addMainPinMarker, updateMapView};
