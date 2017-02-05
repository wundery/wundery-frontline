import React from 'react';
import { withTranslation } from 'globals';
import SearchResults from '../components/SearchResults';
import SearchInput from '../components/SearchInput';
// eslint-disable-next-line no-unused-vars
import css from '../styles/index.css';

class Search extends React.Component {
  static propTypes = {
    // The wundery search instance
    search: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    showDescription: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      // Search in progress
      searching: false,

      // term
      term: '',

      // Search results
      results: [],

      // Error
      error: null,
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

    if (this.searchResultsRef
      && !this.searchResultsRef.contains(target)
      && !this.searchInputRef.contains(target)) {
      this.setState({ results: [], term: '' });
    }
  }

  onSearch = (event) => {
    const term = event.target.value;

    this.setState({ searching: true, term });

    this.search(term).then(
      this.searchSuccess,
      this.searchError,
    );
  }

  setSearchResultsRef = (ref) => {
    this.searchResultsRef = ref;
  }

  setSearchInputRef = (ref) => {
    this.searchInputRef = ref;
  }

  search(term) {
    const { search } = this.props;

    return search.query(term);
  }

  searchSuccess = (results) => {
    this.setState({ searching: false, results });
  }

  searchError = (error) => {
    this.setState({ searching: false, error });
  }

  render() {
    const { results, term } = this.state;

    return (
      <span className="wundery-search">
        <SearchInput onChange={this.onSearch} inputRef={this.setSearchInputRef} term={term} />
        <SearchResults results={results} resultsRef={this.setSearchResultsRef} />
      </span>
    );
  }
}

export default withTranslation('features.search', 'containers.search')(Search);
