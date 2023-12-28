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

export {removeSelectedElements, clearInputsWithLabels};
