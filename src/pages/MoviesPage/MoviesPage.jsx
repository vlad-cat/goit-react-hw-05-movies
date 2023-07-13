import { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Outlet } from 'react-router-dom';
import MoviesList from '../../components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm';
import { getSearchMovie } from 'services/api';
import moviesPageStyles from './MoviesPage.module.css';

const MoviesPage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) return;
    getSearchMovie(query).then(res => setMovies([...res]));
  }, [query]);

  return (
    <>
      <div className={moviesPageStyles.moviesList}>
        <SearchForm location={location} onSubmit={handleSubmit} />
        <MoviesList movies={movies} />
        <Outlet />
      </div>
    </>
  );
};

export default MoviesPage;
