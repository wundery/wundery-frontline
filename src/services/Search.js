import React from 'react';
import ReactDOM from 'react-dom';
import { SearchApi } from 'wundery-js-lib';
import { Search as SearchComponent } from 'features/Search';
import "regenerator-runtime/runtime";

class Search {
  static findNodeByDataAttribute() {
    return document.querySelector('[data-wundery-search]');
  }

  constructor(frontlineClient, options) {
    this.frontlineClient = frontlineClient;
    this.options = options;
    this.indexName = this.getIndexName();

    const authData = this.frontlineClient.decodeAuthData();

    this.searchApi = new SearchApi({
      algoliaAppId: authData.algoliaAppId,
      algoliaSearchApiKey: authData.algoliaSearchApiKey,
      mock: frontlineClient.requireOption('mock') === true,
    });
  }

  query(term) {
    const { onSearch } = this.options;

    // Trigger user-defined onSearch callback
    if (onSearch) {
      onSearch(term);
    }

    return this.searchApi.search(this.indexName, term, null, true);
  }

  getIndexName() {
    return `store-${this.frontlineClient.requireOption('storeId')}-public`;
  }

  // Search elastic documents from api.
  async searchProducts(apiEndpoint, params) {
    const response = await fetch(
      `${apiEndpoint}/search/products.json?${params}`,
      { method: "GET" }
    )
    return response.json();
  }

  elasticQuery(text) {
    const { onSearch } = this.options;
    const { apiEndpoint, storeId } = this.frontlineClient.options

    // Trigger user-defined onSearch callback
    if (onSearch) {
      onSearch(text);
    }

    const params = new URLSearchParams();
    params.set('store_id', storeId);
    params.set('text', text);

    return new Promise((resolve, reject) => {
      this.searchProducts(apiEndpoint, params).then((response) => {
        if (response.error) {
          reject(response.error.message);
        } else {
          console.log(
            `[elasticsearch] ${text} (total: ${response.total}): `,
            response.products.map((product) => { return product.title})
          );
          resolve(response)
        }
      })
    }).catch(error => {
      console.warn(error);
      reject(String(error));
    });
  }

  mount(design) {
    this.log('Mounting search');

    const node = Search.findNodeByDataAttribute();

    if (node) {
      ReactDOM.render(<SearchComponent search={this} design={design} />, node);
    } else {
      throw new Error('No node found to mount search');
    }

    return this;
  }

  log(...args) {
    this.frontlineClient.log(...args);
  }
}

export default Search;
