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
import { updateFavouritePeople } from '../../api/api'; // Import the updateFavourites API call

const AddToFavouritePeopleIcon = ({ person }) => {
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
    context.addToFavouritePeople(person);
  };*/

  const onUserSelect = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      console.log("User not logged in.");
      handleOpen();
      return;
    }
    const personId = person.id;
    const personName = person.name;
    try {
      const response = await updateFavouritePeople (personId, email);
      if (response.ok) {
        console.log("Favorite people updated:", response.data);
        if (isPersonFavourited) {
          console.log("Favourite person removed:", response.data);
          context.addToFavouritePeople(person);
        } else {
          console.log("Favourite person added:", response.data);
          context.addToFavouritePeople(person);
        }
      } else {
        console.error("Else: Failed to update favorite people:", response.statusText);
        // Handle error, e.g., display an error message
      }
    } catch (error) {
      console.error("Catch: Failed to update favorite people:", error.message);
      // Handle error, e.g., display an error message
    }
  };
  
  //---- Check if the person is already in the favourites list
  const isPersonFavourited = context.favouritePeople.includes(person.id);

  //---- If the person is in the favourites list, show the remove button. Otherwise show the add button.
  return (
    <>
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      {isPersonFavourited ? (
        <FavoriteIcon color="secondary" fontSize="medium" />
      ) : (
        <FavoriteBorderIcon color="primary" fontSize="medium" />
      )}
    </IconButton>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>You must sign in</DialogTitle>
    <DialogContent>
      <Typography>
      Please{" "}<Link href="/login" underline="hover">sign in</Link>{" "}to add people to your favorites.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>Close</Button>
    </DialogActions>
  </Dialog>
  </>
  );
};



export default AddToFavouritePeopleIcon;
