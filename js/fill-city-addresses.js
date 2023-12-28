import {defaultAddressSelection} from './constants.js';
import {addressContainer} from './elements.js';

const fillCityAddresses = (deliveryPoints) => {
  let cityAddressId = 0;
  deliveryPoints.forEach((cityPoint) => {
    const {address} = cityPoint;
    cityAddressId++;
    const isChecked = (cityAddressId === defaultAddressSelection) ? ' checked' : '';
    addressContainer.insertAdjacentHTML('beforeend', `
    <input id="pick-up-led-address-${cityAddressId}" type="radio" name="led-address" value="${address}" ${isChecked}>
    <label for="pick-up-led-address-${cityAddressId}">${address}</label>
  `);
  });
};

export {fillCityAddresses};
