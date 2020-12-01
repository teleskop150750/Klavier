import SlideToggle from './scripts/slideToggle.js';

// navToggle
const nav = document.querySelector('.nav__list');
const navButton = document.querySelector('.nav-button');

// eslint-disable-next-line no-new
new SlideToggle({
  target: nav,
  button: navButton,
  opening: 'nav__list--opening',
  open: 'nav__list--open',
  beforeSlideDown() {
    this.button.classList.remove('nav-button--open');
    this.button.classList.add('nav-button--close');
  },
  beforeSlideUp() {
    this.button.classList.add('nav-button--open');
    this.button.classList.remove('nav-button--close');
  },
});
