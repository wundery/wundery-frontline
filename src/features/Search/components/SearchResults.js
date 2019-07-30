import React from 'react';
import { withTranslation } from 'globals';
import SearchResult from './SearchResult';

function SearchResults({ results, resultsRef, term, t, showDescription }) {

  // Renders the headline based on the number of results
  function renderHeadline() {
    if (results.length === 0) {
      return t('noResultsHeadline');
    }

    if (results.length === 1) {
      return t('oneResultHeadline');
    }

    return t('resultsHeadline', { resultsCount: results.length });
  }

  function searchURL(){
    return window.location.origin + "/search&q=" + encodeURIComponent(term);
  }

  return results && results.length > 0 && (
    <span className="wundery-search-results-wrapper" ref={resultsRef}>
      <div className="wundery-search-results-header">
        {renderHeadline()}
      </div>
      <div className="wundery-search-results">
        {results.map((result, index) => (
          <SearchResult key={index} result={result} showDescription={showDescription} />
        ))}
        <a href={searchURL()} className='see-all'>{t('seeAll', {count: results.length})}</a>
      </div>
    </span>
  );
}

SearchResults.propTypes = {
  // The results
  results: React.PropTypes.array.isRequired,

  // Whether the item description should be displayed
  showDescription: React.PropTypes.bool,

  // Translation helper
  t: React.PropTypes.func.isRequired,

  // Called when the results are rendered
  resultsRef: React.PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  showDescription: true,
};

export default withTranslation('features.search', 'components.searchResults')(SearchResults);
