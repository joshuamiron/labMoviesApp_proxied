import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import Link from '@mui/material/Link';

import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { updateFavourites } from '../../api/api'; // Import the updateFavourites API call

const AddToFavouritesIcon = ({ movie }) => {
  const {isAuthenticated, email } = useContext(AuthContext);
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false); // State to control the visibility of the popup
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  // ------------------------------------------------------------
  // --- From when I was just storing everything in local context
  // ------------------------------------------------------------

  /* const onUserSelect = (e) => {
    e.preventDefault();
    context.addToFavourites(movie);
  };*/

  const onUserSelect = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      console.log("User not logged in.");
      handleOpen();
      return;
    }
    const movieId = movie.id;
    console.log("Add to favourites button: " + movieId + " and email: " + email);
    try {
      const response = await updateFavourites (movieId, email);
      if (response.ok) {
        console.log("Favorite movies updated:", response.data);
        if (isMovieFavourited) {
          console.log("Favourite movie removed:", response.data);
          context.addToFavourites(movie);
        } else {
          console.log("Favourite movie added:", response.data);
          context.addToFavourites(movie);
        }
      } else {
        console.error("Else: Failed to update favorite movies:", response.statusText);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      console.error("Catch: Failed to update favorite movies:", error.message);
      // Handle error, e.g., display an error message
    }
  };

  //---- Check if the movie is already in the favourites list
  const isMovieFavourited = context.favourites.includes(movie.id);

  //---- If the movie is in the favourites list, show the remove button. Otherwise show the add button.
  return (
    <>
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      {isMovieFavourited ? (
        <FavoriteIcon color="secondary" fontSize="medium" />
      ) : (
        <FavoriteBorderIcon color="primary" fontSize="medium" />
      )}
    </IconButton>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>You must sign in</DialogTitle>
    <DialogContent>
      <Typography>
      Please{" "}<Link href="/login" underline="hover">sign in</Link>{" "}to add movies to your favorites.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
    </DialogActions>
  </Dialog>
  </>
  );
};



export default AddToFavouritesIcon;
