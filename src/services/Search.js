import React from 'react';
import ReactDOM from 'react-dom';
import { SearchApi } from 'wundery-js-lib';
import { Search as SearchComponent } from 'features/Search';

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

  mount(speedyDesign = false) {
    this.log('Mounting search');

    const node = Search.findNodeByDataAttribute();

    if (node) {
      ReactDOM.render(<SearchComponent search={this} speedyDesign={speedyDesign}/>, node);
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
