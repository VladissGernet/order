const tabs = document.querySelector('.tabs-block__tabs');
const tabsContent = document.querySelector('.tabs-block__content');
const deliveryBlock = tabsContent.querySelector('.tabs-block__item-delivery');
const phoneFields = document.querySelectorAll('[name="phone"]');
//pick-up block
const pickUpBlock = tabsContent.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const pickUpSubmitContainer = pickUpBlock.querySelector('.form__submit-state');
const pickUpSubmitHelp = pickUpSubmitContainer.querySelector('.form__submit-help');
const pickUpSubmitButton = pickUpForm.querySelector('.form__submit-btn');
const pickUpCitiesContainer = pickUpForm.querySelector('[data-radio-group="city"]');
const pickUpAddressContainer = pickUpForm.querySelector('[data-radio-group="address"]');

export {
  tabs,
  pickUpBlock,
  deliveryBlock,
  phoneFields,
  pickUpSubmitHelp,
  pickUpSubmitContainer,
  pickUpCitiesContainer,
  pickUpAddressContainer,
  pickUpForm,
  pickUpSubmitButton
};
