import has from 'lodash/has';
import { Cart, CookieBanner, Search } from 'services';
import { config, translation } from 'globals';

class Frontline {
  static defaultOptions = {
    debug: false,
    mock: false
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

    translation.locale = this.options['locale'];
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
      this.decodedAuthData = JSON.parse(window.atob(this.requireOption('auth')));
      this.authStatus = 'decoded';
      return this.decodedAuthData;
    } catch (error) {
      this.authStatus = 'decoding-failed';
      return {};
    }
  }

  insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  appendTextNextToCopyright(locale) {
    document.addEventListener('DOMContentLoaded', (event) => {
      var branchbobLink = "https://www.branchbob.com/" + (locale == 'de' ? '' : 'en');
      var element = document.querySelector('.footer-wrapper .credits, .copy-right .container p');
      if(element){
        element.innerHTML += (" | <a href='"+branchbobLink+"'>Powered by branchbob</a>")
      }
      var elemenInBobAlice = document.querySelector('.footer .list-inline:last-child');
      if(elemenInBobAlice) {
        var el = document.createElement("a");
        el.href = branchbobLink;
        el.innerHTML = "Powered by branchbob";
        this.insertAfter(elemenInBobAlice, el);
      }
    })
  }

  /**
   * Log important information
   */
  logInfo() {
    const { storeId } = this.options;

    this.log('Building new Frontline instance');
    this.log(`Version: ${config.get('version')}`);
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
        // eslint-disable-next-line no-console
        console.log(...newArgs);
      } else {
        // eslint-disable-next-line no-console
        console.log(...args);
      }
    }
  }
}

export default Frontline;
