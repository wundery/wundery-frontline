import React from 'react';
import { withTranslation } from 'globals';

function SerachInput({ inputRef, onChange, t, term }) {
  return (
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
