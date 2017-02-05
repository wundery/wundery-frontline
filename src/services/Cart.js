import React from 'react';
import ReactDOM from 'react-dom';
import { Cart as CartComponent } from 'features/Cart';

class Cart {
  constructor(frontlineClient, options) {
    this.options = options;
    this.frontlineClient = frontlineClient;

    this.injected = false;
  }

  inject() {
    if (this.injected) {
      throw new Error('inject() was called twice.');
    }
    this.log('Injecting cart');

    const node = this.injectDomNode();

    ReactDOM.render(<CartComponent cart={this} />, node);

    // Track injection state
    this.injected = true;

    return this;
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
