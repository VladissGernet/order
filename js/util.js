//Removes all selected elements in parameter
import {mainPinIcon} from "./constants.js";

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
const getTheFirstAddressCoordinates = (points) => ({
  lat: points[0].coordinates[0],
  lng: points[0].coordinates[1]
});
const addMainPinMarker = (coordinates, layer) => L.marker(coordinates, {icon: mainPinIcon}).addTo(layer);

export {removeSelectedElements, clearInputsWithLabels, getTheFirstAddressCoordinates, addMainPinMarker};
