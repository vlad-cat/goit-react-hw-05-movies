import Loader from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { getMovieReviews } from 'services/api';
import css from './ReviewsPage.module.css';

const ReviewsPage = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieCast = async movieId => {
      try {
        setIsLoading(true);

        const reviews = await getMovieReviews(movieId);
        setMovieReviews(reviews.results);
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
    <section>
      {error.length > 0 && <p>Upss, Some error occured... {error}</p>}
      {isLoading && <Loader />}
      {movieReviews.length ? (
        movieReviews.map(review => {
          return (
            <li className={css.reviewItem} key={review.id}>
              <p className={css.authorName}>Author: {review.author} </p>
              <p>{review.content}</p>
            </li>
          );
        })
      ) : (
        <p className={css.notification}>
          We dont have any reviews for this movie
        </p>
      )}
      <Outlet />
    </section>
  );
};

export default ReviewsPage;
