import { defaultAddressSelection } from './constants.js';
import { pickUpAddressContainer } from './elements.js';

const fillCityAddresses = (deliveryPoints) => {
  let cityAddressId = 0;
  deliveryPoints.forEach((cityPoint) => {
    const { address } = cityPoint;
    cityAddressId++;
    const isChecked = (cityAddressId === defaultAddressSelection) ? ' checked' : '';
    pickUpAddressContainer.insertAdjacentHTML('beforeend', `
    <input id="pick-up-led-address-${cityAddressId}" type="radio" name="led-address" value="${address}" ${isChecked}>
    <label for="pick-up-led-address-${cityAddressId}">${address}</label>
  `);
  });
};

export { fillCityAddresses };
