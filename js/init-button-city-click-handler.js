import {clearInputsWithLabels} from './util.js';
import {addressContainer, citiesContainer} from './elements.js';
import {fillCityAddresses} from './fill-city-addresses.js';

const initButtonCityClickHandler = (citiesData) => {
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
};

export {initButtonCityClickHandler};
