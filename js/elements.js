const tabs = document.querySelector('.tabs-block__tabs');
const tabsContent = document.querySelector('.tabs-block__content');
const phoneFields = document.querySelectorAll('[name="phone"]');
//pick-up block
const pickUpBlock = tabsContent.querySelector('.tabs-block__pick-up');
const pickUpForm = pickUpBlock.querySelector('form');
const pickUpSubmitContainer = pickUpBlock.querySelector('.form__submit-state');
const pickUpSubmitHelp = pickUpSubmitContainer.querySelector('.form__submit-help');
const pickUpSubmitButton = pickUpForm.querySelector('.form__submit-btn');
const pickUpCitiesContainer = pickUpForm.querySelector('.js-radio--cities');
const pickUpAddressContainer = pickUpForm.querySelector('.js-radio--address');
//delivery block
const deliveryBlock = tabsContent.querySelector('.tabs-block__item-delivery');
const deliveryForm = deliveryBlock.querySelector('form');
const deliveryCitiesContainer = deliveryForm.querySelector('.js-radio--cities');


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
  pickUpSubmitButton,
  deliveryCitiesContainer
};
