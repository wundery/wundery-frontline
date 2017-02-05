import has from 'lodash/has';
import { Cart, CookieBanner, Search } from 'services';
import { config, translation } from 'globals';

class Frontline {
  static defaultOptions = {
    debug: false,
    mock: false,
  };

  constructor(options = {}) {
    /**
     * Client options
     * @type {Object}
     */
    this.options = { ...Frontline.defaultOptions, ...options };

    /**
     * Tracks info about auth status
     * @type {String}
     */
    this.authStatus = 'encoded';

    /**
     * Containes the decoded auth information
     * @type {Object}
     */
    this.decodedAuthData = null;

    this.decodeAuthData();
    this.logInfo();
  }

  requireOption(name) {
    if (!has(this.options, name)) {
      throw new Error(`Option '${name}' does not exist`);
    }

    return this.options[name];
  }

  newSearch(options = {}) {
    this.log('Building new search instance');

    return new Search(this, options);
  }

  newCookieBanner(options = {}) {
    this.log('Building new cookie banner instance');

    return new CookieBanner(this, options);
  }

  newCart(options = {}) {
    this.log('Building new cart instance');

    return new Cart(this, options);
  }

  decodeAuthData() {
    if (this.decodedAuthData) {
      return this.decodedAuthData;
    }

    try {
      this.decodedAuthData = JSON.parse(atob(this.requireOption('auth')));
      this.authStatus = 'decoded';
      return this.decodedAuthData;
    } catch(error) {
      this.authStatus = 'decoding-failed';
      return {};
    }
  }

  /**
   * Log important information
   */
  logInfo() {
    const { apiEndpoint, checkoutEndpoint, storeId } = this.options;

    this.log('Building new Frontline instance');
    this.log(`Version: ${config.get('version')}`);
    this.log(`apiEndpoint: ${apiEndpoint}`);
    this.log(`checkoutEndpoint: ${checkoutEndpoint}`);
    this.log(`Used locale: ${translation.locale}`);
    this.log(`Auth: ${this.authStatus}`);
    this.log(`storeId: ${storeId}`);
  }

  /**
   * Log-wrapper
   */
  log(...args) {
    if (this.options.debug) {
      if (args && typeof args[0] === 'string') {
        const newArgs = args;
        newArgs[0] = `[Frontline] ${newArgs[0]}`;
        console.log(...newArgs);
      } else {
        console.log(...args);
      }
    }
  }
}

export default Frontline;
