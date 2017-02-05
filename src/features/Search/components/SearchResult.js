import React from 'react';
import truncate from 'lodash/truncate';
import { withTranslation } from 'globals';

function SearchResult({ showDescription, result }) {
  const { description, title, image, url } = result;

  return (
    <a className="wundery-search-result" href={url}>
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
