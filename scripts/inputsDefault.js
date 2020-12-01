/* eslint-disable no-param-reassign */
export default (inputs) => {
  inputs.forEach((input) => {
    const classGroup = input.classList.item(0).replace(/__.+/, '');
    const group = input.closest(`.${classGroup}`);
    const label = group.querySelector(`.${classGroup}__label`);
    const classParent = group.classList.item(0);
    const classLabel = label.classList.item(0);
    if (!input.classList.contains('select-group__select')) {
      group.classList.remove(`${classParent}--value`);
      label.classList.remove(`${classLabel}--value`);
      input.value = '';
    }
  });
};
