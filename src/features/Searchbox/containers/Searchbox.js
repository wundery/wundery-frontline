import React from 'react';
import { withTranslation } from 'globals';
import css from '../styles/index.css';

class Searchbox extends React.Component {
  static propTypes = {
    // The wundery search instance
    search: React.PropTypes.object.isRequired,

    // Translate helper
    t: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      // Search in progress
      searching: false,

      // term
      term: '',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  onDocumentClick = (event) => {
    const target = event.target;

    if (this.searchWrapperRef
      && !this.searchWrapperRef.contains(target)
      && !this.searchInputRef.contains(target)) {
      this.setState({ results: [], term: '' });
    }
  }

  onSearch = (event) => {
    const { search } = this.props;

    const term = event.target.value;

    this.setState({ searching: true, term });

    this.search(term).then(
      this.searchSuccess,
      this.searchError,
    );
  }

  setSearchWrapperRef = (ref) => {
    this.searchWrapperRef = ref;
  }

  setSearchInputRef = (ref) => {
    this.searchInputRef = ref;
  }

  search(term) {
    return search.query(term)
  }

  searchSuccess = results => {
    this.setState({ searching: false, results });
  }

  searchError = error => {
    this.setState({ searching: false });
  }

  renderResult = (result, index) => {
    const { description, title, url } = result;

    return (
      <a className="wundery-search-result" key={index} href={url}>
        <div className="wundery-search-result-title">
          {title}
        </div>
        {description && (
          <div className="wundery-search-result-description">
            {description}
          </div>
        )}
      </a>
    );
  }

  renderResults() {
    const { results } = this.state;

    return results && results.length > 0 && (
      <span className="wundery-search-results-wrapper" ref={this.setSearchWrapperRef}>
        <div className="wundery-search-results">
          {results.map(this.renderResult)}
        </div>
      </span>
    );
  }

  render() {
    const { cart, t } = this.props;
    const { searching, term } = this.state;

    search.log('Rendering search');

    return (
      <span className="wundery-search">
        <span className="wundery-search-input-wrapper">
          <input
            type="text"
            className="wundery-search-input"
            ref={this.setSearchInputRef}
            onChange={this.onSearch}
            value={term}
            placeholder={t('placeholder')}
          />
        </span>
        {this.renderResults()}
      </span>
    )
  }
};

export default withTranslation('features.searchbox', 'containers.searchbox')(Searchbox);
