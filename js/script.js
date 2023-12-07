import {initTabs} from './init-tabs.js';
import {initialPageCondition} from './initial-page-condition.js';

initialPageCondition();
initTabs();
const replaceNumber = (string, position) => string.slice(0, position) + string.slice(position + 1);
const numbersArray = ['0','1','2','3','4','5','6','8','9'];
const restrictedSymbolsToRemove = ['(', ')', '-'];
const phoneField = document.querySelector('#phone-pick-up');
const getFieldNumbersValue = (value) => value.replace(/\D/g, '');
//input check
const onPhoneFieldInput = (evt) => {
  const input = evt.target;
  const selectionStart = input.selectionStart;
  if (selectionStart !== input.value.length) {
    return;
  }
  const inputValue = getFieldNumbersValue(input.value);
  let formattedValue = '';
  if (inputValue[0] === '7') {
    formattedValue += '+7(';
  }
  if (numbersArray.indexOf(inputValue[0]) > -1) {
    formattedValue = '';
    formattedValue += `+7(${inputValue[0]}`;
  }
  if (inputValue.length > 1) {
    formattedValue += `${inputValue.substring(1, 4)}`;
  }
  if (inputValue.length > 4) {
    formattedValue += `)${inputValue.substring(4, 7)}`;
  }
  if (inputValue.length > 7) {
    formattedValue += `-${inputValue.substring(7, 9)}`;
  }
  if (inputValue.length > 9) {
    formattedValue += `-${inputValue.substring(9, 11)}`;
  }
  input.value = formattedValue;
};
//KeyDownCheck
const checkAllowedKeys = (evt) => {
  const isShortcutCopy = evt.ctrlKey && evt.keyCode === 67;
  const isShortcutHighlight = evt.ctrlKey && evt.keyCode === 65;
  const isShortcutInsert = evt.ctrlKey && evt.keyCode === 86;
  const isKeyNumberDown = /\d/.test(evt.key);
  const isBackSpaceButton = evt.key === 'Backspace';
  const isArrowRight = evt.key === 'ArrowRight';
  const isArrowLeft = evt.key === 'ArrowLeft';
  const keysArray = [
    isShortcutCopy,
    isShortcutHighlight,
    isShortcutInsert,
    isKeyNumberDown,
    isBackSpaceButton,
    isArrowRight,
    isArrowLeft
  ];
  return keysArray.includes(true);
};
//on keydown
const onPhoneFieldKeydown = (evt) => {
  const isNotAllowedKey = checkAllowedKeys(evt) === false;
  if (isNotAllowedKey) {
    evt.preventDefault();
  }
  const input = evt.target;
  //Check selection
  const selectionStart = input.selectionStart;
  //check symbol to remove
  const symbolToRemove = input.value[selectionStart - 1];
  if (evt.key === 'Backspace') {
    if (input.value.length >= 4 && selectionStart <= 3) {
      evt.preventDefault();
      return;
    }
    if (input.value.length === 3 && selectionStart === 3) {
      input.value = '';
      return;
    }
    if (restrictedSymbolsToRemove.indexOf(symbolToRemove) > -1) {
      evt.preventDefault();
      input.setSelectionRange(selectionStart - 1, selectionStart - 1);
    }
    const newValue = replaceNumber(input.value, selectionStart - 1);
    const inputValue = getFieldNumbersValue(newValue);
    let formattedValue = '';
    if (inputValue[0] === '7') {
      formattedValue += '+7(';
    }
    if (inputValue.length > 1) {
      formattedValue = '';
      formattedValue = `+7(${inputValue.substring(1, 4)}`;
    }
    if (inputValue.length > 4) {
      formattedValue += `)${inputValue.substring(4, 7)}`;
    }
    if (inputValue.length > 7) {
      formattedValue += `-${inputValue.substring(7, 9)}`;
    }
    if (inputValue.length > 9) {
      formattedValue += `-${inputValue.substring(9, 11)}`;
    }
    evt.preventDefault();
    input.value = formattedValue;
    input.setSelectionRange(selectionStart - 1, selectionStart - 1);
  }
};
phoneField.addEventListener('input', onPhoneFieldInput);
phoneField.addEventListener('keydown', onPhoneFieldKeydown);











// const firstRussianPhoneNumbers = ['7','8','9'];
// const phoneField = document.querySelector('#phone');
// const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');
// const onPhoneFieldInput = (evt) => {
//   const input = evt.target;
//   let inputNumbersValue = getInputNumbersValue(input);
//   let formattedInputValue = '';
//   const selectionStart = input.selectionStart;
//   if (input.value.length !== selectionStart) {
//     if (evt.data && /\D/g.test(evt.data)) {
//       input.value = inputNumbersValue;
//     }
//     return;
//   }
//
//   if (firstRussianPhoneNumbers.indexOf(inputNumbersValue[0]) > -1) {
//     //russian phone number
//     if (inputNumbersValue[0] === '9') {
//       inputNumbersValue = `7${inputNumbersValue}`;
//     }
//     const firstSymbols = (inputNumbersValue[0] === '8') ? '8' : '+7';
//     formattedInputValue = `${firstSymbols}`;
//     if (inputNumbersValue.length > 1) {
//       formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
//     }
//     if (inputNumbersValue.length >= 5) {
//       formattedInputValue += `)${inputNumbersValue.substring(4, 7)}`;
//     }
//     if (inputNumbersValue.length >= 8) {
//       formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
//     }
//     if (inputNumbersValue.length >= 10) {
//       formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
//     }
//   } else {
//     // not Russian number
//     formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`;
//   }
//   input.value = formattedInputValue;
// };
// const onPhoneFieldKeydown = (evt) => {
//   const input = evt.target;
//   if (evt.keyCode === 8 && getInputNumbersValue(input).length === 1) {
//     evt.target.value = '';
//   } else if (getInputNumbersValue(input).length === 0) {
//     evt.target.value = '';
//   }
// };
//
// phoneField.addEventListener('input', onPhoneFieldInput);
// phoneField.addEventListener('keydown', onPhoneFieldKeydown);

