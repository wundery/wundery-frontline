import React from 'react';
import ReactDOM from 'react-dom';
// import ElasticSearchApi from './ElasticSearchApi';
import { Search as SearchComponent } from 'features/Search';
import "regenerator-runtime/runtime";

class ElasticSearch {
  static findNodeByDataAttribute() {
    return document.querySelector('[data-wundery-search]');
  }

  constructor(frontlineClient, options) {
    this.frontlineClient = frontlineClient;
    this.options = options;
  }

  async searchProducts(apiEndpoint, params) {
    console.log('apiEndpoint: ', apiEndpoint)
    const response = await fetch(
      `${apiEndpoint}/search/products?${params}`,
      { method: "GET" }
    );
    console.log('response.json(): ', response.json())

    return response.json();
  }

  query(text) {
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
        console.log('response: ', response)
        if (result.error) {
          reject(result.error.message);
        } else {
          resolve(response)
        }
      })
    }).catch(error => {
      console.warn(error);
      reject(String(error));
    });
  }

  mount(design) {
    this.log('Mounting elastic search');

    const node = ElasticSearch.findNodeByDataAttribute();

    if (node) {
      // ReactDOM.render(<SearchComponent search={this} design={design} />, node);
    } else {
      throw new Error('No node found to mount search');
    }

    return this;
  }

  log(...args) {
    this.frontlineClient.log(...args);
  }
}

export default ElasticSearch;
