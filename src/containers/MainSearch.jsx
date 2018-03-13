import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {search} from '../actions/search';
import NavBar from '../components/NavBar';
import MovieCard from '../components/MovieCard';

/*
  TODO:
    - create MovieCard component
    - layout results in grid
*/

const MainSearch = props => (
  <div className="sans-serif">
    <NavBar />
    <div className="pa4 center w-60">
      <div className="tc mb5">
        <h1 className="f-headline mt0 mb0">
          Welcome to <br /> Movie Search
        </h1>
        <p className="f3">
          The world's premiere movie search tool built with React and Redux!
        </p>
      </div>

      <input
        autofocus
        className="db center w-100 ph2 pv3 f4 lh-solid"
        type="text"
        placeholder="Wall-E"
        value={props.query.term}
        onChange={({target: {value}}) => props.search(value)}
      />

      <p className="tc">Found {props.resultCount} results:</p>
      <ul className="list ph0 cf">
        {props.results.map(({artworkUrl100, trackName, trackId}) => (
          <li className="fl w-20 pa2" style={{minHeight: '22rem'}}>
            <MovieCard
              link={`/movie/${trackId}`}
              poster={artworkUrl100.replace('100x100', '227x227')}
              title={trackName}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

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
  query: PropTypes.shape({}).isRequired,
};

function mapStateToProps({router, search}) {
  return {
    ...router,
    ...search,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      search,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);
export {MainSearch as MockMainSearch};
