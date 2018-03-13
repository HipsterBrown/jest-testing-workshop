import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {lookupMovie} from '../actions/movie';
import NavBar from '../components/NavBar';

/*
 TODO:
  - create real Loading component
*/

class MovieShow extends React.Component {
  componentDidMount() {
    this.props.lookupMovie(this.props.id);
  }

  render() {
    const {id, loading, movie} = this.props;

    const content = movie && (
      <React.Fragment>
        <div className="tc">
          <h1 className="f-subheadline mt0">{movie && movie.trackName}</h1>
        </div>

        <video
          src={movie.previewUrl}
          controls
          preload="metadata"
          poster={movie.artworkUrl100.replace('100x100', '454x454')}
          className="w-100"
        />

        <div className="flex">
          <div className="w-70">
            <h2 className="f3">Summary</h2>
            <p className="lh-copy">{movie.longDescription}</p>
          </div>
          <div className="ph4">
            <h2 className="f3">Details</h2>
            <ul className="list lh-copy ph0">
              <li>
                <strong>Genre:</strong> {movie.primaryGenreName}
              </li>
              <li>
                <strong>Release Year:</strong>{' '}
                {new Date(movie.releaseDate).getFullYear()}
              </li>
              <li>
                <strong>Release Country:</strong> {movie.country}
              </li>
              <li>
                <strong>Rating:</strong> {movie.contentAdvisoryRating}
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );

    return (
      <div className="sans-serif">
        <NavBar />
        <main className="pa4 center w-80">{content}</main>
      </div>
    );
  }
}

MovieShow.defaultProps = {
  loading: false,
  movie: null,
};

MovieShow.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  movie: PropTypes.shape({}),
  lookupMovie: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      lookupMovie,
    },
    dispatch,
  );
}

export default connect(state => state.movie, mapDispatchToProps)(MovieShow);
export {MovieShow as MockMovieShow};
