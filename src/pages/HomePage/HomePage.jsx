import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from 'services/api';
import { Outlet } from 'react-router-dom';
import MoviesList from '../../components/MoviesList/MoviesList';
import homePageStyles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(res => setMovies(res));

    // eslint-disable-next-line
  }, []);

  return (
    <div className={homePageStyles.moviesList}>
      <h1>Trending today</h1>

      <MoviesList movies={movies} />
      <Outlet />
    </div>
  );
};

export default HomePage;
