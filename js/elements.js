const tabs = document.querySelector('.tabs-block__tabs');
const tabsContent = document.querySelector('.tabs-block__content');
const pickUpBlock = tabsContent.querySelector('.tabs-block__pick-up');
const deliveryBlock = tabsContent.querySelector('.tabs-block__item-delivery');
const phoneFields = document.querySelectorAll('[name="phone"]');
const pickUpSubmit = pickUpBlock.querySelector('.form__submit-btn');
const pickUpPhone = pickUpBlock.querySelector('[name="phone"]');
const pickUpSubmitContainer = pickUpBlock.querySelector('.form__submit-state');
const pickUpSubmitHelp = pickUpSubmitContainer.querySelector('.form__submit-help');
const citiesContainer = pickUpBlock.querySelector('[data-radio-group="city"]');
const addressContainer = pickUpBlock.querySelector('[data-radio-group="address"]');

export {
  tabs,
  pickUpBlock,
  deliveryBlock,
  phoneFields,
  pickUpSubmit,
  pickUpPhone,
  pickUpSubmitHelp,
  pickUpSubmitContainer,
  citiesContainer,
  addressContainer
};
