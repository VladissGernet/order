import { defaultCitySelection } from './constants.js';

const fillCitiesContainer = (cities, container) => {
  cities.forEach((cityElement) => {
    const { city, 'city-id': cityId } = cityElement;
    const isChecked = (city === defaultCitySelection) ? ' checked' : '';
    container.insertAdjacentHTML('beforeend', `
      <input id="pick-up-${cityId}" type="radio" name="city" value="${cityId}" ${isChecked}>
      <label for="pick-up-${cityId}">${city}</label>
    `);
  });
};

export { fillCitiesContainer };
