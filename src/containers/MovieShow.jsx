import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MovieShow extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className="sans-serif">
        <h1 className="headline">Fill in Details for Movie {id}</h1>
      </div>
    );
  }
}

MovieShow.defaultProps = {
};

MovieShow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(state => state.movie)(MovieShow);
export { MovieShow as MockMovieShow };
