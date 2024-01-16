import { mainPinIcon, ZOOM, MAP_SETTING_DURATION } from './constants.js';

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
const addMainPinMarker = (coordinates, layer) => L.marker(coordinates, { icon: mainPinIcon }).addTo(layer);
const updateMapView = (map, coordinates) => {
  map.setView(coordinates, ZOOM, { animate: true, duration: MAP_SETTING_DURATION });
};
const validateCardNumberViaLunah = (cardNumber) => {
  cardNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cardNumber)) {
    return false;
  }
  const reversedCardNumber = cardNumber.split('').reverse().join('');
  let sum = 0;
  for (let i = 0; i < reversedCardNumber.length; i++) {
    let digit = parseInt(reversedCardNumber.charAt(i), 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

export { removeSelectedElements, clearInputsWithLabels, getAddressCoordinates, addMainPinMarker, updateMapView, validateCardNumberViaLunah };
