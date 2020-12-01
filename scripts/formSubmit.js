import inputsDefault from './inputsDefault.js';

export default (inputs, cb) => {
  let isEmpty = false;

  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      isEmpty = true;
      const classGroup = input.classList.item(0).replace(/__.+/, '');
      const group = input.closest(`.${classGroup}`);
      group.classList.add(`${classGroup}--error`);
    }
  });

  if (!isEmpty) {
    inputsDefault(inputs);
    cb();
  }
};
