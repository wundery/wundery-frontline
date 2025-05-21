import React from "react";
import { withTranslation } from "globals";
import SearchResults from "../components/SearchResults";
import SearchInput from "../components/SearchInput";
// eslint-disable-next-line no-unused-vars
import css from "../styles/index.css";

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
      term: "",

      // Search results
      results: [],

      // Search total
      total: 0,

      // Error
      error: null,

      // class search results
      className: "",
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.onDocumentClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onDocumentClick, true);
  }

  onDocumentClick = (event) => {
    const target = event.target;

    if (
      this.searchResultsRef &&
      !this.searchResultsRef.contains(target) &&
      !this.searchInputRef.contains(target)
    ) {
      this.setState({ results: [], term: "" });
    }
  };

  onSearch = (event) => {
    const term = event.target.value;
    let objectState = { searching: true, term };

    if (/Android/i.test(navigator.userAgent)) {
      objectState["className"] = "classAndoid";
    } else if (/iOS/i.test(navigator.userAgent)) {
      objectState["className"] = "classiOS";
    }

    this.setState(objectState);
    this.elasticSearch(term).then(this.searchSuccess, this.searchError);
  };

  setSearchResultsRef = (ref) => {
    this.searchResultsRef = ref;
  };

  setSearchInputRef = (ref) => {
    this.searchInputRef = ref;
  };

  // Search by Elasticsearch.
  elasticSearch(term) {
    const { search } = this.props;

    return search.elasticQuery(term);
  }

  searchSuccess = (results) => {
    this.setState({
      searching: false,
      results: results.products,
      total: results.total,
    });
  };

  searchError = (error) => {
    this.setState({ searching: false, error });
  };

  render() {
    const { results, term, total, className } = this.state;
    const { design } = this.props;

    return (
      <span className="wundery-search">
        <SearchInput
          onChange={this.onSearch}
          inputRef={this.setSearchInputRef}
          term={term}
          design={design}
        />
        <SearchResults
          className={className}
          results={results}
          resultsRef={this.setSearchResultsRef}
          term={term}
          total={total}
        />
      </span>
    );
  }
}

export default withTranslation("features.search", "containers.search")(Search);
