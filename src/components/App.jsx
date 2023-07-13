import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Loader from './Loader';

const LazyHomePage = lazy(() => import('../pages/HomePage/HomePage'));
const LazyMoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const LazyMovieDetails = lazy(() =>
  import('../pages/MovieDetails/MovieDetails')
);
const LazyCastPage = lazy(() => import('../components/Cast/CastPage'));
const LazyReviewsPage = lazy(() =>
  import('../components/ReviewsPage/ReviewsPage')
);

export const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LazyHomePage />} />

          <Route path="movies" element={<LazyMoviesPage />} />
          <Route path="/movies/:movieId" element={<LazyMovieDetails />}>
            <Route path="cast" element={<LazyCastPage />} />
            <Route path="reviews" element={<LazyReviewsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
