import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'services/api';
import castPageStyles from './CastPage.module.css';
import Loader from 'components/Loader/Loader';

const CastPage = () => {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieCast = async movieId => {
      try {
        setIsLoading(true);

        const movieCast = await getMovieCredits(movieId);
        setMovieCredits(movieCast.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieCast(movieId);
    // eslint-disable-next-line
  }, [movieId]);

  return (
    <section className={castPageStyles.castSection}>
      {error.length > 0 && <p>Upss, Some error occured... {error}</p>}
      {isLoading && <Loader />}
      {movieCredits &&
        movieCredits.map(cast => {
          return (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : ''
                }
                alt="actor"
                width="150"
              />
              <p className={castPageStyles.castName}>{cast.original_name} </p>
              <p>
                <b>Character:</b> {cast.character}
              </p>
            </li>
          );
        })}
    </section>
  );
};

export default CastPage;
