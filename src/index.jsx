import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import SiteHeader from './components/siteHeader'
import AuthContextProvider from "./contexts/authContext";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MoviesUpcomingPage from "./pages/moviesUpcomingPage";
import MoviesPopularPage from "./pages/moviesPopularPage";
import MoviesTrendingPage from "./pages/moviesTrendingPage";
import MoviesFavouritePage from "./pages/moviesFavouritePage";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import MyPlaylistPage from './pages/myPlaylistPage';
import MyMadeupMoviesPage from './pages/myMadeupMoviesPage';
import MoviesContextProvider from "./contexts/moviesContext";

import PersonPage from "./pages/personDetailsPage";
import PeopleTrendingPage from './pages/peopleTrendingPage';
import PeoplePopularPage from './pages/peoplePopularPage';
import PeopleFavouritePage from "./pages/peopleFavouritePage";

import TVListPage from "./pages/tvShowListPage";
import TVShowPage from "./pages/tvShowDetailsPage";

import LoginPage from './pages/accountLoginPage';
import SignUpPage from './pages/accountSignUpPage';
import PrivateRoute from "./privateRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = ({ children }) => {
  return (

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <MoviesContextProvider>
        <AuthContextProvider>
            <SiteHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/movies/upcoming" element={<MoviesUpcomingPage />} />
              <Route path="/movies/popular" element={<MoviesPopularPage />} />
              <Route path="/movies/trending" element={<MoviesTrendingPage />} />
              
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/:id/reviews" element={<MovieReviewPage />} />

              <Route path="/movies/myplaylist" element={<PrivateRoute><MyPlaylistPage /></PrivateRoute>} />
              <Route path="/movies/favourites" element={<PrivateRoute><MoviesFavouritePage /></PrivateRoute>} />
              <Route path="/movies/mymadeupmovies" element={<PrivateRoute><MyMadeupMoviesPage /></PrivateRoute>} />
              <Route path="/people/favourites" element={<PrivateRoute><PeopleFavouritePage /></PrivateRoute>} />
              
              <Route path="/people/trending" element={<PeopleTrendingPage />} />
              <Route path="/people/popular" element={<PeoplePopularPage />} />
              <Route path="/people/:id" element={<PersonPage />} />

              <Route path="/tv/shows" element={<TVListPage />} />
              <Route path="/tv/:id" element={<TVShowPage />} />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
            </AuthContextProvider>
          </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
