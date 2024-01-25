import { fillCityAddresses } from './fill-city-addresses.js';
import { getData } from './load-data.js';
import { initMap } from './map.js';
import { pickUpCitiesContainer, pickUpAddressContainer } from './elements.js';
import { clearInputsWithLabels } from './util.js';
import { fillCitiesContainer } from './fill-cities.js';
import { defaultCitySelection } from './constants.js';

let selectedCityAddresses = [];
const updateSelectedCityAddresses = (newAddresses) => {
  selectedCityAddresses = [];
  Object.assign(selectedCityAddresses, newAddresses);
};
const initMapCitiesPoints = () => {
  clearInputsWithLabels(pickUpCitiesContainer);
  clearInputsWithLabels(pickUpAddressContainer);
  getData().then((data) => {
    const { cities } = data;
    fillCitiesContainer(cities);
    const defaultCityAddresses = cities.find((cityElement) => cityElement.city === defaultCitySelection);
    const { 'delivery-points': deliveryPoints } = defaultCityAddresses;
    updateSelectedCityAddresses(deliveryPoints);
    fillCityAddresses(deliveryPoints);
    const mapElement = document.querySelector('#order-map');
    initMap(mapElement, deliveryPoints, cities, pickUpAddressContainer);
  });
};

export { selectedCityAddresses, updateSelectedCityAddresses, initMapCitiesPoints };
