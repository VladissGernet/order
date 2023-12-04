import {tabs, deliveryBlock, pickUpBlock} from './elements.js';
import {receivingMethod} from './constants.js';

const initTabs = () => {
  const onTabClick = (evt) => {
    const selectedTab = evt.target.closest('.tab');
    if (selectedTab === null) {
      return;
    }
    const isSelectedTabActive = selectedTab.classList.contains('active');
    if (isSelectedTabActive) {
      return;
    }
    tabs.querySelector('.active').classList.remove('active');
    selectedTab.classList.add('active');
    if (selectedTab.dataset.tab === receivingMethod.delivery) {
      deliveryBlock.classList.remove('hidden');
      pickUpBlock.classList.add('hidden');
    } else if (selectedTab.dataset.tab === receivingMethod.pickUp) {
      pickUpBlock.classList.remove('hidden');
      deliveryBlock.classList.add('hidden');
    }
  };
  tabs.addEventListener('click', onTabClick);
};

export {initTabs};
