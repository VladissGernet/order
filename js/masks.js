import {phoneFields} from './elements.js';

const addPhoneMask = () => {
  for (const phoneField of phoneFields) {
    // eslint-disable-next-line no-undef
    IMask(phoneField, {mask: '+{7}(000)000-00-00'});
  }
};

export {addPhoneMask};
