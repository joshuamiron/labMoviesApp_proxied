import React, { useState, createContext } from "react"; 
export const MoviesContext = createContext(null);

export const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [madeupMovies, setMyMadeupMovies] = useState([]);
  const [favouritePeople, setFavouritePeople] = useState([]);

  const addToFavourites = (movie) => {
    let updatedFavourites = [...favourites];
    if (updatedFavourites.includes(movie.id)) {
      updatedFavourites = updatedFavourites.filter((mId) => mId !== movie.id);
      console.log(`${movie.title} removed from favourites. Favourites are now ${updatedFavourites}`);
    } else {
      updatedFavourites.push(movie.id);
      console.log(`${movie.title} added to favourites. Favourites are now ${updatedFavourites}`);
    }
    setFavourites(updatedFavourites);
  };

  const addToFavouritePeople = (person) => {
    let updatedFavouritePeople = [...favouritePeople];
    if (updatedFavouritePeople.includes(person.id)) {
      updatedFavouritePeople = updatedFavouritePeople.filter((pId) => pId !== person.id);
      console.log(`${person.name} removed from favourite people. Favourites are now ${updatedFavouritePeople}`);
    } else {
      updatedFavouritePeople.push(person.id);
      console.log(`${person.name} added to favourite people. Favourites are now ${updatedFavouritePeople}`);
    }
    setFavouritePeople(updatedFavouritePeople);
  };

  const addToPlaylist = (movie) => {
    let updatedPlaylist = [...playlist];
    if (updatedPlaylist.includes(movie.id)) {
      updatedPlaylist = updatedPlaylist.filter((mId) => mId !== movie.id);
      console.log(`${movie.title} removed from playlist. Playlist is now ${updatedPlaylist}`);
    } else {
      updatedPlaylist.push(movie.id);
      console.log(`${movie.title} added to playlist. Playlist is now ${updatedPlaylist}`);
    }
    setPlaylist(updatedPlaylist);
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };

  const addMadeupMovie = (movie) => {
    const newId = madeupMovies.length + 1;
    const newMovie = { ...movie, id: newId };
    madeupMovies.push(newMovie);
    setMyMadeupMovies(madeupMovies);
  };

  const deleteMadeupMovie = (movieId) => {
    const updatedMadeupMovies = madeupMovies.filter(movie => movie.id !== movieId);
    setMyMadeupMovies(updatedMadeupMovies);
  };

  const resetMoviesContext = () => {
    setFavourites([]);
    setPlaylist([]);
    setFavouritePeople([]);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        addReview,
        playlist,
        addToPlaylist,
        addMadeupMovie,
        madeupMovies,
        deleteMadeupMovie,
        favouritePeople,
        addToFavouritePeople,
        resetMoviesContext,
        setFavourites,
        setPlaylist,
        setFavouritePeople,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;