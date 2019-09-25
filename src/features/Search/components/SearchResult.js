import React from 'react';
import truncate from 'lodash/truncate';
import { withTranslation } from 'globals';
import queryString from 'query-string';

function SearchResult({ showDescription, result }) {
  const { description, title, image, url } = result;

  const params = queryString.parse(window.location.search);
  const urlFormat = params.d ? `${url}&d=${params.d}` : url ;

  return (
    <a className="wundery-search-result" href={urlFormat}>
      {image && (
        <div className="wundery-search-result-image">
          <img src={image} alt="" />
        </div>
      )}
      <div className="wundery-search-result-content">
        <div className="wundery-search-result-title">
          {title}
        </div>
        {showDescription && description && (
          <div className="wundery-search-result-description">
            {truncate(description, { length: 80 })}
          </div>
        )}
      </div>
    </a>
  );
}

SearchResult.propTypes = {
  // The result
  result: React.PropTypes.object.isRequired,

  // Whether the item description should be displayed
  showDescription: React.PropTypes.bool,
};

SearchResult.defaultProps = {
  showDescription: true,
};

export default withTranslation('features.search', 'components.searchResult')(SearchResult);
