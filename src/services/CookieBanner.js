import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import get from 'lodash/get';
import { CookieBanner as CookieBannerComponent } from 'features/CookieBanner';

class CookieBanner {
  static cookieName = 'wundery_cookieUsageAcknowledged';
  static domNodeName = 'data-wundery-cookie-banner';

  static findNode() {
    return document.querySelector(`[${CookieBanner.domNodeName}]`);
  }

  static defaultOptions = {
    position: 'top',
  }

  constructor(frontlineClient, options) {
    this.injected = false;
    this.frontlineClient = frontlineClient;
    this.options = { ...CookieBanner.defaultOptions, ...options };
  }

  requireOption(name) {
    if (!has(this.options, name)) {
      throw new Error(`Option '${name}' does not exist`);
    }

    return this.options[name];
  }

  getOption(name) {
    return get(this.options, name);
  }

  hasPosition(position) {
    return !isEmpty(this.options.position) && this.options.position === position;
  }

  acknowledge() {
    Cookies.set(CookieBanner.cookieName, Date.now(), { expires: 365 });
    this.log('Acknowledged cookie usage');
    this.unmount();
  }

  isAcknowledged() {
    return !isEmpty(Cookies.get(CookieBanner.cookieName));
  }

  translation(key, defaultValue = null) {
    return get(this.options, `translations.${key}`, defaultValue);
  }

  reset() {
    Cookies.remove(CookieBanner.cookieName);
    this.mount();
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(CookieBanner.findNode());
    this.injected = false;
  }

  mount() {
    if (this.isAcknowledged()) {
      return false;
    }

    if (this.injected) {
      return false;
    }

    this.log('Injecting cookie banner');

    const node = this.injectDomNode();

    ReactDOM.render(<CookieBannerComponent cookieBanner={this} />, node);

    // Track injection state
    this.injected = true;

    return this;
  }

  injectDomNode() {
    // Inject the target node
    const div = document.createElement('div');
    div.setAttribute(CookieBanner.domNodeName, '');
    const firstChild = document.body.firstChild;
    firstChild.parentNode.insertBefore(div, firstChild);
    return div;
  }

  log(...args) {
    this.frontlineClient.log(...args);
  }
}

export default CookieBanner;
