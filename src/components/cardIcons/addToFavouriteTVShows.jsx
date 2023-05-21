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

const AddToFavouriteTVShowsIcon = ({ tv }) => {
  const {isAuthenticated, email } = useContext(AuthContext);
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false); // State to control the visibility of the popup
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  
    const onUserSelect = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      console.log("User not logged in.");
      handleOpen();
      return;
    }

  //---- Check if the show is already in the favourites list
  const isShowFavourited = context.favouriteShows.includes(tv.id);

  //---- If the show is in the favourites list, show the remove button. Otherwise show the add button.
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      {isShowFavourited ? (
        <FavoriteIcon color="secondary" fontSize="medium" />
      ) : (
        <FavoriteBorderIcon color="primary" fontSize="medium" />
      )}
    </IconButton>
  );
};



export default AddToFavouriteTVShowsIcon;
