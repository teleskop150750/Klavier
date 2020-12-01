export default (modal) => {
  const body = document.querySelector('.page__body');
  modal.classList.add('modal--closing');
  const closing = () => {
    modal.classList.remove('modal--open');
    modal.classList.remove('modal--closing');
    modal.classList.add('modal--close');
    modal.classList.remove('modal--open');
    // eslint-disable-next-line no-param-reassign
    modal.style.display = 'none';
    modal.removeEventListener('transitionend', closing);
  };
  modal.addEventListener('transitionend', closing);
  modal.style.removeProperty('padding-right');
  body.style.removeProperty('padding-right');
  body.classList.remove('page__body--lock');
};
