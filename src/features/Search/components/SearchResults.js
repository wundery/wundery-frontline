import React from 'react';
import { withTranslation } from 'globals';
import SearchResult from './SearchResult';

function SearchResults({ results, resultsRef, term, t, showDescription, total }) {
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
    var queryPath = "search&q=" + encodeURIComponent(term);
    if (window.location.hostname == "localhost")
      return window.location.href.match(/\S*fragment=/g)[0] + queryPath
    else
      return window.location.origin + '/' + queryPath
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
        {total > 5 && <a href={searchURL()} className='see-all'>{t('seeAll', {count: total})}</a>
        }
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
