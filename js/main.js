import { initTabs } from './init-tabs.js';
import { initialPageCondition } from './initial-page-condition.js';
import { addPhoneMask } from './masks.js';
import { pickUpBlock, tabs } from './elements.js';
import { initPayment } from './init-payment.js';
import { initMapCitiesPoints } from './init-map-cities-points.js';
import { initPickUpFormValidation } from './validation.js';

initialPageCondition();
initTabs();
addPhoneMask();
initMapCitiesPoints();
initPickUpFormValidation();
initPayment(pickUpBlock);

//temporary function for dev. <=============================== remove!
tabs.querySelectorAll('.tab')[1].click();
