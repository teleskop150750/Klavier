/* eslint-disable no-param-reassign */
import modalOpen from './modalOpen.js';
import inputsFocus from './inputsFocus.js';
import inputsDefault from './inputsDefault.js';
import Vue from '../libs/vue.esm.browser.min.js';

export default (catalog) => {
  // eslint-disable-next-line no-unused-vars
  const vm = new Vue({
    el: '#catalog_Vue',
    data: {
      buttons: [
        {
          name: 'показать все',
          isActive: true,
          category: 'all',
        },
        {
          name: 'Куртки',
          isActive: false,
          category: 'jacket',
        },
        {
          name: 'Джинсы',
          isActive: false,
          category: 'jeans',
        },
        {
          name: 'Футболки',
          isActive: false,
          category: 'undershirt',
        },
        {
          name: 'спорт',
          isActive: false,
          category: 'sport',
        },
      ],
      products: '',
      productsSort: '',
      productId: null,
      modalTitle: '',
      modalContent: '',
    },
    computed: {
      comments() {
        if (this.productId !== null) {
          const product = this.products.find(
            (productItem) => productItem.id === this.productId,
          );
          return product.comment;
        }
        return [];
      },
    },
    methods: {
      sortProducts(category, i) {
        if (category === 'all') {
          this.productsSort = this.products;
        } else {
          this.productsSort = this.products.filter(
            (product) => product.category === category,
          );
        }
        this.buttons.forEach((button) => {
          button.isActive = false;
        });
        this.buttons[i].isActive = true;
      },
      openModalComment(id, button) {
        button.blur();
        this.productId = id;
        const modalCommet = document.querySelector('.modal--comment');
        modalOpen(modalCommet);
        const inputs = modalCommet.querySelectorAll('.js-input');
        inputsFocus(inputs);
      },
      addComment() {
        const textarea = document.querySelector('.textarea-group__textarea');
        const index = this.products.findIndex(
          (item) => item.id === this.productId,
        );
        this.products[index].comment.push(textarea.value);
        inputsDefault([textarea]);
      },
      addToCart(productId, button) {
        button.blur();

        if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', productId);
          this.modalTitle = 'Поздравляем';
          this.modalContent = 'Товар добавлен в корзину';
        } else {
          const idArray = localStorage.getItem('cart')
            .split(',')
            .map((id) => +id);
          const isToCart = idArray.includes(productId);
          if (!isToCart) {
            idArray.push(productId);
            localStorage.setItem('cart', idArray);
            this.modalTitle = 'Поздравляем';
            this.modalContent = 'Товар добавлен в корзину';
          } else {
            this.modalTitle = 'Внимание';
            this.modalContent = 'Данный товар уже добавлен в корзину';
          }
        }

        const modalCart = document.querySelector('.modal--cart');
        modalOpen(modalCart);
      },
    },
    created() {
      this.products = catalog;
      this.productsSort = catalog;
    },
  });
};
