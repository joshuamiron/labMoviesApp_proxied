import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { addFavourite } from '../../api/api'; // Import the addFavourite API call

const AddToFavouritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext, AuthContext);

  /* const onUserSelect = (e) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };*/

  const onUserSelect = async (e) => {
    e.preventDefault();
    const movieId = movie.id;
    console.log("Card Icons movieId: " + movieId)
    try {
      const response = await addFavourite(movieId); // Call the addFavourite API function
      //console.log(response); // Log the response or perform any other actions
    } catch (error) {
      console.error('Error adding favourite:', error);
    }
  };

  //---- Check if the movie is already in the favourites list
  const isMovieFavourited = context.favourites.includes(movie.id);

  //---- If the movie is in the favourites list, show the remove button. Otherwise show the add button.
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      {isMovieFavourited ? (
        <FavoriteIcon color="secondary" fontSize="medium" />
      ) : (
        <FavoriteBorderIcon color="primary" fontSize="medium" />
      )}
    </IconButton>
  );
};



export default AddToFavouritesIcon;
