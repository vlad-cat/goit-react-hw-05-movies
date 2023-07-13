import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moviesListStyles from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={moviesListStyles.list}>
      {/* {movies && */}
      {movies.map(
        ({ id, title }) =>
          title && (
            <li key={id}>
              <Link key={id} to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          )
      )}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default MoviesList;
