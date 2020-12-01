export default (inputs) => {
  inputs.forEach((input) => {
    const classGroup = input.classList.item(0).replace(/__.+/, '');
    const group = input.closest(`.${classGroup}`);
    const label = group.querySelector(`.${classGroup}__label`);
    const classParent = group.classList.item(0);
    const classLabel = label.classList.item(0);

    input.addEventListener('focus', () => {
      group.classList.remove(`${classParent}--error`);
      group.classList.add(`${classParent}--focus`, `${classParent}--value`);
      label.classList.add(`${classLabel}--focus`, `${classLabel}--value`);
    });

    input.addEventListener('blur', function f() {
      if (this.value.trim() === '') {
        this.value = '';
        group.classList.remove(`${classParent}--value`);
        label.classList.remove(`${classLabel}--value`);
      }
      group.classList.remove(`${classParent}--focus`);
      label.classList.remove(`${classLabel}--focus`);
    });
  });
};
