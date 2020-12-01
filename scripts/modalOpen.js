/* eslint-disable no-param-reassign */
import paddingScroll from './padding-scroll.js';
import modalClose from './modalClose.js';

export default (modal) => {
  const body = document.querySelector('.page__body');
  paddingScroll.addPadding();
  body.classList.add('page__body--lock');
  modal.style.display = 'flex';
  modal.style.display = getComputedStyle(modal).display;
  modal.classList.add('modal--opening');

  const modalContent = modal.querySelector('.modal__content');
  const opening = () => {
    modal.classList.remove('modal--close');
    modal.classList.remove('modal--opening');
    modal.classList.add('modal--open');
    modalContent.removeEventListener('transitionend', opening);
  };
  modalContent.addEventListener('transitionend', opening);

  const modalCloseHandler = (e) => {
    if (e.target === e.currentTarget) {
      modalClose(modal);
    }
  };
  const btnClose = modal.querySelector('.modal__button');
  btnClose.focus();
  btnClose.addEventListener('click', modalCloseHandler);
  modal.addEventListener('click', modalCloseHandler);
};
