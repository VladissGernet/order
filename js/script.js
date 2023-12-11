import {initTabs} from './init-tabs.js';
import {initialPageCondition} from './initial-page-condition.js';

const phoneField = document.querySelector('#phone-pick-up');

initialPageCondition();
initTabs();

// eslint-disable-next-line no-undef
IMask(phoneField, {mask: '+{7}(000)000-00-00'});
