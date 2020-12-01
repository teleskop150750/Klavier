export default {
  addPadding() {
    const elements = document.querySelectorAll('.js-scroll');
    elements.forEach((item) => {
      const el = item;
      const { paddingRight } = getComputedStyle(item);
      el.style.paddingRight = `${parseFloat(paddingRight) + window.innerWidth - document.documentElement.clientWidth}px`;
    });
  },
  removePadding() {
    const elements = document.querySelectorAll('.js-scroll');
    elements.forEach((item) => {
      const el = item;
      const { paddingRight } = getComputedStyle(item);
      el.style.paddingRight = `${parseFloat(paddingRight) - (window.innerWidth - document.documentElement.clientWidth)}px`;
    });
  },
};
