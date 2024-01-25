import { initTabs } from './init-tabs.js';
import { initialPageCondition } from './initial-page-condition.js';
import { addPhoneMask } from './masks.js';
import { pickUpBlock, tabs, deliveryCitiesContainer } from './elements.js';
import { clearInputsWithLabels } from './util.js';
import { initPayment } from './init-payment.js';
import { initMapCitiesPoints } from './init-map-cities-points.js';
import { initPickUpFormValidation } from './validation.js';
import { fillCitiesContainer } from './fill-cities.js';
import { getData } from './load-data.js';

initialPageCondition();
initTabs();
addPhoneMask();
initMapCitiesPoints();
initPickUpFormValidation();
initPayment(pickUpBlock);

//temporary function for dev. <=============================== remove!
tabs.querySelectorAll('.tab')[1].click();

//init-delivery-cities
const initDeliveryCities = () => {
  clearInputsWithLabels(deliveryCitiesContainer);
  getData().then((data) => {
    const { cities } = data;
    fillCitiesContainer(cities, deliveryCitiesContainer);
  });
};

initDeliveryCities();
