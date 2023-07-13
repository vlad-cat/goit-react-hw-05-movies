import React, { useState, useEffect } from 'react';
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import Loader from 'components/Loader';
import movieDetailsStyles from './MovieDetails.module.css';
import { getMovieDetails } from 'services/api';
import arrow from '../../images/arrow.svg';
import noImg from '../../images/not-image.png';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async movieId => {
      try {
        setIsLoading(true);
        const movieDetails = await getMovieDetails(movieId);
        setMovieData(movieDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails(movieId);
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state) {
      navigate(location.state.from);
      return;
    }
    navigate('/');
  };

  return (
    <div className={movieDetailsStyles.movieInfo}>
      {isLoading && <Loader />}
      {error.length > 0 && (
        <p className={movieDetailsStyles.errorText}>
          Upss, Some error occured... {error}
        </p>
      )}
      {movieData && (
        <section>
          <button className={movieDetailsStyles.button} onClick={handleGoBack}>
            <img src={arrow} alt="arrow" width="15" />
            Go back
          </button>
          <div className={movieDetailsStyles.description}>
            <img
              src={
                movieData.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                  : noImg
              }
              width="300"
              alt="movie moment"
            />
            <div>
              <h2 className={movieDetailsStyles.titleMovie}>
                {movieData.title}
              </h2>
              <p className={movieDetailsStyles.scoreInfo}>
                User score:{' '}
                <span className={movieDetailsStyles.scoreNumber}>
                  {parseInt(movieData.vote_average * 10)}%
                </span>
              </p>
              <h3>Overview</h3>
              <span className={movieDetailsStyles.overviewText}>
                {movieData.overview}
              </span>
              <h4>Genres</h4>
              <span className={movieDetailsStyles.genresList}>
                {movieData?.genres &&
                  movieData.genres.map(({ id, name }) => {
                    return <li key={id}>{name}</li>;
                  })}
              </span>
            </div>
          </div>

          <div className={movieDetailsStyles.addInfo}>
            <h5 className={movieDetailsStyles.addTitle}>
              Additional information
            </h5>
            <div className={movieDetailsStyles.addLinks}>
              <Link to="cast" state={{ from: location.state?.from }}>
                <p>Cast</p>
              </Link>
              <Link to="reviews" state={{ from: location.state?.from }}>
                <p>Reviews</p>
              </Link>
            </div>
          </div>

          <Outlet />
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
