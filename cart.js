import inputsFocus from './scripts/inputsFocus.js';
import formSubmit from './scripts/formSubmit.js';
import modalOpen from './scripts/modalOpen.js';
import modalClose from './scripts/modalClose.js';
import manCatalog from './scripts/manCatalog.js';
import womanCatalog from './scripts/womanCatalog.js';
import Vue from './libs/vue.esm.browser.min.js';

const productsAll = [...manCatalog, ...womanCatalog];

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  el: '#cart',
  data: {
    idArray: [],
    productsCheck: [],
    productsAll: [],
    priceOne: 0,
    idOne: null,
    modalType: 'one',
  },

  computed: {
    productsBuy() {
      if (this.idArray.length > 0) {
        const arr = [];
        this.idArray.forEach((id) => {
          arr.push(
            this.productsAll.find((item) => item.id === id),
          );
        });
        return arr;
      }
      return [];
    },
    priceAll() {
      if (this.productsBuy.length > 0) {
        return this.productsBuy.reduce(
          (sum, current) => sum + current.price, 0,
        );
      }
      return 0;
    },
    priceCheck() {
      if (this.productsCheck.length > 0) {
        return this.productsCheck.reduce(
          (sum, current) => sum + current.price, 0,
        );
      }
      return 0;
    },
  },
  methods: {
    deleteOne(id) {
      const idArrayFilter = this.idArray.filter((itemLS) => +itemLS !== id);
      this.idArray = idArrayFilter;
      localStorage.setItem('cart', idArrayFilter);
    },
    deleteAll() {
      localStorage.removeItem('cart');
      this.idArray = [];
      this.productsCheck = [];
    },
    deleteCheck() {
      this.productsCheck.forEach(({ id }) => {
        const productsCheckFilter = this.productsCheck.filter(
          (product) => product.id !== id,
        );
        this.productsCheck = productsCheckFilter;
        this.deleteOne(id);
      });
    },

    addCheck(product, current) {
      if (current.checked) {
        this.productsCheck.push(product);
      } else {
        const productsCheckFilter = this.productsCheck.filter(
          ({ id }) => id !== product.id,
        );
        this.productsCheck = productsCheckFilter;
      }
    },
    modalOpen(type, current, id = null) {
      this.modalType = type;
      if (this.modalType === 'one') {
        const productBuyItem = this.productsBuy.find(
          (item) => item.id === id,
        );
        this.idOne = id;
        this.priceOne = productBuyItem.price;
      }
      current.blur();
      const modal = document.querySelector('.modal--buy');
      modalOpen(modal);
    },
    buyProducts(form) {
      const inputs = form.querySelectorAll('.js-input');
      const modal = form.closest('.modal--buy');
      let cb;
      if (this.modalType === 'one') {
        cb = () => {
          this.deleteOne(this.idOne);
          this.idOne = null;
          modalClose(modal);
        };
      }
      if (this.modalType === 'all') {
        cb = () => {
          modalClose(modal);
          this.deleteAll();
        };
      }
      if (this.modalType === 'check') {
        cb = () => {
          modalClose(modal);
          this.deleteCheck();
        };
      }
      formSubmit(inputs, cb);
    },
  },
  created() {
    this.productsAll = productsAll;
    if (localStorage.getItem('cart')) {
      this.idArray = localStorage.getItem('cart')
        .split(',')
        .map((id) => +id);
    }
  },

  mounted() {
    const inputs = document.querySelectorAll('.js-input');
    inputsFocus(inputs);
  },
});
