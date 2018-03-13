import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'redux-little-router';
import { search } from '../actions/search';

class MainSearch extends React.Component {
  render() {
    return (
      <div className="sans-serif pa4 center w-50">
        <div className="tc">
          <h1 className="headline">Welcome to Movie Search</h1>
          <p>The world's premiere movie search tool built with React and Redux!</p>
        </div>

        <input
          className="db center"
          type="text"
          placeholder="Wall-E"
          onChange={({ target: { value } }) => this.props.search(value)}
        />

        <p className="tc">Found {this.props.resultCount} results:</p>
        <ul>
          {this.props.results.map(({ trackName, trackId }) => (
            <li>
              <Link href={`/movie/${trackId}`}>{trackName}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

MainSearch.defaultProps = {
  error: null, 
  loading: false,
  resultCount: 0,
  results: [],
};

MainSearch.propTypes = {
  error: PropTypes.node,
  loading: PropTypes.bool,
  resultCount: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.shape({})),
  search: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search,
  }, dispatch);
}

export default connect(state => state.search, mapDispatchToProps)(MainSearch);
export { MainSearch as MockMainSearch };
