//Removes all selected elements in parameter
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

export {removeSelectedElements, clearInputsWithLabels, getTheFirstAddressCoordinates};
