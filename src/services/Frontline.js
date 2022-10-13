import has from "lodash/has";
import { Cart, CookieBanner, Search } from "services";
import { config, translation } from "globals";
import "core-js/stable";
import "regenerator-runtime/runtime";

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
    this.authStatus = "encoded";

    /**
     * Containes the decoded auth information
     * @type {Object}
     */
    this.decodedAuthData = null;

    this.decodeAuthData();
    this.logInfo();
    this.pagination();

    translation.locale = this.options["locale"];
  }

  requireOption(name) {
    if (!has(this.options, name)) {
      throw new Error(`Option '${name}' does not exist`);
    }

    return this.options[name];
  }

  newSearch(options = {}) {
    this.log("Building new search instance");

    return new Search(this, options);
  }

  newCookieBanner(options = {}) {
    this.log("Building new cookie banner instance");

    return new CookieBanner(this, options);
  }

  newCart(options = {}) {
    this.log("Building new cart instance");

    return new Cart(this, options);
  }

  decodeAuthData() {
    if (this.decodedAuthData) {
      return this.decodedAuthData;
    }

    try {
      this.decodedAuthData = JSON.parse(
        window.atob(this.requireOption("auth"))
      );
      this.authStatus = "decoded";
      return this.decodedAuthData;
    } catch (error) {
      this.authStatus = "decoding-failed";
      return {};
    }
  }

  insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  appendTextNextToCopyright(locale) {
    document.addEventListener("DOMContentLoaded", (event) => {
      var branchbobLink =
        "https://www.branchbob.com/" + (locale == "de" ? "" : "en");
      var element = document.querySelector(
        ".footer-wrapper .credits, .copy-right .container p"
      );
      if (element) {
        element.innerHTML +=
          " | <a href='" + branchbobLink + "'>Powered by branchbob</a>";
      }
      var elemenInBobAlice = document.querySelector(
        ".footer .list-inline:last-child"
      );
      if (elemenInBobAlice) {
        var el = document.createElement("a");
        el.href = branchbobLink;
        el.innerHTML = "Powered by branchbob";
        this.insertAfter(elemenInBobAlice, el);
      }
    });
  }

  /**
   * Log important information
   */
  logInfo() {
    const { storeId } = this.options;

    this.log("Building new Frontline instance");
    this.log(`Version: ${config.get("version")}`);
    this.log(`Used locale: ${translation.locale}`);
    this.log(`Auth: ${this.authStatus}`);
    this.log(`storeId: ${storeId}`);
  }

  /**
   * Log-wrapper
   */
  log(...args) {
    if (this.options.debug) {
      if (args && typeof args[0] === "string") {
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

  /**
   * Load Infinity
   */

  async getProducts(apiEndpoint, params) {
    const response = await fetch(`${apiEndpoint}/products.json?${params}`, {
      method: "GET",
    });

    return response.json();
  }

  footerHeight = () => {
    var sum = 0;
    LOAD_INFINITY_CLASSES.footer.split(",").forEach((className) => {
      const element = document.querySelector(className);
      if (element != null) {
        sum += element.getBoundingClientRect().height;
      }
    });
    return sum;
  };

  populateUI = (newProducts) => {
    const products = document.querySelector(
      LOAD_INFINITY_CLASSES.appendProducts
    );

    products.insertAdjacentHTML("beforeend", newProducts);
    document.querySelector(LOAD_INFINITY_CLASSES.loadMore).style.display =
      "none";
  };

  pagination() {
    document.addEventListener("DOMContentLoaded", () => {
      var page = 1;
      var loadingNow = false;

      const categoryId = document
        .querySelector(LOAD_INFINITY_CLASSES.category)
        .getAttribute("data-id");

      if (categoryId) {
        window.addEventListener("scroll", () => {
          const categoryPage = document.querySelector(
            LOAD_INFINITY_CLASSES.category
          );
          const loadMore = document.querySelector(
            LOAD_INFINITY_CLASSES.loadMore
          );

          if (categoryPage != null && loadMore != null) {
            const { designId, storeId, apiEndpoint } = this.options;

            if (
              window.innerHeight + window.scrollY >=
              document.body.offsetHeight - this.footerHeight()
            ) {
              if (loadingNow) {
                return;
              }
              document.querySelector(
                LOAD_INFINITY_CLASSES.loadMore
              ).style.display = "block";
              loadingNow = true;

              const params = new URLSearchParams();
              params.set("store_id", storeId);
              params.set("category_id", categoryId);
              params.set("page", page + 1);
              params.set("design_id", designId);
              params.set(
                "q",
                new URLSearchParams(document.location.search).get("q")
              );

              this.getProducts(apiEndpoint, params).then((response) => {
                page = page + 1;
                this.populateUI(response.html);

                if (page == response.total_pages) {
                  document
                    .querySelector(LOAD_INFINITY_CLASSES.loadMore)
                    .remove();
                }
                loadingNow = false;
              });
            }
          }
        });
      }
    });
  }
}

export default Frontline;
