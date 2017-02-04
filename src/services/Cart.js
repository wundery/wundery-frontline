import React from 'react';
import ReactDOM from 'react-dom';
import { Cartbox } from 'features/Cartbox';

class Cart {
  constructor(frontlineClient, options) {
    this.injected = false;
    this.frontlineClient = frontlineClient;
  }

  inject() {
    if (this.injected) {
      throw new Error('inject() was called twice.');
    }
    this.log('Injecting cart');

    const node = this.injectDomNode();

    ReactDOM.render(<Cartbox cart={this} />, node);

    // Track injection state
    this.injected = true;

    return this;
  }

  injectDomNode() {
    // Inject the target node
    var div = document.createElement('div');
    div.setAttribute('data-wundery-cart', '');
    document.body.prepend(div);
    return div;
  }

  discover() {
    this.log('Discovering cart interaction elements');
    return this;
  }

  log(...args) {
    this.frontlineClient.log(...args);
  }
}

export default Cart;
