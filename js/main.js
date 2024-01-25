import { initTabs } from './init-tabs.js';
import { initialPageCondition } from './initial-page-condition.js';
import { addPhoneMask } from './masks.js';
import { pickUpBlock } from './elements.js';
import { initPayment } from './init-payment.js';
import { initMapCitiesPoints } from './init-cities-points.js';
import { initFormValidation } from './validation.js';

initialPageCondition();
initTabs();
addPhoneMask();
initMapCitiesPoints();
initFormValidation();
initPayment(pickUpBlock);
