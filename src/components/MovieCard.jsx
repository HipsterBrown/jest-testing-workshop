import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'redux-little-router';

const MovieCard = ({link, poster, title}) => (
  <div className="tc">
    <img src={poster} alt={title} className="db w-100 ba b--black-10 mb3" />
    {Boolean(link) ? (
      <Link href={link} className="link underline-hover near-black f5 fw6">
        {title}
      </Link>
    ) : (
      <p className="f5 fw6 near-black">{title}</p>
    )}
  </div>
);

MovieCard.propTypes = {
  link: PropTypes.string,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieCard;
