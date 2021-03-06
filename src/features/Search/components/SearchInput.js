import React from 'react';
import { withTranslation } from 'globals';
import ImageSearch from '../../../assets/search.svg';

function SerachInput({ inputRef, onChange, t, term, design }) {

  return (
    <div>
      {design == 'non_speedy' &&
        <span className="wundery-search-input-wrapper">
          <input
            type="text"
            className="wundery-search-input"
            onChange={onChange}
            value={term}
            ref={inputRef}
            placeholder={t('placeholder')}
          />
        </span>
      }

      {design == 'speedy' &&
        <form className="search-form" role="search" onChange={onChange}>
          <div className="form-group realtive">
            <input type="text" className="form-control" placeholder={t('placeholder')} value={term} ref={inputRef}/>
            <button type="submit" className="form-control-submit">
              <ImageSearch />
            </button>
          </div>
        </form>
      }
    </div>
  );
}

SerachInput.propTypes = {
  // Triggered on input change
  onChange: React.PropTypes.func.isRequired,

  // The current search term
  term: React.PropTypes.string.isRequired,

  // Translation helper
  t: React.PropTypes.func.isRequired,

  // Input element ref
  inputRef: React.PropTypes.func.isRequired,
};

SerachInput.defaultProps = {
  term: '',
};

export default withTranslation('features.search', 'components.searchInput')(SerachInput);
