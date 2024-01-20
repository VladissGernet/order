import { initTabs } from './init-tabs.js';
import { initialPageCondition } from './initial-page-condition.js';
import { addPhoneMask } from './masks.js';
import { pickUpBlock } from './elements.js';
import { initPayment } from './init-payment.js';
import { initCitiesPoints } from './init-cities-points.js';
import { initFormValidation } from './validation.js';

initialPageCondition();
initTabs();
addPhoneMask();
initCitiesPoints();
initFormValidation();
initPayment(pickUpBlock);
