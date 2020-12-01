/* eslint-disable no-unused-vars */
export default class SlideToggle {
  target = null;

  button = null;

  opening = 'opening';

  open = 'open';

  beforeSlideUp = () => { };

  beforeSlideDown = () => { };

  constructor(options = {}) {
    this.extend(options);

    this.button.addEventListener('click', this.slideToggle);
  }

  extend(options) {
    Object.entries(options).forEach(([k, v]) => {
      this[k] = v;
    });
  }

  /* SLIDE UP */
  slideUp() {
    this.beforeSlideUp();
    this.target.style.height = `${this.target.offsetHeight}px`;
    this.target.style.height = `${this.target.offsetHeight}px`;
    this.target.classList.remove(this.open);
    this.target.classList.add(this.opening);
    this.target.style.height = 0;
    const transitionendHandler = () => {
      this.target.style.removeProperty('height');
      this.target.classList.remove(this.opening);
      this.target.removeEventListener('transitionend', transitionendHandler);
      this.button.addEventListener('click', this.slideToggle);
    };
    this.target.addEventListener('transitionend', transitionendHandler);
  }

  /* SLIDE DOWN */
  slideDown() {
    this.beforeSlideDown();
    this.target.classList.add(this.opening);
    this.target.style.height = `${this.target.scrollHeight}px`;
    const transitionendHandler = () => {
      this.target.style.removeProperty('height');
      this.target.classList.add(this.open);
      this.target.classList.remove(this.opening);
      this.target.removeEventListener('transitionend', transitionendHandler);
      this.button.addEventListener('click', this.slideToggle);
    };
    this.target.addEventListener('transitionend', transitionendHandler);
  }

  /* TOOGLE */
  slideToggle = () => {
    this.button.removeEventListener('click', this.slideToggle);
    if (this.target.classList.contains(this.open)) {
      this.slideUp();
    } else {
      this.slideDown();
    }
  }
}
